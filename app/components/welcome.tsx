import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { styles } from "@/styles/auth.styles";
import { COLORS } from "@/constants/theme";
import { Image } from "expo-image";

type HomeProps = {
  genEnabled: boolean;
  setGenEnabled: Dispatch<SetStateAction<boolean>>;
};

export default function Welcome(props: HomeProps) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={[
          styles.textCentered,
          {
            fontFamily: "Nunito-Bold",
            fontSize: 20,
            marginTop: 5,
            marginBottom: 20,
          },
        ]}
      >
        Welcome to Never Leftover
      </Text>
      <View
        style={{
          width: "100%",

          flex: 1,
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/images/newicon.png")}
          style={{ width: 150, height: 150, marginVertical: 20 }}
        ></Image>
        <Text
          style={[styles.textCentered, { fontSize: 20, marginVertical: 20 }]}
        >
          Never Leftover is an app designed to help you save leftovers by
          transforming them into delicious meals. We want to make eating
          leftovers fun, interesting and most importantly, tasty!
        </Text>

        <View style={styles.generateButtonContainer}>
          <Pressable
            style={[
              styles.generateButton,
              {
                backgroundColor: COLORS.blueHeader,
                width: 200,
                marginTop: 20,
                borderColor: COLORS.blueHeaderBorder,
              },
            ]}
            onPress={() => props.setGenEnabled(true)}
          >
            <Text
              style={[styles.textCentered, { fontFamily: "Nunito-SemiBold" }]}
              adjustsFontSizeToFit={true}
            >
              Save your leftovers!
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
