import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { styles } from "@/styles/GlobalStyles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { TextInput } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { useTrueSheet } from "@/contexts/TrueSheetContext";

type Props = {
  title: string;
  selections: string[];
  options: string[];
  setSelection: React.Dispatch<React.SetStateAction<string[]>>;
};

export function splitEmojiAndText(str: string): {
  emoji: string;
  text: string;
} {
  if (!str) return { emoji: "", text: "" };
  const emojiRegex =
    /^([\p{Extended_Pictographic}\p{Regional_Indicator}\p{Emoji_Presentation}\p{Emoji_Modifier}\p{Emoji_Modifier_Base}\u200d\uFE0F\uFE0E]+)/u;
  const match = str.match(emojiRegex);
  if (match) {
    const emoji = match[1];
    const text = str.slice(emoji.length).trim();
    return { emoji, text };
  }
  return { emoji: "", text: str };
}

export function getDisplayLabel(selections: string[], title: string): string {
  if (!selections || selections.length === 0) {
    return title.toLowerCase().includes("dietary") ? "None" : "Any";
  }

  const firstLower = selections[0].toLowerCase();
  if (
    selections.length === 1 &&
    (firstLower === "any" || firstLower === "none")
  ) {
    return selections[0];
  }

  if (selections.length > 3) {
    return "Multiple";
  }

  return selections
    .map((item) => {
      const { emoji, text } = splitEmojiAndText(item);
      if (emoji) {
        return emoji;
      }
      const cleanText = text.trim();
      return cleanText.slice(0, 4);
    })
    .join("  ");
}

export function openDropDown(
  openSheet: (
    options: string[],
    onSelect: (options: string[]) => void,
    title: string,
    selected?: string[],
  ) => void,
  title: string,
  options: string[],
  selections: string[],
  setSelection: React.Dispatch<React.SetStateAction<string[]>>,
  ingredientPickerCard?: boolean,
) {
  Haptics.selectionAsync();
  openSheet(
    options,
    (selected) => {
      if (selected.length === 0) {
        if (title.toLowerCase().includes("dietary")) {
          setSelection(["None"]);
        } else if (ingredientPickerCard) {
          setSelection([]);
        } else {
          setSelection(["Any"]);
        }
      } else if (
        selected.length === options.length &&
        !title.toLowerCase().includes("dietary") &&
        !ingredientPickerCard
      ) {
        setSelection(["Any"]);
      } else {
        setSelection(selected);
      }
    },
    title,
    selections,
  );
}

const DropDownPill = (props: Props) => {
  const { openSheet } = useTrueSheet();

  return (
    <Pressable
      onPress={() =>
        openDropDown(
          openSheet,
          props.title,
          props.options,
          props.selections,
          props.setSelection,
        )
      }
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
              width: 105,
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
              style={[
                styles.textCentered,
                { fontSize: 16, paddingHorizontal: 3 },
              ]}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              {getDisplayLabel(props.selections, props.title)}
            </Text>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View>
              <CustomIcon
                name="down-small"
                filled={true}
                color="grey"
                size={30}
              />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default DropDownPill;
