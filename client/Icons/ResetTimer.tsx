import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  iconsetcolor: string;
  setheight?: number;
  setwidth?: number;
};

const ResetTimer = (props: Props) => (
  <Svg
    height={props.setheight}
    width={props.setwidth}
    viewBox="0 0 751.6 834.5"
    {...props}
  >
    <Path
      stroke={props.iconsetcolor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={100}
      strokeMiterlimit={10}
      fill={"none"}
      d="M146.8 227C87 286.1 50 368 50 458.7c0 179.9 145.9 325.8 325.8 325.8s325.8-145.9 325.8-325.8-145.9-325.8-325.8-325.8"
    />
    <Path
      stroke={props.iconsetcolor}
      strokeLinecap="round"
      strokeWidth={59}
      strokeMiterlimit={10}
      strokeLinejoin="round"
      fill={"none"}
      d="m507 50-166 59.2 105.1 141.5"
    />
  </Svg>
);
export default ResetTimer;
