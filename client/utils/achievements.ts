import { storage } from "@/utils/storage";

const UNLOCKED_ACHIEVEMENTS_KEY = "unlockedAchievementIds";

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
