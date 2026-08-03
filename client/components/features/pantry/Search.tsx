import { View, Text, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { NEWCOLORS } from "@/constants/NewTheme";
import { searchIngredients } from "./SearchFunctionality";
import { FlashList } from "@shopify/flash-list";
import { supabase } from "@/utils/supabase";
import { styles } from "@/styles/auth.styles";
import * as Haptics from "expo-haptics";

type Props = {};

export type Food = {
  id: number;
  name: string;
  category: string;
  alternate_names?: string;
  displayName: string;
};

const Search = (props: Props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Food[]>([]);
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
    <>
      <View
        style={[
          styles.sliderPill,
          styles.basicBoxShadow,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 0,
            backgroundColor: NEWCOLORS.greyBlock,
          },
        ]}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
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
                fontSize: 19.5,
                marginLeft: 12,
                color: NEWCOLORS.basicText,
                fontFamily: "Nunito-Medium",
              },
            ]}
          />
        </View>
        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "row",
            gap: 12,
          }}
        >
          <View style={styles.verticalLine}></View>
          <Pressable
            style={{ paddingRight: 15, paddingLeft: 10 }}
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

      <FlashList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.displayName}</Text>}
      />
    </>
  );
};

export default Search;
