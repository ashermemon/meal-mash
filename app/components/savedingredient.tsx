import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { storage } from "./storage";
import { styles } from "@/styles/auth.styles";
import FavIconFilled from "../Icons/FavIconFilled";
import FavIcon from "../Icons/FavIcon";
import { Image } from "expo-image";
type CardProps = {
  ingredientName: string;
  leftover: boolean;
};

export default function SavedIngredient(props: CardProps) {
  const [favorite, setFavorite] = useState(true);
  useEffect(() => {
    const stored = storage.getString("favorites");
    const favorites = stored ? JSON.parse(stored) : [];
    setFavorite(favorites.includes(props.ingredientName));
  }, []);
  const saveCard = () => {
    setFavorite((prev) => !prev);

    const existing = storage.getString("favorites");
    const favorites = existing ? JSON.parse(existing) : [];

    if (!favorite) {
      if (!favorites.includes(props.ingredientName)) {
        favorites.push(props.ingredientName);
      }
    } else {
      const index = favorites.indexOf(props.ingredientName);
      if (index > -1) {
        favorites.splice(index, 1);
      }
    }
    storage.set("favorites", JSON.stringify(favorites));
    alert(
      `${props.ingredientName} was ${
        favorite ? `removed from favorites` : `favorited`
      }`
    );
  };
  return (
    <>
      <Pressable style={styles.swipeableSave} onPress={saveCard}>
        {favorite ? (
          <FavIconFilled
            iconsetcolor={"#FFF7EE"}
            setheight={35}
          ></FavIconFilled>
        ) : (
          <FavIcon iconsetcolor={"#FFF7EE"} setheight={35}></FavIcon>
        )}
      </Pressable>

      <View
        style={[
          {
            borderTopColor: "red",
            borderBottomColor: "red",
            backgroundColor: "white",
          },
          styles.addContainerIngredient,
        ]}
      >
        <View style={styles.ingredientPanel}>
          <View style={styles.ingredientFlexEmojiCard}>
            <View
              style={[
                styles.emojiWrapCard,
                {
                  borderColor: "red",
                  backgroundColor: "white",
                },
              ]}
            >
              <Image style={styles.ingredientEmoji}></Image>
            </View>
          </View>
          <View style={styles.ingredientFlexCard}>
            <Text style={styles.textLeftBold}>{props.ingredientName}</Text>
          </View>
        </View>
      </View>
    </>
  );
}
