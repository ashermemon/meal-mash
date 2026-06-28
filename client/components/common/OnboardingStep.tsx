import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { styles } from "@/styles/auth.styles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { OnboardingContext } from "./OnboardingSequence";

type Props = {
  children: React.ReactNode;
  stepTitle: string;
};

const OnboardingStep = (props: Props) => {
  const onboarding = useContext(OnboardingContext);

  return (
    <View style={{ marginVertical: 5 }}>
      <Text style={styles.setupTitle}>{props.stepTitle}</Text>
      {props.children}

      <Pressable
        style={[styles.setupButton, styles.basicBoxShadow]}
        onPress={() => onboarding?.goToPrevStep()}
      >
        <CustomIcon name="arrow-left" size={33} color="white"></CustomIcon>
      </Pressable>
      <Pressable
        style={[styles.setupButton, styles.basicBoxShadow]}
        onPress={() => onboarding?.goToNextStep()}
      >
        <CustomIcon name="arrow-right" size={33} color="white"></CustomIcon>
      </Pressable>
    </View>
  );
};

export default OnboardingStep;
