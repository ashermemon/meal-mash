import { Pressable, Text, View } from "react-native";
import React from "react";
import { styles } from "@/styles/auth.styles";
import { NEWCOLORS } from "@/constants/newtheme";
import { router } from "expo-router";
import emojiImages from "./emoji-images";
import { Image } from "expo-image";

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
    icon,
  }: {
    title: string;
    color: string;
    children?: React.ReactNode;
    link?: string;
    height?: number;
    featured?: boolean;
    icon?: string;
  }) => (
    <Pressable
      style={[
        styles.homeBlock,
        {
          flex: 1,
          backgroundColor: color,
          height: height ? height : undefined,

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
            {
              textDecorationLine: "underline",
              fontSize: 12,
              marginBottom: 5,
            },
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
          {
            fontFamily: "Nunito-SemiBold",
            fontSize: 20,
            textAlign: featured ? "left" : "center",
          },
        ]}
        adjustsFontSizeToFit
      >
        {title}
      </Text>
      {children}
      {featured ? (
        <></>
      ) : (
        <View
          style={{
            justifyContent: "flex-end",
            flex: 1,
          }}
        >
          <Image
            source={
              (icon ? emojiImages[icon] : emojiImages.Default) ||
              emojiImages.Default
            }
            contentFit="contain"
            style={{
              marginVertical: 10,
              alignSelf: "center",
              flex: 1,
              aspectRatio: 1,
            }}
          />
        </View>
      )}
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
          icon="Burrito"
        >
          <Text
            style={[
              styles.basicTextCenter,
              { fontSize: 10, marginVertical: 5 },
            ]}
          >
            Make a new dish from your leftovers and ingredients you already have
            at home!
          </Text>
        </Block>

        <View style={{ flex: 1, flexDirection: "column", gap: 10 }}>
          <Block
            title="Profile & Stats"
            color={NEWCOLORS.orangeBlock}
            link="profile"
            icon="Banana"
          />
          <Block
            title="Cookbook"
            color={NEWCOLORS.greenBlock}
            link="saves"
            icon="Book"
          />
        </View>
      </View>
    </View>
  );
}
