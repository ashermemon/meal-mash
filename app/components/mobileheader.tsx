import { Platform, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { styles } from "@/styles/auth.styles";
import GenIcon from "../Icons/GenIcon";
import BackArrow from "../Icons/BackArrow";
import { COLORS } from "@/constants/theme";
import { StatusBar } from "react-native";

type HeaderProps = {
  pageTitle: string;
  headerIcon?: ReactNode;
};

export default function MobileHeader(props: HeaderProps) {
  return (
    <>
      <View
        style={[
          styles.headerContainer,
          {
            flexDirection: "row",
          },
        ]}
      >
        <View style={[{ flex: 1.5 }, styles.centeredBox]}>
          <BackArrow iconsetcolor={COLORS.fontColor} setheight={25}></BackArrow>
        </View>

        <View style={[{ flex: 3 }, styles.centeredBox]}>
          <Text style={styles.headerText}>{props.pageTitle}</Text>
        </View>

        <View style={[{ flex: 1.5 }, styles.centeredBox]}>
          {props.headerIcon}
        </View>
      </View>
    </>
  );
}
