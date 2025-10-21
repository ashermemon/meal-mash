import { iconsF } from "../assets/icons/icons-fill";
import { iconsL } from "../assets/icons/icons-line";

export const CustomIcon = ({ name, size = 24, filled, color }) => {
  const SvgIcon = filled ? iconsF[`${name}_fill`] : iconsL[`${name}_line`];
  return SvgIcon ? <SvgIcon width={size} height={size} fill={color} /> : null;
};
