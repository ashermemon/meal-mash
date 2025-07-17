import { View, Text, ImageBackground, ScrollView } from "react-native";

import { styles } from "@/styles/auth.styles";
import { Platform } from "react-native";
import Generate from "../../components/generate";
import MobileHeader from "../../components/mobileheader";
import HomeFilled from "../../Icons/HomeFilled";
import { COLORS } from "@/constants/theme";
import NewCard from "../../components/newcard";
import { useState } from "react";
import { storage } from "../../utils/storage";
import FavoritesContext from "../../contexts/FavoritesContext";
import Welcome from "../../components/welcome";

export default function Index() {
  const image =
    Platform.OS == "web"
      ? require("../../assets/images/AppBackgroundDesktop.png")
      : require("../../assets/images/AppBackground.png");

  const [genEnabled, setGenEnabled] = useState(false);
  const [generated, setGenerated] = useState(false);
  return (
    <ImageBackground source={image} style={styles.image} resizeMode="cover">
      <MobileHeader
        pageTitle={genEnabled ? (generated ? "Recipe" : "Generator") : "Home"}
        backEnabled={!generated}
        setGenerated={setGenerated}
        setGenEnabled={setGenEnabled}
      ></MobileHeader>

      {genEnabled ? (
        <Generate generated={generated} setGenerated={setGenerated}></Generate>
      ) : (
        <Welcome
          genEnabled={genEnabled}
          setGenEnabled={setGenEnabled}
        ></Welcome>
      )}
    </ImageBackground>
  );
}
