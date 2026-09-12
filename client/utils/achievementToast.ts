import { Platform, StatusBar } from "react-native";
import * as Haptics from "expo-haptics";
import Toast from "react-native-toast-message";
import { ACHIEVEMENT_TOAST } from "@/components/common/toastConfig";

const VISIBILITY_TIME = 3600;
const GAP_BETWEEN_TOASTS = 300;

const TOP_OFFSET =
  Platform.OS === "android" ? (StatusBar.currentHeight ?? 24) + 12 : 60;

const pending: string[] = [];
let isShowing = false;

const presentNext = () => {
  const achievementId = pending.shift();
  if (!achievementId) {
    isShowing = false;
    return;
  }

  isShowing = true;
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  Toast.show({
    type: ACHIEVEMENT_TOAST,
    position: "top",
    topOffset: TOP_OFFSET,
    visibilityTime: VISIBILITY_TIME,
    props: { achievementId },
    onHide: () => {
      setTimeout(presentNext, GAP_BETWEEN_TOASTS);
    },
  });
};

export const showAchievementToast = (achievementId: string) => {
  pending.push(achievementId);
  if (!isShowing) presentNext();
};
