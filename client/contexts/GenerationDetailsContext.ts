import React, { createContext, Dispatch, SetStateAction } from "react";

export type GenerationDetails = {
  ingredients: string[];
  leftovers: string[];
  generationType: number;
  difficulties: string[];
  recipeTime: string[];
  numberOfServings: number;
  mealType: string[];
  cuisine: string[];
  dietaryPreference: string[];
  portalCategory?: string;
};

export type GenerationDetailsType = [
  GenerationDetails,
  Dispatch<SetStateAction<GenerationDetails>>,
];

const initialGenerationDetails: GenerationDetails = {
  ingredients: [],
  leftovers: [],
  generationType: 0,
  difficulties: [],
  recipeTime: [],
  numberOfServings: 1,
  mealType: [],
  cuisine: [],
  dietaryPreference: [],
  portalCategory: undefined,
};

export const GenerationDetailsContext = createContext<GenerationDetailsType>([
  initialGenerationDetails,
  () => {},
]);
