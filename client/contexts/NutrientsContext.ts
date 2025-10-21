import { createContext } from "react";

const NutrientsContext = createContext<
  [number[], React.Dispatch<React.SetStateAction<number[]>>]
>([[], () => {}]);

export default NutrientsContext;
