import { Type } from "@google/genai";
const IMAGE_CATEGORIES = [
  "burger",
  "pizza",
  "pasta",
  "salad",
  "curry",
  "fried-rice",
  "sandwich",
  "taco",
  "soup",
  "dessert",
  "breakfast",
  "seafood",
  "steak",
  //"bowl"
] as const;

export const RecipeSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    description: { type: Type.STRING },
    difficulty: {
      type: Type.STRING,
      enum: ["Easy", "Moderate", "Expert"],
    },
    time: { type: Type.STRING },
    servings: { type: Type.NUMBER },
    tags: { type: Type.ARRAY, items: { type: Type.STRING } },
    nutrients: {
      type: Type.OBJECT,
      properties: {
        protein: { type: Type.INTEGER },
        fat: { type: Type.INTEGER },
        carbs: { type: Type.INTEGER },
      },
      required: ["protein", "fat", "carbs"],
    },
    ingredients: {
      type: Type.ARRAY,
      items: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description:
          "A two-element array tuple representing [quantity, ingredient_name (first letter capitalized)].",
      },
    },
    instructions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          step: { type: Type.STRING },
          timerMinutes: {
            type: Type.INTEGER,
            description: "Set to 0 unless a timer is needed for this step.",
          },
          timerTask: {
            type: Type.STRING,
            description:
              "Brief task description of what is being timed if timerMinutes > 0 (first letter capitalized, e.g. 'Simmer sauce', 'Bake cookies'). Set to empty string if timerMinutes is 0.",
          },
        },
        required: ["step", "timerMinutes", "timerTask"],
      },
    },
    tips: { type: Type.ARRAY, items: { type: Type.STRING } },
    imageCategory: {
      type: Type.STRING,
      enum: [...IMAGE_CATEGORIES],
      description:
        "Select the single best matching image category to represent the final dish. Must be one of the provided enum values.",
    },
  },
  required: [
    "title",
    "description",
    "difficulty",
    "time",
    "servings",
    "tags",
    "nutrients",
    "ingredients",
    "instructions",
    "tips",
    "imageCategory",
  ],
};
