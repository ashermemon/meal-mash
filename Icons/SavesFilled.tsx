import * as React from "react";
import Svg, { Defs, Path } from "react-native-svg";

type IconProps = {
  iconsetcolor: string;
  setheight?: number;
};
const SavesFilled = (props: IconProps) => (
  <Svg
    height={props.setheight}
    width={props.setheight}
    viewBox="0 0 655.53 825.98"
    {...props}
  >
    <Path
      d="M143.29 756.97c-7.38 0-15.01-3.52-20.92-9.66-5.04-5.24-11.06-14.63-11.06-29.58V108.1c0-21.19 14.55-39.09 31.76-39.09h393.37c9.28 0 15.88 4.8 19.78 8.83 6.98 7.21 10.79 17.66 10.43 28.66l-.03.8v607.32c0 24.24-16.59 39.24-31.97 39.24-5.19 0-10.33-1.76-15.3-5.23L339.48 622.92l-180.7 128.65c-5.02 3.57-10.24 5.39-15.51 5.39Z"
      fill={props.iconsetcolor}
    />
    <Path
      d="M516.63 119.01v566.72l-119.58-83.57-57.82-40.41-57.46 40.91-120.46 85.76V119.01h355.32m19.81-100H143.08c-45.16 0-81.76 39.89-81.76 89.1v609.62c0 52.36 39.44 89.24 81.98 89.24 14.98 0 30.35-4.58 44.51-14.66l151.97-108.19 150.96 105.5c14.02 9.8 29.17 14.25 43.94 14.25 42.56 0 81.97-36.94 81.97-89.24V108.1c1.57-49.2-35.04-89.09-80.19-89.09Z"
      fill={props.iconsetcolor}
    />
  </Svg>
);
export default SavesFilled;
