import { styles } from "@/styles/auth.styles";
import { Pressable, View, Text } from "react-native";
import { Image } from "expo-image";
import { COLORS } from "@/constants/theme";
import { useContext, useEffect, useRef, useState } from "react";
import emojiImages from "./emoji-images";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import {
  Gesture,
  GestureDetector,
  Swipeable,
} from "react-native-gesture-handler";
import { red } from "react-native-reanimated/lib/typescript/Colors";
import IngredientsContext from "../contexts/IngredientsContext";
import LeftoversContext from "../contexts/LeftoversContext";
import LeftoversEnabled from "../contexts/LeftoversOn";
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
import { LinearGradient } from "expo-linear-gradient";
import FavIcon from "../Icons/FavIcon";
import DiscardIcon from "../Icons/DiscardIcon";
import FavIconFilled from "../Icons/FavIconFilled";
import { storage } from "./storage";

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

  useEffect(() => {
    const stored = storage.getString("favorites");
    const favorites = stored ? JSON.parse(stored) : [];
    setFavorite(favorites.includes(props.ingredientName));
  }, []);
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
  const saveCard = () => {
    setFavorite((prev) => !prev);

    swipeableRef.current?.close();

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
            <Pressable style={styles.swipeable} onPress={removeCard}>
              <DiscardIcon
                iconsetcolor={"#FFEFEE"}
                setheight={35}
              ></DiscardIcon>
            </Pressable>
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
          <View style={styles.ingredientPanel}>
            <View style={styles.ingredientFlexEmojiCard}>
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
            </View>
            <View style={styles.ingredientFlexCard}>
              <Text style={styles.textLeftBold}>{props.ingredientName}</Text>
            </View>
          </View>
        </View>
      </ReanimatedSwipeable>
    </Animated.View>
  );
}
