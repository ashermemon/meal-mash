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
    fontFamily: "Nunito",
    color: COLORS.fontColor,
  },
  textCentered: {
    fontFamily: "Nunito",
    textAlign: "center",
    color: COLORS.fontColor,
  },
  textLeft: {
    fontFamily: "Nunito",
    textAlign: "left",
    color: COLORS.fontColor,
  },
  headerText: {
    fontFamily: "Nunito",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    textDecorationLine: "underline",
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
    padding: 15,
    flex: 1,
  },
  timer: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
