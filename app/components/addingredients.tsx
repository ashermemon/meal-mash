import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import NewCard from "./newcard";
import { styles } from "@/styles/auth.styles";
import { COLORS } from "@/constants/theme";
import IngredientCardAdded from "./ingredientcardadded";

interface IngredientProps {
  ingredients: string[];
  onAddIngredient: (ingredient: string) => void;
}

export default function AddIngredients(props: IngredientProps) {
  return (
    <View
      style={[
        { borderColor: COLORS.ingredientContainerOutline },
        styles.addBigContainer,
      ]}
    >
      <Text style={styles.addContainerHeader}>Ingredients:</Text>
      <NewCard bColor={COLORS.ingredientContainerOutline} />

      {props.ingredients.map((ingredient, index) => (
        <IngredientCardAdded
          ingredientName={ingredient}
          cardBColor={COLORS.greenButtonColor}
          bHue={30}
          key={index}
        ></IngredientCardAdded>
      ))}
    </View>
  );
}
