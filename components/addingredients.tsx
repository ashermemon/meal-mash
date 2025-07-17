import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import NewCard from "@/components/newcard";
import { styles } from "@/styles/auth.styles";
import { COLORS } from "@/constants/theme";
import IngredientCardAdded from "@/components/ingredientcardadded";
import IngredientsContext from "@/contexts/IngredientsContext";

export default function AddIngredients() {
  const [ingredients, setIngredients] = useContext(IngredientsContext);
  const [addButtonActive, setAddButtonActive] = useState(true);

  useEffect(() => {
    if (ingredients.length > 6) {
      setAddButtonActive(false);
    } else {
      setAddButtonActive(true);
    }
  }, [ingredients]);
  return (
    <View
      style={[
        { borderColor: COLORS.ingredientContainerOutline },
        styles.addBigContainer,
      ]}
    >
      <Text style={styles.addContainerHeader}>Ingredients:</Text>

      {ingredients.map((ingredient) => (
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
