import { createContext } from "react";

const IngredientsContext = createContext<
  [string[], React.Dispatch<React.SetStateAction<string[]>>]
>([[], () => {}]);

export default IngredientsContext;
