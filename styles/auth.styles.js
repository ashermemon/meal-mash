import { COLORS } from "@/constants/theme";
import { Platform, StyleSheet } from "react-native";

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
    color: COLORS.fontColor,
    fontWeight: 500,
  },
  textLeft: {
    fontFamily: "Nunito-Regular",
    textAlign: "left",
    color: COLORS.fontColor,
    fontWeight: 500,
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
    flex: 1,
    paddingHorizontal: 10,
  },
  generateButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 10,
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
    borderRadius: 30,
    backgroundColor: COLORS.searchGreyBG,
    borderColor: COLORS.searchGreyBorder,
    borderWidth: 3,
    position: "absolute",
    bottom: "50%",
    alignSelf: "center",
    zIndex: 100,
    padding: 5,
    width: 300,
    flexDirection: "row",
  },
  exitSearch: {
    backgroundColor: COLORS.deleteExitFill,
    width: 40,
    height: 40,
    borderRadius: "100%",
    borderWidth: 3,
    borderColor: COLORS.deleteExitStroke,
    position: "relative",

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
    width: "100%",
    alignItems: "center",
  },
});
