import { supabase } from "@/utils/supabase";
import { Food } from "./Search";
function titleCase(text: string) {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function searchIngredients(query: string): Promise<Food[]> {
  const cleanQuery = query.trim();

  if (!cleanQuery) return [];

  const { data, error } = await supabase
    .from("foods")
    .select("id, name, category, alternate_names")
    .ilike("name", `%${cleanQuery}%`)
    .limit(100);

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []).map((food) => {
    let displayName = food.name;

    let alternates: string[] = [];

    if (food.alternate_names) {
      try {
        alternates = JSON.parse(food.alternate_names);
      } catch {
        console.log("Could not parse alternate names:", food.alternate_names);
      }
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
}
