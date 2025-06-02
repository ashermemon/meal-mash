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
import FavLeftoversContext from "../contexts/FavLeftoversContext";
type CardProps = {
  ingredientName: string;
  leftover: boolean;
};

export default function FavIngredient(props: CardProps) {
  const [favorite, setFavorite] = useState(true);
  const [favorites, setFavorites] = useContext(FavoritesContext);
  const [favoritesL, setFavoritesL] = useContext(FavLeftoversContext);

  useEffect(() => {
    setFavorite(
      favorites.includes(props.ingredientName) ||
        favoritesL.includes(props.ingredientName)
    );
  }, [favorites, favoritesL, props.ingredientName]);
  let updatedFavorites: string[];
  let updatedFavoritesL: string[];
  const saveCard = () => {
    const ingredientName = props.ingredientName;
    const isCurrentlyFavorite =
      favorites.includes(ingredientName) || favoritesL.includes(ingredientName);

    if (isCurrentlyFavorite) {
      if (props.leftover) {
        updatedFavoritesL = favoritesL.filter(
          (name) => name !== ingredientName
        );
      } else {
        updatedFavorites = favorites.filter((name) => name !== ingredientName);
      }
    } else {
      if (props.leftover) {
        updatedFavoritesL = [...favoritesL, ingredientName];
      } else {
        updatedFavorites = [...favorites, ingredientName];
      }
    }
    if (props.leftover) {
      setFavoritesL(updatedFavoritesL);
      storage.set("favoritesL", JSON.stringify(updatedFavoritesL));
    } else {
      setFavorites(updatedFavorites);
      storage.set("favorites", JSON.stringify(updatedFavorites));
    }

    alert(`
      ${props.ingredientName} was ${
      favorite ? `removed from favorites` : `favorited`
    }`);
  };
  return (
    <>
      <View
        style={[
          {
            borderColor: props.leftover
              ? COLORS.saveBorder
              : COLORS.greenButtonColorOuline,
          },
          styles.favoritedContainer,
        ]}
      >
        <View style={styles.ingredientPanel}>
          <View style={styles.ingredientFlexEmojiCard}>
            <View
              style={[
                styles.emojiWrapCard,
                {
                  borderColor: props.leftover
                    ? COLORS.saveBorder
                    : COLORS.greenButtonColorOuline,
                  backgroundColor: props.leftover
                    ? COLORS.saveFill
                    : COLORS.greenButtonColor,
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
