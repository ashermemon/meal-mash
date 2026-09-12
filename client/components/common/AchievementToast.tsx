import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import AppImage from "@/components/universal/AppImage";
import icons3d from "@/components/universal/3dIcons";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { getAchievementDefinition } from "@/constants/Achievements";
import { useIsDarkMode, useTheme } from "@/contexts/ColorSchemeContext";
import { useTintedBoxShadow } from "@/hooks/useBoxShadow";
import { hexToRgba, lightenColor } from "@/utils/color";
import { Image } from "expo-image";
import { moderateScale, scale } from "@/utils/responsive";

export type AchievementToastProps = {
  achievementId: string;
};

type Props = AchievementToastProps & {
  onPress?: () => void;
};

const AchievementToast = ({ achievementId, onPress }: Props) => {
  const theme = useTheme();
  const isDark = useIsDarkMode();
  const achievement = getAchievementDefinition(achievementId);

  const accent = achievement ? theme[achievement.colorKey] : theme.greyBlock;
  const cardShadow = useTintedBoxShadow(accent, "glow");

  const iconScale = 0.85;

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale }],
  }));

  if (!achievement) return null;

  return (
    <Pressable
      onPress={onPress}
      style={[
        cardShadow,
        {
          width: "92%",
          maxWidth: 480,
          alignSelf: "center",
          flexDirection: "row",
          alignItems: "center",
          gap: moderateScale(18),
          paddingVertical: moderateScale(12),
          paddingHorizontal: moderateScale(14),
          borderRadius: moderateScale(22),
          borderWidth: 1,
          borderColor: hexToRgba(accent, isDark ? 0.55 : 0.9),
          backgroundColor: theme.cardWhite,
        },
      ]}
    >
      <View
        style={{
          width: scale(54),
          height: scale(54),
          borderRadius: scale(17),
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isDark
            ? hexToRgba(accent, 0.85)
            : lightenColor(accent, 0.45),
        }}
      >
        <Animated.View style={iconStyle}>
          <Image
            source={icons3d[achievement.emoji] ?? icons3d.Default}
            style={{ width: scale(34), height: scale(34) }}
          />
        </Animated.View>
      </View>

      <View style={{ flex: 1, gap: moderateScale(1) }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: moderateScale(5),
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontFamily: "Nunito-Bold",
              fontSize: moderateScale(12),
              letterSpacing: 1.6,
              color: theme.yellowAccent,
            }}
          >
            Achievement Unlocked
          </Text>
        </View>

        <Text
          numberOfLines={1}
          style={{
            fontFamily: "Nunito-Bold",
            fontSize: moderateScale(19),
            color: theme.basicText,
          }}
        >
          {achievement.title}
        </Text>
      </View>

      <View style={{ paddingRight: moderateScale(4) }}>
        <CustomIcon
          name="arrow-right"
          size={24}
          color={theme.placeholderText}
        />
      </View>
    </Pressable>
  );
};

export default AchievementToast;
