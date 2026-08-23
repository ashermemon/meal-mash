import { type RecipeData } from "@/contexts/RecipeContext";

/**
 * Shared bits of state the saved cards use to coordinate their enter/exit
 * animations with the lists that render them.
 *
 * Cards only animate in when something explicitly asks for it (a new search, an
 * undo). Cards that mount because the list scrolled them into view are left
 * alone, so flicking through the list never fades rows in.
 */

const ENTRANCE_WINDOW_MS = 400;

let entranceWindowClosesAt = 0;

export function recipeKey(recipe: RecipeData): string {
  return recipe?.id ?? recipe?.title ?? "";
}

/** Cards mounted in the next few frames fade in (used when search results change). */
export function openEntranceWindow(duration = ENTRANCE_WINDOW_MS) {
  entranceWindowClosesAt = Date.now() + duration;
}

export function isEntranceWindowOpen(): boolean {
  return Date.now() < entranceWindowClosesAt;
}

/**
 * Height of a card that is about to be put back into a list, so the card can
 * expand from nothing instead of popping in at full size.
 */
const restoreHeights = new Map<string, number>();

export function markPendingRestore(key: string, height: number) {
  if (key && height > 0) {
    restoreHeights.set(key, height);
  }
}

export function consumePendingRestore(key: string): number | undefined {
  const height = restoreHeights.get(key);
  if (height !== undefined) {
    restoreHeights.delete(key);
  }
  return height;
}
