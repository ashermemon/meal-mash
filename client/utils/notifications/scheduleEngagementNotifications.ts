import * as Notifications from "expo-notifications";
import { featuredRecipes } from "@/constants/FeaturedRecipes";
import { readGroceryList } from "@/utils/storage/grocery";
import {
  canSendNotification,
  hasScheduledEngagementNotificationsToday,
  markEngagementNotificationsScheduled,
  recordNotificationSent,
  takeNextFeaturedRecipeIndex,
} from "@/utils/storage/notifications";
import {
  NotificationCopy,
  getFeaturedRecipeCopy,
  getFridgePromptCopy,
  getGroceryReminderCopy,
  getMealTimeCopy,
} from "./content";

const CHANNEL_ID = "engagement-notifications";

type SlotTime = { hour: number; minute: number };

type Candidate = {
  id: string;
  time: SlotTime;
  getCopy: () => NotificationCopy;
};

const buildCandidates = (): Candidate[] => [
  {
    id: "featured-recipe",
    time: { hour: 11, minute: 0 },
    getCopy: () => {
      const recipe = featuredRecipes[takeNextFeaturedRecipeIndex(featuredRecipes.length)];
      return getFeaturedRecipeCopy(recipe.title ?? "chef's pick", recipe.time);
    },
  },
  {
    id: "breakfast",
    time: { hour: 8, minute: 0 },
    getCopy: () => getMealTimeCopy("breakfast"),
  },
  {
    id: "lunch",
    time: { hour: 12, minute: 0 },
    getCopy: () => getMealTimeCopy("lunch"),
  },
  {
    id: "grocery-or-fridge",
    time: { hour: 15, minute: 30 },
    getCopy: () => (readGroceryList().length > 0 ? getGroceryReminderCopy() : getFridgePromptCopy()),
  },
];

const shuffle = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const pickCandidates = (eligible: Candidate[]): Candidate[] => {
  const shuffled = shuffle(eligible);
  const count = shuffled.length > 1 && Math.random() < 0.3 ? 2 : 1;
  return shuffled.slice(0, count);
};

let inFlight: Promise<void> | null = null;

export function scheduleEngagementNotifications(): Promise<void> {
  if (!inFlight) {
    inFlight = scheduleForToday().finally(() => {
      inFlight = null;
    });
  }
  return inFlight;
}

async function scheduleForToday() {
  if (hasScheduledEngagementNotificationsToday()) return;

  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") return;

  await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
    name: "Engagement",
    importance: Notifications.AndroidImportance.DEFAULT,
  });

  const now = new Date();

  const targetFor = (time: SlotTime) => {
    const target = new Date(now);
    target.setHours(time.hour, time.minute, 0, 0);
    return target;
  };

  const eligible = buildCandidates().filter((c) => targetFor(c.time).getTime() > now.getTime());

  for (const candidate of pickCandidates(eligible)) {
    if (!canSendNotification()) break;

    const copy = candidate.getCopy();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: copy.title,
        body: copy.body,
        sound: "default",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: targetFor(candidate.time),
        channelId: CHANNEL_ID,
      },
    });

    recordNotificationSent();
  }

  markEngagementNotificationsScheduled();
}
