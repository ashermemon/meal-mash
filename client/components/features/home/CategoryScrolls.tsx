import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { styles } from "@/styles/GlobalStyles";
import { NEWCOLORS } from "@/constants/NewTheme";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import emojiImages from "@/components/universal/EmojiImages";
import { router } from "expo-router";
import RecipeContext from "@/contexts/RecipeContext";
import * as Haptics from "expo-haptics";
import { initialRecipeData } from "@/contexts/RecipeContext";
import { GenerationDetailsContext } from "@/contexts/GenerationDetailsContext";

const data = [
  { id: "1", name: "Leftovers", color: "grey", icon: "Avocado" },
  { id: "2", name: "Snacks", color: "grey", icon: "Fries" },
  { id: "3", name: "Dinner", color: "grey", icon: "Spaghetti" },
  { id: "4", name: "Dessert", color: "grey", icon: "Cake" },
  { id: "5", name: "Sides", color: "grey", icon: "Fries" },
  { id: "6", name: "Lunch", color: "grey", icon: "Chicken" },
  { id: "7", name: "Beverages", color: "grey" },
  { id: "8", name: "Breakfast", color: "grey" },
  { id: "9", name: "Sauces", color: "grey" },
  { id: "10", name: "Vegetarian", color: "grey", icon: "Watermelon" },
  { id: "11", name: "Vegan", color: "grey", icon: "Avocado" },
  { id: "12", name: "Keto", color: "grey" },
  { id: "13", name: "Gluten-Free", color: "grey" },
  { id: "14", name: "Dairy-Free", color: "grey" },
];

const FeaturedRecipeButton = () => {
  const [recipeData, setRecipeData] = useContext(RecipeContext);
  const [generationDetails, setGenerationDetails] = useContext(
    GenerationDetailsContext,
  );
  return (
    <View style={styles.categoriesSlider}>
      <FlashList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        bounces={false}
        decelerationRate={0.85}
        overScrollMode="never"
        // @ts-ignore
        estimatedItemSize={30}
        contentContainerStyle={{ paddingBottom: 15 }}
        renderItem={({ item }) => {
          return (
            <Pressable
              key={item.id}
              style={[
                styles.homeBlock,
                {
                  backgroundColor:
                    NEWCOLORS[`${item.color}Block` as keyof typeof NEWCOLORS],
                  width: 80,
                  height: 100,
                  marginRight: Number(item.id) === data.length ? 0 : 10,
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "column",
                },
                styles.basicBoxShadow,
              ]}
              onPress={() => [
                setGenerationDetails((prev) => ({
                  ...prev,
                  portalCategory: item.name,
                })),
                router.navigate("/recipe"),
                setRecipeData(initialRecipeData),
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
              ]}
            >
              <Text
                style={[styles.textCentered, { fontFamily: "Nunito-SemiBold" }]}
                adjustsFontSizeToFit={true}
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <Image
                source={
                  item.icon
                    ? emojiImages[item.icon] || emojiImages.Default
                    : emojiImages.Default
                }
                style={{
                  width: 50,
                  height: 50,

                  alignSelf: "center",
                }}
              ></Image>
            </Pressable>
          );
        }}
      ></FlashList>
    </View>
  );
};

const FeaturedRecipes = () => {
  return (
    <View style={styles.paddingOnlyWrapper}>
      <Text style={[styles.basicTextLeft, { fontSize: 20, marginVertical: 5 }]}>
        Browse Recipes
      </Text>
      <FeaturedRecipeButton></FeaturedRecipeButton>
    </View>
  );
};

export default FeaturedRecipes;
