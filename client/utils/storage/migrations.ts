import { writeUnlockedAchievementIds } from "./achievements";
import { asStringArray } from "./decode";
import { LegacyKeys, SCHEMA_VERSION, StorageKeys } from "./keys";
import { safeParse, storage } from "./mmkv";
import { DEFAULT_PANTRY_NAME, readPantry, writePantry } from "./pantry";
import { writePreferences, type StoredColorScheme } from "./preferences";
import { writeProfileName } from "./profile";
import { decodeSavedRecipes, writeSavedRecipes } from "./savedRecipes";
import { defaultStats, writeStats } from "./stats";

/**
 * Pre-v1 the app wrote a loose set of top-level keys. Fold whatever an existing
 * install has into the structured records, then drop the old keys.
 */
const migrateToV1 = (): void => {
  const legacySaves = storage.getString(LegacyKeys.saves);
  if (legacySaves) {
    writeSavedRecipes(decodeSavedRecipes(safeParse(legacySaves)));
  }

  const legacyName = storage.getString(LegacyKeys.name);
  if (legacyName) writeProfileName(legacyName);

  const legacyScheme = storage.getString(LegacyKeys.colorScheme);
  const colorScheme: StoredColorScheme =
    legacyScheme === "light" || legacyScheme === "dark" ? legacyScheme : null;
  const hasCompletedPantrySetup =
    storage.getBoolean(LegacyKeys.isPantrySetup) === true;
  if (colorScheme !== null || hasCompletedPantrySetup) {
    writePreferences({ colorScheme, hasCompletedPantrySetup });
  }

  const legacyUnlocked = storage.getString(LegacyKeys.unlockedAchievements);
  if (legacyUnlocked) {
    writeUnlockedAchievementIds(asStringArray(safeParse(legacyUnlocked)));
  }

  const legacyCuisines = storage.getString(LegacyKeys.cuisines);
  const stats = {
    ...defaultStats,
    mealsGenerated: storage.getNumber(LegacyKeys.mealsNumber) ?? 0,
    mealsMade: storage.getNumber(LegacyKeys.mealsMade) ?? 0,
    leftoverMealsMade: storage.getNumber(LegacyKeys.leftoverMealsMade) ?? 0,
    dessertRecipesGenerated: storage.getNumber(LegacyKeys.dessertRecipes) ?? 0,
    cuisinesGenerated: legacyCuisines
      ? asStringArray(safeParse(legacyCuisines))
      : [],
    generationStreak: storage.getNumber(LegacyKeys.streakCount) ?? 0,
    generationStreakLastDate:
      storage.getString(LegacyKeys.streakLastDate) ?? null,
  };
  const hasStats =
    stats.mealsGenerated > 0 ||
    stats.mealsMade > 0 ||
    stats.leftoverMealsMade > 0 ||
    stats.dessertRecipesGenerated > 0 ||
    stats.cuisinesGenerated.length > 0 ||
    stats.generationStreak > 0;
  if (hasStats) writeStats(stats);

  // `savesnumber` / `pantrynumber` are intentionally not carried over: they are
  // derived from the saved-recipe and pantry records now.
  Object.values(LegacyKeys).forEach((key) => storage.delete(key));
};

/**
 * v1 stored the literal "Your Pantry" as the pantry name. v2 stores an empty
 * name for a pantry the user never renamed, so the display name can fall back
 * to the profile name instead.
 */
const migrateToV2 = (): void => {
  if (!storage.contains(StorageKeys.pantry)) return;

  const pantry = readPantry();
  if (pantry.name === DEFAULT_PANTRY_NAME) {
    writePantry({ ...pantry, name: "" });
  }
};

/**
 * Runs synchronously on first import of the storage module, before any screen
 * reads state, so consumers only ever see current-schema records.
 */
export const runMigrations = (): void => {
  const version = storage.getNumber(StorageKeys.schemaVersion) ?? 0;
  if (version >= SCHEMA_VERSION) return;

  try {
    if (version < 1) migrateToV1();
    if (version < 2) migrateToV2();
  } catch (error) {
    console.error("[storage] Migration failed", error);
  }

  storage.set(StorageKeys.schemaVersion, SCHEMA_VERSION);
};
