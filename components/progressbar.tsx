import { LayoutChangeEvent, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as Progress from "react-native-progress";
import { COLORS } from "@/constants/theme";

import { Dimensions } from "react-native";

interface ProgressProps {
  progress: number;
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
        flex: 1,
        marginHorizontal: 25,
        alignItems: "center",
        justifyContent: "center",
      }}
      onLayout={onLayout}
    >
      {containerWidth > 0 && (
        <Progress.Bar
          progress={props.progress}
          width={containerWidth}
          color="#69CB87"
          height={13}
          borderRadius={20}
          unfilledColor="#f5f6f7"
          borderColor={COLORS.outlineProgress}
          borderWidth={3}
        />
      )}
    </View>
  );
}
