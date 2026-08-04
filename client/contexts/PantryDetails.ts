import { Food } from "@/components/features/pantry/Search";
import React, { createContext, Dispatch, SetStateAction } from "react";

export type PantryDetails = {
  name: string;
  icon: string;
  ingredients: Food[];
  // quantities: string[];
  // expirationDates: string[];
};

export type PantryDetailsType = [
  PantryDetails,
  Dispatch<SetStateAction<PantryDetails>>,
];

const initialPantryDetails: PantryDetails = {
  name: "Your Pantry",
  icon: "",
  ingredients: [],
};

export const PantryDetailsContext = createContext<PantryDetailsType>([
  initialPantryDetails,
  () => {},
]);
