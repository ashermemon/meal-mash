import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NEWCOLORS } from "@/constants/NewTheme";

type Props = {};

const PantryIndex = (props: Props) => {
  const router = useRouter();
  const [checkingSetup, setCheckingSetup] = useState(true);

  useEffect(() => {
    const checkPantryStatus = async () => {
      try {
        // const isSetupComplete = await AsyncStorage.getItem("IS_PANTRY_SETUP");
        const isSetupComplete: string = "false"; // temp toggle

        if (isSetupComplete === "true") {
          router.replace("/(tabs)/pantry/dashboard");
        } else {
          router.replace("/(tabs)/pantry/setup");
        }
      } catch (error) {
        router.replace("/(tabs)/pantry/setup");
      } finally {
        setCheckingSetup(false);
      }
    };

    checkPantryStatus();
  }, []);

  if (checkingSetup) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={NEWCOLORS.greenAccent} />
      </View>
    );
  }

  return null;
};

export default PantryIndex;
