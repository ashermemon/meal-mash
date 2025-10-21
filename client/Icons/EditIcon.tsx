import * as React from "react";
import Svg, { Path } from "react-native-svg";

type IconProps = {
  iconsetcolor: string;
  setheight?: number;
};
const EditIcon = (props: IconProps) => (
  <Svg
    width={props.setheight}
    height={props.setheight}
    viewBox="0 0 528.899 528.899"
    {...props}
  >
    <Path
      d="m328.883 89.125 107.59 107.589-272.34 272.34L56.604 361.465l272.279-272.34zm189.23-25.948-47.981-47.981c-18.543-18.543-48.653-18.543-67.259 0l-45.961 45.961 107.59 107.59 53.611-53.611c14.382-14.383 14.382-37.577 0-51.959zM.3 512.69c-1.958 8.812 5.998 16.708 14.811 14.565l119.891-29.069L27.473 390.597.3 512.69z"
      fill={props.iconsetcolor}
    />
  </Svg>
);
export default EditIcon;
