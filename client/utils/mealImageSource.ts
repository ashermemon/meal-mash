import type { MealImage } from "@/contexts/MealImageContext";

export const BOWL_IMAGE = require("@/assets/images/meal-images/bowl.webp");

export function getMealImageSource(
  mealImages: MealImage[],
  imageCategory: string | undefined,
) {
  if (mealImages.length === 0) {
    return BOWL_IMAGE;
  }

  const match = mealImages.find((image) => image.id === imageCategory);
  if (match) {
    return { uri: match.url };
  }

  const saladFallback = mealImages.find((image) => image.id === "salad");
  return saladFallback ? { uri: saladFallback.url } : BOWL_IMAGE;
}
