import { View, Text, ColorValue } from "react-native";
import React, { ReactNode } from "react";
import { useStyles } from "@/styles/auth.styles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { useTheme, useIsDarkMode } from "@/contexts/ColorSchemeContext";
import AppImage from "@/components/universal/AppImage";
import icons3d from "@/components/universal/3dIcons";
import { FilterImage } from "react-native-svg/filter-image";
import { lightenColor, hexToRgba } from "@/utils/color";
import { useTintedBoxShadow } from "@/hooks/useBoxShadow";
import { moderateScale, scale } from "@/utils/responsive";

type Props = {
  title: string;
  description: string;
  unlocked: boolean;
  emoji: string;
  color: ColorValue;
};

const Achievement = (props: Props) => {
  const styles = useStyles();
  const theme = useTheme();
  const isDark = useIsDarkMode();
  const cardShadow = useTintedBoxShadow(
    props.unlocked ? (props.color as string) : theme.unselectedGrey,
  );
  return (
    <View
      style={[
        styles.savesCard,
        cardShadow,
        {
          backgroundColor: props.unlocked
            ? isDark
              ? hexToRgba(props.color as string, 0.8)
              : lightenColor(props.color as string, 0.6)
            : theme.unselectedGrey,
        },
      ]}
    >
      {!props.unlocked && (
        <AppImage
          source={icons3d["Lock"]}
          style={{
            width: scale(30),
            height: scale(30),
            position: "absolute",
            top: moderateScale(15),
            right: moderateScale(15),
          }}
        ></AppImage>
      )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: moderateScale(20),
          paddingRight: moderateScale(props.unlocked ? 10 : 40),
        }}
      >
        <View>
          <FilterImage
            source={icons3d[props.emoji]}
            style={[
              {
                width: scale(45),
                height: scale(45),
              },
              !props.unlocked ? ({ filter: "grayscale(100%)" } as any) : {},
            ]}
          ></FilterImage>
        </View>
        <View style={{ gap: moderateScale(3), flex: 1 }}>
          <Text
            adjustsFontSizeToFit
            minimumFontScale={0.8}
            style={[
              styles.textLeftBold,
              {
                fontFamily: "Nunito-Bold",

                color: theme.basicText,
              },
            ]}
          >
            {props.title}
          </Text>

          <Text
            style={[
              styles.textLeftBold,
              {
                fontFamily: "Nunito-SemiBold",
                fontSize: moderateScale(13),
                color: theme.placeholderText,
                flexWrap: "wrap",
              },
            ]}
          >
            {props.description}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Achievement;
