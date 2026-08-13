import { View, Text, ScrollView } from "react-native";
import React from "react";
import DisplaySaved from "@/components/features/saved/DisplaySaved";
import { styles } from "@/styles/auth.styles";
import { LinearGradient } from "expo-linear-gradient";
import { NEWCOLORS } from "@/constants/NewTheme";

type Props = {};

const saves = (props: Props) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: NEWCOLORS.backgroundColor,
          position: "relative",
        }}
      >
        <ScrollView
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 25,
            paddingTop: 20,
            paddingBottom: 170,
          }}
          overScrollMode="never"
          alwaysBounceVertical={false}
          keyboardShouldPersistTaps="always"
        >
          <View
            style={{
              flex: 1,
              position: "relative",
            }}
          >
            <View style={styles.container}>
              <DisplaySaved></DisplaySaved>
            </View>

            <LinearGradient
              colors={[
                "rgba(255, 248, 237, 0)",
                "rgba(255, 248, 237, 0.75)",
                "rgba(255, 248, 237, 0.98)",
                NEWCOLORS.backgroundColor,
              ]}
              locations={[0, 0.4, 0.75, 1]}
              style={{
                position: "absolute",
                bottom: -40,
                left: 0,
                right: 0,
                height: 160,
                zIndex: 10,
              }}
              pointerEvents="none"
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default saves;
