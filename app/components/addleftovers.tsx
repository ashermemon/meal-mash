import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import NewCard from "./newcard";
import { styles } from "@/styles/auth.styles";
import { COLORS } from "@/constants/theme";

export default function AddLeftovers() {
  return (
    <View
      style={[
        { borderColor: COLORS.leftoverContainerOutline },
        styles.addBigContainer,
      ]}
    >
      <Text style={styles.addContainerHeader}>Leftovers:</Text>
      <NewCard bColor={COLORS.leftoverContainerOutline} />
    </View>
  );
}
