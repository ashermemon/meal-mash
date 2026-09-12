import { useMemo } from "react";
import type { PantryDetails } from "@/contexts/PantryDetails";
import { asArray, asString, isRecord } from "./decode";
import { decodeFood, dedupeFoods } from "./food";
import { StorageKeys } from "./keys";
import { readRecord, writeRecord } from "./mmkv";
import { useProfileName } from "./profile";

export const DEFAULT_PANTRY_NAME = "Your Pantry";

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

export const defaultPantryNameFor = (profileName: string): string => {
  const owner = profileName.trim();
  return owner ? `${owner}'s Pantry` : DEFAULT_PANTRY_NAME;
};

export const derivePantryName = (
  customName: string,
  profileName: string,
): string => customName.trim() || defaultPantryNameFor(profileName);

export const useDefaultPantryName = (): string => {
  const profileName = useProfileName();
  return useMemo(() => defaultPantryNameFor(profileName), [profileName]);
};

export const usePantryDisplayName = (customName: string): string => {
  const profileName = useProfileName();
  return useMemo(
    () => derivePantryName(customName, profileName),
    [customName, profileName],
  );
};
