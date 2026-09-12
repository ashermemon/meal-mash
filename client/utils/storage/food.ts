import type { Food } from "@/components/features/pantry/Search";
import { asNumber, asString, isRecord } from "./decode";

export const ingredientKey = (food: Food): string =>
  `${food.id}:${food.name.trim().toLowerCase()}`;

export const dedupeFoods = (foods: Food[]): Food[] => {
  const seen = new Set<string>();
  return foods.filter((food) => {
    const key = ingredientKey(food);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const decodeFood = (value: unknown): Food | null => {
  if (!isRecord(value)) return null;

  const name = asString(value.name);
  if (!name) return null;

  const food: Food = {
    id: asNumber(value.id),
    name,
    category: asString(value.category, "Other"),
    displayName: asString(value.displayName, name),
  };

  if (typeof value.alternate_names === "string") {
    food.alternate_names = value.alternate_names;
  }
  if (typeof value.popularity === "number" || value.popularity === null) {
    food.popularity = value.popularity as number | null;
  }

  return food;
};
