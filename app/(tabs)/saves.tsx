import { View, Text, ScrollView } from "react-native";
import { ImageBackground } from "react-native";
import { styles } from "@/styles/auth.styles";
import { Platform } from "react-native";
import MobileHeader from "../components/mobileheader";
import SavesFilled from "../Icons/SavesFilled";
import { COLORS } from "@/constants/theme";
import DisplaySaved from "../components/displaysaved";
import FavoritesContext from "../contexts/FavoritesContext";
import { storage } from "../components/storage";
import { useState } from "react";

const image =
  Platform.OS == "web"
    ? require("../../assets/images/AppBackgroundDesktop.png")
    : require("../../assets/images/AppBackground.png");

export default function Saves() {
  return (
    <ImageBackground source={image} style={styles.image} resizeMode="cover">
      <MobileHeader
        pageTitle="Saves"
        headerIcon={
          <View style={{ alignItems: "center" }}>
            <SavesFilled
              iconsetcolor={COLORS.fontColor}
              setheight={Platform.OS === "web" ? 25 : 25}
            ></SavesFilled>
          </View>
        }
      ></MobileHeader>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={styles.generatorContainer}
      >
        <View style={styles.container}>
          <DisplaySaved></DisplaySaved>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
