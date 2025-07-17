import * as React from "react";
import Svg, { Defs, Path } from "react-native-svg";
type IconProps = {
  iconsetcolor: string;
  setheight?: number;
};
const FavIconFilled = (props: IconProps) => (
  <Svg
    width={props.setheight}
    height={props.setheight}
    viewBox="0 0 917.57 836.5"
    {...props}
  >
    <Path
      d="m463.81 95.64 75.66 232.87h244.85c5.12 0 7.25 6.55 3.11 9.56L589.34 481.99 665 714.86c1.58 4.87-3.99 8.92-8.13 5.91L458.78 576.85 260.69 720.77c-4.14 3.01-9.71-1.04-8.13-5.91l75.66-232.87-198.09-143.92c-4.14-3.01-2.01-9.56 3.11-9.56h244.85l75.66-232.87c1.58-4.87 8.47-4.87 10.05 0Z"
      fill={props.iconsetcolor}
      stroke={props.iconsetcolor}
      strokeLinecap="round"
      strokeWidth={100}
      strokeMiterlimit={10}
    />
  </Svg>
);
export default FavIconFilled;
