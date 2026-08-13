import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import ProgressBar from "@/components/features/recipe/ProgressBar";
import { useStyles } from "@/styles/GlobalStyles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { useNavigation } from "expo-router";
import { useTheme } from "@/contexts/ColorSchemeContext";
import * as Haptics from "expo-haptics";
import { saveRecipe, equal } from "@/components/features/recipe/SaveRecipe";
import SavedRecipesContext from "@/contexts/SavedRecipesContext";
import RecipeContext from "@/contexts/RecipeContext";

type HeaderProps = {
  pageTitle: string;
  progress: number;
};
const FollowRecipeHeader = (props: HeaderProps) => {
  const styles = useStyles();
  const theme = useTheme();
  const navigation = useNavigation();
  const [recipeData] = useContext(RecipeContext);
  const [savedRecipes, setSavedRecipes] = useContext(SavedRecipesContext);

  const isSaved = savedRecipes.some((r) => equal(r, recipeData));

  const handleSave = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    saveRecipe(recipeData, setSavedRecipes);
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      Haptics.selectionAsync();
      navigation.goBack();
    }
  };

  return (
    <>
      <View
        style={{ marginVertical: 10, width: "100%", paddingHorizontal: 30 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingVertical: 8,
          }}
        >
          <Pressable onPress={handleBack} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <CustomIcon
              name="arrow-left"
              filled={false}
              color={theme.fontColor}
              size={20}
            />
          </Pressable>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={[
                styles.textCenterBold,
                { fontSize: 18, fontFamily: "Nunito-SemiBold" },
              ]}
            >
              {props.pageTitle}
            </Text>
          </View>
          <Pressable onPress={handleSave} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
            <CustomIcon
              name="bookmark"
              filled={isSaved}
              color={isSaved ? theme.redAccent : theme.basicText}
              size={20}
            />
          </Pressable>
        </View>
      </View >
      <View style={{ width: "100%" }}>
        <ProgressBar progress={props.progress}></ProgressBar>
      </View>
    </>
  );
};
export default FollowRecipeHeader;
