import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { styles } from "@/styles/GlobalStyles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { NEWCOLORS } from "@/constants/NewTheme";
import InfoTag, { difficultyShape } from "../features/recipe/InfoTag";
import { TextInput } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { useTrueSheet } from "@/contexts/TrueSheetContext";

type Props = {
  title: string;
  selections: string[];
  options: string[];
  setSelection: React.Dispatch<React.SetStateAction<string[]>>;
};

const containsEmoji = (text: string) => /\p{Extended_Pictographic}/u.test(text);
const DropDownPill = (props: Props) => {
  const { openSheet } = useTrueSheet();

  const openDropDown = (title: string, options: string[]) => {
    Haptics.selectionAsync();
    openSheet(
      options,
      (selected) => {
        if (selected.length === 0) {
          const defaultVal = title.toLowerCase().includes("dietary")
            ? "None"
            : "Any";
          props.setSelection([defaultVal]);
        } else if (selected.length === options.length) {
          if (!title.toLowerCase().includes("dietary")) {
            const defaultVal = "Any";

            props.setSelection([defaultVal]);
          }
        } else {
          props.setSelection(selected);
        }
      },
      title,
      props.selections,
    );
  };

  const displayText =
    props.selections.length > 1 ? "Multiple" : props.selections[0];

  return (
    <Pressable
      onPress={() => openDropDown(props.title, props.options)}
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
            <Text
              style={[styles.textCentered, { fontSize: 12.5 }]}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              {props.title.toLowerCase().includes("cuisine") &&
              displayText.toLowerCase() != "multiple" &&
              displayText.toLowerCase() != "any"
                ? displayText.substring(0, 4)
                : displayText}
            </Text>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View>
              <CustomIcon
                name="down-small"
                filled={true}
                color="grey"
                size={25}
              />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default DropDownPill;
