import { NEWCOLORS } from "@/constants/NewTheme";
import { COLORS } from "@/constants/Theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 15,
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

  textLeft: {
    fontFamily: "Nunito-Regular",
    textAlign: "left",
    color: COLORS.fontColor,
    flex: 1,
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
  textCenterBold: {
    fontFamily: "Nunito-Bold",
    textAlign: "center",
    color: COLORS.fontColor,
    fontSize: 17,
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
  errorText: {
    color: NEWCOLORS.redAccent,
  },
  generatorContainer: {
    flex: 1,
    width: "100%",
    //backgroundColor: "white",
  },
  timer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 30,
    marginHorizontal: 25,
    backgroundColor: NEWCOLORS.secondaryBoxGrey,
    flex: 1,
    width: "100%",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    flexDirection: "row",
  },
  ingredientPanelFav: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },

  timerButton: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginHorizontal: 10,
  },

  ingredientEmoji: {
    width: 30,
    height: 30,
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
    justifyContent: "space-around",
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 8,
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
  textRight: {
    fontFamily: "Nunito-Regular",
    textAlign: "right",
    color: COLORS.fontColor,
  },
  card: {
    borderTopColor: NEWCOLORS.dividerGrey2,
    borderTopWidth: 3,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 18,
    backgroundColor: NEWCOLORS.stepCircle,
    alignItems: "center",
    justifyContent: "center",
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

  // --------------------------------------------//

  // New Styles Below
  homeBlock: {
    backgroundColor: NEWCOLORS.greyBlock,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: "flex-start",
  },
  circleButton: {
    backgroundColor: NEWCOLORS.primary,
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
    justifyContent: "center",
    flexDirection: "row",
  },
  basicBoxShadow: {
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.10)",
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
  categoriesSlider: {
    marginVertical: 5,
  },
  paddingOnlyWrapper: {
    marginVertical: 10,
  },
  shutterContainer: {
    position: "absolute",
    bottom: 15,

    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  flipContainer: {
    position: "absolute",
    top: 15,

    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: NEWCOLORS.lightGrey,

    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  infoTag: {
    backgroundColor: NEWCOLORS.greyBlock,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  tipBadgeContainer: {
    height: 37,
    width: 32.7, //33
    alignItems: "center",
    justifyContent: "center",
  },
  svgBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sliderPill: {
    width: "100%",
    borderRadius: 1000,
    backgroundColor: NEWCOLORS.greyBlock,
    height: 55,
    paddingHorizontal: 15,

    paddingVertical: 5,
  },
  selectPill: {
    flex: 1,
    borderRadius: 1000,
    backgroundColor: NEWCOLORS.unselectedGrey,
    height: 35,
  },
  verticalLine: {
    width: 2,
    marginLeft: 10,
    alignSelf: "stretch",
    backgroundColor: NEWCOLORS.unselectedShape,
  },
  ingredientPill: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: NEWCOLORS.greyBlock,
    height: 70,
  },

  setupContainer: {
    flex: 1,

    // alignItems: "center",
    padding: 25,
  },

  setupTitle: {
    fontSize: 30,
    fontFamily: "Nunito-Bold",
    textAlign: "center",
    marginBottom: 20,
  },
  setupInput: {
    fontSize: 27,

    color: NEWCOLORS.placeholderText,
    fontFamily: "Nunito-Medium",
    textAlign: "center",

    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  setupButton: {
    backgroundColor: NEWCOLORS.greenAccent,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },

  progressFragment: {
    borderRadius: 10,
    flex: 1,
  },
  emojiCircle: {
    backgroundColor: NEWCOLORS.unselectedGrey,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 1000,
    height: 220,
    width: 220,
  },
  selectButton: {
    backgroundColor: NEWCOLORS.unselectedGrey,
    height: 84,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  ingredientPickerCard: {
    backgroundColor: NEWCOLORS.unselectedGrey,
    borderRadius: 15,
    flex: 1,
    // marginHorizontal: 9,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  pantryTip: {
    gap: 10,
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: NEWCOLORS.yellowAccent,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
