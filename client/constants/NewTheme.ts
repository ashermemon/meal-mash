export const NEWCOLORS = {
  backgroundColor: "#FFF8ED",
  sheetBackgroundColor: "#FFFDF7",

  primary: "#6B5D50",
  primaryDark: "#4A3F35",

  blueBlock: "#c3e5f4",
  orangeBlock: "#ffcd98",
  yellowBlock: "#ffdd98",
  greenBlock: "#b6ecbd",
  purpblueBlock: "#c5c3f0",
  greyBlock: "#FFFCF5",
  redBlock: "#f7c6c5",

  darkButton: "#685b51",

  placeholderText: "#79746C",
  basicText: "#3A3532",

  lightGrey: "#E9E4DA",
  unselectedGrey: "#F3EEE4",
  unselectedShape: "#D6CFC0",
  dividerGrey: "#DED5C7",
  dividerGrey2: "#EFE9DD",

  greenAccent: "#16A34A",
  blueAccent: "#2563EB",
  yellowAccent: "#D97706",
  orangeAccent: "#EA580C",
  redAccent: "#EF4444",

  secondaryBoxGrey: "#F5F0E6",
  nestedBG: "#FFFEFA",
  cardWhite: "#FFFCF6",
  stepCircle: "#82C98C",
  tipBadgeBg: "#F0BE47",

  pillX: "#A39C8F",

  pureWhite: "#FFFFFF",
} as const;

export const DARK_NEWCOLORS: Record<keyof typeof NEWCOLORS, string> = {
  backgroundColor: "#1C1A17",
  sheetBackgroundColor: "#242220",

  primary: "#4A443C",
  primaryDark: "#5A5348",

  blueBlock: "#1F3A47",
  orangeBlock: "#4A3222",
  yellowBlock: "#4A3E1C",
  greenBlock: "#22402A",
  purpblueBlock: "#2B2A4A",
  greyBlock: "#2A2724",
  redBlock: "#4A2323",

  darkButton: "#4A443C",

  placeholderText: "#9C9488",
  basicText: "#F2ECE0",

  lightGrey: "#33302B",
  unselectedGrey: "#2A2723",
  unselectedShape: "#4A453D",
  dividerGrey: "#3A3A3D",
  dividerGrey2: "#302D28",

  greenAccent: "#22A363",
  blueAccent: "#3B6FD9",
  yellowAccent: "#C2850C",
  orangeAccent: "#D9600F",
  redAccent: "#FF6B6B",

  secondaryBoxGrey: "#252220",
  nestedBG: "#211F1C",
  cardWhite: "#2B2825",
  stepCircle: "#2E5C3B",
  tipBadgeBg: "#D9A93A",

  pillX: "#8A8378",

  pureWhite: "#FFFFFF",
} as const;
