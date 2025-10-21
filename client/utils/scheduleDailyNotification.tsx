import * as Notifications from "expo-notifications";

export async function scheduleDailyNotification() {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();

  const alreadyScheduled = scheduled.some((n) => {
    const t = n.trigger as Notifications.DailyTriggerInput;
    return t?.hour === 13 && t?.minute === 46;
  });

  if (!alreadyScheduled) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "📅 Daily Reminder",
        body: "Time to check the app!",
        sound: "default",
      },
      trigger: {
        hour: 13,
        minute: 46,
      } as Notifications.DailyTriggerInput,
    });

    console.log("✅ Daily notification scheduled at 1:44 PM");
  } else {
    console.log("ℹ️ Daily notification already scheduled.");
  }
}
