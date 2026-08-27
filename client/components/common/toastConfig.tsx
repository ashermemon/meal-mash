import React from "react";
import { router } from "expo-router";
import type { ToastConfig, ToastConfigParams } from "react-native-toast-message";
import AchievementToast, {
  type AchievementToastProps,
} from "@/components/common/AchievementToast";

export const ACHIEVEMENT_TOAST = "achievement";

export const toastConfig: ToastConfig = {
  [ACHIEVEMENT_TOAST]: ({
    props,
    hide,
  }: ToastConfigParams<AchievementToastProps>) => (
    <AchievementToast
      achievementId={props.achievementId}
      onPress={() => {
        hide();
        // Achievements live in a section of the profile tab; navigate rather
        // than push so an already-open profile tab is reused.
        router.navigate("/(tabs)/profile");
      }}
    />
  ),
};

export default toastConfig;
