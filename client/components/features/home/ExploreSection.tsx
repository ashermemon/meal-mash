import { Dimensions, Pressable, Text, View } from "react-native";
import React, { useState } from "react";
import { useStyles } from "@/styles/GlobalStyles";
import { useTheme, useIsDarkMode } from "@/contexts/ColorSchemeContext";
import { router } from "expo-router";
import icons3d from "@/components/universal/3dIcons";
import { Image } from "expo-image";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import InfoTag from "../recipe/InfoTag";

const featuredRecipes = [
  {
    id: "1",
    title: "Salad Mix Bowl",
    tag: "Lunch",
    time: "25 m",
    difficulty: "Moderate",
    icon: require("@/assets/images/meal-images/salad.webp"),
  },
  {
    id: "2",
    title: "Fish Tacos",
    tag: "Lunch",
    time: "55 m",

    difficulty: "Expert",
    icon: require("@/assets/images/meal-images/taco.webp"),
  },
  {
    id: "3",
    title: "Chicken Sliders",
    tag: "Lunch",
    time: "1 hr 30 m",

    difficulty: "Easy",
    icon: require("@/assets/images/meal-images/burger.webp"),
  },
];

export default function ExploreSection() {
  const styles = useStyles();
  const theme = useTheme();
  const isDark = useIsDarkMode();
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
    icon,
  }: {
    title: string;
    color: string;
    children?: React.ReactNode;
    link?: string;
    height?: number;
    icon?: string;
  }) => (
    <Pressable
      style={[
        styles.homeBlock,
        {
          flex: 1,
          backgroundColor: color,
          height: height ? height : undefined,

          paddingHorizontal: 10,
        },
        styles.basicBoxShadow,
      ]}
      onPress={() => router.navigate(`/${link}` as any)}
    >
      <></>

      <Text
        style={[
          styles.basicTextLeft,

          {
            fontFamily: "Nunito-SemiBold",
            fontSize: 20,
            textAlign: "center",
            color: theme.pureWhite,
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
          source={(icon ? icons3d[icon] : icons3d.Default) || icons3d.Default}
          contentFit="contain"
          style={{
            alignSelf: "center",
            flex: 1,
            aspectRatio: 1,
          }}
        />
      </View>
    </Pressable>
  );
  const [width, setWidth] = useState(Dimensions.get("window").width - 60);

  return (
    <View style={{ flexDirection: "column", gap: 10, width: "100%" }}>
      <View
        style={[
          styles.homeBlock,
          styles.basicBoxShadow,
          {
            flex: 1,
            backgroundColor: theme.greyBlock,

            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        {/* <View
          style={{
            borderBottomWidth: 1,
            paddingBottom: 5,
            marginBottom: 5,
            width: "100%",
            alignItems: "center",
            borderColor: theme.addButtonStroke,
          }}
        >
          <Text
            style={[
              styles.textLeftSemiBold,
              { fontSize: 16, margin: 5, fontFamily: "Nunito-Medium" },
            ]}
          >
            Featured Recipes of the Week
          </Text>
        </View> */}
        <View
          style={{ width: "100%" }}
          onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
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
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 16,
                }}
              >
                <View style={{ flex: 0, marginRight: 25 }}>
                  <Image
                    source={item.icon}
                    style={{
                      width: 80,
                      height: 80,
                    }}
                    contentFit="contain"
                  />
                </View>
                <View style={{ flex: 1, gap: 7 }}>
                  <Text
                    style={[
                      styles.basicTextLeft,

                      {
                        fontFamily: "Nunito-SemiBold",
                        fontSize: 22,
                      },
                    ]}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <View style={{ flexDirection: "row", gap: 7 }}>
                    <InfoTag
                      type="difficulty"
                      data={item.difficulty}
                      fontSize={12}
                      c
                    />
                    <InfoTag type="time" data={item.time} fontSize={12} c />
                    <InfoTag type="tags" data={item.tag} fontSize={12} c />
                  </View>
                </View>
              </View>
            )}
          />
        </View>

        <Pagination.Basic
          progress={progress}
          data={featuredRecipes}
          size={7}
          dotStyle={{
            backgroundColor: isDark
              ? "rgba(255,255,255,0.25)"
              : "rgba(0,0,0,0.25)",
            borderRadius: 999,
          }}
          activeDotStyle={{
            backgroundColor: isDark ? "white" : "black",
            borderRadius: 999,
          }}
          containerStyle={{ gap: 6, marginTop: 9 }}
          onPress={onPressPagination}
        />
      </View>

      <View style={{ flexDirection: "row", gap: 10, width: "100%" }}>
        <Block
          height={200}
          title="Meal Generator"
          color={isDark ? theme.blueBlock : theme.blueAccent}
          link="(tabs)/generationpage"
          icon="Burrito"
        >
          <Text
            style={[
              styles.basicTextCenter,
              { fontSize: 10, marginVertical: 5, color: theme.pureWhite },
            ]}
          >
            Make a new dish from your leftovers and ingredients you already have
            at home!
          </Text>
        </Block>

        <View style={{ flex: 1, flexDirection: "column", gap: 10 }}>
          <Block
            title="Your Pantry"
            color={isDark ? theme.orangeBlock : theme.orangeAccent}
            link="(tabs)/pantry"
            icon="Peach"
          />
          <Block
            title="Saved Recipes"
            color={isDark ? theme.greenBlock : theme.greenAccent}
            link="../saveshome"
            icon="RecipeBook"
          />
        </View>
      </View>
    </View>
  );
}
