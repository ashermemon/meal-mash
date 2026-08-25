import type {
  RecipeCategories,
  RecipeData,
  RecipeInstruction,
} from "@/contexts/RecipeContext";
import {
  asArray,
  asBoolean,
  asNumber,
  asString,
  asStringArray,
  isRecord,
} from "./decode";
import { StorageKeys } from "./keys";
import { readRecord, writeRecord } from "./mmkv";

const defaultCategories: RecipeCategories = {
  madeWithLeftovers: false,
  tastyMeals: false,
  sweetTreats: false,
  quickSnacks: false,
  under15Minutes: false,
};

const decodeCategories = (value: unknown): RecipeCategories => {
  if (!isRecord(value)) return { ...defaultCategories };
  return {
    madeWithLeftovers: asBoolean(value.madeWithLeftovers),
    tastyMeals: asBoolean(value.tastyMeals),
    sweetTreats: asBoolean(value.sweetTreats),
    quickSnacks: asBoolean(value.quickSnacks),
    under15Minutes: asBoolean(value.under15Minutes),
  };
};

/** Ingredients are persisted as `[name, quantity]` pairs. */
const decodeIngredient = (value: unknown): [string, string] | null => {
  if (!Array.isArray(value)) return null;
  const name = asString(value[0]);
  if (!name) return null;
  return [name, asString(value[1])];
};

const decodeInstruction = (value: unknown): RecipeInstruction | null => {
  if (typeof value === "string") return { step: value };
  if (!isRecord(value)) return null;

  const step = asString(value.step);
  if (!step) return null;

  const instruction: RecipeInstruction = { step };
  if (typeof value.timerMinutes === "number") {
    instruction.timerMinutes = value.timerMinutes;
  }
  if (typeof value.timerTask === "string") {
    instruction.timerTask = value.timerTask;
  }
  return instruction;
};

const emptyRecipe = (title: string): RecipeData => ({
  responseRecipe: "",
  title,
  description: "",
  difficulty: "",
  time: "",
  servings: null,
  nutrients: [0, 0, 0],
  tags: [],
  categories: { ...defaultCategories },
  ingredients: [],
  instructions: [],
  tips: [],
  imageCategory: "bowl",
});

export const decodeRecipe = (value: unknown): RecipeData | null => {
  if (typeof value === "string") return emptyRecipe(value);
  if (!isRecord(value)) return null;

  const title = asString(value.title);
  if (!title) return null;

  const recipe: RecipeData = {
    ...emptyRecipe(title),
    responseRecipe: asString(value.responseRecipe),
    description: asString(value.description),
    difficulty: asString(value.difficulty),
    time: asString(value.time),
    servings: typeof value.servings === "number" ? value.servings : null,
    nutrients: asArray(value.nutrients, (item) =>
      typeof item === "number" ? item : null,
    ),
    tags: asStringArray(value.tags),
    categories: decodeCategories(value.categories),
    ingredients: asArray(value.ingredients, decodeIngredient),
    instructions: asArray(value.instructions, decodeInstruction),
    tips: asStringArray(value.tips),
    imageCategory: asString(value.imageCategory, "bowl"),
  };

  if (recipe.nutrients.length !== 3) recipe.nutrients = [0, 0, 0];
  if (typeof value.id === "string") recipe.id = value.id;
  if (typeof value.prompt === "string") recipe.prompt = value.prompt;

  return recipe;
};

export const decodeSavedRecipes = (value: unknown): RecipeData[] =>
  asArray(value, decodeRecipe);

export const readSavedRecipes = (): RecipeData[] =>
  readRecord(StorageKeys.savedRecipes, decodeSavedRecipes);

export const writeSavedRecipes = (recipes: RecipeData[]): void =>
  writeRecord(StorageKeys.savedRecipes, recipes);
