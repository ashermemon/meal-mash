import {
  Button,
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
import DiscardIcon from "../Icons/DiscardIcon";
import BackArrow from "../Icons/BackArrow";
import { Image } from "expo-image";
import LeftoversContext from "../contexts/LeftoversContext";

export default function Search() {
  type Ingredient = {
    name: string;
    id: number;
  };
  const [searchActive, setSearchActive] = useContext(SearchContext);
  const [leftoversEnabled, setLeftoversEnabled] = useContext(LeftoversEnabled);

  const [data, setData] = useState<Ingredient[]>([]);

  const [dataL, setDataL] = useState<Ingredient[]>([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [customQuery, setCustomQuery] = useState<string | undefined>(undefined);

  const [customModal, setCustomModal] = useState(false);

  const [ingredients, setIngredients] = useContext(IngredientsContext);
  const [leftovers, setLeftovers] = useContext(LeftoversContext);

  const [savedSearchQuery, setSavedSearchQuery] = useState("");

  var hsl = require("hsl-to-hex");
  const [hue] = useState(() => Math.random() * 359);
  const backgroundColor = hsl(hue, 88, 97);
  const strokeColor = hsl(hue, 45, 79);
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

  const addCustom = useCallback(() => {
    setSearchActive(false);

    if (searchActive) {
      if (leftoversEnabled) {
        if (customQuery) {
          setLeftovers((prev) => [...prev, customQuery]);
        } else if (customQuery == undefined) {
          setLeftovers((prev) => [...prev, savedSearchQuery]);
        }
      } else if (!leftoversEnabled) {
        if (customQuery) {
          setIngredients((prev) => [...prev, customQuery]);
        } else if (customQuery == undefined) {
          setIngredients((prev) => [...prev, savedSearchQuery]);
        }
      }
    }
    setCustomQuery(undefined);
  }, [
    setSearchActive,
    customQuery,
    searchActive,
    leftoversEnabled,
    setIngredients,
    setLeftovers,
    savedSearchQuery,
    searchQuery,
  ]);

  const renderListItem = useCallback(
    ({ item }: { item: Ingredient }) => (
      <IngredientCard ingredientName={item.name} />
    ),
    []
  );

  const enableCustomModal = (currentSearch: string) => {
    setSavedSearchQuery(currentSearch);
    setCustomModal(true);

    console.log(savedSearchQuery);
  };

  return (
    <View style={styles.searchWrap}>
      <View style={styles.searchContainer}>
        <View style={styles.exitSearchContainer}>
          <Pressable
            style={styles.exitSearch}
            onPress={
              customModal
                ? () => [setCustomModal(false), setCustomQuery(undefined)]
                : () => handleExitSearch()
            }
          >
            {customModal ? (
              <BackArrow
                iconsetcolor={COLORS.fontColor}
                setheight={18}
                setwidth={18}
              ></BackArrow>
            ) : (
              <DiscardIcon iconsetcolor={COLORS.fontColor} setheight={18} />
            )}
          </Pressable>
        </View>

        {customModal ? (
          <></>
        ) : (
          <View style={styles.searchContentContainer}>
            <View style={styles.searchBar}>
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                spellCheck={false}
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
        )}
      </View>

      <View style={{ flex: 1, width: "100%" }}>
        {customModal ? (
          <>
            <View style={[styles.searchBar, { marginTop: 10 }]}>
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                spellCheck={false}
                style={styles.searchText}
                placeholder={`Enter custom${
                  leftoversEnabled ? ` leftover` : ` ingredient`
                }...`}
                placeholderTextColor={COLORS.searchPlaceholder}
                value={customQuery}
                defaultValue={searchQuery}
                onChangeText={setCustomQuery}
              ></TextInput>
            </View>
            <View
              style={[
                styles.emojiWrapBig,
                {
                  borderColor: strokeColor,
                  backgroundColor: backgroundColor,
                  alignSelf: "center",
                },
              ]}
            >
              <Image
                style={styles.customEmoji}
                source={require("../../assets/exampleemojis/placeholder.png")}
              ></Image>
            </View>
            <Pressable
              onPress={addCustom}
              style={[
                styles.generateButton,
                {
                  backgroundColor: leftoversEnabled
                    ? COLORS.blueHeader
                    : COLORS.greenButtonColor,
                  borderColor: leftoversEnabled
                    ? COLORS.blueHeaderBorder
                    : COLORS.greenButtonColorOuline,
                  marginHorizontal: 50,
                  marginVertical: 15,
                },
              ]}
            >
              <Text
                style={[styles.textCentered, { fontFamily: "Nunito-SemiBold" }]}
                adjustsFontSizeToFit={true}
              >
                {`Add ${leftoversEnabled ? `Leftover` : `Ingredient`}`}
              </Text>
            </Pressable>
          </>
        ) : (
          <>
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

            {debouncedSearchQuery.trim() &&
              filteredDataToRender.length <= 2 && (
                <Pressable
                  style={[
                    styles.customButton,
                    {
                      backgroundColor: leftoversEnabled
                        ? COLORS.blueHeader
                        : COLORS.greenButtonColor,
                      borderColor: leftoversEnabled
                        ? COLORS.blueHeaderBorder
                        : COLORS.greenButtonColorOuline,
                    },
                  ]}
                  onPress={() => enableCustomModal(searchQuery)}
                >
                  <Text
                    style={
                      leftoversEnabled ? styles.linkText : styles.linkTextG
                    }
                  >
                    Click to add a custom{" "}
                    {leftoversEnabled ? `leftover` : `ingredient`}!
                  </Text>
                </Pressable>
              )}
          </>
        )}
      </View>
    </View>
  );
}
