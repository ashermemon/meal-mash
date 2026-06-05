import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import NewCard from "@/components/features/generator/NewCard";
import { styles } from "@/styles/GlobalStyles";
import { COLORS } from "@/constants/Theme";
import IngredientCardAdded from "@/components/features/generator/IngredientCardAdded";
import { GenerationDetailsContext } from "@/contexts/GenerationDetailsContext";

export default function AddLeftovers() {
  const [generationDetails, setGenerationDetails] = useContext(GenerationDetailsContext);
  const [addButtonActive, setAddButtonActive] = useState(true);

  useEffect(() => {
    if (generationDetails.leftovers.length > 4) {
      setAddButtonActive(false);
    } else {
      setAddButtonActive(true);
    }
  }, [generationDetails.leftovers]);

  return (
    <View
      style={[
        { borderColor: COLORS.leftoverContainerOutline },
        styles.addBigContainer,
      ]}
    >
      <Text style={styles.addContainerHeader}>Leftover Meals:</Text>

      {generationDetails.leftovers.map((leftover, index) => (
        <IngredientCardAdded
          ingredientName={leftover}
          cardBColor={COLORS.blueHeader}
          borderColor={COLORS.blueHeaderBorder}
          key={leftover}
          leftover={true}
        ></IngredientCardAdded>
      ))}
      {addButtonActive && (
        <NewCard leftover={true} bColor={COLORS.leftoverContainerOutline} />
      )}
    </View>
  );
}
