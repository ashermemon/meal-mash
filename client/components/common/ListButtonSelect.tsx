import { View, Text, Pressable } from "react-native";
import React, { Dispatch, useState } from "react";
import { useStyles } from "@/styles/GlobalStyles";
import { useTheme } from "@/contexts/ColorSchemeContext";
import { CustomIcon } from "@/icon-loader/icon-loader";
import * as Haptics from "expo-haptics";

type Props = {
  options: string[];
  icons: string[];
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
};

const ListButtonSelect = (props: Props) => {
  const styles = useStyles();
  const theme = useTheme();
  return (
    <View style={{ gap: 25 }}>
      {props.options.map((option: string, index: number) => (
        <Pressable
          style={[
            styles.selectButton,
            styles.basicBoxShadow,
            {
              backgroundColor:
                index === props.selected
                  ? theme.greenAccent
                  : theme.unselectedGrey,
              paddingHorizontal: 30,
              flexDirection: "row",
              position: "relative",
              justifyContent: "space-around",
              alignItems: "center",
            },
          ]}
          onPress={() => {
            props.setSelected(index);
            Haptics.selectionAsync();
          }}
          key={index}
        >
          {index === props.selected && (
            <View
              style={{
                position: "absolute",
                top: -10,
                right: -10,
                width: 30,
                height: 30,
                borderRadius: 17,
                backgroundColor: theme.greenBlock,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomIcon
                name="check"
                filled
                color={theme.greenAccent}
                size={15}
              />
            </View>
          )}
          <View>
            <CustomIcon
              name={props.icons[index]}
              filled
              color={
                index === props.selected ? theme.pureWhite : theme.basicText
              }
              size={30}
            ></CustomIcon>
          </View>
          <Text
            style={[
              styles.textCentered,
              {
                fontSize: 24,
                flex: 1,
                color:
                  index === props.selected ? theme.pureWhite : theme.basicText,
                fontFamily: "Nunito-Medium",
              },
            ]}
          >
            {option}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default ListButtonSelect;
