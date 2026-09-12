import type { Theme } from "@/contexts/ColorSchemeContext";

export type AchievementDefinition = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  colorKey: keyof Theme;
};

export const ACHIEVEMENTS: AchievementDefinition[] = [
  {
    id: "first-mash",
    title: "First Mash",
    description: "Make your first meal with MealMash", // unlocked when a meal is made for the first time (follow a recipe)
    emoji: "Medal",
    colorKey: "yellowBlock",
  },
  {
    id: "sweet-tooth",
    title: "Sweet Tooth",
    description: "Generate 10 dessert recipes", // unlocked when 10 recipes classified with the category "Sweet Treats" have been generated
    emoji: "Popsicle",
    colorKey: "orangeBlock",
  },
  {
    id: "world-tour",
    title: "World Tour",
    description: "Generate recipes from 5 different cuisines", //Each distinct explicit cuisine in prompt counts. Like if it says Chinese in the constructed prompt."Any" DOES NOT count as a cuisine.
    emoji: "World",
    colorKey: "blueBlock",
  },
  {
    id: "the-cookbook",
    title: "The Cookbook",
    description: "Save 50 generated recipes", // 50 recipes saved
    emoji: "RecipeBook",
    colorKey: "greenBlock",
  },
  {
    id: "late-night-snack",
    title: "Late-Night Snack",
    description: "Create a recipe after 10pm", // Generate a recipe after 10pm local time
    emoji: "Clock",
    colorKey: "purpblueBlock",
  },
  {
    id: "leftover-legend",
    title: "Leftover Legend",
    description: "Make 25 meals with leftovers", // Unlocked when 25 recipes meals classified with the category "Made With Leftovers" have been made and followed (click follow recpie to count)
    emoji: "HotDog",
    colorKey: "orangeBlock",
  },
  {
    id: "on-fire",
    title: "On Fire",
    description: "Generate a recipe 7 days in a row", // Generate a recipe every day for 7 days in a row (streak)
    emoji: "Fire",
    colorKey: "redBlock",
  },
  {
    id: "century",
    title: "Century",
    description: "Make 100 meals", // MAKE and FOLLOW 100 recipes (go through the steps not just generate it)
    emoji: "Trophy",
    colorKey: "orangeBlock",
  },
];

export const getAchievementDefinition = (
  id: string,
): AchievementDefinition | undefined =>
  ACHIEVEMENTS.find((achievement) => achievement.id === id);
