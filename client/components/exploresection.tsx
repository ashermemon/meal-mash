import { Dimensions, Pressable, Text, View } from "react-native";
import React, { useState } from "react";
import { styles } from "@/styles/auth.styles";
import { NEWCOLORS } from "@/constants/newtheme";
import { router } from "expo-router";
import emojiImages from "./emoji-images";
import { Image } from "expo-image";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

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
      "Lorem ipsum dolor sit amet!Lorem ipsum dolor sit amet! Lorem ipsum dolor sit amet!",
    difficulty: "Expert",
    icon: "Placeholder",
  },
  {
    id: "3",
    title: "Chicken Sandwich",
    description:
      "Tasty and healthy bowl filled with veggies, meat and rice! Ready to eat in under 20 minutes!",
    difficulty: "Beginner",
    icon: "Placeholder",
  },
];

export default function ExploreSection() {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

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
      <></>

      <Text
        style={[
          styles.basicTextLeft,

          {
            fontFamily: "Nunito-SemiBold",
            fontSize: 20,
            textAlign: "center",
          },
        ]}
        adjustsFontSizeToFit
      >
        {title}
      </Text>
      {children}

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
    </Pressable>
  );
  const width = Dimensions.get("window").width - 40;

  return (
    <View style={{ flexDirection: "column", gap: 10, width: "100%" }}>
      <View
        style={[
          styles.homeBlock,
          styles.basicBoxShadow,
          {
            flex: 1,
            backgroundColor: NEWCOLORS.greyBlock,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          },
        ]}
      >
        <Carousel
          autoPlay
          autoPlayInterval={3000}
          scrollAnimationDuration={1500}
          ref={ref}
          width={width}
          data={featuredRecipes}
          height={110}
          onProgressChange={progress}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",

                alignItems: "center",
              }}
            >
              <View style={{ flex: 1, height: "100%", paddingHorizontal: 15 }}>
                <Text
                  style={[
                    styles.basicTextLeft,
                    { textDecorationLine: "underline", fontSize: 12 },
                  ]}
                >
                  Featured Recipes
                </Text>

                <Text
                  style={[
                    styles.basicTextLeft,

                    {
                      fontFamily: "Nunito-SemiBold",
                      fontSize: 22,
                      marginVertical: 6,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {item.title}
                </Text>

                <Text
                  numberOfLines={2}
                  style={[styles.basicTextLeft, { fontSize: 11 }]}
                >
                  {item.description}
                </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  flex: 0,
                  height: "100%",
                  paddingVertical: 35,
                  marginHorizontal: 20,
                }}
              >
                <Image
                  source={
                    emojiImages[item.icon ?? "Default"] ?? emojiImages.Default
                  }
                  style={{
                    width: 55,
                    height: 55,
                  }}
                  contentFit="contain"
                />
              </View>
              <View
                style={{
                  width: 1,
                  height: "60%",
                  backgroundColor: NEWCOLORS.dividerGrey,
                  alignSelf: "center",
                  borderRadius: 1,
                  marginRight: 12,
                }}
              />
            </View>
          )}
        />

        <Pagination.Basic
          progress={progress}
          data={featuredRecipes}
          size={7}
          dotStyle={{
            backgroundColor: "rgba(0,0,0,0.25)",
            borderRadius: 999,
          }}
          containerStyle={{ gap: 6, marginTop: 8 }}
          onPress={onPressPagination}
        />
      </View>

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
