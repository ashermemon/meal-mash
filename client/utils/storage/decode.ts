export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const asString = (value: unknown, fallback = ""): string =>
  typeof value === "string" ? value : fallback;

export const asNumber = (value: unknown, fallback = 0): number =>
  typeof value === "number" && Number.isFinite(value) ? value : fallback;

export const asBoolean = (value: unknown, fallback = false): boolean =>
  typeof value === "boolean" ? value : fallback;

export const asArray = <T>(
  value: unknown,
  decodeItem: (item: unknown) => T | null,
): T[] =>
  Array.isArray(value)
    ? value
        .map(decodeItem)
        .filter((item): item is T => item !== null && item !== undefined)
    : [];

export const asStringArray = (value: unknown): string[] =>
  asArray(value, (item) => (typeof item === "string" ? item : null));
