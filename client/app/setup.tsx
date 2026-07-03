import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  BackHandler,
  Text,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { FlatList } from "react-native-gesture-handler";
import { PantryDetailsContext } from "@/contexts/PantryDetails";

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

  const ingredientCardAndOptions: Record<string, string[]> = {
    Eggs: [],
    Milk: [
      "Whole Milk",
      "Low-fat Milk",
      "Skim Milk",
      "Almond Milk",
      "Oat Milk",
    ],
    Yogurt: ["Greek", "Regular", "Skyr", "Kefir", "Plant-Based"],
    Rice: ["White Rice", "Brown Rice", "Jasmine", "Basmati"],
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
      "Whole Wheat",
      "Gluten-Free",
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
    Chicken: ["Breast", "Thighs", "Wings", "Whole Chicken", "Ground Chicken"],
    Beef: ["Ground Beef", "Steak", "Stew Meat", "Ribs"],
    Fish: ["Salmon", "Tuna", "Cod", "Haddock", "Pollock"],
    Butter: ["Salted", "Unsalted", "Margarine", "Ghee"],
    Cheese: [
      "Cheddar",
      "Mozzarella",
      "Parmeasan",
      "Feta",
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

  const handleFinishSteps = async () => {
    // await AsyncStorage.setItem("IS_PANTRY_SETUP", "true");
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
          stepsContent={[
            <OnboardingStep
              stepTitle="Let's Name Your Pantry"
              onPress={() =>
                setPantryDetails((prev) => ({
                  ...prev,
                  name: pantryName.length > 0 ? pantryName : "Your Pantry",
                  icon: "Smiley",
                }))
              }
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                  marginBottom: 40,
                }}
              >
                <View
                  style={[
                    styles.emojiCircle,
                    styles.basicBoxShadow,
                    {
                      height: keyboardOpen ? 110 : 220,
                      width: keyboardOpen ? 110 : 220,
                    },
                  ]}
                >
                  <CustomIcon
                    size={keyboardOpen ? 70 : 140}
                    name={"emoji"}
                    filled={false}
                    color={NEWCOLORS.unselectedShape}
                  ></CustomIcon>
                </View>
              </View>
              <TextInput
                style={[styles.setupInput]}
                value={pantryName}
                onChangeText={setPantryName}
                placeholder="Your Pantry"
                placeholderTextColor={NEWCOLORS.placeholderText}
              />
            </OnboardingStep>,
            <OnboardingStep stepTitle="How would you like to add your ingredients?">
              <View style={{ marginVertical: 10 }}></View>
              <ListButtonSelect
                options={["Snap a photo", "Add manually"]}
                icons={["camera-2", "add"]}
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
                      data={Object.keys(ingredientCardAndOptions)}
                      numColumns={3}
                      columnWrapperStyle={{
                        justifyContent: "space-between",
                        marginTop: 9,
                        marginBottom: 9,
                        gap: 18,
                      }}
                      keyExtractor={(item) => item}
                      renderItem={({ item }) => (
                        <IngredientPickerCard
                          ingredientName={item}
                          selectionMenuOptions={ingredientCardAndOptions[item]}
                        />
                      )}
                    />
                  </View>
                </View>
              )}
            </OnboardingStep>,
            <OnboardingStep stepTitle="Review pantry & add additional ingredients and leftover dishes">
              <></>
            </OnboardingStep>,
          ]}
        ></OnboardingSequence>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SetupScreen;
