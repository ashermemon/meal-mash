import {
  View,
  Text,
  Platform,
  ImageBackground,
  ScrollView,
} from "react-native";
import React from "react";
import { styles } from "@/styles/auth.styles";
import MobileHeader from "../components/mobileheader";

export default function Profile() {
  const image =
    Platform.OS == "web"
      ? require("../../assets/images/AppBackgroundDesktop.png")
      : require("../../assets/images/AppBackground.png");

  return (
    <>
      <ImageBackground source={image} style={styles.image} resizeMode="cover">
        <MobileHeader pageTitle="Profile"></MobileHeader>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
          style={styles.generatorContainer}
        >
          <View style={styles.container}>
            <Text>Profile</Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
}
