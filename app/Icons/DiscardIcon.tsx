import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  iconsetcolor: string;
  setheight?: number;
};

const DiscardIcon = (props: Props) => (
  <Svg
    height={props.setheight}
    width={props.setheight}
    viewBox="0 0 917.57 836.5"
    {...props}
  >
    <Path
      stroke={props.iconsetcolor}
      strokeLinecap="round"
      strokeWidth={100}
      strokeMiterlimit={10}
      fill={"none"}
      d="m212.34 166.54 492.89 492.9M705.23 166.54l-492.89 492.9"
    />
  </Svg>
);
export default DiscardIcon;
