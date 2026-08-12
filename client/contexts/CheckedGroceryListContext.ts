import { Food } from "@/components/features/pantry/Search";
import React, { createContext } from "react";

const CheckedGroceryListContext = createContext<
  [Food[], React.Dispatch<React.SetStateAction<Food[]>>]
>([[], () => {}]);

export default CheckedGroceryListContext;
