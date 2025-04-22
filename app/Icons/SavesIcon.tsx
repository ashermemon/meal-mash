import * as React from "react";
import Svg, { Path } from "react-native-svg";

type IconProps = {
  iconsetcolor: string;
  setheight?: number;
};

const SavesIcon = (props: IconProps) => (
  <Svg height={props.setheight} viewBox="0 0 555.37 787.96" {...props}>
    <Path
      d="M455.32 100v566.72l-119.58-83.57-57.82-40.41-57.46 40.91L100 669.41V100h355.32M475.13 0H81.76C36.61 0 0 39.89 0 89.1v609.62c0 52.36 39.44 89.24 81.98 89.24 14.98 0 30.35-4.58 44.51-14.66l151.97-108.19 150.96 105.5c14.02 9.8 29.17 14.25 43.94 14.25 42.56 0 81.97-36.94 81.97-89.24V89.09C556.9 39.89 520.29 0 475.14 0Z"
      fill={props.iconsetcolor}
      stroke={props.iconsetcolor}
    />
  </Svg>
);
export default SavesIcon;
