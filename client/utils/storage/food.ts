import type { Food } from "@/components/features/pantry/Search";
import { asNumber, asString, isRecord } from "./decode";

/**
 * Stable identity for a pantry item.
 *
 * Catalog ids are unique, but the name is part of the key because entries can
 * carry a wrong id: hand-built foods fall back to id 0, and records written
 * before the picker was fixed gave every option in a group its base
 * ingredient's id. Keying on both keeps those distinct instead of silently
 * dropping the user's ingredients.
 */
export const ingredientKey = (food: Food): string =>
  `${food.id}:${food.name.trim().toLowerCase()}`;

/** Keeps the first occurrence of each ingredient. */
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
