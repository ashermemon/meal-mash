var hsl = require("hsl-to-hex");

var sat = 80;
var lightness = 97;
export const COLORS = {
  navPrimary: "#9FCEA4",
  navSecondary: "#6BBA83",
  navSelected: "#E7FFE3",
  navUnselected: "#F7F7F7",
  navBG: "#FFFFFF",
  navBorder: "#A3A3A3",
  navGenBg: "#F6E3FF",
  navGenBorder: "#CBAFDF",

  blueHeader: "#F0F9FE",
  blueHeaderBorder: "#ACD3FF",

  newHeader: "#F6F6F6",
  newHeaderB: "#D1D1D1",

  fontColor: "#39393A",
  searchPlaceholder: "#898989",
  addGrey: "#EFEFEF",
  addButtonColor: "#E0E0E0",
  addButtonStroke: "#D6D6D6",

  ingredientContainerOutline: "#B0E1B9",
  leftoverContainerOutline: "#ACD3FF",
  addPlusGrey: "#A3A3A3",

  searchGreyBG: "#E4E4E4",
  searchGreyBorder: "#C5C5C5",
  searchGreyPicker: "#FAFAFA",

  deleteExitStroke: "#E1B0B1",
  deleteExitFill: "#FEF0F0",

  greenButtonColorOuline: "#B0E1B9",
  greenButtonColor: "#F1FEF0",

  blueLink: "#496DDB",
  greenLink: "#306B34",

  ncBG: "#FAFAFA",

  deleteBorder: "#E1B0B1",
  deleteFill: "#FEF0F0",
  saveBorder: "#ACD3FF",
  saveFill: "#F0F9FE",
  genBorder: "#CBAFDF",
  genFill: "#F6E3FF",

  favoriteColor: "#FBC02D",
  discardColor: "#FF5252",

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

  greenProgressBar: "#6BBA83",
} as const;
