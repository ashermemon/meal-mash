import { storage } from "@/utils/storage";
import { type RecipeData } from "@/contexts/RecipeContext";

const UNLOCKED_ACHIEVEMENTS_KEY = "unlockedAchievementIds";
const DESSERT_RECIPES_KEY = "achv_dessertRecipesGenerated";
const CUISINES_KEY = "achv_cuisinesGenerated";
const MEALS_MADE_KEY = "achv_mealsMadeCount";
const LEFTOVER_MEALS_MADE_KEY = "achv_leftoverMealsMadeCount";
const STREAK_COUNT_KEY = "achv_generationStreak";
const STREAK_LAST_DATE_KEY = "achv_generationStreakLastDate";

export const getUnlockedAchievementIds = (): string[] => {
  const stored = storage.getString(UNLOCKED_ACHIEVEMENTS_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
};

export const isAchievementUnlocked = (id: string): boolean =>
  getUnlockedAchievementIds().includes(id);

export const unlockAchievement = (id: string): string[] => {
  const unlockedIds = getUnlockedAchievementIds();
  if (unlockedIds.includes(id)) return unlockedIds;

  const updated = [...unlockedIds, id];
  storage.set(UNLOCKED_ACHIEVEMENTS_KEY, JSON.stringify(updated));
  return updated;
};

const getStringArray = (key: string): string[] => {
  const stored = storage.getString(key);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
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
  if (recipe.categories?.sweetTreats) {
    const count = (storage.getNumber(DESSERT_RECIPES_KEY) ?? 0) + 1;
    storage.set(DESSERT_RECIPES_KEY, count);
    if (count >= 10) unlockAchievement("sweet-tooth");
  }

  const normalizedCuisine = normalizeCuisine(cuisine ?? "");
  if (normalizedCuisine && normalizedCuisine !== "any") {
    const cuisines = getStringArray(CUISINES_KEY);
    if (!cuisines.includes(normalizedCuisine)) {
      const updated = [...cuisines, normalizedCuisine];
      storage.set(CUISINES_KEY, JSON.stringify(updated));
      if (updated.length >= 5) unlockAchievement("world-tour");
    }
  }

  if (new Date().getHours() >= 22) {
    unlockAchievement("late-night-snack");
  }

  const today = new Date();
  const todayKey = toLocalDateKey(today);
  const lastDateKey = storage.getString(STREAK_LAST_DATE_KEY);
  if (lastDateKey !== todayKey) {
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const isConsecutive = lastDateKey === toLocalDateKey(yesterday);
    const streak = isConsecutive
      ? (storage.getNumber(STREAK_COUNT_KEY) ?? 0) + 1
      : 1;
    storage.set(STREAK_COUNT_KEY, streak);
    storage.set(STREAK_LAST_DATE_KEY, todayKey);
    if (streak >= 7) unlockAchievement("on-fire");
  }
};

export const trackMealMade = (recipe: Pick<RecipeData, "categories">) => {
  const count = (storage.getNumber(MEALS_MADE_KEY) ?? 0) + 1;
  storage.set(MEALS_MADE_KEY, count);

  if (count >= 1) unlockAchievement("first-mash");
  if (count >= 100) unlockAchievement("century");

  if (recipe.categories?.madeWithLeftovers) {
    const leftoverCount = (storage.getNumber(LEFTOVER_MEALS_MADE_KEY) ?? 0) + 1;
    storage.set(LEFTOVER_MEALS_MADE_KEY, leftoverCount);
    if (leftoverCount >= 25) unlockAchievement("leftover-legend");
  }
};

export const trackRecipeSaved = (savedCount: number) => {
  if (savedCount >= 50) unlockAchievement("the-cookbook");
};
