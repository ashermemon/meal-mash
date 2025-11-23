import { styles } from "@/styles/auth.styles";
import { Pressable, View, Text } from "react-native";
import { Image } from "expo-image";
import { COLORS } from "@/constants/theme";
import { useContext, useEffect, useRef, useState } from "react";
import emojiImages from "@/components/emoji-images";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import IngredientsContext from "@/contexts/IngredientsContext";
import LeftoversContext from "@/contexts/LeftoversContext";
import LeftoversEnabled from "@/contexts/LeftoversOn";
import Animated, {
  Easing,
  FadeIn,
  FadeInLeft,
  FadeInRight,
  FadeOut,
  FadeOutUp,
  SlideInDown,
  SlideOutUp,
} from "react-native-reanimated";

import { storage } from "../utils/storage";
import FavoritesContext from "../contexts/FavoritesContext";
import FavLeftoversContext from "../contexts/FavLeftoversContext";
import { CustomIcon } from "@/icon-loader/icon-loader";

type CardProps = {
  cardBColor: string;
  ingredientName: string;
  leftover: boolean;
  borderColor: string;
};

export default function IngredientCardAdded(props: CardProps) {
  const swipeableRef = useRef<any>(null);
  var hsl = require("hsl-to-hex");
  const [hue] = useState(() => Math.random() * 359);
  const backgroundColor = hsl(hue, 88, 97);
  const strokeColor = hsl(hue, 45, 79);
  const [ingredients, setIngredients] = useContext(IngredientsContext);
  const [leftovers, setLeftovers] = useContext(LeftoversContext);
  const [leftoversEnabled, setLeftoversEnabled] = useContext(LeftoversEnabled);

  const [favorite, setFavorite] = useState(false);
  const ingredientImage =
    emojiImages[props.ingredientName] || emojiImages.Default;
  const [favorites, setFavorites] = useContext(FavoritesContext);
  const [favoritesL, setFavoritesL] = useContext(FavLeftoversContext);

  useEffect(() => {
    setFavorite(
      favorites.includes(props.ingredientName) ||
        favoritesL.includes(props.ingredientName)
    );
  }, [favorites, favoritesL, props.ingredientName]);
  const removeCard = () => {
    if (props.leftover) {
      setLeftovers((prevLeftovers) =>
        prevLeftovers.filter((item) => item !== props.ingredientName)
      );
    } else {
      setIngredients((prevIngredients) =>
        prevIngredients.filter((item) => item !== props.ingredientName)
      );
    }
    swipeableRef.current?.close();
  };
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

    swipeableRef.current?.close();

    alert(
      `${props.ingredientName} was ${
        favorite ? `removed from favorites` : `favorited`
      }`
    );
  };

  return (
    <Animated.View style={{ backgroundColor: COLORS.favoriteColor }}>
      <ReanimatedSwipeable
        ref={swipeableRef}
        friction={2.5}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        leftThreshold={40}
        overshootFriction={1.5}
        renderRightActions={() => (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",

                width: "45%",
              }}
            >
              <Pressable
                style={[styles.favSave, { flex: 1 }]}
                onPress={saveCard}
              >
                {favorite ? (
                  <CustomIcon
                    name="star"
                    filled={true}
                    color={"#FFF7EE"}
                    size={30}
                  />
                ) : (
                  <CustomIcon
                    name="star"
                    filled={false}
                    color={"#FFF7EE"}
                    size={30}
                  ></CustomIcon>
                )}
              </Pressable>
              <Pressable
                style={[styles.swipeable, { flex: 1 }]}
                onPress={removeCard}
              >
                <CustomIcon
                  name="close"
                  filled={true}
                  color={"#FFEFEE"}
                  size={30}
                />
              </Pressable>
            </View>
          </>
        )}
      >
        <View
          style={[
            {
              borderTopColor: props.borderColor,
              borderBottomColor: props.borderColor,
              backgroundColor: props.cardBColor,
            },
            styles.addContainerIngredient,
          ]}
        >
          <View
            style={[
              styles.emojiWrapCard,
              {
                borderColor: strokeColor,
                backgroundColor: backgroundColor,
              },
            ]}
          >
            <Image
              style={styles.ingredientEmoji}
              source={ingredientImage}
            ></Image>
          </View>

          <View style={styles.ingredientFlexCard}>
            <Text style={styles.textLeftBold}>{props.ingredientName}</Text>
          </View>
        </View>
      </ReanimatedSwipeable>
    </Animated.View>
  );
}
