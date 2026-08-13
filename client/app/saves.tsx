import { View, Text, ScrollView } from "react-native";
import React from "react";
import DisplaySaved from "@/components/features/saved/DisplaySaved";
import { useStyles } from "@/styles/GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/contexts/ColorSchemeContext";
import { hexToRgba } from "@/utils/color";

type Props = {};

const saves = (props: Props) => {
  const styles = useStyles();
  const theme = useTheme();
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.backgroundColor,
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
                hexToRgba(theme.backgroundColor, 0),
                hexToRgba(theme.backgroundColor, 0.75),
                hexToRgba(theme.backgroundColor, 0.98),
                theme.backgroundColor,
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
