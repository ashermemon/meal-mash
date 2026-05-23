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

export default function Saves() {
  return (
    <>
      <MobileHeader pageTitle="Saves" backEnabled={true}></MobileHeader>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={styles.generatorContainer}
      >
        <View style={styles.container}>
          <DisplaySaved></DisplaySaved>
        </View>
      </ScrollView>
    </>
  );
}
