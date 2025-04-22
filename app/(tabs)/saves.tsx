import { View, Text } from "react-native";
import { ImageBackground } from "react-native";
import { styles } from "@/styles/auth.styles";
import { Platform } from "react-native";

const image =
  Platform.OS == "web"
    ? require("../../assets/images/AppBackgroundDesktop.png")
    : require("../../assets/images/AppBackground.png");

export default function Saves() {
  return (
    <>
      <ImageBackground source={image} style={styles.image} resizeMode="cover">
        <View style={styles.container}>
          <Text style={styles.text}>Saves Page</Text>
        </View>
      </ImageBackground>
    </>
  );
}
