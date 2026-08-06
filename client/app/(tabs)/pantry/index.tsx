import React, { useRef } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { storage } from "@/utils/storage";
import { NEWCOLORS } from "@/constants/NewTheme";

type Props = {};

const PantryIndex = (props: Props) => {
  const router = useRouter();
  const didPushSetup = useRef(false);

  useFocusEffect(
    React.useCallback(() => {
      if (didPushSetup.current) {
        didPushSetup.current = false;
        router.back();
        return;
      }

      const isSetupComplete = storage.getBoolean("IS_PANTRY_SETUP") === true;

      if (isSetupComplete) {
        router.replace("/(tabs)/pantry/dashboard");
      } else {
        didPushSetup.current = true;
        router.push("/setup");
      }
    }, [router])
  );

  return (
    <View style={{ flex: 1, backgroundColor: NEWCOLORS.backgroundColor }} />
  );
};

export default PantryIndex;
