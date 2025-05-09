import { Modal, Pressable, Text, View } from "react-native";
import React, { useContext } from "react";
import { styles } from "@/styles/auth.styles";
import SearchContext from "../contexts/SearchContext";

export default function Search() {
  const setSearchActive = useContext(SearchContext);
  return (
    <View style={styles.searchContainer}>
      <View style={styles.exitSearchContainer}>
        <Pressable
          style={styles.exitSearch}
          onPress={() => setSearchActive(false)}
        />
      </View>
      <View style={styles.searchContentContainer}>
        <Text style={styles.textLeft}>Search</Text>
      </View>
    </View>
  );
}
