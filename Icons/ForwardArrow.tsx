import * as React from "react";
import Svg, { Path } from "react-native-svg";

type ArrowProps = {
  iconsetcolor: string;
  setheight?: number;
  setwidth?: number;
};

const ForwardArrow = (props: ArrowProps) => (
  <Svg
    height={props.setheight}
    width={props.setwidth}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={"none"}
      stroke={props.iconsetcolor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="m9 5 7 7-7 7"
    />
  </Svg>
);
export default ForwardArrow;
