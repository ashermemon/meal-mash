import {
  View,
  Text,
  Platform,
  ImageBackground,
  ScrollView,
} from "react-native";
import React from "react";
import { styles } from "@/styles/auth.styles";
import MobileHeader from "../components/mobileheader";
import ProfileFilled from "../Icons/ProfileFilled";
import { COLORS } from "@/constants/theme";

export default function Profile() {
  const image =
    Platform.OS == "web"
      ? require("../../assets/images/AppBackgroundDesktop.png")
      : require("../../assets/images/AppBackground.png");

  return (
    <>
      <ImageBackground source={image} style={styles.image} resizeMode="cover">
        <MobileHeader
          pageTitle="Profile"
          headerIcon={
            <ProfileFilled
              iconsetcolor={COLORS.fontColor}
              setheight={Platform.OS === "web" ? 25 : 25}
            ></ProfileFilled>
          }
        ></MobileHeader>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={styles.generatorContainer}
        >
          <View style={styles.container}>
            <Text>Profile</Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
}
