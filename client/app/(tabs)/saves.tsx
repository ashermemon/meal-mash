import { View, Text, ScrollView } from "react-native";
import { ImageBackground } from "react-native";
import { styles } from "@/styles/auth.styles";
import { Platform } from "react-native";
import MobileHeader from "../../components/universal/mobileheader";
import SavesFilled from "../../Icons/SavesFilled";
import { COLORS } from "@/constants/theme";
import DisplaySaved from "../../components/displaysaved";
import FavoritesContext from "../../contexts/FavoritesContext";
import { storage } from "../../utils/storage";
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
