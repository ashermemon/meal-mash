import { View, Text, Pressable } from "react-native";
import React, { Dispatch, useState } from "react";
import { useStyles } from "@/styles/GlobalStyles";
import { useTheme, useIsDarkMode } from "@/contexts/ColorSchemeContext";
import { CustomIcon } from "@/icon-loader/icon-loader";
import * as Haptics from "expo-haptics";
import { getTintedBoxShadow } from "@/utils/shadow";
import { moderateScale, scale } from "@/utils/responsive";

type Props = {
  options: string[];
  icons: string[];
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
};

const ListButtonSelect = (props: Props) => {
  const styles = useStyles();
  const theme = useTheme();
  const isDark = useIsDarkMode();
  return (
    <View style={{ gap: moderateScale(25) }}>
      {props.options.map((option: string, index: number) => {
        const buttonBackgroundColor =
          index === props.selected ? theme.greenAccent : theme.unselectedGrey;
        return (
        <Pressable
          style={[
            styles.selectButton,
            getTintedBoxShadow(buttonBackgroundColor, isDark),
            {
              backgroundColor: buttonBackgroundColor,
              paddingHorizontal: moderateScale(30),
              flexDirection: "row",
              position: "relative",
              justifyContent: "space-around",
              alignItems: "center",
            },
          ]}
          onPress={() => {
            props.setSelected(index);
            Haptics.selectionAsync();
          }}
          key={index}
        >
          {index === props.selected && (
            <View
              style={{
                position: "absolute",
                top: moderateScale(-10),
                right: moderateScale(-10),
                width: scale(30),
                height: scale(30),
                borderRadius: scale(17),
                backgroundColor: theme.greenBlock,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomIcon
                name="check"
                filled
                color={theme.greenAccent}
                size={15}
              />
            </View>
          )}
          <View>
            <CustomIcon
              name={props.icons[index]}
              filled
              color={
                index === props.selected ? theme.pureWhite : theme.basicText
              }
              size={30}
            ></CustomIcon>
          </View>
          <Text
            style={[
              styles.textCentered,
              {
                fontSize: moderateScale(24),
                flex: 1,
                color:
                  index === props.selected ? theme.pureWhite : theme.basicText,
                fontFamily: "Nunito-Medium",
              },
            ]}
          >
            {option}
          </Text>
        </Pressable>
        );
      })}
    </View>
  );
};

export default ListButtonSelect;
