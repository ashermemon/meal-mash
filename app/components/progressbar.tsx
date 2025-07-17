import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import { COLORS } from "@/constants/theme";

import { Dimensions } from "react-native";

interface ProgressProps {
  progress: number;
}

export default function ProgressBar(props: ProgressProps) {
  const windowWidth = Dimensions.get("window").width;
  return (
    <View>
      <Progress.Bar
        progress={props.progress}
        width={windowWidth - 50}
        color={COLORS.greenButtonColorOuline}
        height={10}
        borderRadius={20}
        unfilledColor="#EBEFF1"
        borderColor="#EBEFF1"
        style={{ marginTop: 15 }}
      />
    </View>
  );
}
