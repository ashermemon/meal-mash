import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { styles } from "@/styles/GlobalStyles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { NEWCOLORS } from "@/constants/NewTheme";
import InfoTag, { difficultyShape } from "../features/recipe/InfoTag";
import { TextInput } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { useBottomSheet } from "@/contexts/BottomSheetContext";

type Props = {
  title: string;
  selections: string[];
  options: string[];
  setSelection: React.Dispatch<React.SetStateAction<string[]>>;
};

const DropDownPill = (props: Props) => {
  const { openBottomSheet } = useBottomSheet();

  const openDropDown = (title: string, options: string[]) => {
    Haptics.selectionAsync();
    openBottomSheet();
  };
  return (
    <View
      style={{
        gap: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text style={[styles.textLeftSemiBold, { fontSize: 17 }]}>
        {props.title}
      </Text>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View
          style={[
            styles.selectPill,
            styles.basicBoxShadow,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 9,
              width: 95,
              flex: 0,
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",

              flex: 1,
            }}
          >
            <Text style={[styles.textCentered, { fontSize: 12.5 }]}>
              {props.selections[0]}
            </Text>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Pressable
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              onPress={() => openDropDown(props.title, props.options)}
            >
              <CustomIcon
                name="down-small"
                filled={true}
                color="grey"
                size={25}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DropDownPill;
