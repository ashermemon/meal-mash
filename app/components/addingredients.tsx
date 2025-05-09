import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import NewCard from "./newcard";
import { styles } from "@/styles/auth.styles";
import { COLORS } from "@/constants/theme";

export default function AddIngredients() {
  return (
    <View
      style={[
        { borderColor: COLORS.ingredientContainerOutline },
        styles.addBigContainer,
      ]}
    >
      <Text style={styles.addContainerHeader}>Ingredients:</Text>
      <NewCard bColor={COLORS.ingredientContainerOutline} />
    </View>
  );
}
