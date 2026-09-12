import type { Food } from "@/components/features/pantry/Search";
import { asArray } from "./decode";
import { decodeFood } from "./food";
import { StorageKeys } from "./keys";
import { readRecord, writeRecord } from "./mmkv";

export const decodeFoodList = (value: unknown): Food[] =>
  asArray(value, decodeFood);

export const readGroceryList = (): Food[] =>
  readRecord(StorageKeys.groceryList, decodeFoodList);

export const writeGroceryList = (items: Food[]): void =>
  writeRecord(StorageKeys.groceryList, items);

export const readCheckedGroceryList = (): Food[] =>
  readRecord(StorageKeys.groceryChecked, decodeFoodList);

export const writeCheckedGroceryList = (items: Food[]): void =>
  writeRecord(StorageKeys.groceryChecked, items);
