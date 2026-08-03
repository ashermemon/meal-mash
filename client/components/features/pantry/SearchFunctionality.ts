import { supabase } from "@/utils/supabase";
import { Food } from "./Search";

function titleCase(text: string) {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function parseAlternates(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (item): item is string => typeof item === "string",
        );
      }
    } catch {}
  }

  return [];
}

function normalizeText(value: string): string {
  return value.toLowerCase().replace(/\s+/g, "");
}

function getMatchPriority(food: Food, query: string): number {
  const normalizedQuery = normalizeText(query);
  const candidates = [food.name, ...parseAlternates(food.alternate_names)];

  return candidates.some(
    (candidate) => normalizeText(candidate) === normalizedQuery,
  )
    ? 0
    : 1;
}

export async function searchIngredients(query: string): Promise<Food[]> {
  const cleanQuery = query.trim();

  if (!cleanQuery) return [];

  const baseQuery = supabase
    .from("foods")
    .select("id, name, category, alternate_names, popularity")
    .order("popularity", { ascending: false })
    .limit(50);

  let { data, error } = await baseQuery.ilike("name", `%${cleanQuery}%`);

  if (error) {
    console.error(error);
    return [];
  }

  if (!data || data.length === 0) {
    const fallbackResponse = await supabase
      .from("foods")
      .select("id, name, category, alternate_names, popularity")
      .order("popularity", { ascending: false })
      .limit(200);

    if (fallbackResponse.error) {
      console.error(fallbackResponse.error);
      return [];
    }

    const lowerQuery = cleanQuery.toLowerCase();
    data = (fallbackResponse.data ?? []).filter((food) => {
      const alternates = parseAlternates(food.alternate_names);
      return alternates.some((alt) => alt.toLowerCase().includes(lowerQuery));
    });
  }

  if (error) {
    console.error(error);
    return [];
  }

  const formatted = (data ?? [])
    .map((food) => {
      let displayName = food.name;

      const alternates = parseAlternates(food.alternate_names);

      if (food.name.includes(",") && alternates.length > 0) {
        const betterName = alternates.find((a) => !a.includes(","));

        if (betterName) {
          displayName = titleCase(betterName);
        }
      }

      return {
        ...food,
        displayName,
      } as Food;
    })
    .sort((a, b) => {
      const aPriority = getMatchPriority(a, cleanQuery);
      const bPriority = getMatchPriority(b, cleanQuery);
      return aPriority - bPriority;
    });

  return formatted;
}
