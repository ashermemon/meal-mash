import { View, Text, Pressable } from "react-native";
import React, { Dispatch, useState } from "react";
import { styles } from "@/styles/auth.styles";
import { NEWCOLORS } from "@/constants/NewTheme";
import { CustomIcon } from "@/icon-loader/icon-loader";

type Props = {
  options: string[];
  icons: string[];
  setSelected: React.Dispatch<React.SetStateAction<number>>;
};

const ListButtonSelect = (props: Props) => {
  const [selected, setSelected] = useState(-1);
  return (
    <View style={{ gap: 25 }}>
      {props.options.map((option: string, index: number) => (
        <Pressable
          style={[
            styles.selectButton,
            styles.basicBoxShadow,
            {
              backgroundColor:
                index === selected
                  ? NEWCOLORS.greenBlock
                  : NEWCOLORS.unselectedGrey,
              paddingHorizontal: 30,
              flexDirection: "row",
              position: "relative",
              justifyContent: "space-around",
              alignItems: "center",
            },
          ]}
          onPress={() => [setSelected(index), props.setSelected(index)]}
          key={index}
        >
          {index === selected && (
            <View
              style={{
                position: "absolute",
                top: -10,
                right: -10,
                width: 30,
                height: 30,
                borderRadius: 17,
                backgroundColor: NEWCOLORS.greenAccent,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomIcon name="check" filled color="white" size={15} />
            </View>
          )}
          <View>
            <CustomIcon
              name={props.icons[index]}
              filled
              color={NEWCOLORS.basicText}
              size={30}
            ></CustomIcon>
          </View>
          <Text
            style={[
              styles.textCentered,
              {
                fontSize: 24,
                flex: 1,
                color: NEWCOLORS.basicText,
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
