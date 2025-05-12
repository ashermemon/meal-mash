import { Image, Pressable, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { styles } from "@/styles/auth.styles";
import AddIngredients from "./addingredients";
import emojiImages from "./emoji-images";
import SearchContext from "../contexts/SearchContext";
import IngredientsContext from "../contexts/IngredientsContext";
import LeftoversEnabled from "../contexts/LeftoversOn";
import LeftoversContext from "../contexts/LeftoversContext";

interface IngredientProps {
  ingredientName: string;
}

export default function IngredientCard(props: IngredientProps) {
  const [ingredients, setIngredients] = useContext(IngredientsContext);
  const [leftovers, setLeftovers] = useContext(LeftoversContext);
  const [leftoversEnabled, setLeftoversEnabled] = useContext(LeftoversEnabled);

  var hsl = require("hsl-to-hex");
  const [hue] = useState(() => Math.random() * 360);
  const backgroundColor = hsl(hue, 88, 97);
  const strokeColor = hsl(hue, 45, 79);
  const setSearchActive = useContext(SearchContext);

  return ingredients.includes(props.ingredientName) ||
    leftovers.includes(props.ingredientName) ? (
    <></>
  ) : (
    <View style={{ width: "100%" }}>
      <Pressable
        style={styles.ingredientResult}
        onPress={() => [
          setSearchActive(false),
          leftoversEnabled
            ? setLeftovers((prev) => [...prev, props.ingredientName])
            : setIngredients((prev) => [...prev, props.ingredientName]),
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
