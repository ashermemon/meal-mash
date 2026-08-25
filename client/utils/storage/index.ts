import { SCHEMA_VERSION, StorageKeys } from "./keys";
import { storage } from "./mmkv";
import { runMigrations } from "./migrations";

runMigrations();

export { storage, safeParse } from "./mmkv";
export { SCHEMA_VERSION, StorageKeys, type StorageKey } from "./keys";

export { decodeFood, dedupeFoods, ingredientKey } from "./food";

export {
  readProfile,
  writeProfile,
  readProfileName,
  writeProfileName,
  useProfileName,
  defaultProfile,
  type StoredProfile,
} from "./profile";

export {
  readPreferences,
  writePreferences,
  readColorScheme,
  writeColorScheme,
  hasCompletedPantrySetup,
  setPantrySetupComplete,
  defaultPreferences,
  type StoredPreferences,
  type StoredColorScheme,
} from "./preferences";

export {
  readPantry,
  writePantry,
  defaultPantry,
  DEFAULT_PANTRY_NAME,
  useDefaultPantryName,
  usePantryDisplayName,
} from "./pantry";

export {
  readSavedRecipes,
  writeSavedRecipes,
  decodeSavedRecipes,
} from "./savedRecipes";

export {
  readGroceryList,
  writeGroceryList,
  readCheckedGroceryList,
  writeCheckedGroceryList,
} from "./grocery";

export {
  readStats,
  writeStats,
  updateStats,
  useStats,
  defaultStats,
  type StoredStats,
} from "./stats";

export {
  readAchievements,
  writeAchievements,
  readUnlockedAchievementIds,
  writeUnlockedAchievementIds,
  useUnlockedAchievementIds,
  defaultAchievements,
  type StoredAchievements,
} from "./achievements";

export const resetAllData = (): void => {
  storage.clearAll();
  storage.set(StorageKeys.schemaVersion, SCHEMA_VERSION);
};
