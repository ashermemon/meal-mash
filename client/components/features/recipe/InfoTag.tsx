import { NEWCOLORS } from "@/constants/NewTheme";
import { useStyles } from "@/styles/GlobalStyles";
import { useTheme, type Theme } from "@/contexts/ColorSchemeContext";
import { Text, View } from "react-native";

interface Props {
  type: "difficulty" | "time" | "tags";
  data: string;
  fontSize?: number;
  c?: boolean;
}

export const difficultyShape = (
  diff: string,
  colorState?: boolean,
  select?: boolean,

  theme: Theme | typeof NEWCOLORS = NEWCOLORS,
) => {
  const difficulty = diff.toLowerCase();

  if (difficulty === "easy") {
    return (
      <View
        style={{
          borderRadius: 999,
          backgroundColor: colorState
            ? theme.unselectedShape
            : theme.greenAccent,
          width: select ? 12 : 15,
          height: select ? 12 : 15,
        }}
      />
    );
  }

  if (difficulty === "moderate") {
    return (
      <View
        style={{
          width: select ? 10 : 13,
          height: select ? 10 : 13,
          backgroundColor: colorState
            ? theme.unselectedShape
            : theme.blueAccent,
        }}
      />
    );
  }

  if (difficulty === "expert") {
    return (
      <View
        style={{
          width: select ? 9 : 12,
          height: select ? 9 : 12,
          transform: [{ rotate: "45deg" }],
          backgroundColor: colorState ? theme.unselectedShape : theme.redAccent,
        }}
      />
    );
  }

  return null;
};

export default function InfoTag(props: Props) {
  const styles = useStyles();
  const theme = useTheme();
  const displayData =
    props.type === "time"
      ? props.data.replace(/minutes?/gi, "min")
      : props.data;

  return (
    <View
      style={[
        styles.infoTag,
        {
          backgroundColor:
            props.type == "difficulty"
              ? props.data.toLowerCase() === "easy"
                ? theme.greenBlock
                : props.data.toLowerCase() === "expert"
                  ? theme.redBlock
                  : theme.blueBlock
              : props.type == "time"
                ? theme.orangeBlock
                : theme.purpblueBlock,
          flexShrink: 1,
          minWidth: 0,
          paddingHorizontal: 8,
          paddingVertical: 4,
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      {props.type == "difficulty" ? (
        difficultyShape(
          props.data.toLowerCase(),
          undefined,
          props.c || undefined,
          theme,
        )
      ) : (
        <></>
      )}
      <Text
        style={[
          styles.textCentered,
          { flexShrink: 1, fontSize: props.fontSize || 15 },
        ]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.85}
      >
        {displayData}
      </Text>
    </View>
  );
}
