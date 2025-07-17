import * as React from "react";
import Svg, { Defs, Path } from "react-native-svg";

type IconProps = {
  iconsetcolor: string;
  setheight?: number;
};
const ProfileFilled = (props: IconProps) => (
  <Svg height={props.setheight} viewBox="0 0 655.53 825.98" {...props}>
    <Path
      d="M327.77.5C215.74.5 124.92 91.32 124.92 203.35S215.74 406.2 327.77 406.2s202.85-90.82 202.85-202.85S439.8.5 327.77.5Z"
      fill={props.iconsetcolor}
    />
    <Path
      d="M491.79 403.3s-62.07 57.82-164.02 58.69c-101.96-.87-164.02-58.69-164.02-58.69S-17.27 501.84 1.93 708.37c0 0 7.01 108.47 325.84 117.11 318.83-8.64 325.84-117.11 325.84-117.11 19.2-206.52-161.82-305.07-161.82-305.07Z"
      fill={props.iconsetcolor}
    />
  </Svg>
);
export default ProfileFilled;
