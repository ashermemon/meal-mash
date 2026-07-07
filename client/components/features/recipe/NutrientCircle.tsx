import { Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { styles } from "@/styles/GlobalStyles";
import Svg, { Path, Circle, G } from "react-native-svg";
import NutrientsContext from "@/contexts/NutrientsContext";
import { NEWCOLORS } from "@/constants/NewTheme";

interface Props {
  textInBox?: boolean;
}

const NUTRIENT_COLORS = [
  NEWCOLORS.blueAccent,
  NEWCOLORS.greenAccent,
  NEWCOLORS.orangeAccent,
];

const getSlicePath = (
  startAngle: number,
  endAngle: number,
  rIn: number,
  rOut: number,
  cx: number,
  cy: number,
) => {
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;

  const xOutStart = cx + rOut * Math.cos(startRad);
  const yOutStart = cy + rOut * Math.sin(startRad);
  const xOutEnd = cx + rOut * Math.cos(endRad);
  const yOutEnd = cy + rOut * Math.sin(endRad);

  const xInStart = cx + rIn * Math.cos(startRad);
  const yInStart = cy + rIn * Math.sin(startRad);
  const xInEnd = cx + rIn * Math.cos(endRad);
  const yInEnd = cy + rIn * Math.sin(endRad);

  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return `M ${xOutStart} ${yOutStart} A ${rOut} ${rOut} 0 ${largeArcFlag} 1 ${xOutEnd} ${yOutEnd} L ${xInEnd} ${yInEnd} A ${rIn} ${rIn} 0 ${largeArcFlag} 0 ${xInStart} ${yInStart} Z`;
};

export default function NutrientCircle({ textInBox }: Props) {
  const [nutrients] = useContext(NutrientsContext);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const v0 = Math.max(0, nutrients[0] * 4);
  const v1 = Math.max(0, nutrients[1] * 9);
  const v2 = Math.max(0, nutrients[2] * 4);
  const total = v0 + v1 + v2;

  const slicesData = [
    { value: v0, color: NUTRIENT_COLORS[0], label: "Protein" },
    { value: v1, color: NUTRIENT_COLORS[1], label: "Fat" },
    { value: v2, color: NUTRIENT_COLORS[2], label: "Carbs" },
  ];

  const renderLegend = (text: string, color: string) => {
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

  const cx = 68;
  const cy = 68;
  const rOuter = 60;
  const rOuterInvis = 75;
  const rInner = 43;
  const rInnerInvis = 20;

  const renderChart = () => {
    if (total === 0) {
      return (
        <Svg width={136} height={136}>
          <Circle
            cx={cx}
            cy={cy}
            r={(rOuter + rInner) / 2}
            stroke={NEWCOLORS.dividerGrey2 || "#ECECEC"}
            strokeWidth={rOuter - rInner}
            fill="none"
          />
        </Svg>
      );
    }

    let currentAngle = -90;
    const activeSlicesCount = slicesData.filter((s) => s.value > 0).length;

    const slices = slicesData
      .map((slice, index) => {
        if (slice.value <= 0) {
          return null;
        }

        let angleSize = (slice.value / total) * 360;
        if (angleSize >= 360) {
          angleSize = 359.99;
        }

        const startAngle = currentAngle;
        const endAngle = currentAngle + angleSize;
        currentAngle = endAngle;

        const gap = activeSlicesCount > 1 ? 1.5 : 0;
        const displayStartAngle = startAngle + gap / 2;
        const displayEndAngle = endAngle - gap / 2;

        return {
          ...slice,
          startAngle: displayStartAngle,
          endAngle: displayEndAngle,
          midAngle: startAngle + angleSize / 2,
          index,
        };
      })
      .filter((s): s is NonNullable<typeof s> => s !== null);

    return (
      <Svg width={136} height={136}>
        {slices.map((slice) => {
          const isFocused = focusedIndex === slice.index;

          const currentOuterRadius = isFocused ? rOuter + 6 : rOuter;
          const invisOuterRadius = isFocused ? rOuterInvis + 6 : rOuterInvis;
          const pathD = getSlicePath(
            slice.startAngle,
            slice.endAngle,
            rInner,
            currentOuterRadius,
            cx,
            cy,
          );

          const invisPath = getSlicePath(
            slice.startAngle,
            slice.endAngle,
            rInnerInvis,
            invisOuterRadius,
            cx,
            cy,
          );

          return (
            <G key={slice.index}>
              <Path d={pathD} fill={slice.color} />
              <Path
                d={invisPath}
                fill="transparent"
                onPressIn={() => [
                  console.log("pressed", slice.index),
                  setFocusedIndex((prev) =>
                    prev === slice.index ? null : slice.index,
                  ),
                ]}
              />
            </G>
          );
        })}
      </Svg>
    );
  };

  const focusedNutrient =
    focusedIndex !== null ? slicesData[focusedIndex] : null;
  const caloriesToShow = focusedNutrient ? focusedNutrient.value : total;
  const textColor = focusedNutrient ? focusedNutrient.color : "#616060";

  return (
    <View
      style={[
        styles.basicBoxShadow,
        {
          backgroundColor: NEWCOLORS.secondaryBoxGrey,
          borderRadius: 15,
          alignItems: "center",
        },
      ]}
    >
      {textInBox ? (
        <Text
          style={[
            styles.textLeftSemiBold,
            { fontSize: 18, marginTop: 15, textAlign: "center" },
          ]}
        >
          Nutrition Facts
        </Text>
      ) : null}
      <View style={styles.nutrientCircle}>
        <View style={{ alignItems: "flex-start", flex: 1, marginLeft: 10 }}>
          <View style={{ width: 136, height: 136, position: "relative" }}>
            {renderChart()}
            <View
              pointerEvents="none"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center",
                marginTop: -5,
              }}
            >
              <Text
                style={{
                  color: textColor,
                  fontSize: 29,
                  lineHeight: 33,
                  fontFamily: "Nunito-SemiBold",
                }}
              >
                {Math.round(caloriesToShow)}
              </Text>
              <Text
                style={{
                  color: "#616060",
                  fontSize: 11,
                  fontFamily: "Nunito-Medium",
                }}
              >
                cal / serving
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginRight: 26, justifyContent: "flex-end" }}>
          {renderLegend(`Protein (${nutrients[0]}g)`, NUTRIENT_COLORS[0])}
          {renderLegend(`Fat (${nutrients[1]}g)`, NUTRIENT_COLORS[1])}
          {renderLegend(`Carbs (${nutrients[2]}g)`, NUTRIENT_COLORS[2])}
        </View>
      </View>
    </View>
  );
}
