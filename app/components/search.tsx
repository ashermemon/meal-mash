import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext } from "react";
import { styles } from "@/styles/auth.styles";
import SearchContext from "../contexts/SearchContext";
import { COLORS } from "@/constants/theme";
import IngredientCard from "./ingredientcard";

interface SearchProps {
  onAddIngredient: React.Dispatch<React.SetStateAction<string[]>>;
  ingredients: string[];
}

export default function Search(props: SearchProps) {
  const setSearchActive = useContext(SearchContext);
  return (
    <View style={styles.searchWrap}>
      <View style={styles.searchContainer}>
        <View style={styles.exitSearchContainer}>
          <Pressable
            style={styles.exitSearch}
            onPress={() => setSearchActive(false)}
          />
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
          <IngredientCard
            ingredients={props.ingredients}
            onAddIngredient={props.onAddIngredient}
            ingredientName="Avocado"
          ></IngredientCard>
          <IngredientCard
            ingredients={props.ingredients}
            onAddIngredient={props.onAddIngredient}
            ingredientName="Banana"
          ></IngredientCard>
          <IngredientCard
            ingredients={props.ingredients}
            onAddIngredient={props.onAddIngredient}
            ingredientName="Bread"
          ></IngredientCard>
          <IngredientCard
            ingredients={props.ingredients}
            onAddIngredient={props.onAddIngredient}
            ingredientName="Egg"
          ></IngredientCard>
          <IngredientCard
            ingredients={props.ingredients}
            onAddIngredient={props.onAddIngredient}
            ingredientName="Eggplant"
          ></IngredientCard>
          <IngredientCard
            ingredients={props.ingredients}
            onAddIngredient={props.onAddIngredient}
            ingredientName="Cake"
          ></IngredientCard>
          <IngredientCard
            ingredients={props.ingredients}
            onAddIngredient={props.onAddIngredient}
            ingredientName="Chicken"
          ></IngredientCard>
          <IngredientCard
            ingredients={props.ingredients}
            onAddIngredient={props.onAddIngredient}
            ingredientName="Dumpling"
          ></IngredientCard>
          <IngredientCard
            ingredients={props.ingredients}
            onAddIngredient={props.onAddIngredient}
            ingredientName="Fries"
          ></IngredientCard>
          <IngredientCard
            ingredients={props.ingredients}
            onAddIngredient={props.onAddIngredient}
            ingredientName="Grapes"
          ></IngredientCard>
          <IngredientCard
            ingredients={props.ingredients}
            onAddIngredient={props.onAddIngredient}
            ingredientName="Meat"
          ></IngredientCard>
          <IngredientCard
            ingredients={props.ingredients}
            onAddIngredient={props.onAddIngredient}
            ingredientName="Pizza"
          ></IngredientCard>
          <IngredientCard
            ingredients={props.ingredients}
            onAddIngredient={props.onAddIngredient}
            ingredientName="Rice"
          ></IngredientCard>
          <IngredientCard
            ingredients={props.ingredients}
            onAddIngredient={props.onAddIngredient}
            ingredientName="Tangerine"
          ></IngredientCard>
          <IngredientCard
            ingredients={props.ingredients}
            onAddIngredient={props.onAddIngredient}
            ingredientName="Watermelon"
          ></IngredientCard>
          <IngredientCard
            ingredients={props.ingredients}
            onAddIngredient={props.onAddIngredient}
            ingredientName="Yam"
          ></IngredientCard>
          <IngredientCard
            ingredients={props.ingredients}
            onAddIngredient={props.onAddIngredient}
            ingredientName="Spaghetti"
          ></IngredientCard>
        </View>
      </ScrollView>
    </View>
  );
}
