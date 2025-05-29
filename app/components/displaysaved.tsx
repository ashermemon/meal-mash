import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { storage } from "./storage";
import { styles } from "@/styles/auth.styles";

export default function DisplaySaved() {
  const storedFavs = storage.getString("favorites");
  const favorites = storedFavs ? JSON.parse(storedFavs) : [];
  return (
    <View style={{ width: "100%", padding: 20 }}>
      {favorites.length === 0 ? (
        <Text>No favorites saved.</Text>
      ) : (
        favorites.map((item: string, index: number) => (
          <Text key={index} style={styles.textLeftBold}>
            {item}
          </Text>
        ))
      )}
    </View>
  );
}
