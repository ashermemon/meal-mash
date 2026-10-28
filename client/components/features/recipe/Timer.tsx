import { AppState, Pressable, StyleSheet, View } from "react-native";
import { Text } from "@/components/universal/AppText";
import React, { useEffect, useRef, useState } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import * as Notifications from "expo-notifications";
import { useStyles } from "@/styles/GlobalStyles";
import { timedBuzz } from "@/components/universal/CustomBuzz";

import { useTheme } from "@/contexts/ColorSchemeContext";

import * as Haptics from "expo-haptics";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { useTintedBoxShadow } from "@/hooks/useBoxShadow";
import { moderateScale, scale } from "@/utils/responsive";
import {
  TIMER_NOTIFICATION_TYPE,
  getTimerCompleteCopy,
} from "@/utils/notifications/content";

const TIMER_CHANNEL_ID = "cooking-timers";

type TimerProps = {
  time: number;
  taskDescription?: string;
  color1?: any;
  color2?: any;
  color3?: any;
  stepIndex?: number;
};




export default function Timer(props: TimerProps) {
  const styles = useStyles();
  const theme = useTheme();
  const timerShadow = useTintedBoxShadow(theme.secondaryBoxGrey);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [timerFinished, setTimerFinished] = useState(false);
  const [remainingTime, setRemainingTime] = useState(props.time);

  const isPlayingRef = useRef(isPlaying);
  const remainingTimeRef = useRef(remainingTime);
  const timerFinishedRef = useRef(timerFinished);
  const pendingNotification = useRef<Promise<string | null> | null>(null);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);
  useEffect(() => {
    remainingTimeRef.current = remainingTime;
  }, [remainingTime]);
  useEffect(() => {
    timerFinishedRef.current = timerFinished;
  }, [timerFinished]);

  const cancelPendingBackgroundNotification = async () => {
    const pending = pendingNotification.current;
    pendingNotification.current = null;
    const id = await pending;
    if (id) await Notifications.cancelScheduledNotificationAsync(id);
  };

  const scheduleBackgroundNotification = (secondsRemaining: number) => {
    if (pendingNotification.current) return;

    pendingNotification.current = (async () => {
      await Notifications.setNotificationChannelAsync(TIMER_CHANNEL_ID, {
        name: "Cooking Timers",
        importance: Notifications.AndroidImportance.MAX,
      });

      const copy = getTimerCompleteCopy(props.taskDescription, props.stepIndex);

      return Notifications.scheduleNotificationAsync({
        content: {
          title: copy.title,
          body: copy.body,
          sound: "default",
          data:
            props.stepIndex !== undefined
              ? { type: TIMER_NOTIFICATION_TYPE, stepIndex: props.stepIndex }
              : {},
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: Math.max(Math.round(secondsRemaining), 1),
          channelId: TIMER_CHANNEL_ID,
        },
      });
    })().catch(() => null);
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "background") {
        if (isPlayingRef.current && !timerFinishedRef.current && remainingTimeRef.current > 0) {
          scheduleBackgroundNotification(remainingTimeRef.current);
        }
      } else if (nextState === "active") {
        cancelPendingBackgroundNotification();
      }
    });

    return () => {
      subscription.remove();
      cancelPendingBackgroundNotification();
    };
  }, []);

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
    <View style={[styles.timer, timerShadow]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
          minWidth: 0,
          marginRight: moderateScale(10),
        }}
      >
        <CountdownCircleTimer
          key={timerKey}
          size={scale(50)}
          strokeWidth={scale(9)}
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
        <View
          style={{
            marginLeft: scale(12),
            flex: 1,
            minWidth: 0,
            justifyContent: "center",
          }}
        >
          <Text
            style={[styles.textLeftBold, { fontSize: moderateScale(16) }]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.75}
          >
            {props.taskDescription || "Timer"}
          </Text>
          <Text
            style={[styles.textLeftBold, { fontSize: moderateScale(27) }]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
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
          gap: scale(10),
        }}
      >
        <Pressable
          style={styles.timerButton}
          hitSlop={moderateScale(8)}
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
            size={scale(24)}
            filled={true}
          ></CustomIcon>
        </Pressable>

        <Pressable
          style={styles.timerButton}
          hitSlop={moderateScale(8)}
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
              size={scale(24)}
              filled={true}
            ></CustomIcon>
          ) : (
            <CustomIcon
              color={theme.greyBtns}
              name={"play"}
              size={scale(24)}
              filled={true}
            ></CustomIcon>
          )}
        </Pressable>
      </View>
    </View >
  );
}
