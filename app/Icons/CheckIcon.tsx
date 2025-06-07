import * as React from "react";
import Svg, { Path } from "react-native-svg";

type IconProps = {
  iconsetcolor: string;
  setheight?: number;
};
const CheckIcon = (props: IconProps) => (
  <Svg
    width={props.setheight}
    height={props.setheight}
    viewBox="0 0 531.41 373.2"
    {...props}
  >
    <Path
      d="M50 170.89 189.3 323.2M481.41 50 189.3 323.2"
      fill={"none"}
      stroke={props.iconsetcolor}
      strokeLinecap="round"
      strokeWidth={100}
      strokeMiterlimit={10}
    />
  </Svg>
);
export default CheckIcon;
