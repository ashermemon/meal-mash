import { useMemo } from "react";
import { useMMKVString } from "react-native-mmkv";
import { asString, isRecord } from "./decode";
import { StorageKeys } from "./keys";
import { readRecord, safeParse, storage, writeRecord } from "./mmkv";

export type StoredProfile = {
  name: string;
};

export const defaultProfile: StoredProfile = { name: "" };

export const decodeProfile = (value: unknown): StoredProfile =>
  isRecord(value) ? { name: asString(value.name) } : { ...defaultProfile };

export const readProfile = (): StoredProfile =>
  readRecord(StorageKeys.profile, decodeProfile);

export const writeProfile = (profile: StoredProfile): void =>
  writeRecord(StorageKeys.profile, profile);

export const readProfileName = (): string => readProfile().name;

export const writeProfileName = (name: string): void =>
  writeProfile({ ...readProfile(), name });

/** Reactive profile name — re-renders anywhere the name is written. */
export const useProfileName = (): string => {
  const [raw] = useMMKVString(StorageKeys.profile, storage);
  return useMemo(() => decodeProfile(safeParse(raw)).name, [raw]);
};
