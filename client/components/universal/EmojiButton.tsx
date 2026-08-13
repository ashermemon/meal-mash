import { Text, Pressable, StyleProp, ViewStyle } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { useTheme } from "@/contexts/ColorSchemeContext";

export const EMOJIS = [
  "🍄",
  "🥑",
  "🥔",
  "🥕",
  "🌽",
  "🌶️",
  "🫑",
  "🥒",
  "🥬",
  "🥦",
  "🧄",
  "🧅",
  "🥜",
  "🫛",
  "🍄‍🟫",
  "🫜",
  "🍞",
  "🥐",
  "🥖",
  "🥨",
  "🥯",
  "🧇",
  "🧀",
  "🍔",
  "🍟",
  "🍕",
  "🌭",
  "🥪",
  "🌮",
  "🌯",
  "🥙",
  "🍳",
  "🥣",
  "🥗",
  "🍿",
  "🍱",
  "🍛",
  "🍜",
  "🍝",
  "🥟",
  "🦀",
  "🦞",
  "🦐",
  "🦑",
  "🍦",
  "🍧",
  "🍨",
  "🍩",
  "🍪",
  "🎂",
  "🍰",
  "🧁",
  "🥧",
  "🍫",
  "🍬",
  "🍭",
  "🍽️",
  "🍴",
  "🥄",
];

type Props = {
  emoji: string;
  onEmojiChange?: (newEmoji: string) => void;
  editable?: boolean;
  fontSize?: number;
  iconSize?: number;
  style?: StyleProp<ViewStyle>;
};

const EmojiButton = ({
  emoji,
  onEmojiChange,
  editable = true,
  fontSize = 18,
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
    const randomIndex = Math.floor(Math.random() * EMOJIS.length);
    const nextEmoji = EMOJIS[randomIndex];
    onEmojiChange(nextEmoji);
  };

  if (!editable) {
    return (
      <Animated.View style={style}>
        {emoji === "" ? (
          <CustomIcon
            size={iconSize}
            name={"emoji"}
            filled={false}
            color={theme.unselectedShape}
          />
        ) : (
          <Text style={{ fontSize }}>{emoji}</Text>
        )}
      </Animated.View>
    );
  }

  return (
    <Pressable
      onPressIn={() => (pressed.value = true)}
      onPressOut={() => (pressed.value = false)}
      onPress={handlePress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Animated.View style={[style, animatedStyle]}>
        {emoji === "" ? (
          <CustomIcon
            size={iconSize}
            name={"emoji"}
            filled={false}
            color={theme.unselectedShape}
          />
        ) : (
          <Text style={{ fontSize }}>{emoji}</Text>
        )}
      </Animated.View>
    </Pressable>
  );
};

export default EmojiButton;
