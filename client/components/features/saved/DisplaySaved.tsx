import { Text, View } from "react-native";
import React, { useContext } from "react";
import { useStyles } from "@/styles/GlobalStyles";
import { FlashList } from "@shopify/flash-list";

import SavedRecipesContext from "@/contexts/SavedRecipesContext";
import SavedCard from "@/components/features/saved/SavedCard";
import {
  type RecipeData,
  type RecipeCategories,
} from "@/contexts/RecipeContext";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { useTheme } from "@/contexts/ColorSchemeContext";

type Props = {
  filter?: "all" | keyof RecipeCategories;
};

export default function DisplaySaved({ filter }: Props) {
  const styles = useStyles();

  const [allSaves, setSaves] = useContext(SavedRecipesContext);
  const theme = useTheme();

  const saves =
    !filter || filter === "all"
      ? allSaves
      : allSaves.filter((recipe) => recipe.categories?.[filter]);

  return (
    <View style={{ width: "100%", paddingBottom: 0, flex: 1 }}>
      <FlashList
        data={saves}
        keyExtractor={(item: RecipeData, index) => item.id ?? index.toString()}
        contentContainerStyle={{ paddingHorizontal: 25 }}
        keyboardShouldPersistTaps="always"
        overScrollMode="never"
        alwaysBounceVertical={false}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        ListHeaderComponent={
          saves.length === 0 ? null : (
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={[
                styles.textLeftSemiBold,
                {
                  marginTop: 5,
                  marginBottom: 15,
                  fontSize: 18,
                  fontFamily: "Nunito-Medium",
                },
              ]}
            >
              Click on a saved recipe to make it!
            </Text>
          )
        }
        ListEmptyComponent={
          <View
            style={{
              alignItems: "center",
              gap: 13,
              width: "100%",
              justifyContent: "center",
              marginTop: 40,
            }}
          >
            <CustomIcon
              name="bookmark-add"
              filled
              color={theme.orangeAccent}
              size={36}
            />
            <Text
              style={[
                styles.textCenterBold,
                {
                  fontFamily: "Nunito-Bold",
                  fontSize: 20,
                  color: theme.basicText,
                },
              ]}
            >
              Nothing here yet
            </Text>
            <Text
              style={[
                styles.textCentered,
                {
                  fontFamily: "Nunito-SemiBold",
                  fontSize: 15,
                  color: theme.placeholderText,
                  textAlign: "center",
                },
              ]}
            >
              {filter && filter !== "all"
                ? "No saved recipes match this category yet."
                : "Save some recipes and they'll show up here!"}
            </Text>
          </View>
        }
        renderItem={({ item }: { item: RecipeData }) => (
          <SavedCard SavedRecipe={item}></SavedCard>
        )}
      />
    </View>
  );
}
