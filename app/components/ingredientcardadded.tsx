import { styles } from "@/styles/auth.styles";
import { Pressable, View, Text } from "react-native";
import { Image } from "expo-image";
import { COLORS } from "@/constants/theme";
import { useContext, useState } from "react";
import emojiImages from "./emoji-images";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
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

type CardProps = {
  cardBColor: string;
  ingredientName: string;
  leftover: boolean;
  borderColor: string;
};

export default function IngredientCardAdded(props: CardProps) {
  var hsl = require("hsl-to-hex");
  const [hue] = useState(() => Math.random() * 359);
  const backgroundColor = hsl(hue, 88, 97);
  const strokeColor = hsl(hue, 45, 79);
  const [ingredients, setIngredients] = useContext(IngredientsContext);
  const [leftovers, setLeftovers] = useContext(LeftoversContext);
  const [leftoversEnabled, setLeftoversEnabled] = useContext(LeftoversEnabled);
  const ingredientImage =
    emojiImages[props.ingredientName] || emojiImages.Default;

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
  };

  return (
    <Animated.View
      style={{
        backgroundColor: "#ff9191",
      }}
    >
      <ReanimatedSwipeable
        friction={3}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        overshootFriction={1}
        renderRightActions={() => (
          <Pressable style={styles.swipeable} onPress={removeCard}>
            <Text style={[styles.deleteText]}>Delete</Text>
          </Pressable>
        )}
      >
        <View
          style={[
            {
              borderColor: props.borderColor,
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
