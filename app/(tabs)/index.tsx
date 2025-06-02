import { View, Text, ImageBackground, ScrollView } from "react-native";

import { styles } from "@/styles/auth.styles";
import { Platform } from "react-native";
import Generate from "../components/generate";
import MobileHeader from "../components/mobileheader";
import HomeFilled from "../Icons/HomeFilled";
import { COLORS } from "@/constants/theme";
import NewCard from "../components/newcard";
import { useState } from "react";
import { storage } from "../components/storage";
import FavoritesContext from "../contexts/FavoritesContext";

export default function Index() {
  const image =
    Platform.OS == "web"
      ? require("../../assets/images/AppBackgroundDesktop.png")
      : require("../../assets/images/AppBackground.png");

  const [genEnabled, setGenEnabled] = useState(true);
  return (
    <ImageBackground source={image} style={styles.image} resizeMode="cover">
      <MobileHeader
        pageTitle={"Home"}
        headerIcon={
          <HomeFilled
            iconsetcolor={COLORS.fontColor}
            setheight={25}
          ></HomeFilled>
        }
      ></MobileHeader>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={styles.generatorContainer}
      >
        <View style={styles.container}>
          {genEnabled ? <Generate></Generate> : <></>}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
