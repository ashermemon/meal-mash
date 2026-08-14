import { createContext, ReactNode } from "react";
import { ColorValue } from "react-native";

export type AchievementData = {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  emoji: ReactNode;
  color: ColorValue;
};

const AchievementsContext = createContext<
  [AchievementData[], React.Dispatch<React.SetStateAction<AchievementData[]>>]
>([[], () => {}]);

export default AchievementsContext;
