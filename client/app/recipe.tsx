import { View, Text, Platform, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { NEWCOLORS } from "@/constants/NewTheme";
import RecipeContext from "@/contexts/RecipeContext";
import NutrientsContext from "@/contexts/NutrientsContext";
import { Image } from "expo-image";
import { COLORS } from "@/constants/Theme";
import * as Haptics from "expo-haptics";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { useNavigation } from "@react-navigation/native";
import PreviewAnimatedWrapper from "@/components/features/generator/PreviewAnimatedWrapper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RecipePage() {
  const [recipeData] = useContext(RecipeContext);
  const navigation = useNavigation();


  const [nutrients, setNutrients] = useState<number[]>(recipeData.nutrients);

  useEffect(() => {
    setNutrients(recipeData.nutrients);
  }, [recipeData.nutrients]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: NEWCOLORS.nestedBG }}>
      <View style={{ paddingHorizontal: 25, flex: 1 }}>
        <Pressable
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          style={{
            marginTop: 8,
            marginLeft: 0,
            alignSelf: "flex-start",
            zIndex: 1000,
          }}
          onPress={() =>
            navigation.canGoBack()
              ? [navigation.goBack(), Haptics.selectionAsync()]
              : null

          }
        >
          <CustomIcon
            name="arrow-left"
            filled={false}
            color={
              navigation.canGoBack() ? COLORS.fontColor : COLORS.addPlusGrey
            }
            size={20}
          />
        </Pressable>

        <NutrientsContext.Provider value={[nutrients, setNutrients]}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <PreviewAnimatedWrapper
              title={recipeData.title}
              description={recipeData.description}
              difficulty={recipeData.difficulty}
              time={recipeData.time}
              servings={recipeData.servings}
              steps={recipeData.instructions.length}
              tags={recipeData.tags}
            />
          </View>
        </NutrientsContext.Provider>
      </View>
    </SafeAreaView >
  );
}
