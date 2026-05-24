import {
  View,
  Text,
  Platform,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "@/styles/GlobalStyles";
import { NEWCOLORS } from "@/constants/NewTheme";
import RecipeContext from "@/contexts/RecipeContext";
import NutrientsContext from "@/contexts/NutrientsContext";
import { GenerationCardPreview } from "../components/features/generator/GenerationCardPreview";
import Timer from "@/components/features/recipe/Timer";
import { Image } from "expo-image";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { COLORS } from "@/constants/Theme";
import * as Haptics from "expo-haptics";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { useNavigation } from "@react-navigation/native";

export default function RecipePage() {
  const [recipeData] = useContext(RecipeContext);
  const hsl = require("hsl-to-hex");
  const navigation = useNavigation();

  const parseMarkdownTextInline = (input: string) => {
    const cleanInput = input
      .replace(
        /<(?:protein|fat|carbs|difficulty|duration|servings|title|desc|box)>[\s\S]*?<\/(?:protein|fat|carbs|difficulty|duration|servings|title|desc|box)>/g,
        "",
      )
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
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
              paddingHorizontal: 20,
            }}
          >
            <BouncyCheckbox
              size={20}
              fillColor={COLORS.greenProgressBar}
              unFillColor={COLORS.greenButtonColor}
              iconStyle={{ borderColor: COLORS.fontColor }}
              innerIconStyle={{ borderWidth: 2 }}
              onPress={() =>
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
              }
            />
            <Text
              style={[styles.textLeftSemiBold, { marginLeft: 10, flex: 1 }]}
            >
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
          <View key={index} style={{ marginVertical: 15 }}>
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
      <View style={{ paddingHorizontal: 30, flex: 1 }}>
        <Pressable
          style={{
            marginTop: 8,
            marginLeft: 0,
          }}
          onPress={() =>
            navigation.canGoBack()
              ? [navigation.goBack(), Haptics.selectionAsync()]
              : null
          }
        >
          <CustomIcon
            name="arrow-left"
            filled={false}
            color={navigation.canGoBack() ? COLORS.fontColor : COLORS.addPlusGrey}
            size={20}
          />
        </Pressable>

        <NutrientsContext.Provider value={[nutrients, setNutrients]}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <GenerationCardPreview
              title={recipeData.title}
              description={recipeData.description}
              difficulty={recipeData.difficulty}
              time={recipeData.time}
              tags={recipeData.tags}
            />
          </View>
        </NutrientsContext.Provider>
      </View>
    </SafeAreaView>
  );
}
