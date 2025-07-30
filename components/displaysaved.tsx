import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { storage } from "@/utils/storage";
import { styles } from "@/styles/auth.styles";

import FavIngredient from "@/components/favingredient";
import FavoritesContext from "@/contexts/FavoritesContext";
import FavLeftoversContext from "@/contexts/FavLeftoversContext";
import SavedRecipesContext from "@/contexts/SavedRecipesContext";
import SavedCard from "@/components/SavedCard";

export default function DisplaySaved() {
  const [favorites, setFavorites] = useContext(FavoritesContext);
  const [favoritesL, setFavoritesL] = useContext(FavLeftoversContext);
  const [saves, setSaves] = useContext(SavedRecipesContext);

  return (
    <View style={{ width: "100%", paddingHorizontal: 20, paddingBottom: 30 }}>
      {favorites.length === 0 &&
      favoritesL.length === 0 &&
      saves.length === 0 ? (
        <Text style={[styles.textCentered]}>
          Your saves and favorites will show up here.
        </Text>
      ) : (
        <>
          <Text style={[styles.textCentered, { marginBottom: 10 }]}>
            View favorited foods and saved recipes below! {"\n"} Click on a
            saved recipe to view step-by-step instructions!
          </Text>
          {saves.length !== 0 ? (
            <>
              <Text
                style={[
                  styles.textLeftBold,
                  { marginTop: 15, marginBottom: 5 },
                ]}
              >
                Saved Recipes:
              </Text>

              {saves.map((item: string, index: number) => (
                <SavedCard SavedRecipe={item} key={index}></SavedCard>
              ))}
            </>
          ) : null}
          {favoritesL.length !== 0 ? (
            <>
              <Text
                style={[
                  styles.textLeftBold,
                  { marginTop: 15, marginBottom: 5 },
                ]}
              >
                Favorite Leftovers:
              </Text>

              {favoritesL.map((item: string, index: number) => (
                <FavIngredient
                  leftover={true}
                  ingredientName={item}
                  key={index}
                ></FavIngredient>
              ))}
            </>
          ) : null}
          {favorites.length !== 0 ? (
            <>
              <Text
                style={[
                  styles.textLeftBold,
                  { marginTop: 15, marginBottom: 5 },
                ]}
              >
                Favorite Ingredients:
              </Text>

              {favorites.map((item: string, index: number) => (
                <FavIngredient
                  leftover={false}
                  ingredientName={item}
                  key={index}
                ></FavIngredient>
              ))}
            </>
          ) : null}
        </>
      )}
    </View>
  );
}
