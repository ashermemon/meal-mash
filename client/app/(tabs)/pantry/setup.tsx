import { View, Text, TextInput, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "@/styles/auth.styles";
import ProgressBar from "@/components/features/recipe/ProgressBar";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { NEWCOLORS } from "@/constants/NewTheme";
import OnboardingSequence, {
  OnboardingContext,
} from "@/components/common/OnboardingSequence";
import OnboardingStep from "@/components/common/OnboardingStep";

type Props = {};

const SetupScreen = (props: Props) => {
  const router = useRouter();
  const [pantryName, setPantryName] = useState("Name's Pantry");
  const [currentStep, setCurrentStep] = useState(1);
  const onboarding = useContext(OnboardingContext);

  const handleFinishSteps = async () => {
    // await AsyncStorage.setItem("IS_PANTRY_SETUP", "true");
    // router.replace("/(tabs)/pantry/dashboard");
  };
  return (
    <OnboardingSequence
      setupTitle="Pantry Setup"
      handleFinishSteps={handleFinishSteps}
      stepsContent={[
        <OnboardingStep stepTitle="Let's Name Your Pantry">
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 35,
            }}
          >
            <View style={[styles.emojiCircle, styles.basicBoxShadow]}>
              <CustomIcon
                size={140}
                name={"emoji"}
                filled={false}
                color={NEWCOLORS.unselectedShape}
              ></CustomIcon>
            </View>
          </View>
          <TextInput
            style={styles.setupInput}
            value={pantryName}
            onChangeText={setPantryName}
          />
        </OnboardingStep>,
        <OnboardingStep stepTitle="Would you like to take a photo of your pantry or fridge to automatically add ingredients?"></OnboardingStep>,
        <OnboardingStep stepTitle="Household Essentials / Food Scanner">
          <></>
        </OnboardingStep>,
        <OnboardingStep stepTitle="Review pantry & add additional ingredients and leftover dishes">
          <></>
        </OnboardingStep>,
      ]}
    ></OnboardingSequence>
  );
};

export default SetupScreen;
