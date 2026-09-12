import { useMemo } from "react";
import type { PantryDetails } from "@/contexts/PantryDetails";
import { asArray, asString, isRecord } from "./decode";
import { decodeFood, dedupeFoods } from "./food";
import { StorageKeys } from "./keys";
import { readRecord, writeRecord } from "./mmkv";
import { useProfileName } from "./profile";

/** Final fallback, used when neither the pantry nor the profile is named. */
export const DEFAULT_PANTRY_NAME = "Your Pantry";

/**
 * An empty `name` means "the user never renamed this pantry", so the display
 * name falls back to the profile name. The fallback is derived on read rather
 * than written into the record — otherwise renaming the profile would leave a
 * stale "Bob's Pantry" behind.
 */
export const defaultPantry: PantryDetails = {
  name: "",
  icon: "",
  ingredients: [],
};

export const decodePantry = (value: unknown): PantryDetails => {
  if (!isRecord(value)) return { ...defaultPantry, ingredients: [] };

  return {
    name: asString(value.name),
    icon: asString(value.icon),
    // Heals records written before ingredient ids were unique.
    ingredients: dedupeFoods(asArray(value.ingredients, decodeFood)),
  };
};

export const readPantry = (): PantryDetails =>
  readRecord(StorageKeys.pantry, decodePantry);

export const writePantry = (pantry: PantryDetails): void =>
  writeRecord(StorageKeys.pantry, {
    ...pantry,
    ingredients: dedupeFoods(pantry.ingredients),
  });

/** The name to show when the pantry itself hasn't been renamed. */
export const defaultPantryNameFor = (profileName: string): string => {
  const owner = profileName.trim();
  return owner ? `${owner}'s Pantry` : DEFAULT_PANTRY_NAME;
};

export const derivePantryName = (
  customName: string,
  profileName: string,
): string => customName.trim() || defaultPantryNameFor(profileName);

/**
 * Reactive fallback name — re-renders when the profile name changes, so a
 * pantry the user never renamed follows their profile automatically.
 */
export const useDefaultPantryName = (): string => {
  const profileName = useProfileName();
  return useMemo(() => defaultPantryNameFor(profileName), [profileName]);
};

/** Reactive display name for a pantry whose stored (possibly empty) name is known. */
export const usePantryDisplayName = (customName: string): string => {
  const profileName = useProfileName();
  return useMemo(
    () => derivePantryName(customName, profileName),
    [customName, profileName],
  );
};
