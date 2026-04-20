import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

export type RecipeData = {
  responseRecipe: string;
  title: string | undefined;
  description: string;
  difficulty: string;
  time: string;
  nutrients: number[];
  tags: string[];
};

export type RecipeContextType = [RecipeData, Dispatch<SetStateAction<RecipeData>>];

const initialRecipeData: RecipeData = {
  responseRecipe: "",
  title: undefined,
  description: "",
  difficulty: "",
  time: "",
  nutrients: [],
  tags: [],
};

const RecipeContext = createContext<RecipeContextType>([initialRecipeData, () => {}]);

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [recipeData, setRecipeData] = useState<RecipeData>(initialRecipeData);

  return (
    <RecipeContext.Provider value={[recipeData, setRecipeData]}>
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeContext;
