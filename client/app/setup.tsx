import { View, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "@/styles/auth.styles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { NEWCOLORS } from "@/constants/NewTheme";
import OnboardingSequence from "@/components/common/OnboardingSequence";
import OnboardingStep from "@/components/common/OnboardingStep";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

const SetupScreen = (props: Props) => {
  const router = useRouter();
  const [pantryName, setPantryName] = useState("Name's Pantry");

  const handleFinishSteps = async () => {
    // await AsyncStorage.setItem("IS_PANTRY_SETUP", "true");
    router.replace("/(tabs)/pantry/dashboard");
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: NEWCOLORS.nestedBG }}>
      <OnboardingSequence
        setupTitle="Pantry Setup"
        handleFinishSteps={handleFinishSteps}
        stepsContent={[
          <OnboardingStep stepTitle="Let's Name Your Pantry">
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 40,
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
            </KeyboardAvoidingView>
          </OnboardingStep>,
          <OnboardingStep stepTitle="How would you like to add your ingredients?">
            <></>
          </OnboardingStep>,
          <OnboardingStep stepTitle="Household Essentials / Food Scanner">
            <></>
          </OnboardingStep>,
          <OnboardingStep stepTitle="Review pantry & add additional ingredients and leftover dishes">
            <></>
          </OnboardingStep>,
        ]}
      ></OnboardingSequence>
    </SafeAreaView>
  );
};

export default SetupScreen;
