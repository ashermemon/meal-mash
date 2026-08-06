import { Food } from "@/components/features/pantry/Search";
import React, { createContext, Dispatch, SetStateAction } from "react";

export type BrowseIngredientsContextType = [
  Food[],
  Dispatch<SetStateAction<Food[]>>,
];

export const BrowseIngredientsContext =
  createContext<BrowseIngredientsContextType>([[], () => {}]);
