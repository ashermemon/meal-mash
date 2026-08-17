import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type RecipeInstruction = {
  step: string;
  timerMinutes?: number;
  timerTask?: string;
};

export type RecipeCategories = {
  madeWithLeftovers: boolean;
  tastyMeals: boolean;
  sweetTreats: boolean;
  quickSnacks: boolean;
  under15Minutes: boolean;
};

export type RecipeData = {
  id?: string;
  prompt?: string;
  responseRecipe: string;
  title: string | undefined;
  description: string;
  difficulty: string;
  time: string;
  servings: number | null;
  nutrients: number[];
  tags: string[];
  categories: RecipeCategories;
  ingredients: [string, string][];
  instructions: RecipeInstruction[];
  tips: string[];
  imageCategory: string;
};

export type RecipeContextType = [
  RecipeData,
  Dispatch<SetStateAction<RecipeData>>,
];

export const initialRecipeData: RecipeData = {
  id: undefined,
  prompt: undefined,
  responseRecipe: "",
  title: undefined,
  description: "",
  difficulty: "",
  time: "",
  servings: null,
  nutrients: [0, 0, 0],
  tags: [],
  categories: {
    madeWithLeftovers: false,
    tastyMeals: false,
    sweetTreats: false,
    quickSnacks: false,
    under15Minutes: false,
  },
  ingredients: [],
  instructions: [],
  tips: [],
  imageCategory: "bowl",
};

const RecipeContext = createContext<RecipeContextType>([
  initialRecipeData,
  () => {},
]);

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [recipeData, setRecipeData] = useState<RecipeData>(initialRecipeData);

  return (
    <RecipeContext.Provider value={[recipeData, setRecipeData]}>
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeContext;
