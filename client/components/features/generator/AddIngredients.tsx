import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import NewCard from "@/components/features/generator/NewCard";
import { styles } from "@/styles/GlobalStyles";
import { COLORS } from "@/constants/Theme";
import IngredientCardAdded from "@/components/features/generator/IngredientCardAdded";
import { GenerationDetailsContext } from "@/contexts/GenerationDetailsContext";

export default function AddIngredients() {
  const [generationDetails, setGenerationDetails] = useContext(GenerationDetailsContext);
  const [addButtonActive, setAddButtonActive] = useState(true);

  useEffect(() => {
    if (generationDetails.ingredients.length > 6) {
      setAddButtonActive(false);
    } else {
      setAddButtonActive(true);
    }
  }, [generationDetails.ingredients]);
  return (
    <View
      style={[
        { borderColor: COLORS.ingredientContainerOutline },
        styles.addBigContainer,
      ]}
    >
      <Text style={styles.addContainerHeader}>Ingredients:</Text>

      {generationDetails.ingredients.map((ingredient) => (
        <IngredientCardAdded
          ingredientName={ingredient}
          cardBColor={COLORS.greenButtonColor}
          borderColor={COLORS.greenButtonColorOuline}
          key={ingredient}
          leftover={false}
        ></IngredientCardAdded>
      ))}
      {addButtonActive && (
        <NewCard bColor={COLORS.ingredientContainerOutline} leftover={false} />
      )}
    </View>
  );
}
