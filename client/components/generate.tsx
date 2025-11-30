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

import { Dimensions } from "react-native";
import IngredientsContext from "@/contexts/IngredientsContext";
import LeftoversEnabled from "@/contexts/LeftoversOn";
import LeftoversContext from "@/contexts/LeftoversContext";
import NutrientsContext from "@/contexts/NutrientsContext";
import NutrientCircle from "./nutrientcircle";

import { APIKEY } from "@/utils/apikey";
import SavedRecipesContext from "../contexts/SavedRecipesContext";
import { storage } from "@/utils/storage";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ProgressBar from "@/components/progressbar";
import { ScrollView } from "react-native-gesture-handler";
import MealsLeftContext from "@/contexts/MealsLeftContext";

import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { CustomIcon } from "@/icon-loader/icon-loader";

type GeneratedProps = {
  generated: boolean;
  setGenerated: Dispatch<SetStateAction<boolean>>;
  title: string | undefined;
  setTitle: Dispatch<SetStateAction<string | undefined>>;
};

export default function Generate(props: GeneratedProps) {
  const [isChecked, setChecked] = useState(false);
  const [mealsLeft, setMealsLeft] = useContext(MealsLeftContext);
  const ai = new GoogleGenAI({ apiKey: APIKEY });
  var hsl = require("hsl-to-hex");

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
  const [checkboxStates, setCheckboxStates] = useState<Record<number, boolean>>(
    {}
  );

  let recipePrompt = "";
  let stepNum = 0;

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const [saves, setSaves] = useContext(SavedRecipesContext);

  useEffect(() => {
    if (props.title != undefined) {
      setSaved(saves.includes(props.title));
    }
  }, [saves, props.title]);

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

        const stepMatches = geminiText.match(/<step>[\s\S]*?<\/step>/g);
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
    setCheckboxStates({});
    props.setTitle(undefined);
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
      /(<(?:protein|fat|carbs)>[\s\S]*?<\/(?:protein|fat|carbs)>)/g
    );

    let protein = 0;
    let fat = 0;
    let carbs = 0;

    modifiedTexts.forEach((text) => {
      if (text.startsWith("<protein>") && text.endsWith("</protein>")) {
        protein = Number(text.slice(9, -10));
      } else if (text.startsWith("<fat>") && text.endsWith("</fat>")) {
        fat = Number(text.slice(5, -6));
      } else if (text.startsWith("<carbs>") && text.endsWith("</carbs>")) {
        carbs = Number(text.slice(7, -8));
      }
    });

    setNutrients([protein, fat, carbs]);
  }, [responseRecipe]);

  const parseMarkdownText = (input: string) => {
    console.log(input);
    const texts = input.split(/(<step>[\s\S]*?<\/step>)/g);

    return texts.map((text, index) => {
      if (text.startsWith("<step>") && text.endsWith("</step>")) {
        const content = text.slice(6, -7);
        stepNum += 1;
        return currentStep == stepNum ? parseMarkdownTextInline(content) : null;
      } else {
        return null;
      }
    });
  };

  const parseMarkdownTextInline = (input: string) => {
    const cleanInput = input
      .replace(/<protein>[\s\S]*?<\/protein>/g, "")
      .replace(/<fat>[\s\S]*?<\/fat>/g, "")
      .replace(/<carbs>[\s\S]*?<\/carbs>/g, "")
      .replace(/\n{2,}/g, "\n")
      .replace(/<\/?replace>/g, "") // Optional: keep this if <replace> is still used
      .replace(/^\s+|\s+$/g, "");

    const texts = cleanInput.split(
      /(<(?:bold|timer|title|head|line|checkbox|tip|desc|box)>[\s\S]*?<\/(?:bold|timer|title|head|line|checkbox|tip|desc|box)>)/g
    );
    let timerIndex = -1;

    return texts.map((text, index) => {
      if (text.startsWith("<head>") && text.endsWith("</head>")) {
        const content = text.slice(6, -7);
        return (
          <Text
            key={index}
            style={[
              styles.textCentered,
              { fontFamily: "Nunito-Bold", fontSize: 20 },
            ]}
          >
            {content}
          </Text>
        );
      }
      if (text.startsWith("<title>") && text.endsWith("</title>")) {
        const content = text.slice(7, -8);
        props.setTitle(content);
        return (
          <Text
            key={index}
            style={[
              styles.textCentered,
              { fontFamily: "Nunito-Bold", fontSize: 20 },
            ]}
          >
            {content}
          </Text>
        );
      }
      if (text.startsWith("<bold>") && text.endsWith("</bold>")) {
        const content = text.slice(6, -7);

        return (
          <Text
            key={index}
            style={[
              styles.textCentered,
              { fontFamily: "Nunito-Bold", fontSize: 16 },
            ]}
          >
            {content}
          </Text>
        );
      }
      if (text.startsWith("<desc>") && text.endsWith("</desc>")) {
        const content = text.slice(6, -7);

        return (
          <>
            <Text key={index}>{"\n"}</Text>
            <Text
              key={index}
              style={[
                styles.textCentered,
                { fontFamily: "Nunito-Italic", fontSize: 16 },
              ]}
            >
              {content}
            </Text>
          </>
        );
      }
      if (text.startsWith("<timer>") && text.endsWith("</timer>")) {
        const content = text.slice(7, -8);
        let timeSec = parseInt(content) != null ? parseInt(content) * 60 : 0;
        timerIndex++;
        let color1 = hsl(Math.random() * 359, 55, 69);
        let color2 = hsl(Math.random() * 359, 55, 69);
        let color3 = hsl(Math.random() * 359, 55, 69);

        return timeSec > 0 ? (
          <Timer
            key={index}
            time={timeSec}
            color1={color1}
            color2={color2}
            color3={color3}
          ></Timer>
        ) : null;
      }
      if (text.startsWith("<box>") && text.endsWith("</box>")) {
        const content = text.slice(5, -6);

        const innerTexts = content.split(
          /(<(?:duration|servings|difficulty)>[\s\S]*?<\/(?:duration|servings|difficulty)>)/g
        );

        return (
          <View
            key={index}
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
              marginTop: 15,
              marginBottom: 30,
            }}
          >
            {innerTexts.map((innerText, innerIndex) => {
              if (
                innerText.startsWith("<duration>") &&
                innerText.endsWith("</duration>")
              ) {
                const durationContent = innerText.slice(10, -11);
                return (
                  <View
                    key={innerIndex}
                    style={[
                      styles.overviewBoxes,
                      {
                        backgroundColor: COLORS.deleteFill,
                        borderColor: COLORS.deleteBorder,
                      },
                    ]}
                  >
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      style={[
                        styles.textCentered,
                        { fontFamily: "Nunito-Bold" },
                      ]}
                    >
                      {durationContent}
                    </Text>
                    <Text
                      style={[
                        styles.textCentered,
                        { fontFamily: "Nunito-Medium", fontSize: 12 },
                      ]}
                    >
                      Duration
                    </Text>
                  </View>
                );
              }
              if (
                innerText.startsWith("<servings>") &&
                innerText.endsWith("</servings>")
              ) {
                const servingsContent = innerText.slice(10, -11);
                return (
                  <View
                    key={innerIndex}
                    style={[
                      styles.overviewBoxes,
                      {
                        backgroundColor: COLORS.saveFill,
                        borderColor: COLORS.saveBorder,
                      },
                    ]}
                  >
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      style={[
                        styles.textCentered,
                        { fontFamily: "Nunito-Bold" },
                      ]}
                    >
                      {"Makes " + servingsContent}
                    </Text>
                    <Text
                      style={[
                        styles.textCentered,
                        { fontFamily: "Nunito-Medium", fontSize: 12 },
                      ]}
                    >
                      Servings
                    </Text>
                  </View>
                );
              }
              if (
                innerText.startsWith("<difficulty>") &&
                innerText.endsWith("</difficulty>")
              ) {
                const difficultyContent = innerText.slice(12, -13);
                return (
                  <View
                    key={innerIndex}
                    style={[
                      styles.overviewBoxes,
                      {
                        backgroundColor: COLORS.greenButtonColor,
                        borderColor: COLORS.greenButtonColorOuline,
                      },
                    ]}
                  >
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      style={[
                        styles.textCentered,
                        { fontFamily: "Nunito-Bold" },
                      ]}
                    >
                      {difficultyContent}
                    </Text>
                    <Text
                      style={[
                        styles.textCentered,
                        { fontFamily: "Nunito-Medium", fontSize: 12 },
                      ]}
                    >
                      Difficulty
                    </Text>
                  </View>
                );
              }
              return null;
            })}
          </View>
        );
      }

      if (text.startsWith("<checkbox>") && text.endsWith("</checkbox>")) {
        const content = text.slice(10, -11);
        const isCheckeda = checkboxStates[index] || false;

        return (
          <View
            key={index}
            style={[styles.ingredientContainer, { marginBottom: 10 }]}
          >
            <BouncyCheckbox
              style={{
                marginVertical: 10,
                marginHorizontal: 25,
                alignSelf: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
              size={20}
              fillColor={"#939396"}
              unFillColor={COLORS.newHeader}
              text={content}
              iconStyle={{
                borderColor: COLORS.fontColor,
                borderRadius: 5,
              }}
              isChecked={isCheckeda}
              innerIconStyle={{ borderWidth: 2, borderRadius: 5 }}
              textStyle={[
                styles.textLeftSemiBold,
                {
                  fontSize: 14,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  color: isCheckeda ? "#939396" : COLORS.fontColor,
                },
              ]}
              textContainerStyle={{
                flex: 0,
                justifyContent: "center",
              }}
              useBuiltInState={false}
              onPress={() => {
                setCheckboxStates((prev) => ({
                  ...prev,
                  [index]: !prev[index],
                }));
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
              }}
            />
          </View>
        );
      }
      if (text.startsWith("<tip>") && text.endsWith("</tip>")) {
        const content = text.slice(5, -6);

        return (
          <View key={index} style={styles.tipContainer}>
            <View style={[styles.centeredBox]}>
              <Image
                source={require(`../assets/3DIcons/LightBulbEmoji.png`)}
                style={{ width: 35, height: 50 }}
              ></Image>
            </View>
            <View style={styles.centeredBox}>
              <Text style={[styles.textLeftBold, { marginLeft: 20 }]}>
                {content}
              </Text>
            </View>
          </View>
        );
      }
      if (text.startsWith("<line>") && text.endsWith("</line>")) {
        return <Text key={index}>{"\n"}</Text>;
      } else if (text.replace(/\s+/g, "").length > 0) {
        return (
          <Text key={index} style={[styles.textCentered, { fontSize: 16 }]}>
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
    props.setTitle(undefined);
  };

  return (
    <>
      <NutrientsContext.Provider value={[nutrients, setNutrients]}>
        <LeftoversEnabled.Provider
          value={[leftoversEnabled, setLeftoversEnabled]}
        >
          <SearchContext.Provider value={[searchActive, setSearchActive]}>
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
                          onPress={() => [
                            setChecked(!isChecked),
                            Haptics.impactAsync(
                              Haptics.ImpactFeedbackStyle.Soft
                            ),
                          ]}
                        />
                      </View>
                    </>
                  )}
                </View>

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
                  <View style={styles.recipeMovement}>
                    <Pressable
                      style={
                        currentStep > 1
                          ? styles.nextButton
                          : styles.nextButtonEmpty
                      }
                      onPress={() =>
                        currentStep > 1 && [
                          setCurrentStep(currentStep - 1),
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft),
                        ]
                      }
                    >
                      <CustomIcon
                        color={
                          currentStep > 1
                            ? COLORS.fontColor
                            : COLORS.addPlusGrey
                        }
                        name={"arrow-left"}
                        size={20}
                        filled={true}
                      ></CustomIcon>
                    </Pressable>

                    <ProgressBar
                      progress={(currentStep - 1) / (totalSteps - 1)}
                    ></ProgressBar>

                    <Pressable
                      style={
                        currentStep < totalSteps
                          ? styles.nextButton
                          : styles.nextButtonEmpty
                      }
                      onPress={() =>
                        currentStep < totalSteps && [
                          setCurrentStep(currentStep + 1),
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft),
                        ]
                      }
                    >
                      <></>
                    </Pressable>
                  </View>
                )}
                <View style={styles.spacer}></View>
              </View>
            </ScrollView>
          </SearchContext.Provider>
        </LeftoversEnabled.Provider>
      </NutrientsContext.Provider>
    </>
  );
}
