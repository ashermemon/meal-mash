import React, { createContext, Dispatch, SetStateAction } from "react";

export type PantryDetails = {
  name: string;
  icon: string;
  ingredients: string[];
  // quantities: string[];
  // expirationDates: string[];
};

export type PantryDetailsType = [
  PantryDetails,
  Dispatch<SetStateAction<PantryDetails>>,
];

const initialPantryDetails: PantryDetails = {
  name: "Your Pantry",
  icon: "Smiley",
  ingredients: [],
};

export const PantryDetailsContext = createContext<PantryDetailsType>([
  initialPantryDetails,
  () => {},
]);
