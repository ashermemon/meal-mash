import { View, Text, Pressable } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { useStyles } from "@/styles/GlobalStyles";
import { useTheme, useIsDarkMode } from "@/contexts/ColorSchemeContext";
import { getCategoryDisplayLabel } from "@/constants/categoryLabels";
import { ScrollView } from "react-native-gesture-handler";
import { getTintedBoxShadow } from "@/utils/shadow";
import { moderateScale, scale } from "@/utils/responsive";

type Props = {
  categories: string[];
  currentSelected: string;
  setCurrentSelected: Dispatch<SetStateAction<string>>;
};

const FilterIngredients = (props: Props) => {
  const styles = useStyles();
  const theme = useTheme();
  const isDark = useIsDarkMode();
  return (
    <ScrollView
      horizontal
      overScrollMode="never"
      alwaysBounceVertical={false}
      alwaysBounceHorizontal={false}
      contentContainerStyle={{
        flexDirection: "row",
        justifyContent: "flex-start",

        alignItems: "center",
        gap: moderateScale(10),
        marginBottom: moderateScale(10),
      }}
    >
      {props.categories.map((string, index: number) => {
        const label = getCategoryDisplayLabel(string);
        const pillBackgroundColor =
          props.currentSelected.toLowerCase() === string.toLowerCase()
            ? theme.greenAccent
            : theme.unselectedGrey;
        return (
          <Pressable
            key={index}
            onPress={() => props.setCurrentSelected(string)}
            style={[
              styles.selectPill,
              getTintedBoxShadow(pillBackgroundColor, isDark),
              {
                justifyContent: "center",
                alignItems: "center",

                width: scale(label.length >= 12 ? 140 : 90),
                height: scale(30),
                backgroundColor: pillBackgroundColor,
              },
            ]}
          >
            <Text
              style={[
                styles.basicTextCenter,
                {
                  paddingHorizontal: moderateScale(7),
                  color:
                    props.currentSelected.toLowerCase() === string.toLowerCase()
                      ? theme.pureWhite
                      : theme.basicText,
                },
              ]}
              numberOfLines={1}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default FilterIngredients;
