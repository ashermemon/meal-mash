import React, { createContext, Dispatch, SetStateAction } from "react";

export type GenerationDetails = {
  ingredients: string[];
  leftovers: string[];
  generationType: string;
  difficulties: string[];
  recipeTime: string[];
  numberOfServings: number;
  mealType: string[];
  cuisine: string[];
  dietaryPreference: string[];
};

export type GenerationDetailsType = [
  GenerationDetails,
  Dispatch<SetStateAction<GenerationDetails>>,
];

const initialGenerationDetails: GenerationDetails = {
  ingredients: [],
  leftovers: [],
  generationType: "",
  difficulties: [],
  recipeTime: [],
  numberOfServings: 1,
  mealType: [],
  cuisine: [],
  dietaryPreference: [],
};

export const GenerationDetailsContext = createContext<GenerationDetailsType>([
  initialGenerationDetails,
  () => {},
]);
