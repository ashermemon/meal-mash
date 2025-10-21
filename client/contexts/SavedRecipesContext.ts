import { createContext } from "react";

const SavedRecipesContext = createContext<
  [string[], React.Dispatch<React.SetStateAction<string[]>>]
>([[], () => {}]);

export default SavedRecipesContext;
