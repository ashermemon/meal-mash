import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  iconsetcolor: string;
  setheight: number;
  setwidth: number;
};

const DiscardIcon = (props: Props) => (
  <Svg
    height={props.setheight}
    width={props.setwidth}
    viewBox="0 0 592.89 592.89"
    {...props}
  >
    <Path
      stroke={props.iconsetcolor}
      strokeLinecap="round"
      strokeWidth={100}
      strokeMiterlimit={10}
      fill={"none"}
      d="m50 50 492.89 492.89M542.89 50 50 542.89"
    />
  </Svg>
);
export default DiscardIcon;
