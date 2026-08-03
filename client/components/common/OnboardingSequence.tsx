import { View, Text, Pressable } from "react-native";
import React, { createContext, useState } from "react";
import { styles } from "@/styles/auth.styles";
import ProgressBar from "../features/recipe/ProgressBar";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { useRouter } from "expo-router";

export type OnboardingContextType = {
  currentStep: number;
  totalSteps: number;
  goToNextStep: () => void;
  goToPrevStep: () => void;
};

export const OnboardingContext = createContext<OnboardingContextType | null>(
  null,
);

type Props = {
  setupTitle: string;
  handleFinishSteps: Function;
  stepsContent: React.ReactNode[];
};

const OnboardingSequence = (props: Props) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => {
    if (currentStep === props.stepsContent.length) {
      props.handleFinishSteps();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = props.stepsContent[currentStep - 1];

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        totalSteps: props.stepsContent.length,
        goToNextStep,
        goToPrevStep,
      }}
    >
      <View style={styles.setupContainer}>
        <Text style={[styles.textLeftSemiBold, { fontSize: 18 }]}>
          {props.setupTitle}
        </Text>
        {/* prog bar*/}
        <View>
          <View style={{ marginVertical: 20 }}>
            <ProgressBar
              progress={0}
              height={10}
              fragmented
              currentStep={currentStep}
              steps={props.stepsContent.length}
            ></ProgressBar>
          </View>
        </View>
        <View style={{ justifyContent: "space-between", flex: 1 }}>
          {CurrentStepComponent}
        </View>
      </View>
    </OnboardingContext.Provider>
  );
};

export default OnboardingSequence;
