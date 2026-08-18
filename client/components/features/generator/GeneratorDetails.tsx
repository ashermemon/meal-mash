import { View, Text, Pressable } from "react-native";
import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useStyles } from "@/styles/GlobalStyles";
import SliderField from "@/components/common/SliderField";
import MultiSelectPills from "@/components/common/MultiSelectPills";
import CountFieldPill from "@/components/common/CountFieldPill";
import DropDownPill from "@/components/common/DropDownPill";
import { useTheme } from "@/contexts/ColorSchemeContext";
import { GenerationDetailsContext } from "@/contexts/GenerationDetailsContext";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import MealsLeftContext from "@/contexts/MealsLeftContext";
import RecipeContext from "@/contexts/RecipeContext";
import { initialRecipeData } from "@/contexts/RecipeContext";
import PantryPill from "../pantry/PantryPill";
import { PantryDetailsContext } from "@/contexts/PantryDetails";
import { BrowseIngredientsContext } from "@/contexts/BrowseIngredientsContext";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import Search, { Food, SearchHandle, SearchResultItem } from "../pantry/Search";
import IngredientTag from "../pantry/IngredientTag";

type Props = {};

const MAX_VISIBLE_SEARCH_RESULTS = 5;

const GeneratorDetails = (props: Props) => {
  const styles = useStyles();
  const theme = useTheme();
  const browseIngredientsSheetRef = useRef<TrueSheet>(null);
  const searchRef = useRef<SearchHandle>(null);

  const openBrowseIngredients = useCallback(() => {
    Haptics.selectionAsync();
    browseIngredientsSheetRef.current?.present();
  }, []);
  const modes: string[] = [
    "Pantry Ingredients Only",
    "Select Specific Ingredients",
    "Any Ingredients",
  ];
  const difficultyLabels = ["Easy", "Moderate", "Expert"];
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

  const [pantryDetails, setPantryDetails] = useContext(PantryDetailsContext);
  const [generationDetails, setGenerationDetails] = useContext(
    GenerationDetailsContext,
  );
  const [mealsLeft, setMealsLeft] = useContext(MealsLeftContext);
  const [browseIngredients, setBrowseIngredients] = useContext(
    BrowseIngredientsContext,
  );

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

  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const browseIngredientIds = useMemo(
    () => new Set(browseIngredients.map((item) => item.id)),
    [browseIngredients],
  );

  return (
    <>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        overScrollMode="never"
        alwaysBounceVertical={false}
        keyboardShouldPersistTaps="handled"
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
                    pantryName={pantryDetails.name}
                    pantryPage={false}
                  ></PantryPill>
                ) : genMode === 1 ? (
                  <View style={{ gap: 12 }}>
                    <Pressable
                      onPress={openBrowseIngredients}
                      style={[
                        styles.sliderPill,
                        styles.basicBoxShadow,
                        {
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: theme.unselectedGrey,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.textCentered,
                          {
                            fontSize: 18,
                            color: theme.basicText,
                            fontFamily: "Nunito-SemiBold",
                          },
                        ]}
                      >
                        Browse Ingredients
                        {browseIngredients.length > 0
                          ? ` (${browseIngredients.length})`
                          : ""}
                      </Text>
                    </Pressable>
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
                max={20}
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
                  backgroundColor: theme.primary,
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
                        portalCategory: undefined,
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
                style={[
                  styles.textCenterBold,
                  { color: theme.pureWhite, fontSize: 18 },
                ]}
              >
                Generate Recipes →
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <TrueSheet
        detents={[0.6, 1]}
        ref={browseIngredientsSheetRef}
        scrollable
        grabber={false}
        header={
          <>
            <View
              style={{
                alignSelf: "center",
                width: 44,
                height: 4,
                borderRadius: 999,
                backgroundColor: theme.unselectedShape,
                marginTop: 6,
                marginBottom: 15,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 10,
                marginTop: 4,
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: "Nunito-SemiBold",

                  color: theme.basicText,
                }}
              >
                Add Ingredients
              </Text>
              <Pressable
                onPress={() => {
                  setBrowseIngredients([]);
                  Haptics.notificationAsync();
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Nunito-SemiBold",

                    color: theme.redAccent,
                  }}
                >
                  Remove All
                </Text>
              </Pressable>
            </View>
            <Search
              ref={searchRef}
              showDropdown={false}
              addedIds={browseIngredientIds}
              onSelectIngredient={(item: Food) =>
                setBrowseIngredients((prev) => {
                  const alreadyAdded = prev.some((i) => i.id === item.id);
                  if (alreadyAdded) return prev;
                  return [...prev, item];
                })
              }
              onRemoveIngredient={(item: Food) =>
                setBrowseIngredients((prev) =>
                  prev.filter((i) => i.id !== item.id),
                )
              }
              onResultsChange={(results, visible) => {
                setSearchResults(results);
                setSearchResultsVisible(visible);
              }}
            />
            <View
              style={{
                marginTop: 20,
                borderBottomWidth: 1.5,
                borderColor: theme.dividerGrey,
              }}
            ></View>
          </>
        }
        headerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
        }}
        backgroundColor={theme.sheetBackgroundColor}
      >
        <View style={{ flex: 1, position: "relative" }}>
          <ScrollView
            style={{ paddingHorizontal: 20 }}
            contentContainerStyle={{
              paddingTop: 10,
              paddingBottom: 20,
              gap: 10,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View />

            {browseIngredients
              .toReversed()
              .map((ingredient: Food, index: number) => (
                <IngredientTag
                  key={ingredient.id || index}
                  ingredient={ingredient}
                  onRemove={() =>
                    setBrowseIngredients((prev) =>
                      prev.filter((i) => i.id !== ingredient.id),
                    )
                  }
                />
              ))}
            {browseIngredients.length < 1 && (
              <Text
                style={[
                  styles.textCenterBold,
                  {
                    fontFamily: "Nunito-SemiBold",
                    fontSize: 18,

                    color: theme.unselectedShape,
                  },
                ]}
              >
                Search and select ingredients to add!
              </Text>
            )}
          </ScrollView>

          {searchResultsVisible && (
            <View
              style={[
                styles.basicBoxShadow,
                {
                  position: "absolute",
                  top: 0,
                  left: 20,
                  right: 20,
                  borderRadius: 30,
                  overflow: "hidden",
                  backgroundColor: theme.cardWhite,
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                },
              ]}
            >
              {searchResults
                .slice(0, MAX_VISIBLE_SEARCH_RESULTS)
                .map((item: Food, index: number, arr) => {
                  const added = browseIngredientIds.has(item.id);
                  return (
                    <SearchResultItem
                      key={item.id}
                      item={item}
                      isLast={index === arr.length - 1}
                      rounded={false}
                      added={added}
                      onPress={(item) =>
                        added
                          ? searchRef.current?.removeIngredient(item)
                          : searchRef.current?.selectIngredient(item)
                      }
                    />
                  );
                })}
            </View>
          )}
        </View>
      </TrueSheet>
    </>
  );
};

export default GeneratorDetails;
