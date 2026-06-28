import { NEWCOLORS } from "@/constants/NewTheme";
import { styles } from "@/styles/GlobalStyles";
import { Text, View } from "react-native";

interface Props {
  type: "difficulty" | "time" | "tags";
  data: string;
}
export const difficultyShape = (
  diff: string,
  colorState?: boolean,
  select?: boolean,
) => {
  const difficulty = diff.toLowerCase();

  if (difficulty === "easy") {
    return (
      <View
        style={{
          borderRadius: 999,
          backgroundColor: colorState
            ? NEWCOLORS.unselectedShape
            : NEWCOLORS.greenAccent,
          width: select ? 12 : 15,
          height: select ? 12 : 15,
        }}
      />
    );
  }

  if (difficulty === "intermediate") {
    return (
      <View
        style={{
          width: select ? 10 : 13,
          height: select ? 10 : 13,
          backgroundColor: colorState
            ? NEWCOLORS.unselectedShape
            : NEWCOLORS.blueAccent,
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
          backgroundColor: colorState
            ? NEWCOLORS.unselectedShape
            : NEWCOLORS.redAccent,
        }}
      />
    );
  }

  return null;
};

export default function InfoTag(props: Props) {
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
                ? NEWCOLORS.greenBlock
                : props.data.toLowerCase() === "expert"
                  ? NEWCOLORS.redBlock
                  : NEWCOLORS.blueBlock
              : props.type == "time"
                ? NEWCOLORS.orangeBlock
                : NEWCOLORS.purpblueBlock,
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
        difficultyShape(props.data.toLowerCase())
      ) : (
        <></>
      )}
      <Text
        style={[styles.textCentered, { flexShrink: 1, fontSize: 15 }]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.85}
      >
        {displayData}
      </Text>
    </View>
  );
}
