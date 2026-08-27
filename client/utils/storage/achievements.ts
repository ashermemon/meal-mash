import { useMemo } from "react";
import { useMMKVString } from "react-native-mmkv";
import { asStringArray, isRecord } from "./decode";
import { StorageKeys } from "./keys";
import { readRecord, safeParse, storage, writeRecord } from "./mmkv";

export type StoredAchievements = {
  unlockedIds: string[];
};

export const defaultAchievements: StoredAchievements = { unlockedIds: [] };

export const decodeAchievements = (value: unknown): StoredAchievements => ({
  unlockedIds: isRecord(value) ? asStringArray(value.unlockedIds) : [],
});

export const readAchievements = (): StoredAchievements =>
  readRecord(StorageKeys.achievements, decodeAchievements);

export const writeAchievements = (achievements: StoredAchievements): void =>
  writeRecord(StorageKeys.achievements, achievements);

export const readUnlockedAchievementIds = (): string[] =>
  readAchievements().unlockedIds;

export const writeUnlockedAchievementIds = (unlockedIds: string[]): void =>
  writeAchievements({ unlockedIds });

export const useUnlockedAchievementIds = (): string[] => {
  const [raw] = useMMKVString(StorageKeys.achievements, storage);
  return useMemo(() => decodeAchievements(safeParse(raw)).unlockedIds, [raw]);
};
