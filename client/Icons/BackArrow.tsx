import * as React from "react";
import Svg, { Path } from "react-native-svg";

type BackProps = {
  iconsetcolor: string;
  setheight: number;
  setwidth: number;
};

const BackArrow = (props: BackProps) => (
  <Svg
    height={props.setheight}
    width={props.setwidth}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke={props.iconsetcolor}
      fill={"none"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="m15 19-7-7 7-7"
    />
  </Svg>
);
export default BackArrow;
