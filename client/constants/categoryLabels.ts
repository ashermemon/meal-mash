const CATEGORY_DISPLAY_LABELS: Record<string, string> = {
  Prepared: "Prepared/Leftover",
};

export const getCategoryDisplayLabel = (category: string): string =>
  CATEGORY_DISPLAY_LABELS[category] ?? category;
