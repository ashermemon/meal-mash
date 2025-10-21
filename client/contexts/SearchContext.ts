import { createContext } from "react";

const SearchContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, () => {}]);

export default SearchContext;
