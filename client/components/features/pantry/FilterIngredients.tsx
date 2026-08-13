import { View, Text, Pressable } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { useStyles } from "@/styles/GlobalStyles";
import { useTheme } from "@/contexts/ColorSchemeContext";
import { getCategoryDisplayLabel } from "@/constants/categoryLabels";
import { ScrollView } from "react-native-gesture-handler";

type Props = {
  categories: string[];
  currentSelected: string;
  setCurrentSelected: Dispatch<SetStateAction<string>>;
};

const FilterIngredients = (props: Props) => {
  const styles = useStyles();
  const theme = useTheme();
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
        gap: 10,
        marginBottom: 10,
      }}
    >
      {props.categories.map((string, index: number) => {
        const label = getCategoryDisplayLabel(string);
        return (
          <Pressable
            key={index}
            onPress={() => props.setCurrentSelected(string)}
            style={[
              styles.selectPill,
              styles.basicBoxShadow,
              {
                justifyContent: "center",
                alignItems: "center",

                width: label.length >= 12 ? 140 : 90,
                height: 30,
                backgroundColor:
                  props.currentSelected.toLowerCase() === string.toLowerCase()
                    ? theme.greenAccent
                    : theme.unselectedGrey,
              },
            ]}
          >
            <Text
              style={[
                styles.basicTextCenter,
                {
                  paddingHorizontal: 7,
                  color:
                    props.currentSelected.toLowerCase() === string.toLowerCase()
                      ? theme.pureWhite
                      : theme.basicText,
                },
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit
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
