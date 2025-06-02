import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { storage } from "./storage";
import { styles } from "@/styles/auth.styles";

import FavIngredient from "./favingredient";
import FavoritesContext from "../contexts/FavoritesContext";

export default function DisplaySaved() {
  const [favorites, setFavorites] = useContext(FavoritesContext);

  return (
    <View style={{ width: "100%", paddingHorizontal: 20 }}>
      {favorites.length === 0 ? (
        <Text style={[styles.textCentered]}>No favorites saved.</Text>
      ) : (
        <>
          <Text style={[styles.textCentered, { marginBottom: 10 }]}>
            View favorited foods and saved recipes below! {"\n"} Click on a
            saved recipe to view step-by-step instructions!
          </Text>

          <Text
            style={[styles.textLeftBold, { marginTop: 15, marginBottom: 5 }]}
          >
            Ingredients
          </Text>
          {favorites.map((item: string, index: number) => (
            <FavIngredient
              leftover={false}
              ingredientName={item}
              key={index}
            ></FavIngredient>
          ))}
        </>
      )}
    </View>
  );
}
