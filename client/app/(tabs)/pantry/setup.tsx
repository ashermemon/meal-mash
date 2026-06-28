import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "@/styles/auth.styles";
import ProgressBar from "@/components/features/recipe/ProgressBar";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { NEWCOLORS } from "@/constants/NewTheme";

type Props = {};

const SetupScreen = (props: Props) => {
  const router = useRouter();
  const [pantryName, setPantryName] = useState("Name's Pantry");
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = async () => {
    // await AsyncStorage.setItem("IS_PANTRY_SETUP", "true");
    // router.replace("/(tabs)/pantry/dashboard");
  };
  return (
    <View style={styles.setupContainer}>
      <Text style={[styles.textLeftSemiBold, { fontSize: 18 }]}>
        Pantry Setup
      </Text>
      {/* prog bar*/}
      <View style={{ flex: 1 }}>
        <View style={{ marginVertical: 20 }}>
          <ProgressBar
            progress={0}
            height={10}
            fragmented
            currentStep={currentStep}
            steps={5}
          ></ProgressBar>
        </View>
        <Text style={styles.setupTitle}>Let's Name Your Pantry</Text>
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
      </View>

      <Pressable
        style={[styles.setupButton, styles.basicBoxShadow]}
        onPress={() => [handleNextStep, setCurrentStep(currentStep + 1)]}
      >
        <CustomIcon name="arrow-right" size={33} color="white"></CustomIcon>
      </Pressable>
    </View>
  );
};

export default SetupScreen;
