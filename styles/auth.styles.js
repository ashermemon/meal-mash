import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  generateButtonContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  generateButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  errorText: {
    color: "red",
  },
});
