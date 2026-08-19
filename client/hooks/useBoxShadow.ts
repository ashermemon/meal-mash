import { useIsDarkMode } from "@/contexts/ColorSchemeContext";
import { getTintedBoxShadow, ShadowVariant } from "@/utils/shadow";

export const useTintedBoxShadow = (
  backgroundColor: string,
  variant: ShadowVariant = "basic",
): { boxShadow: string } => {
  const isDark = useIsDarkMode();
  return getTintedBoxShadow(backgroundColor, isDark, variant);
};
