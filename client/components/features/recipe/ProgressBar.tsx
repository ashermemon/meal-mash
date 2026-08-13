import { LayoutChangeEvent, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as Progress from "react-native-progress";

import { Dimensions } from "react-native";
import { useTheme } from "@/contexts/ColorSchemeContext";
import { useStyles } from "@/styles/GlobalStyles";

interface ProgressProps {
  progress: number;
  height?: number;
  fragmented?: boolean;
  steps?: number;
  currentStep?: number;
}

export default function ProgressBar(props: ProgressProps) {
  const styles = useStyles();
  const theme = useTheme();
  const windowWidth = Dimensions.get("window").width;
  const [containerWidth, setContainerWidth] = useState(0);
  const segments = Array.from({ length: props.steps || 1 });
  let currentStep = props.currentStep || 1;
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
        justifyContent: props.fragmented ? "space-between" : "center",
        flexDirection: "row",
        gap: 10,
      }}
      onLayout={onLayout}
    >
      {props.fragmented
        ? segments.map((_, index) => {
            const isFilled = index < currentStep;

            return (
              <View
                key={index}
                style={[
                  styles.progressFragment,
                  {
                    height: props.height,
                    backgroundColor: isFilled
                      ? theme.greenAccent
                      : theme.dividerGrey2,
                  },
                ]}
              />
            );
          })
        : containerWidth > 0 && (
            <Progress.Bar
              progress={props.progress}
              width={containerWidth}
              color={theme.greenAccent}
              height={props.height ?? 4}
              borderRadius={0}
              unfilledColor={theme.dividerGrey2}
              borderWidth={0}
            />
          )}
    </View>
  );
}
