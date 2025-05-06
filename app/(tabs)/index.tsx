import { View, Text, ImageBackground, ScrollView } from "react-native";

import { styles } from "@/styles/auth.styles";
import { Platform } from "react-native";
import Generate from "../components/generate";
import MobileHeader from "../components/mobileheader";

export default function Index() {
  const image =
    Platform.OS == "web"
      ? require("../../assets/images/AppBackgroundDesktop.png")
      : require("../../assets/images/AppBackground.png");

  return (
    <>
      <ImageBackground source={image} style={styles.image} resizeMode="cover">
        <MobileHeader pageTitle="Home"></MobileHeader>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
          style={styles.generatorContainer}
        >
          <View style={styles.container}>
            <Text style={styles.textCentered}>Generate Meal</Text>
            <Generate
              leftovers={["mac and cheese"]}
              ingredients={[
                "tuna",
                "soy sauce",
                "spinach",
                "chicken",
                "ice cream",
              ]}
            ></Generate>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
}
