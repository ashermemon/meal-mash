import { LayoutChangeEvent, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as Progress from "react-native-progress";
import { COLORS } from "@/constants/Theme";

import { Dimensions } from "react-native";
import { NEWCOLORS } from "@/constants/NewTheme";

interface ProgressProps {
  progress: number;
  height?: number;
}

export default function ProgressBar(props: ProgressProps) {
  const windowWidth = Dimensions.get("window").width;
  const [containerWidth, setContainerWidth] = useState(0);
  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w !== containerWidth) {
      setContainerWidth(w);
    }
  };

  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
      onLayout={onLayout}
    >
      {containerWidth > 0 && (
        <Progress.Bar
          progress={props.progress}
          width={containerWidth}
          color={NEWCOLORS.greenAccent}
          height={props.height ?? 4}
          borderRadius={0}
          unfilledColor="#ECECEC"
          borderWidth={0}
        />
      )}
    </View>
  );
}
