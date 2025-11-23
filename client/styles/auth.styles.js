import { NEWCOLORS } from "@/constants/newtheme";
import { COLORS } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 15,
  },
  ingredientContainer: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    alignSelf: "flex-start",
  },
  tipContainer: {
    flex: 1,

    marginVertical: 8,
    marginHorizontal: 25,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
    outlineColor: COLORS.tipOutline,
    outlineWidth: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",

    width: "100%",
  },
  text: {
    fontFamily: "Nunito-Regular",
    color: COLORS.fontColor,
    fontWeight: 500,
  },
  textCentered: {
    fontFamily: "Nunito-Regular",
    textAlign: "center",
    justifyContent: "center",

    color: COLORS.fontColor,
    fontWeight: 500,
  },
  nameInput: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "Nunito-Bold",
    color: COLORS.fontColor,
  },

  linkText: {
    fontFamily: "Nunito-SemiBold",
    textAlign: "center",
    justifyContent: "center",
    color: COLORS.blueLink,
  },
  linkTextG: {
    fontFamily: "Nunito-SemiBold",
    textAlign: "center",
    justifyContent: "center",
    color: COLORS.greenLink,
  },
  textLeft: {
    fontFamily: "Nunito-Regular",
    textAlign: "left",
    color: COLORS.fontColor,
  },
  textLeftSemiBold: {
    fontFamily: "Nunito-SemiBold",
    textAlign: "left",
    color: COLORS.fontColor,
  },
  textLeftBold: {
    fontFamily: "Nunito-Bold",
    textAlign: "left",
    color: COLORS.fontColor,
    fontSize: 17,
  },
  headerText: {
    fontFamily: "Nunito-Bold",
    textAlign: "center",
    fontSize: 18,

    fontWeight: 700,

    color: COLORS.fontColor,
  },
  headerContainer: {
    paddingVertical: 8,
    backgroundColor: COLORS.newHeader,
    margin: 0,
    width: "100%",
    borderColor: COLORS.newHeaderB,

    borderBottomWidth: 3,
  },
  generateButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  generateButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.blueHeader,
    borderColor: COLORS.blueHeaderBorder,
    borderWidth: 3,
    padding: 10,
    marginVertical: 10,
    height: 55,

    borderRadius: 10,
  },
  counterBtn: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: COLORS.greenButtonColor,
    borderColor: COLORS.greenButtonColorOuline,
    borderWidth: 3,

    marginTop: 20,

    height: 50,
    width: 100,

    borderRadius: 10,
  },
  generateButtonNew: {
    alignItems: "center",
    justifyContent: "center",

    borderWidth: 3,

    height: 50,
    width: 50,
    marginHorizontal: 5,

    borderRadius: 10,
  },
  errorText: {
    color: "red",
  },
  generatorContainer: {
    paddingVertical: 15,
    flex: 1,
    width: "100%",
    //backgroundColor: "white",
  },
  timer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 20,
    marginHorizontal: 25,
    backgroundColor: "white",
    outlineColor: COLORS.addButtonStroke,
    flex: 1,
    width: "100%",
    outlineWidth: 3,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    flexDirection: "row",
  },
  ingredientPanel: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  ingredientPanelFav: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },

  centeredBox: {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },

  addContainer: {
    alignItems: "center",
    backgroundColor: COLORS.addGrey,
    paddingVertical: 15,
    width: "100%",
    margin: 0,
    borderTopWidth: 3,
    borderBottomWidth: 3,
  },
  addButton: {
    alignItems: "center",
    backgroundColor: COLORS.addButtonColor,
    padding: 8,
    borderRadius: "100%",
    borderWidth: 3,
    borderColor: COLORS.addButtonStroke,
  },

  addBigContainer: {
    backgroundColor: "white",
    width: "100%",
    marginHorizontal: 0,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    marginBottom: 30,
  },
  addContainerHeader: {
    fontFamily: "Nunito-Bold",
    textAlign: "left",
    fontSize: 20,
    margin: 13,
    fontWeight: 700,

    color: COLORS.fontColor,
  },
  searchContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 7,
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: COLORS.searchGreyBorder,
  },
  searchWrap: {
    borderRadius: 30,
    justifyContent: "center",

    padding: 10,
    paddingBottom: 5,
    width: 300,
    zIndex: 100,
    height: 320,
    backgroundColor: COLORS.searchGreyBG,
    borderColor: COLORS.searchGreyBorder,
    borderWidth: 3,
    marginBottom: 50,
  },

  ingredientResult: {
    margin: 5,

    width: "100%",
    padding: 5,

    borderRadius: 50,
  },
  exitSearch: {
    backgroundColor: COLORS.deleteExitFill,
    width: 40,
    height: 40,
    borderRadius: "100%",
    borderWidth: 3,
    borderColor: COLORS.deleteExitStroke,

    justifyContent: "center",
    alignItems: "center",
  },

  searchContentContainer: {
    flex: 5,
    justifyContent: "center",
  },
  exitSearchContainer: {
    flex: 1,
  },
  modalWrap: {
    flex: 1,

    alignItems: "center",
  },
  nextButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDDDDD",
    width: 50,
    height: 50,
    borderRadius: "100%",
    backgroundColor: COLORS.greenButtonColor,
    borderColor: COLORS.greenButtonColorOuline,
    borderWidth: 3,
  },
  nextButtonEmpty: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDDDDD",
    width: 50,
    height: 50,
    borderRadius: "100%",
    backgroundColor: COLORS.addGrey,
    borderColor: COLORS.addButtonStroke,
    borderWidth: 3,
  },
  arrowButtons: {
    flexDirection: "row",
    width: "100%",
    paddingTop: 15,
    paddingHorizontal: 25,
    justifyContent: "space-between",
  },
  flexBTN: {
    alignItems: "center",
    justifyContent: "center",
  },
  flexMiddle: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  timerButton: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  timerButtons: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  spacer: {
    height: 20,
  },
  searchText: {
    fontFamily: "Nunito-Bold",
    textAlign: "left",
    zIndex: 500,
    color: COLORS.fontColor,
  },
  searchBar: {
    backgroundColor: COLORS.searchGreyBorder,
    paddingHorizontal: 10,
    minHeight: 40,
    justifyContent: "center",
    borderRadius: 50,
    flex: 1,
    marginLeft: 10,
  },
  ingredientEmoji: {
    width: 30,
    height: 30,
  },
  customEmoji: {
    width: 60,
    height: 60,
  },
  emojiWrapBig: {
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    width: 110,
    height: 110,
    borderRadius: 100,
    marginTop: 15,
  },
  ingredientFlex: {
    flex: 1,
    padding: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  ingredientFlexEmoji: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  emojiWrap: {
    borderWidth: 3,
    padding: 10,
    borderRadius: 100,
  },

  emojiWrapCard: {
    borderWidth: 3,
    padding: 10,
    borderRadius: 100,
    marginLeft: 15,
    marginRight: 10,
  },
  ingredientFlexCard: {
    padding: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  favFlex: {
    flex: 1,
    paddingRight: 25,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  ingredientFlexEmojiCard: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  addContainerIngredient: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",

    borderRightColor: COLORS.favoriteColor,
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 0.1,
    paddingVertical: 15,
    width: "100%",
    margin: 0,
    borderTopWidth: 3,
  },
  favoritedContainer: {
    borderWidth: 3,
    backgroundColor: "white",

    borderRadius: 30,

    paddingVertical: 15,
    width: "100%",
    marginTop: 10,
  },
  favRecipe: {
    borderColor: COLORS.genBorder,
    borderWidth: 3,
    backgroundColor: "white",

    borderRadius: 30,

    paddingVertical: 15,
    width: "100%",
    marginTop: 10,
  },
  nutrientCircle: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 8,
    marginVertical: 20,
  },
  legendBox: {
    height: 18,
    width: 18,
    marginRight: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  textLegend: {
    fontFamily: "Nunito-SemiBold",
    color: COLORS.fontColor,

    fontSize: 16,
    alignItems: "center",
  },
  customButton: {
    alignItems: "center",
    justifyContent: "center",

    borderWidth: 3,
    padding: 2,
    borderRadius: 100,
  },
  swipeable: {
    backgroundColor: COLORS.discardColor,
    justifyContent: "center",
    alignItems: "center",
    width: 85,
    height: "100%",
    margin: 0,
  },
  swipeableSave: {
    backgroundColor: COLORS.favoriteColor,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    height: "100%",
    margin: 0,
  },
  favSave: {
    justifyContent: "center",
    alignItems: "center",
    width: 85,
  },
  deleteText: {
    fontFamily: "Nunito-Bold",
    textAlign: "center",
    justifyContent: "center",

    color: "white",
  },
  saveText: {
    fontFamily: "Nunito-Bold",
    textAlign: "center",
    justifyContent: "center",

    color: COLORS.fontColor,
  },
  customHeadText: {
    fontFamily: "Nunito-Bold",
    color: COLORS.fontColor,

    marginVertical: 10,
    fontSize: 18,
  },
  profileHeader: {
    backgroundColor: COLORS.greenButtonColor,

    width: "100%",
    borderColor: COLORS.greenButtonColorOuline,

    borderBottomWidth: 10,

    flexDirection: "row",
    justifyContent: "space-between",
  },
  pfp: {
    height: 90,
    width: 90,
    backgroundColor: COLORS.addPlusGrey,
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 200,
  },
  safearea: {
    flex: 1,
    backgroundColor: COLORS.blueHeader,
  },
  body: {
    flex: 1,
    backgroundColor: "red",
    padding: 20,
    margin: 15,
    borderRadius: 8,
  },
  checkbox: {
    padding: 10,
    outlineColor: COLORS.blueHeaderBorder,
    outlineWidth: 2,
    backgroundColor: COLORS.blueHeader,
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
  recipeMovement: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 25,
    marginTop: 10,
  },
  overviewBoxes: {
    alignItems: "center",

    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    flex: 1,

    borderWidth: 3,
    marginVertical: 20,
    marginHorizontal: 10,
  },

  dropdownWrap: {
    borderRadius: 30,
    justifyContent: "center",

    padding: 10,

    zIndex: 100,

    backgroundColor: COLORS.searchGreyBG,
    borderColor: COLORS.searchGreyBorder,
    borderWidth: 3,
    marginTop: 100,
  },

  // --------------------------------------------//

  // New Styles Below
  homeBlock: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: NEWCOLORS.greyBlock,
    padding: 10,
    borderRadius: 10,
  },
  circleButton: {
    backgroundColor: NEWCOLORS.darkButton,
    borderRadius: 100,
  },
  recipeBar: {
    height: 46,
    borderRadius: 400,
    padding: 5,
    width: "100%",
    backgroundColor: NEWCOLORS.greyBlock,
    marginTop: 5,
    marginBottom: 10,

    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  basicBoxShadow: {
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
  },
  basicTextCenter: {
    fontFamily: "Nunito-Regular",
    textAlign: "center",
    justifyContent: "center",

    color: COLORS.fontColor,
  },
  basicTextLeft: {
    fontFamily: "Nunito-Regular",
    textAlign: "left",

    color: COLORS.fontColor,
  },
  bold: {
    fontFamily: "Nunito-Bold",
  },
  sectionalWrapper: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  categoriesSlider: {
    marginVertical: 5,
  },
  paddingOnlyWrapper: {
    marginVertical: 10,
  },
});
