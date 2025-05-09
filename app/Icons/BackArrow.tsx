import * as React from "react";
import Svg, { Path } from "react-native-svg";

type BackProps = {
  iconsetcolor: string;
  setheight?: number;
};

const BackArrow = (props: BackProps) => (
  <Svg height={props.setheight} viewBox="0 0 916.57 825.98" {...props}>
    <Path
      fill={props.iconsetcolor}
      stroke={props.iconsetcolor}
      d="M887 459.74c16.33 0 29.57-13.24 29.57-29.57S903.33 400.6 887 400.6v59.13ZM8.66 409.26c-11.55 11.55-11.55 30.27 0 41.81l188.16 188.16c11.55 11.55 30.27 11.55 41.81 0 11.55-11.55 11.55-30.27 0-41.81L71.38 430.16l167.25-167.25c11.55-11.55 11.55-30.27 0-41.81-11.55-11.55-30.27-11.55-41.81 0L8.66 409.26ZM887 430.17V400.6H29.57v59.13H887v-29.57Z"
    />
  </Svg>
);
export default BackArrow;
