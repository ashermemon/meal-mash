import { View, Text, Platform, Pressable, TextInput } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "@/styles/GlobalStyles";
import { NEWCOLORS } from "@/constants/NewTheme";
import RecipeContext from "@/contexts/RecipeContext";
import NutrientsContext from "@/contexts/NutrientsContext";
import { GenerationCardPreview } from "../components/features/generator/GenerationCardPreview";
import Timer from "@/components/features/recipe/Timer";
import { Image } from "expo-image";
import { COLORS } from "@/constants/Theme";
import CustomCheckbox from "@/components/common/CustomCheckbox";
import * as Haptics from "expo-haptics";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { useNavigation } from "@react-navigation/native";
import PreviewAnimatedWrapper from "@/components/features/generator/PreviewAnimatedWrapper";
import { SafeAreaView } from "react-native-safe-area-context";
import PantryPill from "@/components/features/generator/PantryPill";
import { ScrollView } from "react-native-gesture-handler";
import SuggestedIngredients from "@/components/features/generator/SuggestedIngredients";
import { useTrueSheet } from "@/contexts/TrueSheetContext";

export default function PantryPage() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: NEWCOLORS.nestedBG }}>
      <ScrollView
        style={{ paddingHorizontal: 25, flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        overScrollMode="never"
        alwaysBounceVertical={false}
      >
        <View
          style={{
            flex: 1,

            position: "relative",
            paddingTop: 20,
            gap: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Pressable
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              style={{
                marginTop: 11,
                marginLeft: 0,
                alignSelf: "flex-start",
                zIndex: 1000,
              }}
              onPress={() =>
                navigation.canGoBack()
                  ? [navigation.goBack(), Haptics.selectionAsync()]
                  : null
              }
            >
              <CustomIcon
                name="arrow-left"
                filled={false}
                color={
                  navigation.canGoBack() ? COLORS.fontColor : COLORS.addPlusGrey
                }
                size={20}
              />
            </Pressable>
            <Text
              style={[
                styles.basicTextLeft,
                styles.bold,
                {
                  fontSize: 28,

                  marginHorizontal: 20,
                },
              ]}
            >
              Pantry
            </Text>
          </View>
          <View style={{ gap: 25 }}>
            <PantryPill
              pantryName={"Untitled Pantry"}
              pantryPage={true}
            ></PantryPill>
            <View style={{ gap: 20 }}>
              <View
                style={[
                  styles.sliderPill,
                  styles.basicBoxShadow,
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: NEWCOLORS.greyBlock,
                  },
                ]}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <CustomIcon
                    name="search-2"
                    filled={false}
                    color={NEWCOLORS.unselectedShape}
                    size={25}
                  />
                  <TextInput
                    placeholder="Search Ingredients"
                    autoCapitalize="words"
                    keyboardType="default"
                    placeholderTextColor={NEWCOLORS.basicText}
                    autoCorrect={true}
                    maxLength={32}
                    style={[
                      {
                        flex: 1,
                        fontSize: 19.5,
                        marginLeft: 12,
                        color: NEWCOLORS.basicText,
                        fontFamily: "Nunito-Medium",
                      },
                    ]}
                  />

                  {/* value={nameQ}
                  onChangeText={setNameQ} */}
                </View>
                <View
                  style={{
                    justifyContent: "flex-end",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 12,
                  }}
                >
                  <View style={styles.verticalLine}></View>
                  <Pressable
                    style={{ paddingRight: 15, paddingLeft: 10 }}
                    onPress={() =>
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                    }
                    hitSlop={{ top: 10, bottom: 10, left: 15, right: 15 }}
                  >
                    <CustomIcon
                      name="camera-2"
                      filled={true}
                      color={NEWCOLORS.placeholderText}
                      size={25}
                    />
                  </Pressable>
                </View>
              </View>
              <SuggestedIngredients
                suggestedIngredients={["Eggs", "Milk", "Cheese"]}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
