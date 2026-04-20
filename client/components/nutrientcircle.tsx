import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { styles } from "@/styles/auth.styles";
import { PieChart } from "react-native-gifted-charts";
import NutrientsContext from "@/contexts/NutrientsContext";
import { COLORS } from "@/constants/theme";
import { ColorHex } from "react-native-countdown-circle-timer";
import { NEWCOLORS } from "@/constants/newtheme";

export default function NutrientCircle() {
  const [nutrients, setNutrients] = useContext(NutrientsContext);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const rawData = [
    {
      value: nutrients[0] * 4,
      color: NEWCOLORS.blueAccent,
      text: "Protein",
      gradientCenterColor: NEWCOLORS.blueAccent,
    },
    {
      value: nutrients[1] * 9,
      color: NEWCOLORS.greenAccent,
      text: "Fat",
      gradientCenterColor: NEWCOLORS.greenAccent,
    },
    {
      value: nutrients[2] * 4,
      color: NEWCOLORS.orangeAccent,
      text: "Carbs",
      gradientCenterColor: NEWCOLORS.orangeAccent,
    },
  ];

  const data = rawData.map((item, index) => ({
    ...item,
    focused: index === focusedIndex,
  }));

  const renderLegend = (text: string, color: ColorHex) => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginVertical: 8,
          alignItems: "center",
        }}
      >
        <View style={[styles.legendBox, { backgroundColor: color }]} />
        <Text style={styles.textLegend}>{text}</Text>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.newShadow,
        {
          backgroundColor: NEWCOLORS.secondaryBoxGrey,
          borderRadius: 15,
          alignItems: "center",
        },
      ]}
    >
      <View style={styles.nutrientCircle}>
        <View style={{ alignItems: "flex-start", flex: 1, marginLeft: 10 }}>
          <PieChart
            innerRadius={45}
            donut
            data={data}
            radius={65}
            textColor="black"
            textSize={20}
            focusOnPress
            toggleFocusOnPress={true}
            onPress={(item: any, index: number) => {
              if (focusedIndex === index) {
                setFocusedIndex(null);
              } else {
                setFocusedIndex(index);
              }
            }}
            centerLabelComponent={() => {
              return (
                <View style={{ alignItems: "center", marginTop: -5 }}>
                  {focusedIndex === 0 ? (
                    <Text style={{ color: "#5983C8", fontSize: 29 }}>
                      {nutrients[0] * 4}
                    </Text>
                  ) : focusedIndex === 1 ? (
                    <Text style={{ color: "#44A54D", fontSize: 29 }}>
                      {nutrients[1] * 9}
                    </Text>
                  ) : focusedIndex === 2 ? (
                    <Text style={{ color: "#db904f", fontSize: 29 }}>
                      {nutrients[2] * 4}
                    </Text>
                  ) : (
                    <Text style={{ color: "#616060", fontSize: 29 }}>
                      {nutrients[0] * 4 + nutrients[1] * 9 + nutrients[2] * 4}
                    </Text>
                  )}
                  <Text style={{ color: "#616060", fontSize: 11 }}>
                    cal / serving
                  </Text>
                </View>
              );
            }}
          />
        </View>
        <View style={{ marginRight: 28, justifyContent: "flex-end" }}>
          {renderLegend(`Protein (${nutrients[0]}g)`, "#5983C8")}
          {renderLegend(`Fat (${nutrients[1]}g)`, "#44A54D")}
          {renderLegend(`Carbs (${nutrients[2]}g)`, "#db904f")}
        </View>
      </View>
    </View>
  );
}
