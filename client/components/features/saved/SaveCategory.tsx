import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { useStyles } from "@/styles/auth.styles";
import { useTheme } from "@/contexts/ColorSchemeContext";
import AppImage from "@/components/universal/AppImage";
import icons3d from "@/components/universal/3dIcons";
import { router } from "expo-router";
import SavedRecipesContext from "@/contexts/SavedRecipesContext";
import { type RecipeCategories } from "@/contexts/RecipeContext";
import { useTintedBoxShadow } from "@/hooks/useBoxShadow";

type Props = {
  title: string;
  image: string;
  filter: "all" | keyof RecipeCategories;
};

const SaveCategory = (props: Props) => {
  const theme = useTheme();
  const styles = useStyles();
  const homeBlockShadow = useTintedBoxShadow(theme.greyBlock);
  const [saves] = useContext(SavedRecipesContext);

  const filter = props.filter;
  const savedCount =
    filter === "all"
      ? saves.length
      : saves.filter((recipe) => recipe.categories?.[filter]).length;

  return (
    <Pressable
      onPress={() =>
        router.navigate({
          pathname: "/saves",
          params: { filter: props.filter, filterTitle: props.title },
        })
      }
      style={{
        width: "45%",

        justifyContent: "flex-start",
      }}
    >
      <View
        style={[
          styles.homeBlock,
          {
            backgroundColor: theme.greyBlock,
            aspectRatio: 1,
          },
          homeBlockShadow,
        ]}
      >
        <AppImage style={{ flex: 1 }} source={icons3d[props.image]}></AppImage>
      </View>
      <Text style={[styles.textLeftBold, { fontSize: 15, marginTop: 7 }]}>
        {props.title}
      </Text>
      <Text style={[styles.basicTextLeft, { fontSize: 12, marginTop: 1 }]}>
        {savedCount} Saved
      </Text>
    </Pressable>
  );
};

export default SaveCategory;
