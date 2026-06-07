import { View, Text, Pressable } from "react-native";
import React from "react";
import { styles } from "@/styles/GlobalStyles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { NEWCOLORS } from "@/constants/NewTheme";
import InfoTag, { difficultyShape } from "../features/recipe/InfoTag";

type Props = {
  title: string;
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
  labels: string[];
  diff?: boolean;
};

const MultiSelectPills = (props: Props) => {
  return (
    <View
      style={{
        gap: 12,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Text style={[styles.textLeftSemiBold, { fontSize: 17 }]}>
        {props.title}
      </Text>

      <View style={{ flex: 1, flexDirection: "row", gap: 8 }}>
        {props.labels.map((label, index) => (
          <Pressable
            onPress={() =>
              props.setSelected((prev) =>
                prev.includes(index)
                  ? prev.filter((prev2) => prev2 !== index)
                  : [...prev, index],
              )
            }
            style={[
              styles.selectPill,
              styles.basicBoxShadow,
              {
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 9,
                ...(props.diff
                  ? { flex: undefined, flexGrow: 1, flexBasis: "auto" }
                  : {}),
              },
              props.selected.includes(index)
                ? props.diff
                  ? label === "Easy"
                    ? { backgroundColor: NEWCOLORS.greenBlock }
                    : label === "Intermediate"
                      ? { backgroundColor: NEWCOLORS.blueBlock }
                      : { backgroundColor: NEWCOLORS.redBlock }
                  : { backgroundColor: NEWCOLORS.greenAccent }
                : { backgroundColor: NEWCOLORS.unselectedGrey },
            ]}
            key={index}
          >
            {props.diff ? (
              difficultyShape(label, !props.selected.includes(index), true)
            ) : (
              <></>
            )}
            <Text
              style={[
                styles.textCentered,
                { flexGrow: 1, fontSize: 12.5, textAlign: "center" },
                props.selected.includes(index)
                  ? props.diff
                    ? { color: NEWCOLORS.basicText }
                    : { color: "white" }
                  : { color: NEWCOLORS.basicText },
              ]}
            >
              {label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default MultiSelectPills;
