import { View, Text, ScrollView, Platform, SafeAreaView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "@/styles/auth.styles";
import { NEWCOLORS } from "@/constants/newtheme";
import RecipeContext from "@/contexts/RecipeContext";
import NutrientsContext from "@/contexts/NutrientsContext";
import MobileHeader from "@/components/universal/mobileheader";
import GenerationCardPreview from "@/components/generationcardpreview";
import Timer from "@/components/timer";
import { Image } from "expo-image";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { COLORS } from "@/constants/theme";
import * as Haptics from "expo-haptics";

export default function RecipePage() {
  const [recipeData] = useContext(RecipeContext);
  const hsl = require("hsl-to-hex");

  const parseMarkdownTextInline = (input: string) => {
    const cleanInput = input
      .replace(/<(?:protein|fat|carbs|difficulty|duration|servings|title|desc|box)>[\s\S]*?<\/(?:protein|fat|carbs|difficulty|duration|servings|title|desc|box)>/g, "")
      .replace(/\n{2,}/g, "\n")
      .replace(/<\/?replace>/g, "")
      .replace(/^\s+|\s+$/g, "");

    const texts = cleanInput.split(
      /(<(?:bold|timer|title|head|line|checkbox|tip|desc|box)>[\s\S]*?<\/(?:bold|timer|title|head|line|checkbox|tip|desc|box)>)/g,
    );

    return texts.map((text, index) => {
      if (text.startsWith("<head>") && text.endsWith("</head>")) {
        const content = text.slice(6, -7);
        return (
          <Text
            key={index}
            style={[
              styles.textCentered,
              { fontFamily: "Nunito-Bold", fontSize: 20, marginTop: 10 },
            ]}
          >
            {content}
          </Text>
        );
      }

      if (text.startsWith("<bold>") && text.endsWith("</bold>")) {
        const content = text.slice(6, -7);
        return (
          <Text
            key={index}
            style={[
              styles.textCentered,
              { fontFamily: "Nunito-Bold", fontSize: 16 },
            ]}
          >
            {content}
          </Text>
        );
      }

      if (text.startsWith("<timer>") && text.endsWith("</timer>")) {
        const content = text.slice(7, -8);
        let timeSec = parseInt(content) ? parseInt(content) * 60 : 0;
        let color1 = hsl(Math.random() * 359, 55, 69);
        let color2 = hsl(Math.random() * 359, 55, 69);
        let color3 = hsl(Math.random() * 359, 55, 69);

        return timeSec > 0 ? (
          <Timer
            key={index}
            time={timeSec}
            color1={color1}
            color2={color2}
            color3={color3}
          ></Timer>
        ) : null;
      }

      if (text.startsWith("<tip>") && text.endsWith("</tip>")) {
        const content = text.slice(5, -6);
        return (
          <View key={index} style={styles.tipContainer}>
            <View style={[styles.centeredBox]}>
              <Image
                source={require(`@/assets/3DIcons/LightBulbEmoji.png`)}
                style={{ width: 35, height: 50 }}
              ></Image>
            </View>
            <View style={styles.centeredBox}>
              <Text style={[styles.textLeftBold, { marginLeft: 20 }]}>
                {content}
              </Text>
            </View>
          </View>
        );
      }

      if (text.startsWith("<checkbox>") && text.endsWith("</checkbox>")) {
        const content = text.slice(10, -11);
        return (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5, paddingHorizontal: 20 }}>
            <BouncyCheckbox
              size={20}
              fillColor={COLORS.greenProgressBar}
              unFillColor={COLORS.greenButtonColor}
              iconStyle={{ borderColor: COLORS.fontColor }}
              innerIconStyle={{ borderWidth: 2 }}
              onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)}
            />
            <Text style={[styles.textLeftSemiBold, { marginLeft: 10, flex: 1 }]}>
              {content}
            </Text>
          </View>
        );
      }

      if (text.startsWith("<line>") && text.endsWith("</line>")) {
        return <View key={index} style={{ height: 10 }} />;
      } else if (text.replace(/\s+/g, "").length > 0) {
        return (
          <Text key={index} style={[styles.textCentered, { fontSize: 16 }]}>
            {text}
          </Text>
        );
      } else {
        return null;
      }
    });
  };

  const parseMarkdownText = (input: string) => {
    const texts = input.split(/(<step>[\s\S]*?<\/step>)/g);
    let stepNum = 0;

    return texts.map((text, index) => {
      if (text.startsWith("<step>") && text.endsWith("</step>")) {
        const content = text.slice(6, -7);
        
        if (content.includes("<title>") || content.includes("<protein>")) {
          return null;
        }

        stepNum += 1;
        return (
           <View key={index} style={{marginVertical: 15}}>
             {parseMarkdownTextInline(content)}
           </View>
        );
      } else {
        return null;
      }
    });
  };

  const [nutrients, setNutrients] = useState<number[]>(recipeData.nutrients);

  useEffect(() => {
    setNutrients(recipeData.nutrients);
  }, [recipeData.nutrients]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: NEWCOLORS.nestedBG }}>
      <MobileHeader
        pageTitle={recipeData.title || "Recipe"}
        backEnabled={true}
      />
      <NutrientsContext.Provider value={[nutrients, setNutrients]}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          overScrollMode="never"
          alwaysBounceVertical={false}
          style={{ flex: 1 }}
        >
          <View style={{ padding: 20 }}>
            <GenerationCardPreview
              title={recipeData.title}
              description={recipeData.description}
              difficulty={recipeData.difficulty}
              time={recipeData.time}
              tags={recipeData.tags}
            />
            <View style={{ marginTop: 20 }}>
              {parseMarkdownText(recipeData.responseRecipe)}
            </View>
          </View>
        </ScrollView>
      </NutrientsContext.Provider>
    </SafeAreaView>
  );
}
