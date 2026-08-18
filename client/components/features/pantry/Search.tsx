import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Keyboard,
} from "react-native";
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { useIsDarkMode, useTheme } from "@/contexts/ColorSchemeContext";
import { searchIngredients } from "./SearchFunctionality";
import { getCategoryDisplayLabel } from "@/constants/categoryLabels";
import { useStyles } from "@/styles/GlobalStyles";
import * as Haptics from "expo-haptics";
import { ScrollView } from "react-native-gesture-handler";

type Props = {
  onSelectIngredient?: (item: Food) => void;
  onRemoveIngredient?: (item: Food) => void;
  addedIds?: Set<number>;
  getAddedAction?: (item: Food) => "remove" | "uncheck";
  isGroceryList?: boolean;
  showDropdown?: boolean;
  onResultsChange?: (results: Food[], visible: boolean) => void;
};

export type SearchHandle = {
  selectIngredient: (item: Food) => void;
  removeIngredient: (item: Food) => void;
};

export type Food = {
  id: number;
  name: string;
  category: string;
  alternate_names?: string;
  popularity?: number | null;
  displayName: string;
};

type SearchResultItemProps = {
  item: Food;
  isLast: boolean;
  onPress: (item: Food) => void;
  rounded?: boolean;
  added?: boolean;
  addedAction?: "remove" | "uncheck";
};

export const SearchResultItem = ({
  item,
  isLast,
  onPress,
  rounded = true,
  added = false,
  addedAction = "remove",
}: SearchResultItemProps) => {
  const styles = useStyles();
  const theme = useTheme();
  const isDark = useIsDarkMode();
  const addedColor =
    addedAction === "uncheck" ? theme.blueAccent : theme.redAccent;
  const addedLabel = addedAction === "uncheck" ? "Uncheck" : "Remove";
  const addedIconName = addedAction === "uncheck" ? "circle-dash" : "minimize";

  return (
    <Pressable
      style={[
        localStyles.resultItem,
        { borderRadius: rounded ? 22 : 0, backgroundColor: theme.greyBlock },
      ]}
      onPress={(event) => {
        event.stopPropagation();
        (Haptics.selectionAsync(), onPress(item));
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: isLast ? 0 : 1,
          borderColor: theme.unselectedGrey,
          paddingVertical: 18,
          paddingHorizontal: 12,
        }}
      >
        <View style={{ paddingRight: 10, flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {added ? (
              <CustomIcon
                name={addedIconName}
                filled
                color={addedColor}
                size={18}
              />
            ) : (
              <></>
            )}
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={[
                styles.basicTextLeft,
                { fontSize: 15, fontFamily: "Nunito-SemiBold" },
              ]}
            >
              {item.displayName}
            </Text>
          </View>
        </View>
        {added ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Text
              style={[
                styles.basicTextLeft,
                {
                  fontSize: 13,
                  fontFamily: "Nunito-SemiBold",
                  color: addedColor,
                },
              ]}
            >
              {addedLabel}
            </Text>
          </View>
        ) : (
          <View>
            <Text
              style={[
                styles.basicTextLeft,
                {
                  fontSize: 13,
                  flex: 1,
                  fontFamily: "Nunito-Regular",
                  color: isDark ? theme.placeholderText : theme.addPlusGrey,
                },
              ]}
            >
              {getCategoryDisplayLabel(item.category)}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const Search = forwardRef<SearchHandle, Props>((props, ref) => {
  const styles = useStyles();
  const theme = useTheme();
  const { showDropdown = true } = props;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Food[]>([]);

  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      const foods = await searchIngredients(query);
      setResults(foods);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [query]);

  function handleSearch(text: string) {
    setQuery(text);
    setShowResults(Boolean(text.trim()));
  }

  function dismissResults() {
    if (showResults) {
      setShowResults(false);
    }
  }

  useEffect(() => {
    props.onResultsChange?.(results, showResults && results.length > 0);
  }, [showResults, results]);

  const selectingRef = React.useRef(false);

  function handleResultAction(item: Food, action?: (item: Food) => void) {
    if (selectingRef.current) return;
    selectingRef.current = true;

    if (action) {
      action(item);
    }

    Keyboard.dismiss();
    setQuery("");
    dismissResults();

    setTimeout(() => {
      selectingRef.current = false;
    }, 300);
  }

  function selectIngredient(item: Food) {
    handleResultAction(item, props.onSelectIngredient);
  }

  function removeIngredient(item: Food) {
    handleResultAction(item, props.onRemoveIngredient);
  }

  useImperativeHandle(ref, () => ({
    selectIngredient,
    removeIngredient,
  }));

  return (
    <View style={[{ zIndex: 9999 }, localStyles.container]}>
      <Pressable
        style={localStyles.backdrop}
        onPress={dismissResults}
        pointerEvents={showResults && results.length > 0 ? "auto" : "none"}
        accessible={false}
      />
      <View
        style={[
          styles.sliderPill,
          styles.basicBoxShadow,
          {
            zIndex: 9999,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: theme.greyBlock,
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
            color={theme.placeholderText}
            size={25}
          />
          <TextInput
            onFocus={() => setShowResults(Boolean(query.trim()))}
            onBlur={() => {}}
            placeholder={
              props.isGroceryList ? "Add New Item" : "Search Ingredients"
            }
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
        {props.isGroceryList ? (
          <></>
        ) : (
          <View style={localStyles.searchInputAction}>
            <View style={styles.verticalLine}></View>

            <Pressable
              style={{ paddingRight: 15, paddingLeft: 10, zIndex: 9999 }}
              onPress={(event) => {
                event.stopPropagation();
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              hitSlop={{ top: 10, bottom: 10, left: 15, right: 15 }}
            >
              <CustomIcon
                name="camera-2"
                filled={true}
                color={theme.placeholderText}
                size={25}
              />
            </Pressable>
          </View>
        )}
      </View>

      {showDropdown && results.length > 0 && showResults && (
        <View
          style={[
            localStyles.resultsOverlay,
            styles.basicBoxShadow,
            { backgroundColor: theme.cardWhite },
          ]}
        >
          <ScrollView
            style={{ maxHeight: 240 }}
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="always"
            contentContainerStyle={{ paddingBottom: 8 }}
            bounces={false}
          >
            {results.map((item, index) => {
              const added = props.addedIds?.has(item.id) ?? false;
              return (
                <SearchResultItem
                  key={item.id}
                  item={item}
                  isLast={index === results.length - 1}
                  added={added}
                  addedAction={added ? props.getAddedAction?.(item) : undefined}
                  onPress={added ? removeIngredient : selectIngredient}
                />
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
});

const localStyles = StyleSheet.create({
  container: {
    position: "relative",
  },

  backdrop: {
    position: "absolute",
    top: -1000,
    bottom: -1000,
    left: -1000,
    right: -1000,
    backgroundColor: "transparent",
    zIndex: 0,
  },

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
    borderRadius: 30,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderWidth: 0,
    zIndex: 9999,
    overflow: "hidden",
  },

  resultItem: {
    borderRadius: 22,
    zIndex: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Search;
