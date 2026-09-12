import { asBoolean, isRecord } from "./decode";
import { StorageKeys } from "./keys";
import { readRecord, writeRecord } from "./mmkv";

export type StoredColorScheme = "light" | "dark" | null;

export type StoredPreferences = {
  colorScheme: StoredColorScheme;
  hasCompletedPantrySetup: boolean;
};

export const defaultPreferences: StoredPreferences = {
  colorScheme: null,
  hasCompletedPantrySetup: false,
};

export const decodePreferences = (value: unknown): StoredPreferences => {
  if (!isRecord(value)) return { ...defaultPreferences };

  const scheme = value.colorScheme;
  return {
    colorScheme: scheme === "light" || scheme === "dark" ? scheme : null,
    hasCompletedPantrySetup: asBoolean(value.hasCompletedPantrySetup),
  };
};

export const readPreferences = (): StoredPreferences =>
  readRecord(StorageKeys.preferences, decodePreferences);

export const writePreferences = (preferences: StoredPreferences): void =>
  writeRecord(StorageKeys.preferences, preferences);

const updatePreferences = (patch: Partial<StoredPreferences>): void =>
  writePreferences({ ...readPreferences(), ...patch });

export const readColorScheme = (): StoredColorScheme =>
  readPreferences().colorScheme;

export const writeColorScheme = (colorScheme: StoredColorScheme): void =>
  updatePreferences({ colorScheme });

export const hasCompletedPantrySetup = (): boolean =>
  readPreferences().hasCompletedPantrySetup;

export const setPantrySetupComplete = (complete = true): void =>
  updatePreferences({ hasCompletedPantrySetup: complete });
