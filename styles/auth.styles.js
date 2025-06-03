import { COLORS } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 15,
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
    fontSize: 25,

    fontWeight: 700,

    color: COLORS.fontColor,
  },
  headerContainer: {
    paddingVertical: 20,
    backgroundColor: COLORS.blueHeader,
    margin: 0,
    width: "100%",
    borderColor: COLORS.blueHeaderBorder,

    borderBottomWidth: 10,
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
  },
  timer: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  ingredientPanel: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
  },

  centeredBox: {
    justifyContent: "center",
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
    alignSelf: "center",
    paddingBottom: 7,
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: COLORS.searchGreyBorder,
  },
  searchWrap: {
    borderRadius: 30,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
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
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
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
    width: 60,
    height: 60,
    borderRadius: "100%",
    backgroundColor: COLORS.greenButtonColor,
    borderColor: COLORS.greenButtonColorOuline,
    borderWidth: 3,
  },
  arrowButtons: {
    flexDirection: "row",
    width: "100%",
    paddingTop: 10,
    justifyContent: "center",
    position: "relative",
    bottom: 0,
    margin: 0,
  },
  flexBTN: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  flexMiddle: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  timerButton: {
    alignItems: "center",
    justifyContent: "center",

    width: 50,
    height: 50,
    borderRadius: "100%",

    alignItems: "center",
    backgroundColor: COLORS.blueHeader,
    borderColor: COLORS.blueHeaderBorder,
    borderWidth: 3,
    padding: 10,
  },
  timerButtons: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  timerMiddle: {
    flex: 3,
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
    flex: 1,

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
    marginRight: 5,
  },
  ingredientFlexCard: {
    flex: 6,
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

    borderRightWidth: 5,

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
    alignItems: "center",

    borderWidth: 3,
    backgroundColor: "white",

    borderRadius: 30,

    paddingVertical: 15,
    width: "100%",
    marginTop: 10,
  },
  favRecipe: {
    alignItems: "center",
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
    alignItems: "flex-end",
    paddingHorizontal: 25,
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
    paddingHorizontal: 25,
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
});
