import { View, Text, ScrollView } from "react-native";
import { ImageBackground } from "react-native";
import { styles } from "@/styles/auth.styles";
import { Platform } from "react-native";
import MobileHeader from "../components/mobileheader";

const image =
  Platform.OS == "web"
    ? require("../../assets/images/AppBackgroundDesktop.png")
    : require("../../assets/images/AppBackground.png");

export default function Saves() {
  return (
    <>
      <ImageBackground source={image} style={styles.image} resizeMode="cover">
        <MobileHeader pageTitle="Profile"></MobileHeader>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
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
