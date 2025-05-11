import { Image, Pressable, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { styles } from "@/styles/auth.styles";
import AddIngredients from "./addingredients";
import emojiImages from "./emoji-images";
import SearchContext from "../contexts/SearchContext";

interface IngredientProps {
  ingredientName: string;
  ingredients: string[];
  onAddIngredient: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function IngredientCard(props: IngredientProps) {
  var hsl = require("hsl-to-hex");
  let hue = Math.random() * 360;
  let backgroundColor = hsl(hue, 88, 97);
  let strokeColor = hsl(hue, 45, 79);
  const setSearchActive = useContext(SearchContext);
  return (
    <View style={{ width: "100%" }}>
      <Pressable
        style={styles.ingredientResult}
        onPress={() => [
          props.onAddIngredient((prev) => [...prev, props.ingredientName]),
          setSearchActive(false),
        ]}
      >
        <View style={styles.ingredientPanel}>
          <View style={styles.ingredientFlex}>
            <Text style={[styles.textLeftSemiBold]}>
              {props.ingredientName}
            </Text>
          </View>
          <View style={styles.ingredientFlexEmoji}>
            <View
              style={[
                styles.emojiWrap,
                { borderColor: strokeColor, backgroundColor: backgroundColor },
              ]}
            >
              <Image
                style={styles.ingredientEmoji}
                source={emojiImages[props.ingredientName]}
              ></Image>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
