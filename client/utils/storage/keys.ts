export const SCHEMA_VERSION = 2;

export const StorageKeys = {
  schemaVersion: "mm.schemaVersion",
  profile: "mm.profile",
  preferences: "mm.preferences",
  pantry: "mm.pantry",
  savedRecipes: "mm.savedRecipes",
  groceryList: "mm.groceryList",
  groceryChecked: "mm.groceryChecked",
  stats: "mm.stats",
  achievements: "mm.achievements",
} as const;

export type StorageKey = (typeof StorageKeys)[keyof typeof StorageKeys];

export const LegacyKeys = {
  saves: "saves",
  savesNumber: "savesnumber",
  pantryNumber: "pantrynumber",
  mealsNumber: "mealsnumber",
  name: "name",
  isPantrySetup: "IS_PANTRY_SETUP",
  colorScheme: "colorScheme",
  unlockedAchievements: "unlockedAchievementIds",
  dessertRecipes: "achv_dessertRecipesGenerated",
  cuisines: "achv_cuisinesGenerated",
  mealsMade: "achv_mealsMadeCount",
  leftoverMealsMade: "achv_leftoverMealsMadeCount",
  streakCount: "achv_generationStreak",
  streakLastDate: "achv_generationStreakLastDate",
} as const;
