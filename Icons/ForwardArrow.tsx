import * as React from "react";
import Svg, { Path } from "react-native-svg";

type ArrowProps = {
  iconsetcolor: string;
  setheight?: number;
  setwidth?: number;
};

const ForwardArrow = (props: ArrowProps) => (
  <Svg
    height={props.setheight}
    width={props.setwidth}
    viewBox="0 0 916.6 435.5"
    {...props}
  >
    <Path
      fill={props.iconsetcolor}
      stroke={props.iconsetcolor}
      d="M29.6 188.2C13.3 188.2 0 201.4 0 217.8s13.2 29.6 29.6 29.6v-59.1Zm878.3 50.4c11.6-11.6 11.6-30.3 0-41.8L719.8 8.7c-11.6-11.6-30.3-11.6-41.8 0-11.6 11.6-11.6 30.3 0 41.8l167.3 167.3L678 385.1c-11.6 11.6-11.6 30.3 0 41.8 11.6 11.6 30.3 11.6 41.8 0L908 238.7ZM29.6 217.7v29.6H887v-59.1H29.6v29.6Z"
    />
  </Svg>
);
export default ForwardArrow;
