import { Pressable, StyleProp, ViewStyle } from "react-native";
import React from "react";
import { Image } from "expo-image";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { useTheme } from "@/contexts/ColorSchemeContext";
import icons3d from "@/components/universal/3dIcons";

// Food-appropriate subset of the 3D icon set (excludes generic app icons
// like Clock, Lock, Medal, RecipeBook, Trophy, World, Fire, Float, Default).
export const PANTRY_ICONS = [
  "Apple",
  "Burger",
  "Burrito",
  "Cake",
  "Carrot",
  "Coffee",
  "Cookies",
  "Croissant",
  "CupCake",
  "Donut",
  "EggAndBacon",
  "Eggplant",
  "Fries",
  "HotDog",
  "IceCream",
  "Lollipop",
  "LollipopSwirl",
  "Macaroon",
  "Meat",
  "Pancake",
  "Peach",
  "Pizza",
  "Popsicle",
  "Pretzel",
  "Rice",
  "Salad",
  "Steak",
  "SushiCaviar",
  "Taco",
];

type Props = {
  emoji: string;
  onEmojiChange?: (nextIcon: string) => void;
  editable?: boolean;
  iconSize?: number;
  style?: StyleProp<ViewStyle>;
};

const EmojiButton = ({
  emoji,
  onEmojiChange,
  editable = true,
  iconSize = 22,
  style,
}: Props) => {
  const theme = useTheme();
  const pressed = useSharedValue<boolean>(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withTiming(pressed.value ? 1.25 : 1, { duration: 150 }) },
      ],
    };
  });

  const handlePress = () => {
    if (!editable || !onEmojiChange) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    const randomIndex = Math.floor(Math.random() * PANTRY_ICONS.length);
    const nextIcon = PANTRY_ICONS[randomIndex];
    onEmojiChange(nextIcon);
  };

  const iconContent =
    emoji === "" ? (
      <CustomIcon
        size={iconSize === 32 ? iconSize * 0.7 : iconSize * 0.9}
        name={"emoji"}
        filled={false}
        color={theme.placeholderText}
      />
    ) : (
      <Image
        source={icons3d[emoji] || icons3d.Default}
        style={{ width: iconSize, height: iconSize }}
        contentFit="contain"
      />
    );

  if (!editable) {
    return <Animated.View style={style}>{iconContent}</Animated.View>;
  }

  return (
    <Pressable
      onPressIn={() => (pressed.value = true)}
      onPressOut={() => (pressed.value = false)}
      onPress={handlePress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Animated.View style={[style, animatedStyle]}>
        {iconContent}
      </Animated.View>
    </Pressable>
  );
};

export default EmojiButton;
