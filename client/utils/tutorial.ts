import {
  hasCompletedPantrySetup,
  hasSeenTutorial,
  readSavedRecipes,
  readStats,
} from "@/utils/storage";

export const shouldShowTutorial = (): boolean =>
  !hasSeenTutorial() &&
  !hasCompletedPantrySetup() &&
  readStats().mealsGenerated === 0 &&
  readSavedRecipes().length === 0;
