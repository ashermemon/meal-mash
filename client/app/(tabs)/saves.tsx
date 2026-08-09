import { View, Text, ScrollView } from "react-native";
import { ImageBackground } from "react-native";
import { styles } from "@/styles/GlobalStyles";
import { Platform } from "react-native";
import MobileHeader from "@/components/universal/MobileHeader";
import { COLORS } from "@/constants/Theme";
import DisplaySaved from "@/components/features/saved/DisplaySaved";
import FavoritesContext from "@/contexts/FavoritesContext";
import { storage } from "@/utils/storage";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { NEWCOLORS } from "@/constants/NewTheme";

export default function Saves() {
  return (
    <View style={{ flex: 1, backgroundColor: NEWCOLORS.backgroundColor, position: "relative" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 130 }}
        style={styles.generatorContainer}
      >
        <View style={styles.container}>
          <DisplaySaved></DisplaySaved>
        </View>
      </ScrollView>
      <LinearGradient
        colors={[
          "rgba(255, 248, 237, 0)",
          "rgba(255, 248, 237, 0.75)",
          "rgba(255, 248, 237, 0.98)",
          NEWCOLORS.backgroundColor,
        ]}
        locations={[0, 0.4, 0.75, 1]}
        style={{
          position: "absolute",
          bottom: -40,
          left: 0,
          right: 0,
          height: 160,
          zIndex: 10,
        }}
        pointerEvents="none"
      />
    </View>
  );
}
