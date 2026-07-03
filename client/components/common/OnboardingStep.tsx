import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { styles } from "@/styles/auth.styles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { OnboardingContext } from "./OnboardingSequence";
import { NEWCOLORS } from "@/constants/NewTheme";

type Props = {
  children: React.ReactNode;
  stepTitle?: string;
  onPress?: () => void;
  disableNext?: boolean;
};

const OnboardingStep = (props: Props) => {
  const onboarding = useContext(OnboardingContext);

  const isDisabled = props.disableNext === true;

  const handleContinue = () => {
    if (props.onPress) {
      try {
        props.onPress();
      } catch (e) {}
    }
    onboarding?.goToNextStep();
  };

  return (
    <>
      <View style={{ flex: 1, justifyContent: "center" }}>
        {props.stepTitle != null ? (
          <Text style={styles.setupTitle}>{props.stepTitle}</Text>
        ) : (
          <></>
        )}
        <>{props.children}</>
      </View>
      <View>
        <View style={{ flexDirection: "row", gap: 20, paddingTop: 40 }}>
          <Pressable
            style={[
              styles.setupButton,
              styles.basicBoxShadow,
              {
                height: 56,
                width: 56,
                backgroundColor: NEWCOLORS.placeholderText,
              },
            ]}
            onPress={() => onboarding?.goToPrevStep()}
          >
            <CustomIcon name="arrow-left" size={33} color="white"></CustomIcon>
          </Pressable>
          <Pressable
            disabled={isDisabled}
            pointerEvents={isDisabled ? "none" : "auto"}
            style={({ pressed }) => [
              styles.setupButton,
              styles.basicBoxShadow,
              {
                flex: 1,
                backgroundColor: isDisabled
                  ? NEWCOLORS.dividerGrey
                  : NEWCOLORS.greenAccent,
              },
            ]}
            onPress={isDisabled ? undefined : handleContinue}
          >
            <Text style={[styles.textCenterBold, { color: "white" }]}>
              Continue
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default OnboardingStep;
