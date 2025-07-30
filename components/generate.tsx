import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { GoogleGenAI } from "@google/genai";
import { styles } from "@/styles/auth.styles";
import { COLORS } from "@/constants/theme";
import Prompt from "@/constants/prompt";
import Timer from "./timer";
import AddIngredients from "@/components/addingredients";
import AddLeftovers from "@/components/addleftovers";
import SearchContext from "@/contexts/SearchContext";
import Search from "@/components/search";
import BackArrow from "@/Icons/BackArrow";
import ForwardArrow from "@/Icons/ForwardArrow";
import { Dimensions } from "react-native";
import IngredientsContext from "@/contexts/IngredientsContext";
import LeftoversEnabled from "@/contexts/LeftoversOn";
import LeftoversContext from "@/contexts/LeftoversContext";
import NutrientsContext from "@/contexts/NutrientsContext";
import NutrientCircle from "./nutrientcircle";
import SavesIcon from "@/Icons/SavesIcon";

import ResetTimer from "@/Icons/ResetTimer";
import DiscardIcon from "@/Icons/DiscardIcon";
import SavesFilled from "@/Icons/SavesFilled";
import { APIKEY } from "@/utils/apikey";
import SavedRecipesContext from "../contexts/SavedRecipesContext";
import { storage } from "@/utils/storage";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ProgressBar from "@/components/progressbar";
import { ScrollView } from "react-native-gesture-handler";
import MealsLeftContext from "@/contexts/MealsLeftContext";

import * as Haptics from "expo-haptics";

type GeneratedProps = {
  generated: boolean;
  setGenerated: Dispatch<SetStateAction<boolean>>;
};

export default function Generate(props: GeneratedProps) {
  const [isChecked, setChecked] = useState(false);
  const [mealsLeft, setMealsLeft] = useContext(MealsLeftContext);
  const ai = new GoogleGenAI({ apiKey: APIKEY });
  var hsl = require("hsl-to-hex");
  let first = true;

  const [responseRecipe, setResponseRecipe] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [loading, setLoading] = useState(false);
  //const [generated, setGenerated] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(0);

  const [error, setError] = useState<Error | null>(null);

  const [ingredients, setIngredients] = useContext(IngredientsContext);
  const [leftovers, setLeftovers] = useContext(LeftoversContext);
  const [leftoversEnabled, setLeftoversEnabled] = useState(false);
  const [nutrients, setNutrients] = useState<number[]>([]);
  const [saved, setSaved] = useState(false);

  let recipePrompt = "";
  let stepNum = 0;

  let carbs: number;
  let fat: number;
  let protien: number;

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  let title: undefined | string;

  const [saves, setSaves] = useContext(SavedRecipesContext);

  useEffect(() => {
    if (title != undefined) {
      setSaved(saves.includes(title));
    }
  }, [saves, title]);

  useEffect(() => {
    const totalSaves = storage.getNumber("mealsnumber") ?? 0;
    storage.set("savesnumber", saves.length);
  });

  const fetchResponse = async (prompt: string) => {
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
      if (response.text) {
        const geminiText = (response.text || "").replace(/^\s+/, "");

        const stepMatches = geminiText.match(/«[^»]+»/g);
        setTotalSteps(stepMatches ? stepMatches.length : 0);

        setResponseRecipe(geminiText);
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
      props.setGenerated(true);
      const totalMeals = storage.getNumber("mealsnumber") ?? 0;
      setMealsLeft(mealsLeft - 1);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      storage.set("mealsnumber", totalMeals + 1);
    }
  };

  const handleGenerateRecipe = (inputRecipe: string) => {
    setCurrentStep(1);
    first = false;
    title = undefined;
    setSaved(false);
    setTotalSteps(0);
    stepNum = 0;
    fetchResponse(inputRecipe);
  };

  recipePrompt = Prompt({
    ingredients: ingredients,
    leftovers: leftovers,
    isChecked: isChecked,
  });

  useEffect(() => {
    if (!responseRecipe) return;

    const modifiedTexts = responseRecipe.split(
      /(\↾[^↿]+\↿|\⇸[^⇷]+\⇷|\⇨[^⇦]+\⇦)/g
    );

    let protein = 0;
    let fat = 0;
    let carbs = 0;

    modifiedTexts.forEach((text) => {
      if (text.startsWith("↾") && text.endsWith("↿")) {
        protein = Number(text.slice(1, -1));
      } else if (text.startsWith("⇨") && text.endsWith("⇦")) {
        fat = Number(text.slice(1, -1));
      } else if (text.startsWith("⇸") && text.endsWith("⇷")) {
        carbs = Number(text.slice(1, -1));
      }
    });

    setNutrients([protein, fat, carbs]);
  }, [responseRecipe]);

  const parseMarkdownText = (input: string) => {
    const texts = input.split(/(\«[^»]+\»)/g);

    return texts.map((text, index) => {
      if (text.startsWith("«") && text.endsWith("»")) {
        const content = text.slice(1, -1);
        stepNum += 1;
        parseMarkdownTextInline(content);
        return currentStep == stepNum ? parseMarkdownTextInline(content) : null;
      } else {
        return null;
      }
    });
  };
  function removeCharacters(str: string, charsToRemove: string[]) {
    const regex = new RegExp(`[${charsToRemove.join("")}]`, "g");
    return (str || "").replace(regex, "");
  }

  const parseMarkdownTextInline = (input: string) => {
    const texts = input.split(/(\*\*[^*]+\*\*|\{[^}]+\})/g);
    let timerIndex = -1;

    return texts.map((text, index) => {
      text = removeCharacters(text, ["↾", "↿", "⇨", "⇦", "⇸", "⇷"]);
      if (text.startsWith("**") && text.endsWith("**")) {
        const content = text.slice(2, -2);

        if (first == true) {
          title = content;
        }
        first = false;
        return (
          <Text
            key={index}
            style={[styles.textCentered, { fontFamily: "Nunito-Bold" }]}
          >
            {content}
          </Text>
        );
      } else if (text.startsWith("{") && text.endsWith("}")) {
        const content = text.slice(1, -1);
        let timeSec = parseInt(content) * 60;
        timerIndex++;
        let color1 = hsl(Math.random() * 359, 45, 79);
        let color2 = hsl(Math.random() * 359, 45, 79);
        let color3 = hsl(Math.random() * 359, 45, 79);

        return timeSec > 0 ? (
          <Timer
            key={index}
            time={timeSec}
            color1={color1}
            color2={color2}
            color3={color3}
          ></Timer>
        ) : null;
      } else if ((text || "").replace(/\n/g, "").trim() !== "") {
        return (
          <Text key={index} style={styles.textCentered}>
            {text}
          </Text>
        );
      } else {
        return null;
      }
    });
  };

  let updatedSaves: string[];

  const saveRecipe = (input: string) => {
    const recipeName = input;
    const isSaved = saves.includes(recipeName);

    if (isSaved) {
      updatedSaves = saves.filter((name) => name !== recipeName);
    } else {
      updatedSaves = [...saves, recipeName];
    }

    setSaves(updatedSaves);
    storage.set("saves", JSON.stringify(updatedSaves));

    alert(`${input} was ${saved ? `removed from saves` : `saved`}`);
  };

  const newMeal = () => {
    props.setGenerated(false);
    setSaved(false);
    setIngredients([]);
    setLeftovers([]);
  };

  return (
    <>
      <NutrientsContext.Provider value={[nutrients, setNutrients]}>
        <LeftoversEnabled.Provider
          value={[leftoversEnabled, setLeftoversEnabled]}
        >
          <SearchContext.Provider value={[searchActive, setSearchActive]}>
            {!loading && props.generated && (
              <ProgressBar
                progress={(currentStep - 1) / (totalSteps - 1)}
              ></ProgressBar>
            )}
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              overScrollMode="never"
              alwaysBounceVertical={false}
              style={[
                styles.generatorContainer,
                props.generated && { paddingVertical: 0 },
              ]}
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
                      paddingHorizontal: 20,
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

                    {loading ? (
                      <Text style={[styles.textCentered, { marginBottom: 25 }]}>
                        Loading...
                      </Text>
                    ) : !props.generated ? (
                      <Text style={[styles.textCentered, { marginBottom: 25 }]}>
                        Generate a meal by adding your leftovers and ingredients
                        below!
                      </Text>
                    ) : (
                      <></>
                    )}
                    <View>
                      {loading && (
                        <ActivityIndicator
                          color={COLORS.blueLink}
                          size={"large"}
                        ></ActivityIndicator>
                      )}
                      {error && (
                        <Text style={styles.errorText}>
                          {error.message || error.toString()}
                        </Text>
                      )}

                      {!loading && props.generated && (
                        <View
                          style={{
                            alignItems: "center",
                            marginVertical: 10,
                            width: "100%",
                          }}
                        >
                          {parseMarkdownText(responseRecipe)}
                          <>{currentStep == 1 && <NutrientCircle />}</>
                        </View>
                      )}
                    </View>
                  </View>
                  {!loading && !props.generated && (
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
                          onPress={() => setChecked(!isChecked)}
                        />
                      </View>
                    </>
                  )}
                </View>

                <View style={styles.arrowButtons}>
                  <View style={styles.flexBTN}>
                    {!loading && props.generated && currentStep > 1 ? (
                      <Pressable
                        style={styles.nextButton}
                        onPress={() => [
                          setCurrentStep(currentStep - 1),
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft),
                        ]}
                      >
                        <BackArrow
                          iconsetcolor={COLORS.fontColor}
                          setheight={14}
                          setwidth={30}
                        ></BackArrow>
                      </Pressable>
                    ) : (
                      <View style={{ width: 40 }} />
                    )}
                  </View>
                  <View style={styles.flexMiddle}>
                    <View style={styles.generateButtonContainer}>
                      {!loading && !props.generated && (
                        <Pressable
                          style={[
                            styles.generateButton,
                            {
                              backgroundColor:
                                leftovers.length > 0 || ingredients.length > 0
                                  ? COLORS.blueHeader
                                  : COLORS.searchGreyBG,
                              borderColor:
                                leftovers.length > 0 || ingredients.length > 0
                                  ? COLORS.blueHeaderBorder
                                  : COLORS.searchGreyBorder,
                            },
                          ]}
                          onPress={
                            leftovers.length > 0 || ingredients.length > 0
                              ? mealsLeft > 0
                                ? () => [
                                    handleGenerateRecipe(recipePrompt),
                                    Haptics.impactAsync(
                                      Haptics.ImpactFeedbackStyle.Light
                                    ),
                                  ]
                                : () =>
                                    alert(
                                      "You have run out of meal generations today. Come again tomorrow!"
                                    )
                              : () =>
                                  alert(
                                    "Add a leftover or ingredient to generate meal!"
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
                      )}

                      {!loading && props.generated && (
                        <>
                          <Pressable
                            style={[
                              styles.generateButtonNew,
                              {
                                backgroundColor: COLORS.genFill,
                                borderColor: COLORS.genBorder,
                              },
                            ]}
                            onPress={
                              mealsLeft > 0
                                ? () => [
                                    handleGenerateRecipe(recipePrompt),

                                    Haptics.impactAsync(
                                      Haptics.ImpactFeedbackStyle.Light
                                    ),
                                  ]
                                : () =>
                                    alert(
                                      "You ran out of meal generations today. Come again tomorrow!"
                                    )
                            }
                          >
                            <View>
                              <ResetTimer
                                iconsetcolor="#a759c8"
                                setheight={25}
                              ></ResetTimer>
                            </View>
                          </Pressable>

                          <Pressable
                            style={[
                              styles.generateButtonNew,
                              {
                                backgroundColor: COLORS.saveFill,
                                borderColor: COLORS.saveBorder,
                              },
                            ]}
                            onPress={() =>
                              title
                                ? [
                                    saveRecipe(title),

                                    Haptics.impactAsync(
                                      Haptics.ImpactFeedbackStyle.Light
                                    ),
                                  ]
                                : alert(
                                    "Error, please regenerate and try again"
                                  )
                            }
                          >
                            <View>
                              {saved ? (
                                <SavesFilled
                                  iconsetcolor={"#5983C8"}
                                  setheight={25}
                                ></SavesFilled>
                              ) : (
                                <SavesIcon
                                  iconsetcolor={"#5983C8"}
                                  setheight={25}
                                ></SavesIcon>
                              )}
                            </View>
                          </Pressable>
                          <Pressable
                            style={[
                              styles.generateButtonNew,
                              {
                                backgroundColor: COLORS.deleteFill,
                                borderColor: COLORS.deleteBorder,
                              },
                            ]}
                            onPress={() => [
                              newMeal(),
                              Haptics.notificationAsync(
                                Haptics.NotificationFeedbackType.Error
                              ),
                            ]}
                          >
                            <View>
                              <DiscardIcon
                                iconsetcolor={"#db904f"}
                                setheight={20}
                                setwidth={20}
                              />
                            </View>
                          </Pressable>
                        </>
                      )}
                    </View>
                  </View>
                  <View style={styles.flexBTN}>
                    {!loading && props.generated && currentStep < totalSteps ? (
                      <Pressable
                        style={styles.nextButton}
                        onPress={() => [
                          setCurrentStep(currentStep + 1),
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft),
                        ]}
                      >
                        <ForwardArrow
                          iconsetcolor={COLORS.fontColor}
                          setheight={14}
                          setwidth={30}
                        ></ForwardArrow>
                      </Pressable>
                    ) : (
                      <View style={{ width: 40 }} />
                    )}
                  </View>
                </View>
                <View style={styles.spacer}></View>
              </View>
            </ScrollView>
          </SearchContext.Provider>
        </LeftoversEnabled.Provider>
      </NutrientsContext.Provider>
    </>
  );
}
