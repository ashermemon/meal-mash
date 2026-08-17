import { View, Text, Pressable } from "react-native";
import React from "react";
import { useStyles } from "@/styles/auth.styles";
import { useTheme } from "@/contexts/ColorSchemeContext";
import { Image } from "expo-image";
import icons3d from "@/components/universal/3dIcons";
import { router } from "expo-router";
import { storage } from "@/utils/storage";

type Props = {
  title: string;
  image: string;
};

const SaveCategory = (props: Props) => {
  const theme = useTheme();
  const styles = useStyles();
  return (
    <Pressable
      onPress={() => router.navigate("/saves")}
      style={{
        width: "45%",

        justifyContent: "flex-start",
      }}
    >
      <View
        style={[
          styles.homeBlock,
          {
            backgroundColor: theme.greyBlock,
            aspectRatio: 1,
          },
          styles.basicBoxShadow,
        ]}
      >
        <Image style={{ flex: 1 }} source={icons3d[props.image]}></Image>
      </View>
      <Text style={[styles.textLeftBold, { fontSize: 15, marginTop: 7 }]}>
        {props.title}
      </Text>
      <Text style={[styles.basicTextLeft, { fontSize: 12, marginTop: 1 }]}>
        {storage.getNumber("savesnumber")} Saved
      </Text>
    </Pressable>
  );
};

export default SaveCategory;
