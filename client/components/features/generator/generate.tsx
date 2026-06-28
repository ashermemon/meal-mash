import { View, Text, Pressable, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import React, { useContext, useEffect, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { styles } from "@/styles/GlobalStyles";
import { COLORS } from "@/constants/Theme";
import Prompt from "@/constants/prompt";
import AddIngredients from "@/components/features/generator/AddIngredients";
import AddLeftovers from "@/components/features/generator/AddLeftovers";
import SearchContext from "@/contexts/SearchContext";
import Search from "@/components/features/generator/Search";

import { GenerationDetailsContext } from "@/contexts/GenerationDetailsContext";
import LeftoversEnabled from "@/contexts/LeftoversOn";

import { APIKEY } from "@/utils/apikey";
import SavedRecipesContext from "@/contexts/SavedRecipesContext";
import { storage } from "@/utils/storage";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ScrollView } from "react-native-gesture-handler";
import MealsLeftContext from "@/contexts/MealsLeftContext";

import * as Haptics from "expo-haptics";
import RecipeContext from "@/contexts/RecipeContext";
import { router } from "expo-router";
import { RecipeSchema } from "@/utils/RecipeSchema";
import generateConstraints from "@/constants/constraints";
import GeneratorDetails from "./GeneratorDetails";

export default function Generate() {
  const [isChecked, setChecked] = useState(false);
  const [mealsLeft, setMealsLeft] = useContext(MealsLeftContext);
  const ai = new GoogleGenAI({ apiKey: APIKEY });

  const [searchActive, setSearchActive] = useState(false);


  const [error, setError] = useState<Error | null>(null);

  const [generationDetails, setGenerationDetails] = useContext(GenerationDetailsContext);

  const [leftoversEnabled, setLeftoversEnabled] = useState(false);

  const [recipeData, setRecipeData] = useContext(RecipeContext);

  const [saves, setSaves] = useContext(SavedRecipesContext);

  return (
    <>
      <LeftoversEnabled.Provider
        value={[leftoversEnabled, setLeftoversEnabled]}
      >
        <SearchContext.Provider value={[searchActive, setSearchActive]}>

          <GeneratorDetails></GeneratorDetails>
          {/* <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            overScrollMode="never"
            alwaysBounceVertical={false}
            style={styles.generatorContainer}
          >
            <View style={[styles.container]}>
              <View
                style={{
                  width: "100%",

                  flex: 1,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 25,
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Modal
                      isVisible={searchActive}
                      useNativeDriver={true}
                      animationIn="slideInUp"
                      animationOut="slideOutDown"
                      backdropOpacity={0.2}
                      onBackdropPress={() => setSearchActive(false)}
                      onBackButtonPress={() => setSearchActive(false)}
                      animationInTiming={600}
                      animationOutTiming={600}
                      backdropTransitionOutTiming={1}
                      backdropTransitionInTiming={600}
                      style={{
                        margin: 0,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View>
                        <Search />
                      </View>
                    </Modal>
                  </View>


                  <Text style={[styles.textCentered, { marginBottom: 25 }]}>
                    Generate a meal by adding your leftovers and ingredients
                    below!
                  </Text>

                  <View>

                    {error && (
                      <Text style={styles.errorText}>
                        {error.message || error.toString()}
                      </Text>
                    )}
                  </View>
                </View>

                <>
                  <AddLeftovers></AddLeftovers>
                  <AddIngredients></AddIngredients>
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <BouncyCheckbox
                      style={{
                        marginBottom: 15,
                        alignSelf: "center",
                      }}
                      size={25}
                      fillColor={COLORS.greenProgressBar}
                      unFillColor={COLORS.greenButtonColor}
                      text="Allow Additional Ingredients"
                      iconStyle={{
                        borderColor: COLORS.fontColor,
                      }}
                      innerIconStyle={{ borderWidth: 2 }}
                      textStyle={[
                        styles.textLeftSemiBold,
                        { textDecorationLine: "none" },
                      ]}
                      textContainerStyle={{
                        flex: 0,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      useBuiltInState={false}
                      isChecked={isChecked}
                      onPress={() => [
                        setChecked(!isChecked),
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft),
                      ]}
                    />
                  </View>
                </>
              </View>

              <Pressable
                style={[
                  styles.generateButton,
                  {
                    backgroundColor:
                      generationDetails.leftovers.length > 0 || generationDetails.ingredients.length > 0
                        ? COLORS.blueHeader
                        : COLORS.searchGreyBG,
                    borderColor:
                      generationDetails.leftovers.length > 0 || generationDetails.ingredients.length > 0
                        ? COLORS.blueHeaderBorder
                        : COLORS.searchGreyBorder,
                  },
                ]}
                onPress={

                  mealsLeft > 0
                    ? () => [
                      setGenerationDetails((prev) => ({
                        ...prev,
                        isChecked,
                      })),
                      router.push("/recipe"),
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
                    ]
                    : () =>
                      alert(
                        "You have run out of meal generations today. Come again tomorrow!",
                      )
                }
              >
                <Text
                  style={[
                    styles.textCentered,
                    { fontFamily: "Nunito-SemiBold" },
                  ]}
                  adjustsFontSizeToFit={true}
                >
                  Create Meal
                </Text>
              </Pressable>

              <View style={styles.spacer}></View>
            </View>
          </ScrollView> */}
        </SearchContext.Provider>
      </LeftoversEnabled.Provider >
    </>
  );
}
