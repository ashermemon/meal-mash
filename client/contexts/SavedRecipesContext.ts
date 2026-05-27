import { createContext } from "react";
import { type RecipeData } from "@/contexts/RecipeContext";

const SavedRecipesContext = createContext<
  [RecipeData[], React.Dispatch<React.SetStateAction<RecipeData[]>>]
>([[], () => { }]);

export default SavedRecipesContext;
