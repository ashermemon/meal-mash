import React, { useRef } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { hasCompletedPantrySetup } from "@/utils/storage";
import { useTheme } from "@/contexts/ColorSchemeContext";

type Props = {};

const PantryIndex = (props: Props) => {
  const theme = useTheme();
  const router = useRouter();
  const didPushSetup = useRef(false);

  useFocusEffect(
    React.useCallback(() => {
      if (didPushSetup.current) {
        didPushSetup.current = false;
        router.back();
        return;
      }

      if (hasCompletedPantrySetup()) {
        router.replace("/(tabs)/pantry/dashboard");
      } else {
        didPushSetup.current = true;
        router.push("/setup");
      }
    }, [router])
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }} />
  );
};

export default PantryIndex;
