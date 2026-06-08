import { View, Text, Pressable } from "react-native";
import React from "react";
import { styles } from "@/styles/GlobalStyles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import * as Haptics from "expo-haptics";

type Props = {
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  selected: number;
  options: string[];
};

const SliderField = (props: Props) => {
  return (
    <View style={{ gap: 33, flexDirection: "column" }}>
      <View
        style={[
          styles.sliderPill,
          styles.basicBoxShadow,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        <Pressable
          onPress={() => {
            [Haptics.selectionAsync(),
            props.setSelected((current) =>
              props.selected === 0 ? props.options.length - 1 : current - 1,
            )]
          }}
        >
          <CustomIcon name="left-small" filled={true} color="grey" size={35} />
        </Pressable>

        <Text style={styles.textCentered}>{props.options[props.selected]}</Text>
        <Pressable
          onPress={() => {
            [Haptics.selectionAsync(),
            props.setSelected((current) =>
              current === props.options.length - 1 ? 0 : current + 1,
            )]
          }}
        >
          <CustomIcon name="right-small" filled={true} color="grey" size={35} />
        </Pressable>
      </View>
    </View>
  );
};

export default SliderField;
