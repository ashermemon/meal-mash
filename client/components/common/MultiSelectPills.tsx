import { View, Text, Pressable } from "react-native";
import React from "react";
import { useStyles } from "@/styles/GlobalStyles";
import { useTheme } from "@/contexts/ColorSchemeContext";
import { difficultyShape } from "../features/recipe/InfoTag";
import * as Haptics from "expo-haptics";

type Props = {
  title: string;
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
  labels: string[];
  diff?: boolean;
};

const MultiSelectPills = (props: Props) => {
  const styles = useStyles();
  const theme = useTheme();
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
            onPress={() => [
              Haptics.selectionAsync(),
              props.setSelected((prev) =>
                prev.includes(index)
                  ? prev.filter((prev2) => prev2 !== index)
                  : [...prev, index],
              ),
            ]}
            style={[
              styles.selectPill,
              styles.basicBoxShadow,
              {
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 9,
                ...(props.diff
                  ? { flex: undefined, flexGrow: 1, flexBasis: "auto" }
                  : { flex: 1 }),
              },
              props.selected.includes(index)
                ? props.diff
                  ? label === "Easy"
                    ? { backgroundColor: theme.greenBlock }
                    : label === "Moderate"
                      ? { backgroundColor: theme.blueBlock }
                      : { backgroundColor: theme.redBlock }
                  : { backgroundColor: theme.greenAccent }
                : { backgroundColor: theme.unselectedGrey },
            ]}
            key={index}
          >
            {props.diff ? (
              difficultyShape(
                label,
                !props.selected.includes(index),
                true,
                theme,
              )
            ) : (
              <></>
            )}
            <Text
              style={[
                styles.textCentered,
                { flexGrow: 1, fontSize: 12.5, textAlign: "center" },
                props.selected.includes(index)
                  ? props.diff
                    ? { color: theme.basicText }
                    : { color: theme.pureWhite }
                  : { color: theme.basicText },
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
