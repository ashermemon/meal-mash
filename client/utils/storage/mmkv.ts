import { MMKV } from "react-native-mmkv";
import type { StorageKey } from "./keys";

export const storage = new MMKV();

export function safeParse(raw: string | undefined): unknown {
  if (!raw) return undefined;
  try {
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

export function readRecord<T>(
  key: StorageKey,
  decode: (value: unknown) => T,
): T {
  const raw = storage.getString(key);
  try {
    return decode(safeParse(raw));
  } catch (error) {
    console.warn(`[storage] Discarding unreadable record at "${key}"`, error);
    storage.delete(key);
    return decode(undefined);
  }
}

export function writeRecord<T>(key: StorageKey, value: T): void {
  try {
    storage.set(key, JSON.stringify(value));
  } catch (error) {
    console.error(`[storage] Failed to write record at "${key}"`, error);
  }
}

export function deleteRecord(key: StorageKey): void {
  storage.delete(key);
}
