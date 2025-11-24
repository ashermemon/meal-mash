import {
  Platform,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import Generate from "@/components/generate";
import MobileHeader from "@/components/mobileheader";
import BottomSheet, {
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { styles } from "@/styles/auth.styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function GenerationPage() {
  const [generated, setGenerated] = useState(false);
  const [title, setTitle] = useState<string | undefined>(undefined);

  return (
    <>
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
    </>
  );
}
