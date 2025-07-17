import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

type Props = {
  iconsetcolor: string;
  setheight?: number;
  setwidth?: number;
};

const StopTimer = (props: Props) => (
  <Svg
    height={props.setheight}
    width={props.setwidth}
    viewBox="0 0 917.57 825.98"
    {...props}
  >
    <Rect
      width={425.2}
      height={425.2}
      x={246.19}
      y={189.87}
      rx={70.87}
      ry={70.87}
      fill={props.iconsetcolor}
      stroke={props.iconsetcolor}
      strokeMiterlimit={10}
    />
  </Svg>
);
export default StopTimer;
