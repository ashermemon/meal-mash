var hsl = require("hsl-to-hex");

var sat = 85;
var lightness = 90;
export const COLORS = {
  navPrimary: "#5FCB77",
  navSecondary: "#2FA857",
  navSelected: "#DFF6DA",
  navUnselected: "#F7F7F7",
  navBG: "#FFFFFF",
  navBorder: "#A3A3A3",
  navGenBg: "#F0D9FF",
  navGenBorder: "#C79EEA",

  blueHeader: "#DCEFFF",
  blueHeaderBorder: "#7EC1FF",

  newHeader: "#F6F6F6",
  newHeaderB: "#D1D1D1",

  fontColor: "#3A3532",
  searchPlaceholder: "#8A8378",
  addGrey: "#F3EEE4",
  addButtonColor: "#E9E2D3",
  addButtonStroke: "#D8CFBC",

  ingredientContainerOutline: "#8FDD9E",
  leftoverContainerOutline: "#7EC1FF",
  addPlusGrey: "#A39A89",

  searchGreyBG: "#F0EADD",
  searchGreyBorder: "#D8CFBC",
  searchGreyPicker: "#FBF8F2",

  deleteExitStroke: "#F0A3A3",
  deleteExitFill: "#FFE5E5",

  greenButtonColorOuline: "#8FDD9E",
  greenButtonColor: "#DFF6DA",

  blueLink: "#3D63FF",
  greenLink: "#1E9E44",

  ncBG: "#FBF8F2",

  deleteBorder: "#F0A3A3",
  deleteFill: "#FFE5E5",
  saveBorder: "#7EC1FF",
  saveFill: "#DCEFFF",
  genBorder: "#C79EEA",
  genFill: "#F0D9FF",

  favoriteColor: "#FFC22E",
  discardColor: "#FF4D4D",

  cat1: hsl(105, sat, lightness),
  cat2: hsl(195, sat, lightness),
  cat3: hsl(275, sat, lightness),
  cat4: hsl(20, sat, lightness),
  cat5: hsl(300, sat, lightness),
  cat6: hsl(150, sat, lightness),
  cat7: hsl(220, sat, lightness),
  cat8: hsl(360, sat, lightness),
  cat9: hsl(50, sat, lightness),
  cat10: hsl(170, sat, lightness),
  cat11: hsl(60, sat, lightness),
  cat12: hsl(250, sat, lightness),
  cat13: hsl(100, sat, lightness),

  greenProgressBar: "#2FAE5C",
  tipOutline: "#F0B15E",
  greyBtns: "#8A8378",
  outlineProgress: "#8FDD9E",
} as const;
