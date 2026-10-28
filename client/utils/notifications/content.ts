export type NotificationCopy = {
  title: string;
  body: string;
};

export const getFeaturedRecipeCopy = (recipeTitle: string, time: string): NotificationCopy => ({
  title: "Hungry? 🍽️",
  body: `Try our ${recipeTitle}—ready in just ${time}!`,
});

const MEAL_TIME_COPY: Record<"breakfast" | "lunch", NotificationCopy> = {
  breakfast: {
    title: "What's for breakfast? 🍳",
    body: "Start your day off right with a quick homemade recipe.",
  },
  lunch: {
    title: "What's for lunch? 🥪",
    body: "Whip something up in minutes with what you've already got.",
  },
};

export const getMealTimeCopy = (meal: keyof typeof MEAL_TIME_COPY): NotificationCopy =>
  MEAL_TIME_COPY[meal];

export const getFridgePromptCopy = (): NotificationCopy => ({
  title: "Got leftovers? 🥡",
  body: "Enter a few ingredients you have on hand, and we'll find a recipe.",
});

export const getGroceryReminderCopy = (): NotificationCopy => ({
  title: "Heading to the store? 🛒",
  body: "Don't forget to check your grocery list.",
});

export const getStreakMilestoneCopy = (streak: number): NotificationCopy => ({
  title: "You're on a roll! 🍳",
  body: `You've cooked ${streak} days in a row! Keep your cooking streak alive tonight.`,
});

export const TIMER_NOTIFICATION_TYPE = "cooking-timer";

export const getTimerCompleteCopy = (
  taskDescription: string | undefined,
  stepIndex: number | undefined,
): NotificationCopy => ({
  title: taskDescription ? `Time's up: ${taskDescription} ⏰` : "Time's up! ⏰",
  body:
    stepIndex !== undefined
      ? `Tap to jump back to Step ${stepIndex + 1}.`
      : "Tap to check on your dish.",
});
