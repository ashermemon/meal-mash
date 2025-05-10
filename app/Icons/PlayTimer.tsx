import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  iconsetcolor: string;
  setheight?: number;
  setwidth?: number;
};

const PlayTimer = (props: Props) => (
  <Svg
    height={props.setheight}
    width={props.setwidth}
    viewBox="0 0 917.57 825.98"
    {...props}
  >
    <Path
      stroke={props.iconsetcolor}
      fill={props.iconsetcolor}
      strokeMiterlimit={10}
      d="m632.66 340.13-283.08-142.5c-47.28-23.8-103.39 10.03-103.39 62.34v285c0 52.31 56.11 86.14 103.39 62.34l283.08-142.5c51.64-25.99 51.64-98.69 0-124.68Z"
    />
  </Svg>
);
export default PlayTimer;
