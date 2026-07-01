import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { styles } from "@/styles/auth.styles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { OnboardingContext } from "./OnboardingSequence";
import { NEWCOLORS } from "@/constants/NewTheme";

type Props = {
  children: React.ReactNode;
  stepTitle?: string;
};

const OnboardingStep = (props: Props) => {
  const onboarding = useContext(OnboardingContext);

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
            style={[styles.setupButton, styles.basicBoxShadow, { flex: 1 }]}
            onPress={() => onboarding?.goToNextStep()}
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
