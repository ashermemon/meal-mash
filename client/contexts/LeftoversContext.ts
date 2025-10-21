import { createContext } from "react";

const LeftoversContext = createContext<
  [string[], React.Dispatch<React.SetStateAction<string[]>>]
>([[], () => {}]);

export default LeftoversContext;
