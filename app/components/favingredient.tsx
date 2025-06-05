import React, { useContext, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { storage } from "./storage";
import { styles } from "@/styles/auth.styles";
import FavIconFilled from "../Icons/FavIconFilled";
import FavIcon from "../Icons/FavIcon";
import { Image } from "expo-image";
import FavoritesContext from "../contexts/FavoritesContext";
import FavLeftoversContext from "../contexts/FavLeftoversContext";
import LeftoversContext from "../contexts/LeftoversContext";
import IngredientsContext from "../contexts/IngredientsContext";
import { COLORS } from "@/constants/theme";
import emojiImages from "./emoji-images";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useRouter } from "expo-router";

type CardProps = {
  ingredientName: string;
  leftover: boolean;
};

export default function FavIngredient(props: CardProps) {
  const [favorite, setFavorite] = useState(true);

  const [favorites, setFavorites] = useContext(FavoritesContext);
  const [favoritesL, setFavoritesL] = useContext(FavLeftoversContext);
  const [ingredients, setIngredients] = useContext(IngredientsContext);
  const [leftovers, setLeftovers] = useContext(LeftoversContext);

  const pressed = useSharedValue(false);
  const router = useRouter();

  useEffect(() => {
    const isFav =
      favorites.includes(props.ingredientName) ||
      favoritesL.includes(props.ingredientName);
    setFavorite(isFav);
  }, [favorites, favoritesL, props.ingredientName]);

  const saveCard = () => {
    const ingredientName = props.ingredientName;
    const isCurrentlyFavorite =
      favorites.includes(ingredientName) || favoritesL.includes(ingredientName);

    let updatedFavorites = [...favorites];
    let updatedFavoritesL = [...favoritesL];

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
        updatedFavoritesL.push(ingredientName);
      } else {
        updatedFavorites.push(ingredientName);
      }
    }

    if (props.leftover) {
      setFavoritesL(updatedFavoritesL);
      storage.set("favoritesL", JSON.stringify(updatedFavoritesL));
    } else {
      setFavorites(updatedFavorites);
      storage.set("favorites", JSON.stringify(updatedFavorites));
    }

    alert(
      `${ingredientName} was ${
        isCurrentlyFavorite ? "removed from favorites" : "favorited"
      }`
    );
  };

  const addIngredient = () => {
    let upperCaseArrayL = leftovers.map((str) => str.toUpperCase());
    let upperCaseArrayI = ingredients.map((str) => str.toUpperCase());

    if (
      props.leftover &&
      upperCaseArrayL.includes(props.ingredientName.toUpperCase()) == false
    ) {
      router.push("/");
      setLeftovers((prev: string[]) => [...prev, props.ingredientName]);
    } else if (
      !props.leftover &&
      upperCaseArrayI.includes(props.ingredientName.toUpperCase()) == false
    ) {
      setIngredients((prev: string[]) => [...prev, props.ingredientName]);
      router.push("/");
    } else {
      alert("Ingredient already added!");
    }
  };

  const animatedStyles = useAnimatedStyle(() => {
    const targetColor = pressed.value
      ? props.leftover
        ? COLORS.blueHeader
        : COLORS.greenButtonColor
      : "white";

    return {
      backgroundColor: withTiming(targetColor),
    };
  });

  return (
    <Pressable
      onPressIn={() => {
        pressed.value = true;
      }}
      onPressOut={() => {
        pressed.value = false;
      }}
      onPress={() => {
        addIngredient();
      }}
    >
      <Animated.View
        style={[
          {
            borderColor: props.leftover
              ? COLORS.saveBorder
              : COLORS.greenButtonColorOuline,
          },
          styles.favoritedContainer,
          animatedStyles,
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
              />
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
                />
              ) : (
                <FavIcon iconsetcolor={COLORS.favoriteColor} setheight={35} />
              )}
            </Pressable>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}
