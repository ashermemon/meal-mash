import { View, Text, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "@/styles/auth.styles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import SliderField from "@/components/common/SliderField";
import MultiSelectPills from "@/components/common/MultiSelectPills";
import CountFieldPill from "@/components/common/CountFieldPill";
import DropDownPill from "@/components/common/DropDownPill";
import { NEWCOLORS } from "@/constants/NewTheme";
import { GenerationDetailsContext } from "@/contexts/GenerationDetailsContext";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import MealsLeftContext from "@/contexts/MealsLeftContext";
import RecipeContext from "@/contexts/RecipeContext";
import { initialRecipeData } from "@/contexts/RecipeContext";
import PantryPill from "../pantry/PantryPill";

type Props = {};

const GeneratorDetails = (props: Props) => {
  const modes: string[] = [
    "Pantry Ingredients Only",
    "Select Specific Ingredients",
    "Any Ingredients",
  ];
  const difficultyLabels = ["Easy", "Intermediate", "Expert"];
  const timeLabels = ["<15m", "~30m", "1hr+"];
  const [recipeData, setRecipeData] = useContext(RecipeContext);

  const [genMode, setGenMode] = useState<number>(0); // 0 is Pantry, 1 is Select, 2 is Any
  const [diffciulties, setDifficulties] = useState<number[]>([0, 1, 2]);
  const [times, setTimes] = useState<number[]>([0, 1, 2]);
  const [num, setNum] = useState<number>(1);
  const [mealType, setMealType] = useState<string[]>(["Any"]);
  const [cuisine, setCuisine] = useState<string[]>(["Any"]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([
    "None",
  ]);

  const [generationDetails, setGenerationDetails] = useContext(
    GenerationDetailsContext,
  );
  const [mealsLeft, setMealsLeft] = useContext(MealsLeftContext);

  const mealTypeOptions: string[] = [
    "🥞  Breakfast",
    "🥪  Lunch",
    "🍝  Dinner",
    "🍪  Snack",
    "🍟  Side",
    "🍹  Drink",
    "🍨  Dessert",
  ];
  const cuisineOptions: string[] = [
    "🇮🇹  Italian",
    "🇨🇳  Chinese",
    "🇯🇵  Japanese",
    "🇲🇽  Mexican",
    "🇮🇳  Indian",
    "🇹🇭  Thai",
    "🇬🇷  Greek",
    "🇫🇷  French",
    "🇪🇸  Spanish",
    "🇻🇳  Vietnamese",
    "🇱🇧  Lebanese",
    "🇺🇸  American",
  ];
  const dietaryRestrictionOptions: string[] = [
    "🥗  Vegetarian",
    "🌱  Vegan",
    "🌾  Gluten-Free",
    "🥛  Dairy-Free",
    "🥑  Keto",
    "☪️  Halal",
    "✡️  Kosher",
  ];

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      overScrollMode="never"
      alwaysBounceVertical={false}
      style={styles.generatorContainer}
    >
      <View
        style={{
          paddingHorizontal: 25,
          paddingTop: 20,
          paddingBottom: 100,
          flex: 1,

          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={[
              styles.basicTextLeft,
              styles.bold,
              {
                fontSize: 28,
                marginBottom: 15,
              },
            ]}
          >
            Generate recipes
          </Text>

          <View style={{ flexDirection: "column", gap: 36 }}>
            <View style={{ flexDirection: "column", gap: 20 }}>
              <SliderField
                options={modes}
                selected={genMode}
                setSelected={setGenMode}
              ></SliderField>
              {genMode === 0 ? (
                <PantryPill
                  pantryName={"Untitled Pantry"}
                  pantryPage={false}
                ></PantryPill>
              ) : genMode === 1 ? (
                <View
                  style={[
                    styles.sliderPill,
                    styles.basicBoxShadow,
                    {
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: NEWCOLORS.unselectedGrey,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.textCentered,
                      {
                        fontSize: 18,
                        color: NEWCOLORS.basicText,
                        fontFamily: "Nunito-SemiBold",
                      },
                    ]}
                  >
                    Browse Ingredients
                  </Text>
                </View>
              ) : (
                <></>
              )}
            </View>
            <MultiSelectPills
              title="Difficulty:"
              selected={diffciulties}
              setSelected={setDifficulties}
              labels={difficultyLabels}
              diff
            ></MultiSelectPills>
            <MultiSelectPills
              title="Recipe Time:"
              selected={times}
              setSelected={setTimes}
              labels={timeLabels}
            ></MultiSelectPills>
            <CountFieldPill
              num={num}
              setNum={setNum}
              title={"Number of Servings:"}
            ></CountFieldPill>
            <DropDownPill
              title={"Meal Type:"}
              options={mealTypeOptions}
              selections={mealType}
              setSelection={setMealType}
            ></DropDownPill>
            <DropDownPill
              title={"Cuisine:"}
              options={cuisineOptions}
              selections={cuisine}
              setSelection={setCuisine}
            ></DropDownPill>
            {genMode === 0 || genMode === 1 ? (
              <></>
            ) : (
              <DropDownPill
                title={"Dietary Restrictions:"}
                options={dietaryRestrictionOptions}
                selections={dietaryRestrictions}
                setSelection={setDietaryRestrictions}
              ></DropDownPill>
            )}
          </View>
        </View>
        <View>
          <Pressable
            style={[
              styles.basicBoxShadow,
              {
                backgroundColor: NEWCOLORS.darkButton,
                paddingVertical: 20,
                borderRadius: 15,
                width: "100%",
              },
            ]}
            onPress={
              mealsLeft > 0
                ? () => [
                    setGenerationDetails((prev) => ({
                      ...prev,
                      generationType: genMode,
                      difficulties:
                        diffciulties.length === 0
                          ? difficultyLabels
                          : diffciulties.map((idx) => difficultyLabels[idx]),
                      recipeTime:
                        times.length === 0
                          ? timeLabels
                          : times.map((idx) => timeLabels[idx]),
                      numberOfServings: num,
                      mealType: mealType,
                      cuisine: cuisine,
                      dietaryPreference: dietaryRestrictions,
                    })),
                    router.navigate("/recipe"),
                    setRecipeData(initialRecipeData),
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
                  ]
                : () =>
                    alert(
                      "You have run out of meal generations today. Come again tomorrow!",
                    )
            }
          >
            <Text
              style={[styles.textCenterBold, { color: "white", fontSize: 18 }]}
            >
              Generate Recipes →
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default GeneratorDetails;
