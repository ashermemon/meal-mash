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
    viewBox="0 0 426.2 426.2"
    {...props}
  >
    <Path
      stroke={props.iconsetcolor}
      fill={props.iconsetcolor}
      strokeMiterlimit={10}
      d="M387 150.8 103.9 8.3C56.6-15.5.5 18.3.5 70.6v285c0 52.3 56.1 86.1 103.4 62.3L387 275.4c51.6-26 51.6-98.7 0-124.7Z"
    />
  </Svg>
);
export default PlayTimer;
