import { supabase } from "@/utils/supabase";
import { Food } from "./Search";

function titleCase(text: string) {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function scoreFood(food: Food, query: string) {
  const tokens = query.toLowerCase().trim().split(/\s+/);

  let score = 0;

  const name = food.name.toLowerCase();

  for (const token of tokens) {
    if (name.includes(token)) score += 10;
  }

  let alternates: string[] = [];

  if (food.alternate_names) {
    try {
      alternates = JSON.parse(food.alternate_names);
    } catch {}
  }

  for (const alt of alternates) {
    const altLower = alt.toLowerCase();

    for (const token of tokens) {
      if (altLower.includes(token)) {
        score += 5;
      }
    }
  }

  return score;
}

export async function searchIngredients(query: string): Promise<Food[]> {
  const cleanQuery = query.trim();

  if (!cleanQuery) return [];

  const { data, error } = await supabase
    .from("foods")
    .select("id, name, category, alternate_names")
    .ilike("name", `%${cleanQuery}%`)
    .limit(50);

  if (error) {
    console.error(error);
    return [];
  }

  const formatted = (data ?? []).map((food) => {
    let displayName = food.name;

    let alternates: string[] = [];

    if (food.alternate_names) {
      try {
        alternates = JSON.parse(food.alternate_names);
      } catch {}
    }

    if (food.name.includes(",") && alternates.length > 0) {
      const betterName = alternates.find((a) => !a.includes(","));

      if (betterName) {
        displayName = titleCase(betterName);
      }
    }

    return {
      ...food,
      displayName,
    };
  });

  return formatted.sort(
    (a, b) => scoreFood(b, cleanQuery) - scoreFood(a, cleanQuery),
  );
}
