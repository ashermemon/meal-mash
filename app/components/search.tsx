import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { styles } from "@/styles/auth.styles";
import SearchContext from "../contexts/SearchContext";
import { COLORS } from "@/constants/theme";
import IngredientCard from "./ingredientcard";
import IngredientsContext from "../contexts/IngredientsContext";
import LeftoversEnabled from "../contexts/LeftoversOn";
import ingredientsDB from "../ingredientDatabase/ingredientsDB.json";
import leftoversDB from "../ingredientDatabase/leftoversDB.json";
export default function Search() {
  const setSearchActive = useContext(SearchContext);
  const [leftoversEnabled, setLeftoversEnabled] = useContext(LeftoversEnabled);

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
              placeholder="Search for an ingredient..."
              placeholderTextColor={COLORS.searchPlaceholder}
            ></TextInput>
          </View>
        </View>
      </View>

      {leftoversEnabled ? (
        <FlatList
          style={{ overflow: "hidden" }}
          data={leftoversDB}
          keyExtractor={(item) => item.id.toString()}
          initialNumToRender={10}
          renderItem={({ item }) => (
            <IngredientCard ingredientName={item.name} />
          )}
          contentContainerStyle={styles.searchBelowContent}
        />
      ) : (
        <FlatList
          style={{ overflow: "hidden" }}
          data={ingredientsDB}
          keyExtractor={(item) => item.id.toString()}
          initialNumToRender={10}
          renderItem={({ item }) => (
            <IngredientCard ingredientName={item.name} />
          )}
          contentContainerStyle={styles.searchBelowContent}
        />
      )}
    </View>
  );
}
