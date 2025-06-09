import { Platform, Pressable, Text, View } from "react-native";
import React, { ReactNode, useActionState } from "react";
import { styles } from "@/styles/auth.styles";
import GenIcon from "../Icons/GenIcon";
import BackArrow from "../Icons/BackArrow";
import { COLORS } from "@/constants/theme";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

type HeaderProps = {
  pageTitle: string;
  headerIcon?: ReactNode;
};

export default function MobileHeader(props: HeaderProps) {
  const navigation = useNavigation();
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
          <Pressable
            onPress={() =>
              navigation.canGoBack() ? navigation.goBack() : undefined
            }
          >
            <BackArrow
              iconsetcolor={COLORS.fontColor}
              setheight={25}
            ></BackArrow>
          </Pressable>
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
