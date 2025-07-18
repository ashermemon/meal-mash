import { createContext } from "react";

const MealsLeftContext = createContext<
  [number, React.Dispatch<React.SetStateAction<number>>]
>([5, () => {}]);
export default MealsLeftContext;
