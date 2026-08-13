import React, { useContext, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { storage } from "@/utils/storage";
import { useStyles } from "@/styles/GlobalStyles";
import { Image } from "expo-image";
import FavoritesContext from "@/contexts/FavoritesContext";
import FavLeftoversContext from "@/contexts/FavLeftoversContext";
import { GenerationDetailsContext } from "@/contexts/GenerationDetailsContext";
import { useTheme } from "@/contexts/ColorSchemeContext";
import emojiImages from "@/components/universal/EmojiImages";
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
import * as Haptics from "expo-haptics";
import { CustomIcon } from "@/icon-loader/icon-loader";

export default function FavIngredient(props: CardProps) {
  const styles = useStyles();
  const theme = useTheme();
  const [favorite, setFavorite] = useState(true);

  const [favorites, setFavorites] = useContext(FavoritesContext);
  const [favoritesL, setFavoritesL] = useContext(FavLeftoversContext);
  const [generationDetails, setGenerationDetails] = useContext(GenerationDetailsContext);
  const ingredients = generationDetails.ingredients;
  const leftovers = generationDetails.leftovers;

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
          (name) => name !== ingredientName,
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
      }`,
    );
  };

  const addIngredient = () => {
    let upperCaseArrayL = leftovers.map((str) => str.toUpperCase());
    let upperCaseArrayI = ingredients.map((str) => str.toUpperCase());

    if (
      props.leftover &&
      upperCaseArrayL.includes(props.ingredientName.toUpperCase()) == false
    ) {
      router.push("/(tabs)/generationpage" as any);
      setGenerationDetails((prev) => ({
        ...prev,
        leftovers: [...prev.leftovers, props.ingredientName],
      }));
    } else if (
      !props.leftover &&
      upperCaseArrayI.includes(props.ingredientName.toUpperCase()) == false
    ) {
      setGenerationDetails((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, props.ingredientName],
      }));
      router.push("/(tabs)/generationpage" as any);
    } else {
      alert("Ingredient already added!");
    }
  };

  const animatedStyles = useAnimatedStyle(() => {
    const targetColor = pressed.value
      ? props.leftover
        ? theme.blueHeader
        : theme.greenButtonColor
      : theme.pureWhite;

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
        Haptics.selectionAsync();
        addIngredient();
      }}
    >
      <Animated.View
        style={[
          {
            borderColor: props.leftover
              ? theme.saveBorder
              : theme.greenButtonColorOuline,
          },
          styles.favoritedContainer,
          animatedStyles,
        ]}
      >
        <View style={styles.ingredientPanelFav}>
          <View
            style={[
              styles.emojiWrapCard,
              {
                borderColor: props.leftover
                  ? theme.saveBorder
                  : theme.greenButtonColorOuline,
                backgroundColor: props.leftover
                  ? theme.saveFill
                  : theme.greenButtonColor,
              },
            ]}
          >
            <Image
              style={styles.ingredientEmoji}
              source={emojiImages.Default}
            />
          </View>
          <View style={styles.ingredientFlexCard}>
            <Text style={styles.textLeftBold}>{props.ingredientName}</Text>
          </View>
          <View style={styles.favFlex}>
            <Pressable
              onPress={saveCard}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              {favorite ? (
                <CustomIcon
                  name="star"
                  filled={true}
                  color={theme.favoriteColor}
                  size={30}
                />
              ) : (
                <CustomIcon
                  name="star"
                  filled={false}
                  color={theme.favoriteColor}
                  size={30}
                />
              )}
            </Pressable>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}
