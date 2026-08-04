import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import React, { useContext, useEffect, useState } from "react";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { NEWCOLORS } from "@/constants/NewTheme";
import { searchIngredients } from "./SearchFunctionality";
import { styles } from "@/styles/auth.styles";
import * as Haptics from "expo-haptics";
import { PantryDetailsContext } from "@/contexts/PantryDetails";

type Props = {};

export type Food = {
  id: number;
  name: string;
  category: string;
  alternate_names?: string;
  popularity?: number | null;
  displayName: string;
};

const Search = (props: Props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Food[]>([]);
  const [pantryDetails, setPantryDetails] = useContext(PantryDetailsContext);
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      const foods = await searchIngredients(query);
      setResults(foods);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);
  function handleSearch(text: string) {
    setQuery(text);
  }
  return (
    <View style={{ zIndex: 9999 }}>
      <View
        style={[
          styles.sliderPill,
          styles.basicBoxShadow,

          {
            zIndex: 9999,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: NEWCOLORS.greyBlock,
          },
        ]}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <CustomIcon
            name="search-2"
            filled={false}
            color={NEWCOLORS.placeholderText}
            size={25}
          />
          <TextInput
            placeholder="Search Ingredients"
            autoCapitalize="words"
            keyboardType="default"
            placeholderTextColor={NEWCOLORS.unselectedShape}
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
                color: NEWCOLORS.basicText,
                fontFamily: "Nunito-Medium",
              },
            ]}
          />
        </View>
        <View style={localStyles.searchInputAction}>
          <View style={styles.verticalLine}></View>
          <Pressable
            style={{ paddingRight: 15, paddingLeft: 10, zIndex: 9999 }}
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

      {results.length > 0 && (
        <View style={[localStyles.resultsOverlay, styles.basicBoxShadow]}>
          <ScrollView
            style={{ maxHeight: 240 }}
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="handled"
          >
            {results.map((item, index) => (
              <Pressable
                key={item.id}
                style={localStyles.resultItem}
                onPress={() =>
                  setPantryDetails((prev) => {
                    const alreadyAdded = prev.ingredients.includes(item.name);
                    return {
                      ...prev,
                      ingredients: alreadyAdded
                        ? prev.ingredients
                        : [...prev.ingredients, item.name],
                    };
                  })
                }
              >
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottomWidth: index === results.length - 1 ? 0 : 1,
                    borderColor: NEWCOLORS.unselectedGrey,
                    paddingVertical: 18,
                    paddingHorizontal: 12,
                    zIndex: 9999,
                  }}
                >
                  <View style={{ paddingRight: 10, flex: 1 }}>
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={1}
                      style={[
                        styles.basicTextLeft,
                        {
                          fontSize: 15,
                          fontFamily: "Nunito-SemiBold",
                          zIndex: 9999,
                        },
                      ]}
                    >
                      {item.displayName}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.basicTextLeft,
                        {
                          fontSize: 13,
                          flex: 1,
                          zIndex: 9999,
                          fontFamily: "Nunito-Regular",
                          color: NEWCOLORS.unselectedShape,
                        },
                      ]}
                    >
                      {item.category}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const localStyles = StyleSheet.create({
  searchInputAction: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },

  resultsOverlay: {
    position: "absolute",
    width: "100%",
    top: 65,
    maxHeight: 240,
    backgroundColor: NEWCOLORS.cardWhite,
    borderRadius: 30,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderWidth: 0,

    overflow: "hidden",
  },

  resultItem: {
    borderRadius: 22,
    backgroundColor: NEWCOLORS.greyBlock,

    justifyContent: "center",
    alignItems: "center",
  },
});

export default Search;
