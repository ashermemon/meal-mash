import { NEWCOLORS } from "@/constants/NewTheme";
import { styles } from "@/styles/GlobalStyles";
import { Text, View } from "react-native";

interface Props {
  type: "difficulty" | "time" | "tags";
  data: string;
}

export default function InfoTag(props: Props) {
  const difficultyShape = () => {
    const difficulty = props.data.toLowerCase();

    if (difficulty === "easy") {
      return (
        <View
          style={{
            borderRadius: 999,
            backgroundColor: NEWCOLORS.greenAccent,
            width: 15,
            height: 15,
          }}
        />
      );
    }

    if (difficulty === "intermediate") {
      return (
        <View
          style={{
            width: 13,
            height: 13,
            backgroundColor: NEWCOLORS.blueAccent,
          }}
        />
      );
    }

    if (difficulty === "expert") {
      return (
        <View
          style={{
            width: 12,
            height: 12,
            transform: [{ rotate: "45deg" }],
            backgroundColor: NEWCOLORS.redAccent,
          }}
        />
      );
    }

    return null;
  };

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
      {props.type == "difficulty" ? difficultyShape() : <></>}
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
