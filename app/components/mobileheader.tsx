import { Text, View } from "react-native";
import React from "react";
import { styles } from "@/styles/auth.styles";

type HeaderProps = {
  pageTitle: string;
};

export default function MobileHeader(props: HeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{props.pageTitle}</Text>
    </View>
  );
}
