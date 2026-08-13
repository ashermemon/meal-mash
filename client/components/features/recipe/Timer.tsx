import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useStyles } from "@/styles/GlobalStyles";
import { timedBuzz } from "@/components/universal/CustomBuzz";

import { useTheme } from "@/contexts/ColorSchemeContext";

import * as Haptics from "expo-haptics";
import { CustomIcon } from "@/icon-loader/icon-loader";

type TimerProps = {
  time: number;
  taskDescription?: string;
  color1?: any;
  color2?: any;
  color3?: any;
};




export default function Timer(props: TimerProps) {
  const styles = useStyles();
  const theme = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [timerFinished, setTimerFinished] = useState(false);
  const [remainingTime, setRemainingTime] = useState(props.time);

  var hsl = require("hsl-to-hex");

  const [stableColors] = useState(() => {
    const randomHue = () => Math.floor(Math.random() * 360);
    return [
      props.color1 || hsl(randomHue(), 55, 65),
      props.color2 || hsl(randomHue(), 55, 65),
      props.color3 || hsl(randomHue(), 55, 65),
    ];
  });

  return (
    <View style={[styles.timer, styles.basicBoxShadow]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
          marginRight: 16,
        }}
      >
        <CountdownCircleTimer
          key={timerKey}
          size={60}
          isPlaying={isPlaying}
          duration={props.time}
          colors={[
            stableColors[0],
            stableColors[1],
            stableColors[2],
            hsl(359, 55, 69),
          ]}
          colorsTime={[props.time, (props.time / 3) * 2, props.time / 3, 0]}
          onComplete={() => {

            timedBuzz(2);

            setTimerFinished(true);
            setIsPlaying(false);

            return { shouldRepeat: false };
          }}
          onUpdate={(rt) => {
            setRemainingTime(rt);
          }}
        >
          {() => null}
        </CountdownCircleTimer>
        <View style={{ marginLeft: 22, flex: 1, justifyContent: "center" }}>
          <Text
            style={[styles.textLeftBold, { fontSize: 16 }]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {props.taskDescription || "Timer"}
          </Text>
          <Text style={[styles.textLeftBold, { fontSize: 27 }]}>
            {`${Math.floor(remainingTime / 60)}:${String(
              remainingTime % 60,
            ).padStart(2, "0")}`}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Pressable
          style={styles.timerButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
            setTimerKey((k) => k + 1);
            setTimerFinished(false);
            setIsPlaying(false);
            setRemainingTime(props.time);
          }}
        >
          <CustomIcon
            color={theme.greyBtns}
            name={"refresh-1"}
            size={30}
            filled={true}
          ></CustomIcon>
        </Pressable>

        <Pressable
          style={styles.timerButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
            if (timerFinished) {
              setTimerKey((k) => k + 1);
              setTimerFinished(false);
              setIsPlaying(true);
              setRemainingTime(props.time);
            } else {
              setIsPlaying((prev) => !prev);
            }
          }}
        >
          {isPlaying && !timerFinished ? (
            <CustomIcon
              color={theme.greyBtns}
              name={"pause"}
              size={30}
              filled={true}
            ></CustomIcon>
          ) : (
            <CustomIcon
              color={theme.greyBtns}
              name={"play"}
              size={30}
              filled={true}
            ></CustomIcon>
          )}
        </Pressable>
      </View>
    </View >
  );
}
