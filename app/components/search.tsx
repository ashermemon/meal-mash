import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useMemo, useState } from "react";
import { styles } from "@/styles/auth.styles";
import SearchContext from "../contexts/SearchContext";
import { COLORS } from "@/constants/theme";
import IngredientCard from "./ingredientcard";
import IngredientsContext from "../contexts/IngredientsContext";
import LeftoversEnabled from "../contexts/LeftoversOn";
import ingredientsDB from "../ingredientDatabase/ingredientsDB.json";
import leftoversDB from "../ingredientDatabase/leftoversDB.json";
import { FlashList } from "@shopify/flash-list";

export default function Search() {
  const setSearchActive = useContext(SearchContext);
  const [leftoversEnabled, setLeftoversEnabled] = useContext(LeftoversEnabled);
  const data = useMemo(
    () => (leftoversEnabled ? leftoversDB : ingredientsDB),
    [leftoversEnabled]
  );
  return (
    <View style={styles.searchWrap}>
      <View style={styles.searchContainer}>
        <View style={styles.exitSearchContainer}>
          <Pressable
            style={styles.exitSearch}
            onPress={() => setSearchActive(false)}
          >
            <Text
              style={[styles.textCentered, { fontFamily: "Nunito-ExtraBold" }]}
              adjustsFontSizeToFit={true}
            >
              X
            </Text>
          </Pressable>
        </View>
        <View style={styles.searchContentContainer}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchText}
              placeholder={`Search for ${
                leftoversEnabled ? `a leftover` : `an ingredient`
              }...`}
              placeholderTextColor={COLORS.searchPlaceholder}
            ></TextInput>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, width: "100%" }}>
        <FlashList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          estimatedItemSize={500}
          renderItem={({ item }) => (
            <IngredientCard ingredientName={item.name} />
          )}
          contentContainerStyle={{
            paddingTop: 5,
            paddingBottom: 10,
            paddingHorizontal: 20,
          }}
        />
      </View>
    </View>
  );
}
