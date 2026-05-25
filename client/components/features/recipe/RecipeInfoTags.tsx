import { Text, View } from "react-native";
import InfoTag from "@/components/features/recipe/InfoTag";

interface Props {
  difficulty: string;
  time: string;
  tags: string[];
  marginTop?: number;
}

export default function RecipeInfoTags(props: Props) {
  return (
    <View
      style={{
        width: "100%",
        marginTop: props.marginTop || 13,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      <InfoTag type="difficulty" data={props.difficulty} />
      <InfoTag type="time" data={props.time} />
      <InfoTag type="tags" data={props.tags[0]} />
      {/* {props.tags.map((tag) => tag).join(", ")} */}
    </View>
  );
}
