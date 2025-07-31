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
    viewBox="0 0 426.2 426.2"
    {...props}
  >
    <Rect
      width={425.2}
      height={425.2}
      x={0.5}
      y={0.5}
      rx={70.9}
      ry={70.9}
      fill={props.iconsetcolor}
      stroke={props.iconsetcolor}
      strokeMiterlimit={10}
    />
  </Svg>
);
export default StopTimer;
