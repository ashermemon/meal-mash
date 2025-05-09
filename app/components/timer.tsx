import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { styles } from "@/styles/auth.styles";

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

  var hsl = require("hsl-to-hex");

  return (
    <View style={styles.timer}>
      <CountdownCircleTimer
        key={timerKey}
        isPlaying={isPlaying}
        duration={props.time}
        colors={[props.color1, props.color2, props.color3, hsl(0, 45, 79)]}
        colorsTime={[props.time, (props.time / 3) * 2, props.time / 3, 0]}
        onComplete={() => {
          setTimerFinished(true);
          return { shouldRepeat: false };
        }}
      >
        {({ remainingTime }) => (
          <Text style={styles.textCentered}>
            {`${Math.floor(remainingTime / 60)}:${String(
              remainingTime % 60
            ).padStart(2, "0")}`}
          </Text>
        )}
      </CountdownCircleTimer>
      <Pressable
        style={styles.generateButton}
        onPress={() => {
          timerFinished
            ? [setTimerKey(timerKey + 1), setTimerFinished(false)]
            : setIsPlaying(!isPlaying);
        }}
      >
        <Text style={styles.textCentered}>
          {isPlaying && !timerFinished ? "Stop Timer" : "Start Timer"}
        </Text>
      </Pressable>

      {!isPlaying || timerFinished ? (
        <Pressable
          style={styles.generateButton}
          onPress={() => {
            timerFinished
              ? [setTimerKey(timerKey + 1), setTimerFinished(false)]
              : setTimerKey(timerKey + 1);
          }}
        >
          <Text style={styles.textCentered}>Reset</Text>
        </Pressable>
      ) : undefined}
    </View>
  );
}
