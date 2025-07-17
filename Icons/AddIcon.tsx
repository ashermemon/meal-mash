import * as React from "react";
import Svg, { Defs, Path } from "react-native-svg";
type IconProps = {
  iconsetcolor: string;
  setheight?: number;
};
const AddIcon = (props: IconProps) => (
  <Svg
    width={props.setheight}
    height={props.setheight}
    viewBox="0 0 916.57 825.98"
    {...props}
  >
    <Path
      d="M756.13 402.47H160.44M458.28 700.32V104.63"
      fill={"none"}
      stroke={props.iconsetcolor}
      strokeLinecap="round"
      strokeWidth={59}
      strokeMiterlimit={10}
    />
  </Svg>
);
export default AddIcon;
