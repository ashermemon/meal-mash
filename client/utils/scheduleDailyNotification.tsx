import * as Notifications from "expo-notifications";

export async function scheduleDailyNotification() {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();

  const TARGET_HOUR = 18; //6pm
  const TARGET_MINUTE = 0;

  const alreadyScheduled = scheduled.some((n) => {
    const t = n.trigger as any;
    return t?.hour === TARGET_HOUR && t?.minute === TARGET_MINUTE;
  });

  if (!alreadyScheduled) {
    await Notifications.setNotificationChannelAsync("daily-reminders", {
      name: "Daily Reminders",
      importance: Notifications.AndroidImportance.MAX,
    });

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🍽️ Leftovers → Yummy Dinner!",
        body: "Hungry? Tap here to generate some delicious dinner recipes 😋",
        sound: "default",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: TARGET_HOUR,
        minute: TARGET_MINUTE,
        channelId: "daily-reminders",
      } as any,
    });

    console.log(
      `✅ Daily notification scheduled at ${TARGET_HOUR}:${String(TARGET_MINUTE).padStart(2, "0")} PM`,
    );
  } else {
    console.log("ℹ️ Daily notification already scheduled.");
  }
}
