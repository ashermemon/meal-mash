import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { styles } from "@/styles/auth.styles";
import SearchContext from "../contexts/SearchContext";
import { COLORS } from "@/constants/theme";
import IngredientCard from "./ingredientcard";
import IngredientsContext from "../contexts/IngredientsContext";
import LeftoversEnabled from "../contexts/LeftoversOn";
import ingredientsDB from "../ingredientDatabase/ingredientsDB.json";
import leftoversDB from "../ingredientDatabase/leftoversDB.json";
import { FlashList } from "@shopify/flash-list";
import useDebounce from "../hooks/debounceHook";

export default function Search() {
  type Ingredient = {
    name: string;
    id: number;
  };
  const setSearchActive = useContext(SearchContext);
  const [leftoversEnabled, setLeftoversEnabled] = useContext(LeftoversEnabled);

  const [data, setData] = useState<Ingredient[]>([]);

  const [dataL, setDataL] = useState<Ingredient[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 100);

  useEffect(() => {
    setData(ingredientsDB as Ingredient[]);
    setDataL(leftoversDB as Ingredient[]);
  }, []);

  const filteredDataToRender = useMemo(() => {
    const source = leftoversEnabled ? dataL : data;

    if (!debouncedSearchQuery.trim()) {
      return source;
    }

    const textData = debouncedSearchQuery.toUpperCase();
    return source.filter((item) => item.name.toUpperCase().includes(textData));
  }, [debouncedSearchQuery, leftoversEnabled, data, dataL]);

  const handleExitSearch = useCallback(() => {
    setSearchActive(false);
  }, [setSearchActive]);

  const renderListItem = useCallback(
    ({ item }: { item: Ingredient }) => (
      <IngredientCard ingredientName={item.name} />
    ),
    []
  );

  return (
    <View style={styles.searchWrap}>
      <View style={styles.searchContainer}>
        <View style={styles.exitSearchContainer}>
          <Pressable style={styles.exitSearch} onPress={handleExitSearch}>
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
              value={searchQuery}
              onChangeText={setSearchQuery}
            ></TextInput>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, width: "100%" }}>
        <FlashList
          data={filteredDataToRender}
          keyExtractor={(item) => item.id.toString()}
          estimatedItemSize={leftoversEnabled ? 1000 : 500}
          renderItem={renderListItem}
          contentContainerStyle={{
            paddingTop: 5,
            paddingBottom: 10,
            paddingHorizontal: 20,
          }}
        ></FlashList>
        {debouncedSearchQuery.trim() && filteredDataToRender.length === 0 && (
          <Text style={leftoversEnabled ? styles.linkText : styles.linkTextG}>
            Add a custom {leftoversEnabled ? `leftover` : `ingredient`}!
          </Text>
        )}
      </View>
    </View>
  );
}
