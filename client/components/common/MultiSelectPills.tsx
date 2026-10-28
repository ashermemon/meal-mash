import { View, Pressable } from "react-native";
import { Text } from "@/components/universal/AppText";
import React, { useState } from "react";
import { useStyles } from "@/styles/GlobalStyles";
import { useTheme, useIsDarkMode } from "@/contexts/ColorSchemeContext";
import { difficultyShape } from "../features/recipe/InfoTag";
import * as Haptics from "expo-haptics";
import { getTintedBoxShadow } from "@/utils/shadow";
import { moderateScale } from "@/utils/responsive";

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
  const isDark = useIsDarkMode();

  const pillGap = moderateScale(8);
  const pillPadding = moderateScale(9);
  const iconGap = moderateScale(5);
  const labelStyle = [
    styles.textCentered,
    { fontSize: moderateScale(12.5), textAlign: "center" as const },
  ];
  const longestLabel = props.labels.reduce(
    (a, b) => (b.length > a.length ? b : a),
    "",
  );
  const [rowWidth, setRowWidth] = useState(0);
  const [labelWidth, setLabelWidth] = useState(0);
  const pillWidth =
    (rowWidth - pillGap * (props.labels.length - 1)) / props.labels.length;
  const showIcons =
    !!props.diff &&
    (rowWidth === 0 ||
      labelWidth === 0 ||
      pillWidth >=
        pillPadding * 2 + moderateScale(12) + iconGap + labelWidth);

  return (
    <View
      style={{
        gap: moderateScale(12),
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Text style={[styles.textLeftSemiBold, { fontSize: moderateScale(17) }]}>
        {props.title}
      </Text>

      <View
        style={{ flex: 1, flexDirection: "row", gap: pillGap }}
        onLayout={(e) => setRowWidth(e.nativeEvent.layout.width)}
      >
        {props.diff ? (
          <Text
            aria-hidden
            numberOfLines={1}
            pointerEvents="none"
            style={[labelStyle, { position: "absolute", opacity: 0 }]}
            onTextLayout={(e) =>
              setLabelWidth(e.nativeEvent.lines[0]?.width ?? 0)
            }
          >
            {longestLabel}
          </Text>
        ) : null}
        {props.labels.map((label, index) => {
          const pillBackgroundColor = props.selected.includes(index)
            ? props.diff
              ? label === "Easy"
                ? theme.greenBlock
                : label === "Moderate"
                  ? theme.blueBlock
                  : theme.redBlock
              : theme.greenAccent
            : theme.unselectedGrey;

          return (
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
                getTintedBoxShadow(pillBackgroundColor, isDark),
                {
                  flex: 1,
                  minWidth: 0,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: iconGap,
                  paddingHorizontal: pillPadding,
                },
                { backgroundColor: pillBackgroundColor },
              ]}
              key={index}
            >
              {showIcons ? (
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
                numberOfLines={1}
                adjustsFontSizeToFit
                style={[
                  ...labelStyle,
                  { flexShrink: 1 },
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
          );
        })}
      </View>
    </View>
  );
};

export default MultiSelectPills;
