import { createContext } from "react";

const FavLeftoversContext = createContext<
  [string[], React.Dispatch<React.SetStateAction<string[]>>]
>([[], () => {}]);

export default FavLeftoversContext;
