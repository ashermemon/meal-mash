import { NEWCOLORS, DARK_NEWCOLORS } from "@/constants/NewTheme";
import { COLORS, DARK_COLORS } from "@/constants/Theme";
import { StyleSheet } from "react-native";
import { useColorScheme } from "@/contexts/ColorSchemeContext";
import { scale, moderateScale } from "@/utils/responsive";

const createStyles = (NEWCOLORS, COLORS) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginTop: moderateScale(15),
    },
    textCentered: {
      fontFamily: "Nunito-Regular",
      textAlign: "center",
      justifyContent: "center",

      color: NEWCOLORS.basicText,
      fontWeight: 500,
    },
    nameInput: {
      fontSize: moderateScale(26),
      lineHeight: moderateScale(32),
      height: moderateScale(32),
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
      fontSize: moderateScale(17),
    },
    textCenterBold: {
      fontFamily: "Nunito-Bold",
      textAlign: "center",
      color: NEWCOLORS.basicText,
      fontSize: moderateScale(17),
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
      paddingVertical: moderateScale(15),
      paddingHorizontal: moderateScale(20),
      marginBottom: moderateScale(30),
      marginHorizontal: moderateScale(25),
      backgroundColor: NEWCOLORS.secondaryBoxGrey,
      flex: 1,
      width: "100%",
      borderRadius: moderateScale(15),
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
      marginHorizontal: moderateScale(10),
    },

    favFlex: {
      flex: 1,
      paddingRight: moderateScale(25),
      alignItems: "flex-end",
      justifyContent: "center",
    },
    nutrientCircle: {
      alignItems: "center",
      justifyContent: "space-around",
      flexDirection: "row",
      marginVertical: moderateScale(10),
      marginHorizontal: moderateScale(8),
    },
    legendBox: {
      height: scale(18),
      width: scale(18),
      marginRight: moderateScale(10),
      borderRadius: moderateScale(4),
      alignItems: "center",
    },
    textLegend: {
      fontFamily: "Nunito-SemiBold",
      color: NEWCOLORS.basicText,
      fontSize: moderateScale(16),
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
      width: scale(32),
      height: scale(32),
      borderRadius: scale(18),
      backgroundColor: NEWCOLORS.stepCircle,
      alignItems: "center",
      justifyContent: "center",
    },

    pfp: {
      height: scale(80),
      width: scale(80),
      backgroundColor: NEWCOLORS.lightGrey,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 200,
    },

    // --------------------------------------------//

    // New Styles Below
    homeBlock: {
      backgroundColor: NEWCOLORS.greyBlock,
      padding: moderateScale(10),
      borderRadius: moderateScale(10),
      justifyContent: "flex-start",
    },
    circleButton: {
      backgroundColor: NEWCOLORS.primary,
      borderRadius: 100,
    },
    recipeBar: {
      height: scale(66),
      borderRadius: moderateScale(15),
      padding: moderateScale(5),
      width: "100%",
      marginTop: moderateScale(4),
      marginBottom: moderateScale(3),
      overflow: "hidden",

      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "row",
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
      marginVertical: moderateScale(5),
    },
    paddingOnlyWrapper: {
      marginVertical: moderateScale(10),
    },
    shutterContainer: {
      position: "absolute",
      bottom: moderateScale(15),

      width: "100%",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
    },
    flipContainer: {
      position: "absolute",
      top: moderateScale(15),

      width: "100%",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
    },
    shutterBtn: {
      backgroundColor: "transparent",
      borderWidth: 5,
      borderColor: NEWCOLORS.lightGrey,

      borderRadius: scale(45),
      alignItems: "center",
      justifyContent: "center",
    },
    infoTag: {
      backgroundColor: NEWCOLORS.greyBlock,
      paddingHorizontal: moderateScale(10),
      paddingVertical: moderateScale(5),
      borderRadius: moderateScale(10),
      flexDirection: "row",
      alignItems: "center",
      gap: moderateScale(7),
    },

    tipBadgeContainer: {
      height: scale(37),
      width: scale(32.7), //33
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
      height: scale(55),
      paddingHorizontal: moderateScale(15),

      paddingVertical: moderateScale(5),
    },
    selectPill: {
      flex: 1,
      borderRadius: 1000,
      backgroundColor: NEWCOLORS.unselectedGrey,
      height: scale(35),
    },
    verticalLine: {
      width: 2,
      marginLeft: moderateScale(10),
      alignSelf: "stretch",
      backgroundColor: NEWCOLORS.unselectedShape,
    },
    ingredientPill: {
      flex: 1,
      borderRadius: moderateScale(15),
      backgroundColor: NEWCOLORS.greyBlock,
      height: scale(70),
    },

    setupContainer: {
      flex: 1,

      // alignItems: "center",
      padding: moderateScale(25),
    },

    setupTitle: {
      fontSize: moderateScale(30),
      fontFamily: "Nunito-Bold",
      textAlign: "center",
      marginBottom: moderateScale(20),
      color: NEWCOLORS.basicText,
    },
    setupInput: {
      fontSize: moderateScale(27),

      color: NEWCOLORS.placeholderText,
      fontFamily: "Nunito-Medium",
      textAlign: "center",

      borderBottomWidth: 1,
      borderColor: NEWCOLORS.unselectedShape,
    },
    setupButton: {
      backgroundColor: NEWCOLORS.greenAccent,
      height: scale(56),
      borderRadius: scale(28),
      justifyContent: "center",
      alignItems: "center",
    },

    progressFragment: {
      borderRadius: moderateScale(10),
      flex: 1,
    },
    emojiCircle: {
      backgroundColor: NEWCOLORS.unselectedGrey,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 1000,
      height: scale(220),
      width: scale(220),
    },
    selectButton: {
      backgroundColor: NEWCOLORS.unselectedGrey,
      height: scale(84),
      borderRadius: moderateScale(15),
      justifyContent: "center",
      alignItems: "center",
    },
    ingredientPickerCard: {
      backgroundColor: NEWCOLORS.unselectedGrey,
      borderRadius: moderateScale(15),
      flex: 1,
      // marginHorizontal: 9,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: moderateScale(10),
    },
    pantryTip: {
      gap: moderateScale(10),
      paddingVertical: moderateScale(9),
      paddingHorizontal: moderateScale(15),
      borderRadius: moderateScale(15),
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
      gap: moderateScale(15),
      padding: moderateScale(20),
      paddingVertical: moderateScale(23),

      flex: 1,
      borderRadius: moderateScale(15),
      backgroundColor: NEWCOLORS.blueBlock,
    },
    saveTag: {
      borderTopLeftRadius: moderateScale(10),
      borderBottomLeftRadius: moderateScale(10),
      padding: moderateScale(2),
      justifyContent: "center",
      height: scale(19),
      width: scale(60),
      paddingLeft: moderateScale(4),
    },
  });

const lightStyles = createStyles(NEWCOLORS, COLORS);
const darkStyles = createStyles(DARK_NEWCOLORS, DARK_COLORS);

export const styles = lightStyles;

export const useStyles = () => {
  const colorScheme = useColorScheme();
  return colorScheme === "dark" ? darkStyles : lightStyles;
};
