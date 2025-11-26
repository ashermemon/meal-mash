import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MobileHeader from "@/components/mobileheader";

export default function Test() {
  return (
    <>
      <MobileHeader pageTitle={"Home"} backEnabled={true}></MobileHeader>
      <View>
        <Text>Test</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
