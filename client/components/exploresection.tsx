import { Pressable, Text, View } from "react-native";
import React from "react";
import { styles } from "@/styles/auth.styles";
import { NEWCOLORS } from "@/constants/newtheme";
import { router } from "expo-router";

export default function ExploreSection() {
  const Block = ({
    title,
    color,
    children,
    link,
    height,
  }: {
    title: string;
    color: string;
    children?: React.ReactNode;
    link?: string;
    height?: number;
  }) => (
    <Pressable
      style={[
        styles.homeBlock,
        { flex: 1, backgroundColor: color },
        styles.basicBoxShadow,
        { height: height ? height : undefined },
      ]}
      onPress={() => router.push(`/(tabs)/${link}` as any)}
    >
      <Text
        style={[
          styles.textCentered,
          { fontFamily: "Nunito-SemiBold", fontSize: 20 },
        ]}
        adjustsFontSizeToFit
      >
        {title}
      </Text>
    </Pressable>
  );

  return (
    <View style={{ flexDirection: "column", gap: 10, width: "100%" }}>
      <Block
        title="Explore"
        height={120}
        color={NEWCOLORS.greyBlock}
        link="generationpage"
      />

      <View style={{ flexDirection: "row", gap: 10, width: "100%" }}>
        <Block
          height={200}
          title="Meal Generator"
          color={NEWCOLORS.blueBlock}
          link="generationpage"
        />

        <View style={{ flex: 1, flexDirection: "column", gap: 10 }}>
          <Block
            title="Profile & Stats"
            color={NEWCOLORS.orangeBlock}
            link="profile"
          />
          <Block title="Cookbook" color={NEWCOLORS.greenBlock} link="saves" />
        </View>
      </View>
    </View>
  );
}
