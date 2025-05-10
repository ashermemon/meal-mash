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
    viewBox="0 0 916.57 825.98"
    {...props}
  >
    <Path
      fill={props.iconsetcolor}
      stroke={props.iconsetcolor}
      d="M30.07,400.6c-16.33,0-29.57,13.24-29.57,29.57s13.24,29.57,29.57,29.57v-59.13ZM908.41,451.08c11.55-11.55,11.55-30.27,0-41.81l-188.16-188.16c-11.55-11.55-30.27-11.55-41.81,0-11.55,11.55-11.55,30.27,0,41.81l167.25,167.26-167.25,167.25c-11.55,11.55-11.55,30.27,0,41.81,11.55,11.55,30.27,11.55,41.81,0l188.16-188.16ZM30.07,430.17v29.57h857.43v-59.13H30.07v29.57Z"
    />
  </Svg>
);
export default ForwardArrow;
