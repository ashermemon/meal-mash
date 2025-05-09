import { View, Text, ScrollView } from "react-native";
import { ImageBackground } from "react-native";
import { styles } from "@/styles/auth.styles";
import { Platform } from "react-native";
import MobileHeader from "../components/mobileheader";
import SavesFilled from "../Icons/SavesFilled";
import { COLORS } from "@/constants/theme";

const image =
  Platform.OS == "web"
    ? require("../../assets/images/AppBackgroundDesktop.png")
    : require("../../assets/images/AppBackground.png");

export default function Saves() {
  return (
    <>
      <ImageBackground source={image} style={styles.image} resizeMode="cover">
        <MobileHeader
          pageTitle="Saves"
          headerIcon={
            <SavesFilled
              iconsetcolor={COLORS.fontColor}
              setheight={Platform.OS === "web" ? 25 : 25}
            ></SavesFilled>
          }
        ></MobileHeader>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={styles.generatorContainer}
        >
          <View style={styles.container}>
            <Text style={styles.text}>Saves Page</Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
}
