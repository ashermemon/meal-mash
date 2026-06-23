import { Pressable, Text, View } from "react-native";
import React from "react";
import IngredientTag from "./IngredientTag";
import AddIngredientTag from "./AddIngredientTag";
import { styles } from "@/styles/auth.styles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { NEWCOLORS } from "@/constants/NewTheme";

type Props = {
  ingredients: string[];
  title: string;
};

const LONG_THRESHOLD = 8;
const TOTAL_SLOTS = 4;

const getSlots = (name: string): 1 | 2 =>
  name.length >= LONG_THRESHOLD ? 2 : 1;

const IngredientHeaderSection = (props: Props) => {
  const allRows: string[][] = [];
  let currentRow: string[] = [];
  let currentSlots = 0;

  for (const ingredient of props.ingredients) {
    const slots = getSlots(ingredient);
    if (currentSlots + slots > TOTAL_SLOTS) {
      allRows.push(currentRow);
      currentRow = [ingredient];
      currentSlots = slots;
    } else {
      currentRow.push(ingredient);
      currentSlots += slots;
    }
  }
  if (currentRow.length > 0) {
    allRows.push(currentRow);
  }

  const lastRowSlots =
    allRows.length > 0
      ? allRows[allRows.length - 1].reduce(
          (acc, name) => acc + getSlots(name),
          0,
        )
      : 0;

  if (allRows.length === 0 || lastRowSlots >= TOTAL_SLOTS) {
    allRows.push([]);
  }

  const fullRows = allRows.slice(0, -1);
  const lastRowItems = allRows[allRows.length - 1] ?? [];

  const lastUsedSlots = lastRowItems.reduce(
    (acc, name) => acc + getSlots(name),
    0,
  );
  const fill = TOTAL_SLOTS - 1 - lastUsedSlots;

  return (
    <View>
      <View
        style={{ flexDirection: "row", marginBottom: 20, alignItems: "center" }}
      >
        <Pressable style={{ marginRight: 5 }}>
          <CustomIcon
            name="down-small"
            filled={true}
            color={NEWCOLORS.placeholderText}
            size={25}
          />
        </Pressable>
        <Text
          style={[
            styles.basicTextLeft,
            { fontFamily: "Nunito-SemiBold", fontSize: 17 },
          ]}
        >
          {props.title}:
        </Text>
      </View>
      <View style={{ gap: 15 }}>
        {fullRows.map((row: string[], rowIndex: number) => (
          <View
            key={rowIndex}
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            {row.map((ingredientName: string, colIndex: number) => (
              <IngredientTag
                key={colIndex}
                ingredientName={ingredientName}
                flex={getSlots(ingredientName)}
              />
            ))}
          </View>
        ))}

        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          {lastRowItems.map((ingredientName: string, colIndex: number) => (
            <IngredientTag
              key={colIndex}
              ingredientName={ingredientName}
              flex={getSlots(ingredientName)}
            />
          ))}
          <AddIngredientTag />
          {Array.from({ length: fill }).map((_, i) => (
            <View
              key={`filler-${i}`}
              style={[
                styles.ingredientPill,
                {
                  height: 30,
                  backgroundColor: "transparent",
                  shadowOpacity: 0,
                  elevation: 0,
                  boxShadow: "none",
                },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default IngredientHeaderSection;
