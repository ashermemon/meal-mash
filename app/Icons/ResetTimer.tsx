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
    viewBox="0 0 917.57 825.98"
    {...props}
  >
    <Path
      stroke={props.iconsetcolor}
      strokeLinecap="round"
      strokeWidth={59}
      strokeMiterlimit={10}
      fill={"none"}
      d="M241.47 217.78c-59.74 59.06-96.75 141.05-96.75 231.69 0 179.93 145.86 325.78 325.78 325.78s325.78-145.86 325.78-325.78S650.43 123.69 470.5 123.69"
    />
    <Path
      stroke={props.iconsetcolor}
      strokeLinecap="round"
      strokeWidth={59}
      strokeMiterlimit={10}
      fill={"none"}
      d="M601.76 40.76 435.75 99.99l105.11 141.5"
    />
  </Svg>
);
export default ResetTimer;
