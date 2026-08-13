export const NEWCOLORS = {
  backgroundColor: "#FFF8ED",
  sheetBackgroundColor: "#FFFDF7",

  primary: "#3A3532",
  primaryDark: "#242019",

  blueBlock: "rgb(210, 238, 255)",
  orangeBlock: "rgb(255, 194, 145)",
  yellowBlock: "rgb(255, 223, 150)",
  greenBlock: "rgb(197, 244, 187)",
  purpblueBlock: "#E3E4FF",
  greyBlock: "#FEFEFE",
  redBlock: "#facdcd",

  darkButton: "#3A3532",

  placeholderText: "#79746C",
  basicText: "#3A3532",

  lightGrey: "#E9E4DA",
  unselectedGrey: "#F3EEE4",
  unselectedShape: "#D6CFC0",
  dividerGrey: "#d1d1d6",
  dividerGrey2: "#EFE9DD",

  greenAccent: "#1FAE5C",
  blueAccent: "#6fadec",
  yellowAccent: "#e4ae0b",
  orangeAccent: "#ffae00",
  redAccent: "#EF4444",

  secondaryBoxGrey: "#F5F0E6",
  nestedBG: "#FFFEFA",
  cardWhite: "#FFFFFF",
  stepCircle: "#B7ECC0",
  tipBadgeBg: "#FFCE54",

  pillX: "#A39C8F",

  // Constant — does not flip with theme. For text/icons that sit on a
  // colored accent surface (buttons, badges, image scrims) that stays
  // roughly as dark/saturated in both themes.
  pureWhite: "#FFFFFF",
} as const;

export const DARK_NEWCOLORS: Record<keyof typeof NEWCOLORS, string> = {
  backgroundColor: "#1C1A17",
  sheetBackgroundColor: "#242220",

  // Kept dark (not inverted to light) so it reads as an elevated dark
  // surface against the dark background, same role it plays in light
  // mode — this keeps white icon/text foregrounds on it readable.
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

  greenAccent: "#3DDC84",
  blueAccent: "#7FB8FF",
  yellowAccent: "#F4C430",
  orangeAccent: "#FFB84D",
  redAccent: "#FF6B6B",

  secondaryBoxGrey: "#252220",
  nestedBG: "#211F1C",
  cardWhite: "#2B2825",
  stepCircle: "#2E5C3B",
  tipBadgeBg: "#D9A93A",

  pillX: "#8A8378",

  pureWhite: "#FFFFFF",
} as const;
