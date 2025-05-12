import {
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
      <ScrollView style={{ width: "100%", height: "100%" }}>
        <View style={styles.searchBelowContent}>
          {leftoversEnabled ? (
            <>
              <IngredientCard ingredientName="Spaghetti"></IngredientCard>
              <IngredientCard ingredientName="Dumpling"></IngredientCard>
              <IngredientCard ingredientName="Cake"></IngredientCard>
              <IngredientCard ingredientName="Chicken"></IngredientCard>
              <IngredientCard ingredientName="Pizza"></IngredientCard>
              <IngredientCard ingredientName="Fries"></IngredientCard>
              <IngredientCard ingredientName="Rice"></IngredientCard>
            </>
          ) : (
            <>
              <IngredientCard ingredientName="Avocado"></IngredientCard>
              <IngredientCard ingredientName="Banana"></IngredientCard>
              <IngredientCard ingredientName="Bread"></IngredientCard>
              <IngredientCard ingredientName="Egg"></IngredientCard>
              <IngredientCard ingredientName="Eggplant"></IngredientCard>
              <IngredientCard ingredientName="Grapes"></IngredientCard>
              <IngredientCard ingredientName="Meat"></IngredientCard>
              <IngredientCard ingredientName="Tangerine"></IngredientCard>
              <IngredientCard ingredientName="Watermelon"></IngredientCard>
              <IngredientCard ingredientName="Yam"></IngredientCard>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
