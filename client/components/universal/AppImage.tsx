import React from "react";
import { Image, type ImageProps } from "expo-image";

export const IMAGE_FADE_DURATION = 150;

const AppImage = React.forwardRef<Image, ImageProps>(
  (
    { transition = IMAGE_FADE_DURATION, cachePolicy = "memory-disk", ...props },
    ref,
  ) => (
    <Image
      ref={ref}
      transition={transition}
      cachePolicy={cachePolicy}
      {...props}
    />
  ),
);

AppImage.displayName = "AppImage";

export default AppImage;
