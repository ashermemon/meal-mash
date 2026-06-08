import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { styles } from "@/styles/GlobalStyles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { NEWCOLORS } from "@/constants/NewTheme";
import InfoTag, { difficultyShape } from "../features/recipe/InfoTag";
import { TextInput } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";

type Props = {
  title: string;
  num: number;
  setNum: React.Dispatch<React.SetStateAction<number>>;
};


const CountFieldPill = (props: Props) => {

  const handleChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    props.setNum(Number(numericValue));
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
              paddingHorizontal: 9,
              width: 95,
              flex: 0,
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",

              flex: 1,
            }}
          >
            <TextInput style={[styles.textCentered, { fontSize: 12.5 }]}

              maxLength={4}
              onChangeText={handleChange}
              value={props.num.toString()}
              keyboardType="numeric"
              inputMode="numeric"

            >
            </TextInput>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Pressable
              hitSlop={{ top: 5, bottom: 0, left: 5, right: 5 }}
              onPress={() => {
                [Haptics.selectionAsync(),
                props.setNum((current) =>
                  current < 1 ? current * 2 : current + 1,
                )]
              }}
            >
              <View style={{ marginVertical: -5 }}>
                <CustomIcon
                  name="up-small"
                  filled={true}
                  color="grey"
                  size={25}
                />
              </View>
            </Pressable>
            <Pressable
              hitSlop={{ top: 0, bottom: 5, left: 5, right: 5 }}
              onPress={() => {
                [Haptics.selectionAsync(),
                props.setNum((current) =>
                  current >= 0.5
                    ? current <= 1
                      ? current / 2
                      : current - 1
                    : current,
                )]
              }}
            >
              <View style={{ marginVertical: -5 }}>
                <CustomIcon
                  name="down-small"
                  filled={true}
                  color="grey"
                  size={25}
                />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CountFieldPill;
