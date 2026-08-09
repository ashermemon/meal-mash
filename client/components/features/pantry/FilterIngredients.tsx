import { View, Text, Pressable } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { styles } from "@/styles/auth.styles";
import { NEWCOLORS } from "@/constants/NewTheme";
import { ScrollView } from "react-native-gesture-handler";

type Props = {
  categories: string[];
  currentSelected: string;
  setCurrentSelected: Dispatch<SetStateAction<string>>;
};

const FilterIngredients = (props: Props) => {
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
        marginBottom: 5,
      }}
    >
      {props.categories.map((string, index: number) => (
        <Pressable
          key={index}
          onPress={() => props.setCurrentSelected(string)}
          style={[
            styles.selectPill,
            styles.basicBoxShadow,
            {
              justifyContent: "center",
              alignItems: "center",

              width: string.length >= 12 ? 140 : 90,
              height: 30,
              backgroundColor:
                props.currentSelected.toLowerCase() === string.toLowerCase()
                  ? NEWCOLORS.greenAccent
                  : NEWCOLORS.unselectedGrey,
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
                    ? "white"
                    : NEWCOLORS.basicText,
              },
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {string}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default FilterIngredients;
