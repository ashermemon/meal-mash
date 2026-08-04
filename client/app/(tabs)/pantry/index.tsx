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
      // If we already pushed setup and regained focus, the user pressed back
      // from setup — skip past this blank screen too.
      if (didPushSetup.current) {
        didPushSetup.current = false;
        router.back();
        return;
      }

      // Synchronous MMKV read — instant, no async delay or spinner
      const isSetupComplete = storage.getBoolean("IS_PANTRY_SETUP") === true;

      if (isSetupComplete) {
        router.replace("/(tabs)/pantry/dashboard");
      } else {
        didPushSetup.current = true;
        router.push("/setup");
      }
    }, [router])
  );

  // Renders for at most one frame before the sync check kicks in
  return (
    <View style={{ flex: 1, backgroundColor: NEWCOLORS.backgroundColor }} />
  );
};

export default PantryIndex;
