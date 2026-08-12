import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { styles } from "@/styles/GlobalStyles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { TextInput } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { NEWCOLORS } from "@/constants/NewTheme";

type Props = {
  title: string;
  num: number;
  setNum: React.Dispatch<React.SetStateAction<number>>;
  max: number;
};

const CountFieldPill = (props: Props) => {
  const handleChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    const parsed = numericValue === "" ? 0 : Number(numericValue);
    props.setNum(Math.min(parsed, props.max));
  };

  return (
    <View
      style={{
        gap: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text style={[styles.textLeftSemiBold, { fontSize: 17 }]}>
        {props.title}
      </Text>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View
          style={[
            styles.selectPill,
            styles.basicBoxShadow,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 8,
              width: 115,
              flex: 0,
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",

              flex: 1,
            }}
          >
            <Pressable
              hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
              style={{
                borderRadius: 10,
                backgroundColor: "white",
                padding: 3,
              }}
              onPress={() => {
                [
                  Haptics.selectionAsync(),
                  props.setNum((current) =>
                    current >= 0.5
                      ? current <= 1
                        ? current / 2
                        : current - 1
                      : current,
                  ),
                ];
              }}
            >
              <CustomIcon
                name="minimize"
                filled={true}
                color="grey"
                size={15}
              />
            </Pressable>
            <TextInput
              style={[
                styles.textCentered,
                { fontSize: 12.5, margin: 0, padding: 0 },
              ]}
              maxLength={4}
              onChangeText={handleChange}
              value={props.num.toString()}
              keyboardType="numeric"
              inputMode="numeric"
            ></TextInput>

            <Pressable
              hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
              style={{
                borderRadius: 10,
                backgroundColor: "white",
                padding: 3,
              }}
              onPress={() => {
                [
                  Haptics.selectionAsync(),
                  props.setNum((current) => {
                    const next =
                      current < 1
                        ? current === 0
                          ? 0.25
                          : current * 2
                        : current + 1;
                    return Math.min(next, props.max);
                  }),
                ];
              }}
            >
              <CustomIcon name="add" filled={true} color="grey" size={15} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CountFieldPill;
