import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import Search from "@/components/features/pantry/Search";
import { styles, useStyles } from "@/styles/auth.styles";
import DisplaySaved from "@/components/features/saved/DisplaySaved";
import { useTheme } from "@/contexts/ColorSchemeContext";
import * as Haptics from "expo-haptics";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { RecipeData } from "@/contexts/RecipeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import SaveCategory from "@/components/features/saved/SaveCategory";

type Props = {};

const SavesHome = (props: Props) => {
  const styles = useStyles();
  const theme = useTheme();
  const [query, setQuery] = useState("");
  const navigation = useNavigation();
  const categories = [
    // filters
    { title: "Made With Leftovers", image: "Pizza", filter: "madeWithLeftovers" }, //uses any prepared ingredients
    { title: "Tasty Meals", image: "Burger", filter: "tastyMeals" }, //all marked breakfast/lunch/dinner
    { title: "Sweet Treats", image: "Cake", filter: "sweetTreats" }, //anything marked dessert
    { title: "Quick Snacks", image: "Cookies", filter: "quickSnacks" }, //anything marked snack/side
    { title: "Under 15 Minutes", image: "Clock", filter: "under15Minutes" }, //anything that takes less than 15 minutes
    { title: "All Recipes", image: "SushiCaviar", filter: "all" }, //everything
  ] as const;

  const [results, setResults] = useState<RecipeData[]>([]);
  function handleSearch(text: string) {
    setQuery(text);
    //show results
  }
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.nestedBG }}>
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
                navigation.canGoBack() ? theme.fontColor : theme.addPlusGrey
              }
              size={20}
            />
          </Pressable>
          <View
            style={[
              styles.sliderPill,
              styles.basicBoxShadow,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: theme.greyBlock,
                marginTop: 15,
                marginBottom: 30,
              },
            ]}
          >
            <CustomIcon
              name="search-2"
              filled={false}
              color={theme.placeholderText}
              size={25}
            />
            <TextInput
              placeholder={"Search saved recipes..."}
              autoCapitalize="words"
              keyboardType="default"
              placeholderTextColor={theme.unselectedShape}
              autoCorrect={true}
              maxLength={32}
              value={query}
              onChangeText={handleSearch}
              style={[
                {
                  flex: 1,
                  zIndex: 9999,
                  fontSize: 18,
                  marginLeft: 12,
                  color: theme.basicText,
                  fontFamily: "Nunito-Medium",
                  height: 48,
                  minHeight: 48,
                },
              ]}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignContent: "space-between",
              paddingBottom: 20,
            }}
          >
            {categories.map((item, index: number) => (
              <SaveCategory
                title={item.title}
                image={item.image}
                filter={item.filter}
                key={index}
              ></SaveCategory>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SavesHome;
