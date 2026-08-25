import { type RecipeData } from "@/contexts/RecipeContext";
import {
  readUnlockedAchievementIds,
  writeUnlockedAchievementIds,
  updateStats,
} from "@/utils/storage";

/**
 * Achievement rules. All persistence goes through the stats/achievements
 * stores — this module only owns the thresholds and the tracking logic.
 */

export const getUnlockedAchievementIds = (): string[] =>
  readUnlockedAchievementIds();

export const isAchievementUnlocked = (id: string): boolean =>
  getUnlockedAchievementIds().includes(id);

export const unlockAchievement = (id: string): string[] => {
  const unlockedIds = getUnlockedAchievementIds();
  if (unlockedIds.includes(id)) return unlockedIds;

  const updated = [...unlockedIds, id];
  writeUnlockedAchievementIds(updated);
  return updated;
};

const toLocalDateKey = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

const normalizeCuisine = (raw: string): string =>
  raw
    .replace(/[^\p{L}\s]/gu, "")
    .trim()
    .toLowerCase();

export const trackRecipeGenerated = (
  recipe: Pick<RecipeData, "categories">,
  cuisine: string | undefined,
) => {
  const today = new Date();
  const todayKey = toLocalDateKey(today);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayKey = toLocalDateKey(yesterday);

  const stats = updateStats((current) => {
    const next: Partial<typeof current> = {
      mealsGenerated: current.mealsGenerated + 1,
    };

    if (recipe.categories?.sweetTreats) {
      next.dessertRecipesGenerated = current.dessertRecipesGenerated + 1;
    }

    const normalizedCuisine = normalizeCuisine(cuisine ?? "");
    if (
      normalizedCuisine &&
      normalizedCuisine !== "any" &&
      !current.cuisinesGenerated.includes(normalizedCuisine)
    ) {
      next.cuisinesGenerated = [...current.cuisinesGenerated, normalizedCuisine];
    }

    if (current.generationStreakLastDate !== todayKey) {
      next.generationStreak =
        current.generationStreakLastDate === yesterdayKey
          ? current.generationStreak + 1
          : 1;
      next.generationStreakLastDate = todayKey;
    }

    return next;
  });

  if (stats.dessertRecipesGenerated >= 10) unlockAchievement("sweet-tooth");
  if (stats.cuisinesGenerated.length >= 5) unlockAchievement("world-tour");
  if (stats.generationStreak >= 7) unlockAchievement("on-fire");
  if (today.getHours() >= 22) unlockAchievement("late-night-snack");
};

export const trackMealMade = (recipe: Pick<RecipeData, "categories">) => {
  const stats = updateStats((current) => ({
    mealsMade: current.mealsMade + 1,
    ...(recipe.categories?.madeWithLeftovers
      ? { leftoverMealsMade: current.leftoverMealsMade + 1 }
      : {}),
  }));

  if (stats.mealsMade >= 1) unlockAchievement("first-mash");
  if (stats.mealsMade >= 100) unlockAchievement("century");
  if (recipe.categories?.madeWithLeftovers && stats.leftoverMealsMade >= 25) {
    unlockAchievement("leftover-legend");
  }
};

export const trackRecipeSaved = (savedCount: number) => {
  if (savedCount >= 50) unlockAchievement("the-cookbook");
};
