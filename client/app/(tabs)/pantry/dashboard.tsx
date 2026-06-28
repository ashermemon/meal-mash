import { View, Text, Platform, Pressable, TextInput } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "@/styles/GlobalStyles";
import { NEWCOLORS } from "@/constants/NewTheme";
import RecipeContext from "@/contexts/RecipeContext";
import NutrientsContext from "@/contexts/NutrientsContext";
import { GenerationCardPreview } from "../../../components/features/generator/GenerationCardPreview";
import Timer from "@/components/features/recipe/Timer";
import { Image } from "expo-image";
import { COLORS } from "@/constants/Theme";
import CustomCheckbox from "@/components/common/CustomCheckbox";
import * as Haptics from "expo-haptics";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { useNavigation } from "@react-navigation/native";
import PreviewAnimatedWrapper from "@/components/features/generator/PreviewAnimatedWrapper";
import { SafeAreaView } from "react-native-safe-area-context";
import PantryPill from "@/components/features/pantry/PantryPill";
import { ScrollView } from "react-native-gesture-handler";
import SuggestedIngredients from "@/components/features/pantry/SuggestedIngredients";
import { useTrueSheet } from "@/contexts/TrueSheetContext";
import IngredientHeaderSection from "@/components/features/pantry/IngredientHeaderSection";

export default function Dashboard() {
  const navigation = useNavigation();
  const ingredientSections: string[] = [
    "Leftovers",
    "Meat/Protein",
    "Dairy & Eggs",
    "Produce",
    "Seafood & Fish",
    "Spices & Sauces",
    "Grains",
    "Legumes",
    "Sweets",
    "Miscellaneous",
  ];

  return (
    <ScrollView
      style={{ paddingHorizontal: 25, flex: 1, paddingVertical: 20 }}
      contentContainerStyle={{ flexGrow: 1 }}
      overScrollMode="never"
      alwaysBounceVertical={false}
    >
      <View
        style={{
          flex: 1,

          position: "relative",

          gap: 20,
        }}
      >
        <Text
          style={[
            styles.basicTextLeft,
            styles.bold,
            {
              fontSize: 28,
            },
          ]}
        >
          Pantry
        </Text>

        <View style={{ gap: 25 }}>
          <PantryPill
            pantryName={"Untitled Pantry"}
            pantryPage={true}
          ></PantryPill>
          <View style={{ gap: 20 }}>
            <View
              style={[
                styles.sliderPill,
                styles.basicBoxShadow,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 0,
                  backgroundColor: NEWCOLORS.greyBlock,
                },
              ]}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <CustomIcon
                  name="search-2"
                  filled={false}
                  color={NEWCOLORS.unselectedShape}
                  size={25}
                />
                <TextInput
                  placeholder="Search Ingredients"
                  autoCapitalize="words"
                  keyboardType="default"
                  placeholderTextColor={NEWCOLORS.placeholderText}
                  autoCorrect={true}
                  maxLength={32}
                  style={[
                    {
                      flex: 1,
                      fontSize: 19.5,
                      marginLeft: 12,
                      color: NEWCOLORS.basicText,
                      fontFamily: "Nunito-Medium",
                    },
                  ]}
                />

                {/* value={nameQ}
                  onChangeText={setNameQ} */}
              </View>
              <View
                style={{
                  justifyContent: "flex-end",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 12,
                }}
              >
                <View style={styles.verticalLine}></View>
                <Pressable
                  style={{ paddingRight: 15, paddingLeft: 10 }}
                  onPress={() =>
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                  }
                  hitSlop={{ top: 10, bottom: 10, left: 15, right: 15 }}
                >
                  <CustomIcon
                    name="camera-2"
                    filled={true}
                    color={NEWCOLORS.placeholderText}
                    size={25}
                  />
                </Pressable>
              </View>
            </View>
            <SuggestedIngredients
              suggestedIngredients={["Eggs", "Milk", "Cheese"]}
            />

            {ingredientSections.map((title: string, index: number) => (
              <IngredientHeaderSection
                key={index}
                title={title}
                ingredients={[
                  "Butter",
                  "Fruit",
                  "Salt",
                  "Potato",
                  "Sour Cream",
                  "Chips",
                ]}
              ></IngredientHeaderSection>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
