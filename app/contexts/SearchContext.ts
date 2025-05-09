import { createContext } from "react";

const SearchContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>(() => {});

export default SearchContext;
