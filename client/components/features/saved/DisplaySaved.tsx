import { Text, View } from "react-native";
import React, { useContext } from "react";
import { useStyles } from "@/styles/GlobalStyles";

import SavedRecipesContext from "@/contexts/SavedRecipesContext";
import SavedCard from "@/components/features/saved/SavedCard";
import { type RecipeData } from "@/contexts/RecipeContext";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { useTheme } from "@/contexts/ColorSchemeContext";

export default function DisplaySaved() {
  const styles = useStyles();

  const [saves, setSaves] = useContext(SavedRecipesContext);
  const theme = useTheme();

  return (
    <View style={{ width: "100%", paddingBottom: 30, flex: 1 }}>
      {saves.length === 0 ? (
        <View
          style={{
            alignItems: "center",
            gap: 13,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            marginTop: 45,
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
            Save some recipes and they'll show up here!
          </Text>
        </View>
      ) : (
        <>
          {saves.length !== 0 ? (
            <>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={[
                  styles.textLeftBold,
                  { marginTop: 5, marginBottom: 25, fontSize: 20 },
                ]}
              >
                Click on a saved recipe to make it!
              </Text>

              <View style={{ gap: 20 }}>
                {saves.map((item: RecipeData, index: number) => (
                  <SavedCard SavedRecipe={item} key={index}></SavedCard>
                ))}
              </View>
            </>
          ) : null}
        </>
      )}
    </View>
  );
}
