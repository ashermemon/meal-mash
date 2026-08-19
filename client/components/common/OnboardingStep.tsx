import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { useStyles } from "@/styles/GlobalStyles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { OnboardingContext } from "./OnboardingSequence";
import { useTheme } from "@/contexts/ColorSchemeContext";
import { useTintedBoxShadow } from "@/hooks/useBoxShadow";
import * as Haptics from "expo-haptics";

type Props = {
  children: React.ReactNode;
  stepTitle?: string;
  onPress?: () => void;
  disableNext?: boolean;
};

const OnboardingStep = (props: Props) => {
  const styles = useStyles();
  const theme = useTheme();
  const onboarding = useContext(OnboardingContext);

  const isDisabled = props.disableNext === true;

  const backButtonShadow = useTintedBoxShadow(theme.placeholderText);
  const continueButtonShadow = useTintedBoxShadow(
    isDisabled ? theme.dividerGrey : theme.greenAccent,
  );

  const handleContinue = () => {
    Haptics.selectionAsync();
    if (props.onPress) {
      try {
        props.onPress();
      } catch (e) {}
    }
    onboarding?.goToNextStep();
  };

  const handleGoBack = () => {
    Haptics.selectionAsync();
    onboarding?.goToPrevStep();
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
              backButtonShadow,
              {
                height: 56,
                width: 56,
                backgroundColor: theme.placeholderText,
              },
            ]}
            onPress={handleGoBack}
          >
            <CustomIcon
              name="arrow-left"
              size={33}
              color={theme.pureWhite}
            ></CustomIcon>
          </Pressable>
          <Pressable
            disabled={isDisabled}
            pointerEvents={isDisabled ? "none" : "auto"}
            style={({ pressed }) => [
              styles.setupButton,
              continueButtonShadow,
              {
                flex: 1,
                backgroundColor: isDisabled
                  ? theme.dividerGrey
                  : theme.greenAccent,
              },
            ]}
            onPress={isDisabled ? undefined : handleContinue}
          >
            <Text style={[styles.textCenterBold, { color: theme.pureWhite }]}>
              Continue
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default OnboardingStep;
