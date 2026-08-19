import { NEWCOLORS, DARK_NEWCOLORS } from "@/constants/NewTheme";
import { COLORS, DARK_COLORS } from "@/constants/Theme";
import { StyleSheet } from "react-native";
import { useColorScheme } from "@/contexts/ColorSchemeContext";

const createStyles = (NEWCOLORS, COLORS, isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginTop: 15,
    },
    textCentered: {
      fontFamily: "Nunito-Regular",
      textAlign: "center",
      justifyContent: "center",

      color: NEWCOLORS.basicText,
      fontWeight: 500,
    },
    nameInput: {
      fontSize: 26,
      lineHeight: 32,
      height: 32,
      padding: 0,
      margin: 0,
      textAlignVertical: "center",
      includeFontPadding: false,

      fontFamily: "Nunito-Bold",
      color: NEWCOLORS.basicText,
    },

    textLeft: {
      fontFamily: "Nunito-Regular",
      textAlign: "left",
      color: NEWCOLORS.basicText,
      flex: 1,
    },
    textLeftSemiBold: {
      fontFamily: "Nunito-SemiBold",
      textAlign: "left",
      color: NEWCOLORS.basicText,
    },
    textLeftBold: {
      fontFamily: "Nunito-Bold",
      textAlign: "left",
      color: NEWCOLORS.basicText,
      fontSize: 17,
    },
    textCenterBold: {
      fontFamily: "Nunito-Bold",
      textAlign: "center",
      color: NEWCOLORS.basicText,
      fontSize: 17,
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

    favFlex: {
      flex: 1,
      paddingRight: 25,
      alignItems: "flex-end",
      justifyContent: "center",
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
      color: NEWCOLORS.basicText,
      fontSize: 16,
      alignItems: "center",
    },
    textRight: {
      fontFamily: "Nunito-Regular",
      textAlign: "right",
      color: NEWCOLORS.basicText,
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

    pfp: {
      height: 80,
      width: 80,
      backgroundColor: NEWCOLORS.lightGrey,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 200,
    },

    // --------------------------------------------//

    // New Styles Below
    homeBlock: {
      backgroundColor: NEWCOLORS.greyBlock,
      padding: 10,
      borderRadius: 10,
      justifyContent: "flex-start",
    },
    circleButton: {
      backgroundColor: NEWCOLORS.primary,
      borderRadius: 100,
    },
    recipeBar: {
      height: 66,
      borderRadius: 15,
      padding: 5,
      width: "100%",
      marginTop: 4,
      marginBottom: 3,
      overflow: "hidden",

      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "row",
    },
    basicBoxShadow: {
      boxShadow: isDark
        ? "0px 2.5px 3px rgba(10, 8, 6, 0.24)"
        : "0px 2.5px 2px rgba(58, 53, 50, 0.08)",
    },
    imageGlow: {
      boxShadow: isDark
        ? "0px 1px 2px rgba(10, 8, 6, 0.20), 0px 6px 16px rgba(10, 8, 6, 0.24)"
        : "0px 1px 2px rgba(58, 53, 50, 0.14), 0px 6px 14px rgba(58, 53, 50, 0.16)",
    },
    elevatedShadow: {
      boxShadow: isDark
        ? "0px 2px 3px rgba(10, 8, 6, 0.16), 0px 8px 18px rgba(10, 8, 6, 0.16)"
        : "0px 2px 3px rgba(58, 53, 50, 0.08), 0px 6px 16px rgba(58, 53, 50, 0.09)",
    },
    basicTextCenter: {
      fontFamily: "Nunito-Regular",
      textAlign: "center",
      justifyContent: "center",

      color: NEWCOLORS.basicText,
    },
    basicTextLeft: {
      fontFamily: "Nunito-Regular",
      textAlign: "left",

      color: NEWCOLORS.basicText,
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
      color: NEWCOLORS.basicText,
    },
    setupInput: {
      fontSize: 27,

      color: NEWCOLORS.placeholderText,
      fontFamily: "Nunito-Medium",
      textAlign: "center",

      borderBottomWidth: 1,
      borderColor: NEWCOLORS.unselectedShape,
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
      paddingVertical: 9,
      paddingHorizontal: 15,
      borderRadius: 15,
      backgroundColor: NEWCOLORS.yellowBlock,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    track: {
      height: 32,
      borderRadius: 16,
      justifyContent: "center",
      paddingHorizontal: 2,
    },
    thumb: {
      width: 24,
      height: 24,
      borderRadius: 100,
      backgroundColor: NEWCOLORS.cardWhite,
    },
    savesCard: {
      gap: 15,
      padding: 20,
      paddingVertical: 23,

      flex: 1,
      borderRadius: 15,
      backgroundColor: NEWCOLORS.blueBlock,
    },
    saveTag: {
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      padding: 2,
      justifyContent: "center",
      height: 19,
      width: 60,
      paddingLeft: 4,
    },
  });

const lightStyles = createStyles(NEWCOLORS, COLORS, false);
const darkStyles = createStyles(DARK_NEWCOLORS, DARK_COLORS, true);

export const styles = lightStyles;

export const useStyles = () => {
  const colorScheme = useColorScheme();
  return colorScheme === "dark" ? darkStyles : lightStyles;
};
