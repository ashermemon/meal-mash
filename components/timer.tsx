import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { styles } from "@/styles/auth.styles";
import ResetTimer from "@/Icons/ResetTimer";
import { COLORS } from "@/constants/theme";
import StopTimer from "@/Icons/StopTimer";
import PlayTimer from "@/Icons/PlayTimer";
import * as Haptics from "expo-haptics";

type TimerProps = {
  time: number;
  color1: any;
  color2: any;
  color3: any;
};

export default function Timer(props: TimerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [timerFinished, setTimerFinished] = useState(false);
  const [remainingTime, setRemainingTime] = useState(props.time);

  var hsl = require("hsl-to-hex");

  return (
    <View style={styles.timer}>
      <View style={{ flexDirection: "row" }}>
        <CountdownCircleTimer
          key={timerKey}
          size={60}
          isPlaying={isPlaying}
          duration={props.time}
          colors={[props.color1, props.color2, props.color3, hsl(359, 55, 69)]}
          colorsTime={[props.time, (props.time / 3) * 2, props.time / 3, 0]}
          onComplete={() => {
            setTimerFinished(true);
            return { shouldRepeat: false };
          }}
        >
          {({ remainingTime: rt }) => {
            setRemainingTime(rt);
            return null;
          }}
        </CountdownCircleTimer>
        <View style={{ marginLeft: 22 }}>
          <Text style={[styles.textLeftBold, { fontSize: 16 }]}>Timer</Text>
          <Text style={[styles.textLeftBold, { fontSize: 27 }]}>
            {`${Math.floor(remainingTime / 60)}:${String(
              remainingTime % 60
            ).padStart(2, "0")}`}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <Pressable
          style={styles.timerButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft),
              timerFinished
                ? [setTimerKey(timerKey + 1), setTimerFinished(false)]
                : setTimerKey(timerKey + 1);
          }}
        >
          <ResetTimer
            iconsetcolor={COLORS.greyBtns}
            setheight={30}
            setwidth={40}
          ></ResetTimer>
        </Pressable>

        <Pressable
          style={styles.timerButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft),
              timerFinished
                ? [setTimerKey(timerKey + 1), setTimerFinished(false)]
                : setIsPlaying(!isPlaying);
          }}
        >
          {isPlaying && !timerFinished ? (
            <StopTimer
              iconsetcolor={COLORS.greyBtns}
              setheight={28}
              setwidth={28}
            ></StopTimer>
          ) : (
            <PlayTimer
              iconsetcolor={COLORS.greyBtns}
              setheight={28}
              setwidth={28}
            ></PlayTimer>
          )}
        </Pressable>
      </View>
    </View>
  );
}
