import { View, Text, ColorValue } from "react-native";
import React, { ReactNode } from "react";
import { useStyles } from "@/styles/auth.styles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { useTheme, useIsDarkMode } from "@/contexts/ColorSchemeContext";
import { Image } from "expo-image";
import icons3d from "@/components/universal/3dIcons";
import { FilterImage } from "react-native-svg/filter-image";
import { lightenColor, hexToRgba } from "@/utils/color";

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
  return (
    <View
      style={[
        styles.savesCard,
        styles.basicBoxShadow,
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
        <Image
          source={icons3d["Lock"]}
          style={{
            width: 30,
            height: 30,
            position: "absolute",
            top: 15,
            right: 15,
          }}
        ></Image>
      )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: props.unlocked ? 10 : 40,
        }}
      >
        <View>
          <FilterImage
            source={icons3d[props.emoji]}
            style={[
              {
                width: 45,
                height: 45,
              },
              !props.unlocked ? ({ filter: "grayscale(100%)" } as any) : {},
            ]}
          ></FilterImage>
        </View>
        <View style={{ gap: 3, flex: 1 }}>
          <Text
            adjustsFontSizeToFit
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
                fontSize: 13,
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
