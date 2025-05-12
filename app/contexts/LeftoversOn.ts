import { createContext } from "react";

const LeftoversEnabled = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, () => {}]);

export default LeftoversEnabled;
