import { View, Text, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { NEWCOLORS } from "@/constants/NewTheme";
import * as Haptics from "expo-haptics";
import CustomCheckbox from "./CustomCheckbox";
import { useTrueSheet } from "@/contexts/TrueSheetContext";
import { splitEmojiAndText } from "./DropDownPill";

type Props = {
  currentOptions: string[];
  sheetRef: React.RefObject<TrueSheet | null>;
  currentOnSelect: ((options: string[]) => void) | null;
};

const TrueSheetContent = (props: Props) => {
  const { currentSelected } = useTrueSheet();
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setSelected(
      currentSelected.filter((item) => item !== "Any" && item !== "None"),
    );
  }, [currentSelected]);

  const toggleOption = (option: string) => {
    const cleanSelected = selected.filter(
      (item) => item !== "Any" && item !== "None",
    );
    const newSelected = cleanSelected.includes(option)
      ? cleanSelected.filter((item) => item !== option)
      : [...cleanSelected, option];
    setSelected(newSelected);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    props.currentOnSelect?.(newSelected);
  };

  return (
    <View>
      <ScrollView
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {props.currentOptions.map((option, index) => {
          const { emoji, text } = splitEmojiAndText(option);
          return (
            <Pressable
              key={index}
              onPress={() => toggleOption(option)}
              style={{
                paddingVertical: 15,
                paddingHorizontal: 20,
                borderRadius: 1000,
                backgroundColor: NEWCOLORS.unselectedGrey,
                marginBottom: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                {emoji ? (
                  <Text
                    style={{
                      fontSize: 18,
                      marginRight: 8,
                    }}
                  >
                    {emoji}
                  </Text>
                ) : null}
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Nunito-Regular",
                    flex: 1,
                  }}
                  numberOfLines={1}
                >
                  {text}
                </Text>
              </View>
              <CustomCheckbox
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                size={24}
              />
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TrueSheetContent;
