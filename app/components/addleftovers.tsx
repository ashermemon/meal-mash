import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import NewCard from "./newcard";
import { styles } from "@/styles/auth.styles";
import { COLORS } from "@/constants/theme";
import LeftoversContext from "../contexts/LeftoversContext";
import IngredientCardAdded from "./ingredientcardadded";

export default function AddLeftovers() {
  const [leftovers, setLeftovers] = useContext(LeftoversContext);
  const [addButtonActive, setAddButtonActive] = useState(true);

  useEffect(() => {
    if (leftovers.length > 4) {
      setAddButtonActive(false);
    } else {
      setAddButtonActive(true);
    }
  }, [leftovers]);

  return (
    <View
      style={[
        { borderColor: COLORS.leftoverContainerOutline },
        styles.addBigContainer,
      ]}
    >
      <Text style={styles.addContainerHeader}>Leftovers:</Text>

      {leftovers.map((leftover, index) => (
        <IngredientCardAdded
          ingredientName={leftover}
          cardBColor={COLORS.blueHeader}
          borderColor={COLORS.blueHeaderBorder}
          key={index}
          leftover={true}
        ></IngredientCardAdded>
      ))}
      {addButtonActive && (
        <NewCard leftover={true} bColor={COLORS.leftoverContainerOutline} />
      )}
    </View>
  );
}
