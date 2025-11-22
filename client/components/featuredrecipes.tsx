import { View, Text, Pressable } from "react-native";
import React from "react";
import { styles } from "@/styles/auth.styles";
import { NEWCOLORS } from "@/constants/newtheme";

const data = [
  { id: "1", name: "Burger", color: "blue" },
  { id: "2", name: "Pizza", color: "orange" },
  { id: "3", name: "Briyani", color: "green" },
  { id: "4", name: "Scrambled", color: "purple" },
];

const FeaturedRecipeButton = () => {
  return (
    <View style={styles.sectionalWrapper}>
      {data.map((item) => (
        <Pressable
          key={item.id}
          style={[
            styles.homeBlock,
            {
              backgroundColor:
                NEWCOLORS[`${item.color}Block` as keyof typeof NEWCOLORS],
              flex: 1,
              height: 100,
              justifyContent: "flex-start",
            },
            styles.basicBoxShadow,
          ]}
          onPress={() => console.log("pressed")}
        >
          <Text
            style={[styles.textCentered, { fontFamily: "Nunito-SemiBold" }]}
            adjustsFontSizeToFit={true}
            numberOfLines={1}
          >
            {item.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const FeaturedRecipes = () => {
  return (
    <View style={styles.paddingOnlyWrapper}>
      <Text style={[styles.basicTextLeft, { fontSize: 20 }]}>
        Featured Recipes
      </Text>
      <FeaturedRecipeButton></FeaturedRecipeButton>
    </View>
  );
};

export default FeaturedRecipes;
