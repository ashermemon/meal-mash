import {
  Platform,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import Generate from "@/components/generate";
import MobileHeader from "@/components/mobileheader";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { styles } from "@/styles/auth.styles";

export default function GenerationPage() {
  const [generated, setGenerated] = useState(false);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const image =
    Platform.OS == "web"
      ? require("@/assets/images/AppBackgroundDesktop.png")
      : require("@/assets/images/AppBackground.png");

  return (
    <ImageBackground source={image} style={styles.image} resizeMode="cover">
      <MobileHeader
        pageTitle={title != undefined ? title : "Generator"}
        backEnabled={!generated}
        setGenerated={setGenerated}
        setTitle={setTitle}
        title={title}
      ></MobileHeader>
      <Generate
        title={title}
        setTitle={setTitle}
        generated={generated}
        setGenerated={setGenerated}
      ></Generate>
    </ImageBackground>
  );
}
