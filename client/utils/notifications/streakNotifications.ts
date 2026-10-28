import * as Notifications from "expo-notifications";
import { canSendNotification, recordNotificationSent } from "@/utils/storage/notifications";
import { getStreakMilestoneCopy } from "./content";

const MILESTONES = [3, 7, 14, 30, 60, 100];

export async function maybeNotifyStreakMilestone(streak: number) {
  if (!MILESTONES.includes(streak)) return;
  if (!canSendNotification()) return;

  const copy = getStreakMilestoneCopy(streak);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: copy.title,
      body: copy.body,
      sound: "default",
    },
    trigger: null,
  });

  recordNotificationSent();
}
