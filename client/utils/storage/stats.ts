import { useMemo } from "react";
import { useMMKVString } from "react-native-mmkv";
import { asNumber, asStringArray, isRecord } from "./decode";
import { StorageKeys } from "./keys";
import { readRecord, safeParse, storage, writeRecord } from "./mmkv";

export type StoredStats = {
  mealsGenerated: number;
  mealsMade: number;
  leftoverMealsMade: number;
  dessertRecipesGenerated: number;

  cuisinesGenerated: string[];
  generationStreak: number;

  generationStreakLastDate: string | null;
};

export const defaultStats: StoredStats = {
  mealsGenerated: 0,
  mealsMade: 0,
  leftoverMealsMade: 0,
  dessertRecipesGenerated: 0,
  cuisinesGenerated: [],
  generationStreak: 0,
  generationStreakLastDate: null,
};

export const decodeStats = (value: unknown): StoredStats => {
  if (!isRecord(value)) return { ...defaultStats, cuisinesGenerated: [] };

  return {
    mealsGenerated: asNumber(value.mealsGenerated),
    mealsMade: asNumber(value.mealsMade),
    leftoverMealsMade: asNumber(value.leftoverMealsMade),
    dessertRecipesGenerated: asNumber(value.dessertRecipesGenerated),
    cuisinesGenerated: asStringArray(value.cuisinesGenerated),
    generationStreak: asNumber(value.generationStreak),
    generationStreakLastDate:
      typeof value.generationStreakLastDate === "string"
        ? value.generationStreakLastDate
        : null,
  };
};

export const readStats = (): StoredStats =>
  readRecord(StorageKeys.stats, decodeStats);

export const writeStats = (stats: StoredStats): void =>
  writeRecord(StorageKeys.stats, stats);

export const updateStats = (
  mutate: (stats: StoredStats) => Partial<StoredStats>,
): StoredStats => {
  const current = readStats();
  const next = { ...current, ...mutate(current) };
  writeStats(next);
  return next;
};

export const useStats = (): StoredStats => {
  const [raw] = useMMKVString(StorageKeys.stats, storage);
  return useMemo(() => decodeStats(safeParse(raw)), [raw]);
};

//use the image fade in transition on all images including 3d icons, just so when they load in, they do so with a brief fade in. Or like preload them idk something like that.
