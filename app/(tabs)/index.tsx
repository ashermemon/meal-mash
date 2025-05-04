import { View, Text, ImageBackground, ScrollView } from "react-native";

import { styles } from "@/styles/auth.styles";
import { Platform } from "react-native";
import Generate from "../components/generate";

export default function Index() {
  const image =
    Platform.OS == "web"
      ? require("../../assets/images/AppBackgroundDesktop.png")
      : require("../../assets/images/AppBackground.png");

  return (
    <>
      <ImageBackground source={image} style={styles.image} resizeMode="cover">
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.text}>Generate Meal</Text>
            <Generate
              leftovers={["egg fried rice"]}
              ingredients={["lemon", "flour", "spinach", "lentils", "beans"]}
            ></Generate>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
}
