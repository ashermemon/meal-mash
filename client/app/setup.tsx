import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  BackHandler,
  Text,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { storage } from "@/utils/storage";
import { styles } from "@/styles/auth.styles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { NEWCOLORS } from "@/constants/NewTheme";
import OnboardingSequence from "@/components/common/OnboardingSequence";
import OnboardingStep from "@/components/common/OnboardingStep";
import { SafeAreaView } from "react-native-safe-area-context";
import MultiSelectPills from "@/components/common/MultiSelectPills";
import ListButtonSelect from "@/components/common/ListButtonSelect";
import Camera from "@/components/universal/Camera";
import { useCameraPermissions } from "expo-camera";
import IngredientPickerCard from "@/components/features/pantry/IngredientPickerCard";
import * as Haptics from "expo-haptics";
import {
  FlatList,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import { PantryDetailsContext } from "@/contexts/PantryDetails";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Food } from "@/components/features/pantry/Search";
import { searchHouseholdEssentials } from "@/components/features/pantry/SearchFunctionality";

type Props = {};

const SetupScreen = (props: Props) => {
  const router = useRouter();
  const [pantryDetails, setPantryDetails] = useContext(PantryDetailsContext);
  const [pantryName, setPantryName] = useState(
    pantryDetails.name === "Your Pantry" ? "" : pantryDetails.name,
  );
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [cameraNext, setCameraNext] = useState(false);

  const [showCamera, setShowCamera] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const emojis = [
    "🍄",
    "🥑",
    "🥔",
    "🥕",
    "🌽",
    "🌶️",
    "🫑",
    "🥒",
    "🥬",
    "🥦",
    "🧄",
    "🧅",
    "🥜",
    "🫛",
    "🍄‍🟫",
    "🫜",
    "🍞",
    "🥐",
    "🥖",
    "🥨",
    "🥯",
    "🧇",
    "🧀",
    "🍔",
    "🍟",
    "🍕",
    "🌭",
    "🥪",
    "🌮",
    "🌯",
    "🥙",
    "🍳",
    "🥣",
    "🥗",
    "🍿",
    "🍱",
    "🍛",
    "🍜",
    "🍝",
    "🥟",
    "🦀",
    "🦞",
    "🦐",
    "🦑",
    "🍦",
    "🍧",
    "🍨",
    "🍩",
    "🍪",
    "🎂",
    "🍰",
    "🧁",
    "🥧",
    "🍫",
    "🍬",
    "🍭",
    "🍽️",
    "🍴",
    "🥄",
  ];

  const pressed = useSharedValue<boolean>(false);
  const [currentEmojiText, setCurrentEmojiText] = useState("");

  const tap = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
    })
    .onFinalize(() => {
      pressed.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(pressed.value ? 1.15 : 1) }],
    };
  });

  function switchEmoji() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    const randomIndex = Math.floor(Math.random() * emojis.length);
    setCurrentEmojiText(emojis[randomIndex]);
  }

  const initialIngredientGroups: Record<string, string[]> = {
    Eggs: [],
    Milk: [
      "Whole Milk",
      "Low-fat Milk",
      "Skim Milk",
      "Almond Milk",
      "Oat Milk",
    ],
    Yogurt: [
      "Greek Yogurt",
      "Regular Yogurt",
      "Skyr",
      "Kefir",
      "Plant-Based Yogurt",
    ],
    Rice: ["White Rice", "Brown Rice", "Jasmine Rice", "Basmati Rice"],
    Pasta: [
      "Spaghetti",
      "Fettuccine",
      "Linguine",
      "Rigatoni",
      "Macaroni",
      "Penne",
      "Fusilli",
      "Ravioli",
      "Tortellini",
      "Lasagna",
      "Whole Wheat Pasta",
      "Gluten-Free Pasta",
    ],
    Bread: [
      "White Bread",
      "Whole Grain Bread",
      "Baguette",
      "Sourdough",
      "Rye",
      "Brioche",
      "Naan",
      "Pita",
      "Tortilla",
    ],
    Vegetables: [
      "Tomatoes",
      "Onions",
      "Potatoes",
      "Cabbage",
      "Lettuce",
      "Bell Peppers",
      "Carrots",
      "Broccoli",
      "Cucumbers",
      "Eggplant",
      "Corn",
      "Zucchini",
      "Mushroom",
      "Cauliflower",
      "Celery",
      "Radish",
      "Asparagus",
    ],
    Fruits: [
      "Bananas",
      "Watermelons",
      "Apples",
      "Oranges",
      "Grapes",
      "Mangoes",
      "Pineapples",
      "Strawberries",
      "Blueberries",
      "Kiwi",
      "Lemon",
      "Lime",
      "Pomegranate",
      "Cherries",
      "Avocado",
    ],
    Beans: [
      "Black Beans",
      "Chickpeas",
      "Kidney Beans",
      "Pinto Beans",
      "White Beans",
      "Soybeans",
    ],
    Chicken: [
      "Chicken Breast",
      "Chicken Thighs",
      "Chicken Wings",
      "Whole Chicken",
      "Ground Chicken",
    ],
    Beef: ["Ground Beef", "Steak", "Stew Meat", "Ribs"],
    Fish: ["Salmon", "Tuna", "Cod", "Haddock", "Pollock"],
    Butter: ["Salted Butter", "Unsalted Butter", "Margarine", "Ghee"],
    Cheese: [
      "Cheddar Cheese",
      "Mozzarella Cheese",
      "Parmesan Cheese",
      "Feta Cheese",
      "Cream Cheese",
      "Cottage Cheese",
    ],
    Oil: [
      "Olive Oil",
      "Vegetable Oil",
      "Canola Oil",
      "Coconut Oil",
      "Sesame Oil",
      "Avocado Oil",
    ],
  };

  type IngredientGroup = {
    key: string;
    ingredient: Food;
    options: Food[];
  };

  const ingredientGroups: IngredientGroup[] = Object.entries(
    initialIngredientGroups,
  ).map(([baseName, optionNames]) => {
    const baseIngredient =
      searchHouseholdEssentials(baseName).find(
        (item) => item.name.toLowerCase() === baseName.toLowerCase(),
      ) ??
      ({
        id: 0,
        name: baseName,
        category: "Other",
        displayName: baseName,
      } as Food);

    const options = optionNames.map((optionName) => {
      return (
        searchHouseholdEssentials(optionName).find(
          (item) => item.name.toLowerCase() === optionName.toLowerCase(),
        ) ??
        ({
          id: 0,
          name: optionName,
          category: "Other",
          displayName: optionName,
        } as Food)
      );
    });

    return {
      key: baseName,
      ingredient: baseIngredient,
      options,
    };
  });

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (showCamera) {
          setShowCamera(false);
          return true;
        }
        return false;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      return () => subscription.remove();
    }, [showCamera]),
  );

  useEffect(() => {
    if (selected === 0) {
      setCameraNext(true);
      permission
        ? !permission.granted
          ? [requestPermission(), setShowCamera(true)]
          : setShowCamera(true)
        : [requestPermission(), setShowCamera(true)];
    } else if (selected === 1) {
      setCameraNext(false);
      setShowCamera(false);
    }
  }, [selected]);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardOpen(true),
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardOpen(false),
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleFinishSteps = () => {
    storage.set("IS_PANTRY_SETUP", true);
    router.replace("/(tabs)/pantry/dashboard");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: NEWCOLORS.nestedBG }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <OnboardingSequence
          setupTitle="Pantry Setup"
          handleFinishSteps={handleFinishSteps}
          onBack={() => router.back()}
          stepsContent={[
            <OnboardingStep
              stepTitle="Let's Name Your Pantry"
              onPress={() =>
                setPantryDetails((prev) => ({
                  ...prev,
                  name: pantryName.length > 0 ? pantryName : "Your Pantry",
                  icon: currentEmojiText,
                }))
              }
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: keyboardOpen ? 10 : 20,
                  marginBottom: keyboardOpen ? 30 : 40,
                }}
              >
                <GestureDetector gesture={tap}>
                  <Animated.View
                    onTouchStart={switchEmoji}
                    style={[
                      styles.emojiCircle,
                      styles.basicBoxShadow,
                      animatedStyles,
                      {
                        height: keyboardOpen ? 150 : 220,
                        width: keyboardOpen ? 150 : 220,
                      },
                    ]}
                  >
                    {currentEmojiText === "" ? (
                      <CustomIcon
                        size={keyboardOpen ? 100 : 140}
                        name={"emoji"}
                        filled={false}
                        color={NEWCOLORS.unselectedShape}
                      ></CustomIcon>
                    ) : (
                      <Text
                        style={{
                          fontSize: keyboardOpen ? 70 : 100,
                        }}
                      >
                        {currentEmojiText}
                      </Text>
                    )}
                  </Animated.View>
                </GestureDetector>
              </View>
              <TextInput
                style={[
                  styles.setupInput,
                  { marginBottom: keyboardOpen ? 120 : 0 },
                ]}
                value={pantryName}
                onChangeText={setPantryName}
                placeholder="Your Pantry"
                placeholderTextColor={NEWCOLORS.placeholderText}
              />
            </OnboardingStep>,
            <OnboardingStep
              stepTitle="How would you like to add your ingredients?"
              disableNext={selected === -1}
            >
              <View style={{ marginVertical: 10 }}></View>
              <ListButtonSelect
                options={["Snap a photo", "Add manually"]}
                icons={["camera-2", "add"]}
                selected={selected}
                setSelected={setSelected}
              />
            </OnboardingStep>,
            <OnboardingStep>
              {cameraNext ? (
                showCamera ? (
                  <>
                    <View style={{ width: "100%", flex: 1 }}>
                      <Camera></Camera>
                    </View>
                  </>
                ) : (
                  <Text>Camera Permissions Denied</Text>
                )
              ) : (
                <View
                  style={{
                    justifyContent: "flex-end",

                    flex: 1,
                  }}
                >
                  <Text
                    style={[
                      styles.textLeftBold,
                      { fontSize: 20, marginBottom: 7 },
                    ]}
                  >
                    Household Essentials:
                  </Text>

                  <Text
                    style={[
                      styles.textLeft,
                      { fontSize: 15, marginBottom: 10 },
                    ]}
                  >
                    Select ingredients to add to pantry
                  </Text>

                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FlatList
                      data={ingredientGroups}
                      numColumns={3}
                      columnWrapperStyle={{
                        justifyContent: "space-between",
                        marginTop: 9,
                        marginBottom: 9,
                        gap: 18,
                      }}
                      keyExtractor={(item) => item.key}
                      renderItem={({ item }) => (
                        <IngredientPickerCard
                          ingredient={item.ingredient}
                          ingredientName={
                            item.ingredient.displayName ?? item.ingredient.name
                          }
                          selectionMenuOptions={item.options}
                        />
                      )}
                    />
                  </View>
                </View>
              )}
            </OnboardingStep>,
          ]}
        ></OnboardingSequence>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SetupScreen;
