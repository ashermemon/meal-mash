import { Food } from "@/components/features/pantry/Search";
import React, { createContext } from "react";

const GroceryListContext = createContext<
  [Food[], React.Dispatch<React.SetStateAction<Food[]>>]
>([[], () => {}]);

export default GroceryListContext;
