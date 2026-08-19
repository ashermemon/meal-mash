import { darkenColorRgba } from "./color";

export type ShadowVariant = "basic" | "glow" | "elevated";

type ShadowLayer = { y: number; blur: number; opacity: number };

const VARIANTS: Record<
  ShadowVariant,
  { light: ShadowLayer[]; dark: ShadowLayer[] }
> = {
  basic: {
    light: [{ y: 2.5, blur: 2, opacity: 0.16 }],
    dark: [{ y: 2.5, blur: 3, opacity: 0.5 }],
  },
  glow: {
    light: [
      { y: 1, blur: 2, opacity: 0.14 },
      { y: 6, blur: 14, opacity: 0.16 },
    ],
    dark: [
      { y: 1, blur: 2, opacity: 0.2 },
      { y: 6, blur: 16, opacity: 0.24 },
    ],
  },
  elevated: {
    light: [
      { y: 2, blur: 3, opacity: 0.08 },
      { y: 6, blur: 16, opacity: 0.09 },
    ],
    dark: [
      { y: 2, blur: 3, opacity: 0.26 },
      { y: 8, blur: 18, opacity: 0.26 },
    ],
  },
};

const DARKEN_AMOUNT = { light: 0.5, dark: 0.3 };

export const getTintedBoxShadow = (
  backgroundColor: string,
  isDark: boolean,
  variant: ShadowVariant = "basic",
): { boxShadow: string } => {
  const amount = isDark ? DARKEN_AMOUNT.dark : DARKEN_AMOUNT.light;
  const layers = isDark ? VARIANTS[variant].dark : VARIANTS[variant].light;
  const boxShadow = layers
    .map(
      (layer) =>
        `0px ${layer.y}px ${layer.blur}px ${darkenColorRgba(backgroundColor, amount, layer.opacity)}`,
    )
    .join(", ");
  return { boxShadow };
};
