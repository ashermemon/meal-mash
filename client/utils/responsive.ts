import { Dimensions, PixelRatio } from "react-native";

const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

function getWindowSize() {
  const { width, height } = Dimensions.get("window");
  return { width, height };
}

export function scale(size: number): number {
  const { width } = getWindowSize();
  return (width / BASE_WIDTH) * size;
}

export function verticalScale(size: number): number {
  const { height } = getWindowSize();
  return (height / BASE_HEIGHT) * size;
}

export function moderateScale(size: number, factor = 0.5): number {
  return size + (scale(size) - size) * factor;
}

export function moderateVerticalScale(size: number, factor = 0.5): number {
  return size + (verticalScale(size) - size) * factor;
}

export function pixelRound(size: number): number {
  return PixelRatio.roundToNearestPixel(size);
}
