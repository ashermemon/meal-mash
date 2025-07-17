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
    viewBox="0 0 916.4 435.4"
    {...props}
  >
    <Path
      fill={props.iconsetcolor}
      stroke={props.iconsetcolor}
      d="M886.9 247.3c16.3 0 29.6-13.2 29.6-29.6s-13.2-29.6-29.6-29.6v59.1ZM8.7 196.8c-11.5 11.5-11.5 30.3 0 41.8l188.1 188.1c11.5 11.5 30.3 11.5 41.8 0 11.5-11.5 11.5-30.3 0-41.8L71.4 217.7 238.6 50.5c11.5-11.5 11.5-30.3 0-41.8-11.5-11.5-30.3-11.5-41.8 0L8.7 196.8Zm878.2 20.9v-29.6H29.6v59.1h857.3v-29.6Z"
    />
  </Svg>
);
export default BackArrow;
