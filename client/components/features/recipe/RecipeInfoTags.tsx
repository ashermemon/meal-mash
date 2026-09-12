import { Text, View } from "react-native";
import InfoTag from "@/components/features/recipe/InfoTag";
import { moderateScale } from "@/utils/responsive";

interface Props {
  difficulty: string;
  time: string;
  tags: string[];
  marginTop?: number;
  justifyContent?: "flex-start" | "center" | "flex-end";
}

export default function RecipeInfoTags(props: Props) {
  return (
    <View
      style={{
        width: "100%",
        marginTop: moderateScale(props.marginTop || 13),
        alignItems: "center",
        justifyContent: props.justifyContent || "center",
        flexDirection: "row",
        flexWrap: "nowrap",
        flexShrink: 1,
        minWidth: 0,
        gap: moderateScale(8),
      }}
    >
      <InfoTag type="difficulty" data={props.difficulty} />
      <InfoTag type="time" data={props.time} />
      <InfoTag type="tags" data={props.tags[0]} />
      {/* {props.tags.map((tag) => tag).join(", ")} */}
    </View>
  );
}
