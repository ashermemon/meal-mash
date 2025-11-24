import { Pressable, Text, View } from "react-native";
import React from "react";
import { styles } from "@/styles/auth.styles";
import { NEWCOLORS } from "@/constants/newtheme";
import { router } from "expo-router";

const featuredRecipes = [
  {
    id: "1",
    title: "Rice + Salad Mix Bowl",
    description:
      "Tasty and healthy bowl filled with veggies, meat and rice! Ready to eat in under 20 minutes!",
    difficulty: "Intermediate",
    icon: "Rice",
  },
  {
    id: "2",
    title: "Recipe Name",
    description:
      "Tasty and healthy bowl filled with veggies, meat and rice! Ready to eat in under 20 minutes!",
    difficulty: "Expert",
    icon: "Placeholder",
  },
  {
    id: "3",
    title: "Recipe Name",
    description:
      "Tasty and healthy bowl filled with veggies, meat and rice! Ready to eat in under 20 minutes!",
    difficulty: "Beginner",
    icon: "Placeholder",
  },
];

export default function ExploreSection() {
  const Block = ({
    title,
    color,
    children,
    link,
    height,
    featured,
  }: {
    title: string;
    color: string;
    children?: React.ReactNode;
    link?: string;
    height?: number;
    featured?: boolean;
  }) => (
    <Pressable
      style={[
        styles.homeBlock,
        {
          flex: 1,
          backgroundColor: color,
          height: height ? height : undefined,
          alignItems: featured ? "flex-start" : "center",
          paddingHorizontal: featured ? 15 : 10,
        },
        styles.basicBoxShadow,
      ]}
      onPress={() => router.push(`/(tabs)/${link}` as any)}
    >
      {featured ? (
        <Text
          style={[
            styles.basicTextLeft,
            { textDecorationLine: "underline", fontSize: 12, marginBottom: 5 },
          ]}
        >
          Featured Recipes
        </Text>
      ) : (
        <></>
      )}
      <Text
        style={[
          styles.basicTextLeft,
          styles.bold,
          { fontFamily: "Nunito-SemiBold", fontSize: 20 },
        ]}
        adjustsFontSizeToFit
      >
        {title}
      </Text>
    </Pressable>
  );

  return (
    <View style={{ flexDirection: "column", gap: 10, width: "100%" }}>
      <Block
        title="Explore"
        height={120}
        color={NEWCOLORS.greyBlock}
        link="generationpage"
        featured
      />

      <View style={{ flexDirection: "row", gap: 10, width: "100%" }}>
        <Block
          height={200}
          title="Meal Generator"
          color={NEWCOLORS.blueBlock}
          link="generationpage"
        />

        <View style={{ flex: 1, flexDirection: "column", gap: 10 }}>
          <Block
            title="Profile & Stats"
            color={NEWCOLORS.orangeBlock}
            link="profile"
          />
          <Block title="Cookbook" color={NEWCOLORS.greenBlock} link="saves" />
        </View>
      </View>
    </View>
  );
}
