import { View, Text, Pressable } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { NEWCOLORS } from "@/constants/NewTheme";

type Props = {
  currentOptions: string[];
  sheetRef: React.RefObject<TrueSheet | null>;
  currentOnSelect: ((option: string) => void) | null;
};

const TrueSheetContent = (props: Props) => {
  return (
    <View>
      <ScrollView
        style={{
          paddingHorizontal: 20,
          paddingVertical: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {props.currentOptions.map((option, index) => (
          <Pressable
            key={index}
            onPress={() => {
              props.currentOnSelect?.(option);
              props.sheetRef?.current?.dismiss();
            }}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 15,
              borderRadius: 1000,
              backgroundColor: NEWCOLORS.unselectedGrey,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Nunito-Regular",
              }}
            >
              {option}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default TrueSheetContent;
