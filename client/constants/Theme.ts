export const COLORS = {
  newHeader: "#FBF5EA",

  fontColor: "#3A3532",
  searchPlaceholder: "#8A8378",
  addButtonStroke: "#D8CFBC",

  addPlusGrey: "#A39A89",

  greyBtns: "#8A8378",
} as const;

export const DARK_COLORS: Record<keyof typeof COLORS, string> = {
  newHeader: "#242424",

  fontColor: "#F2ECE0",
  searchPlaceholder: "#A79F92",
  addButtonStroke: "#4A453D",

  addPlusGrey: "#8A8378",

  greyBtns: "#A79F92",
};
