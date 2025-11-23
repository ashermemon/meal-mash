import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { styles } from "@/styles/auth.styles";
import { COLORS } from "@/constants/theme";
import { Image } from "expo-image";
import { ScrollView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { NEWCOLORS } from "@/constants/newtheme";
import { CustomIcon } from "@/icon-loader/icon-loader";
import FeaturedRecipes from "./featuredrecipes";
import ExploreSection from "./exploresection";

export default function Welcome() {
  const router = useRouter();
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      overScrollMode="never"
      alwaysBounceVertical={false}
      style={{
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}
    >
      <View style={{ width: "100%", marginBottom: 30 }}>
        <Text
          style={[
            styles.basicTextLeft,
            styles.bold,
            {
              fontSize: 28,
              marginVertical: 5,
            },
          ]}
        >
          Welcome to MealMash!
        </Text>
        <View style={[styles.recipeBar, styles.basicBoxShadow]}>
          <Pressable
            style={[
              styles.circleButton,
              {
                height: 38,
                width: 38,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
            onPress={() => console.log("pressed")}
          >
            <CustomIcon name="camera" filled={true} color={"white"} />
          </Pressable>
          <TextInput
            keyboardType="default"
            spellCheck={false}
            autoCorrect={false}
            autoCapitalize="sentences"
            placeholder={"What are you craving today?"}
            placeholderTextColor={NEWCOLORS.placeholderText}
            style={[
              styles.basicTextLeft,
              {
                flex: 1,
                fontSize: 18,
                color: NEWCOLORS.basicText,
                marginLeft: 15,
                marginRight: 15,
              },
            ]}
          ></TextInput>
          <View style={{ marginRight: 5 }}>
            <CustomIcon name="sparkles" filled={true} color={"grey"} />
          </View>
        </View>

        <FeaturedRecipes></FeaturedRecipes>

        <Text
          style={[
            styles.basicTextLeft,
            styles.bold,
            {
              fontSize: 28,
              marginBottom: 10,
            },
          ]}
        >
          Explore
        </Text>

        <ExploreSection></ExploreSection>
      </View>
    </ScrollView>
  );
}
