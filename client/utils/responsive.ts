import { Dimensions, PixelRatio } from "react-native";

// Layouts throughout the app were sized against an iPhone-class screen
// (~390pt wide). Narrower/wider or higher/lower density phones render those
// literal px values as-is, so text and fixed-size elements end up too big,
// too small, or clipped relative to the actual screen. These helpers scale
// values relative to that baseline so proportions hold across screen sizes.
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

// Scales less aggressively than `scale` — use for font sizes and spacing so
// very narrow or very wide screens don't over/under-shoot proportionally.
export function moderateScale(size: number, factor = 0.5): number {
  return size + (scale(size) - size) * factor;
}

export function moderateVerticalScale(size: number, factor = 0.5): number {
  return size + (verticalScale(size) - size) * factor;
}

// Rounds to the nearest device pixel so scaled values don't produce blurry
// sub-pixel borders/text.
export function pixelRound(size: number): number {
  return PixelRatio.roundToNearestPixel(size);
}
