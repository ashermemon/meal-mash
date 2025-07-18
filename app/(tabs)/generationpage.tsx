import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Generate from "@/components/generate";
import MobileHeader from "@/components/mobileheader";
import { ImageBackground } from "expo-image";
import { styles } from "@/styles/auth.styles";

export default function GenerationPage() {
  const [generated, setGenerated] = useState(false);
  const image =
    Platform.OS == "web"
      ? require("@/assets/images/AppBackgroundDesktop.png")
      : require("@/assets/images/AppBackground.png");

  return (
    <ImageBackground source={image} style={styles.image} resizeMode="cover">
      <MobileHeader
        pageTitle="Generator"
        backEnabled={!generated}
        setGenerated={setGenerated}
      ></MobileHeader>
      <Generate generated={generated} setGenerated={setGenerated}></Generate>
    </ImageBackground>
  );
}
