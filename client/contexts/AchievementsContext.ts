import { createContext, ReactNode } from "react";

export type AchievementData = {
  title: string;
  description: string;
  unlocked: boolean;
  emoji: ReactNode;
};

const AchievementsContext = createContext<
  [AchievementData[], React.Dispatch<React.SetStateAction<AchievementData[]>>]
>([[], () => {}]);

export default AchievementsContext;
