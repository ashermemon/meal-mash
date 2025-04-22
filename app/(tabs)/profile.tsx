import { View, Text, Platform, ImageBackground } from "react-native";
import React from "react";
import { styles } from "@/styles/auth.styles";

export default function Profile() {
  const image =
    Platform.OS == "web"
      ? require("../../assets/images/AppBackgroundDesktop.png")
      : require("../../assets/images/AppBackground.png");

  return (
    <>
      <ImageBackground source={image} style={styles.image} resizeMode="cover">
        <View style={styles.container}>
          <Text>Profile</Text>
        </View>
      </ImageBackground>
    </>
  );
}
