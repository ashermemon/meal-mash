import { createContext } from "react";

const FavoritesContext = createContext<
  [string[], React.Dispatch<React.SetStateAction<string[]>>]
>([[], () => {}]);

export default FavoritesContext;
