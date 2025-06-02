import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { storage } from "./storage";
import { styles } from "@/styles/auth.styles";
import FavIconFilled from "../Icons/FavIconFilled";
import FavIcon from "../Icons/FavIcon";
import { Image } from "expo-image";
import FavoritesContext from "../contexts/FavoritesContext";
import { COLORS } from "@/constants/theme";
import emojiImages from "./emoji-images";
type CardProps = {
  ingredientName: string;
  leftover: boolean;
};

export default function FavIngredient(props: CardProps) {
  const [favorite, setFavorite] = useState(true);
  const [favorites, setFavorites] = useContext(FavoritesContext);

  useEffect(() => {
    setFavorite(favorites.includes(props.ingredientName));
  }, [favorites, props.ingredientName]);

  const saveCard = () => {
    const ingredientName = props.ingredientName;
    const isCurrentlyFavorite = favorites.includes(ingredientName); // Check against global context
    let updatedFavorites: string[];

    if (isCurrentlyFavorite) {
      updatedFavorites = favorites.filter((name) => name !== ingredientName);
    } else {
      updatedFavorites = [...favorites, ingredientName];
    }

    setFavorites(updatedFavorites);
    storage.set("favorites", JSON.stringify(updatedFavorites));
    alert(`
      ${props.ingredientName} was ${
      favorite ? `removed from favorites` : `favorited`
    }`);
  };
  return (
    <>
      <View style={[{}, styles.favoritedContainer]}>
        <View style={styles.ingredientPanel}>
          <View style={styles.ingredientFlexEmojiCard}>
            <View
              style={[
                styles.emojiWrapCard,
                {
                  borderColor: COLORS.blueHeaderBorder,
                  backgroundColor: COLORS.blueHeader,
                },
              ]}
            >
              <Image
                style={styles.ingredientEmoji}
                source={emojiImages.Default}
              ></Image>
            </View>
          </View>
          <View style={styles.ingredientFlexCard}>
            <Text style={styles.textLeftBold}>{props.ingredientName}</Text>
          </View>
          <View style={styles.favFlex}>
            <Pressable onPress={saveCard}>
              {favorite ? (
                <FavIconFilled
                  iconsetcolor={COLORS.favoriteColor}
                  setheight={35}
                ></FavIconFilled>
              ) : (
                <FavIcon
                  iconsetcolor={COLORS.favoriteColor}
                  setheight={35}
                ></FavIcon>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
}
