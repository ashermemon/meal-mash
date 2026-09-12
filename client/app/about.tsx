import { View, Text, Pressable, Linking } from "react-native";
import React from "react";
import { useStyles } from "@/styles/GlobalStyles";
import { useTheme } from "@/contexts/ColorSchemeContext";
import { useTintedBoxShadow } from "@/hooks/useBoxShadow";
import * as Haptics from "expo-haptics";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import Constants from "expo-constants";
import { Image } from "expo-image";

const APP_NAME = "MealMash";
const SUPPORT_EMAIL = "mealmashapp@gmail.com";
const CURRENT_YEAR = new Date().getFullYear();

const SECTIONS = [
  {
    title: "Privacy",
    body: "Your profile, pantry, saved recipes, and preferences are stored on your device. Ingredients and photos you submit to generate recipes or images are sent only to fulfill that request, never sold, and you can erase everything anytime from Profile > Delete All Data.",
  },
  {
    title: "Terms of Use",
    body: `${APP_NAME} is provided "as is" for personal use, with no warranty. Recipes and generated content are for informational purposes only — use your own judgment, especially with allergies or dietary needs. Continued use of the app means you accept these terms.`,
  },
];

const AboutPage = () => {
  const styles = useStyles();
  const theme = useTheme();
  const navigation = useNavigation();
  const cardShadow = useTintedBoxShadow(theme.greyBlock);
  const contactShadow = useTintedBoxShadow(theme.primary);
  const appVersion = Constants.expoConfig?.version ?? "1.0.0";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.nestedBG }}>
      <View style={{ paddingHorizontal: 25, flex: 1 }}>
        <Pressable
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          style={{ marginTop: 8, marginBottom: 15, alignSelf: "flex-start" }}
          onPress={() =>
            navigation.canGoBack()
              ? [navigation.goBack(), Haptics.selectionAsync()]
              : null
          }
        >
          <CustomIcon
            name="arrow-left"
            filled={false}
            color={navigation.canGoBack() ? theme.fontColor : theme.addPlusGrey}
            size={20}
          />
        </Pressable>

        <View style={{ flex: 1, gap: 20 }}>
          <View style={{ alignItems: "center", gap: 8 }}>
            <Image
              source={require("@/assets/images/iconround.png")}
              style={{ width: 64, height: 64, borderRadius: 16 }}
              contentFit="cover"
            />
            <Text
              style={[
                styles.basicTextLeft,
                styles.bold,
                { fontSize: 22, textAlign: "center" },
              ]}
            >
              {APP_NAME}
            </Text>
            <Text
              style={[styles.textCentered, { color: theme.placeholderText }]}
            >
              Version {appVersion}
            </Text>
          </View>

          {SECTIONS.map((section) => (
            <View
              key={section.title}
              style={[
                styles.savesCard,
                cardShadow,
                { backgroundColor: theme.greyBlock, flex: 0 },
              ]}
            >
              <Text
                style={[
                  styles.textLeftBold,
                  { color: theme.basicText, fontSize: 16 },
                ]}
              >
                {section.title}
              </Text>
              <Text
                style={[
                  styles.textLeftSemiBold,
                  {
                    fontFamily: "Nunito-SemiBold",
                    fontSize: 14,
                    color: theme.placeholderText,
                    lineHeight: 20,
                  },
                ]}
              >
                {section.body}
              </Text>
            </View>
          ))}

          <Pressable
            onPress={() => Linking.openURL(`mailto:${SUPPORT_EMAIL}`)}
            style={[
              styles.savesCard,
              contactShadow,
              {
                backgroundColor: theme.primary,
                alignItems: "center",
                flex: 0,
              },
            ]}
          >
            <Text
              style={[
                styles.textCenterBold,
                { color: theme.pureWhite, fontSize: 16 },
              ]}
            >
              Contact Support
            </Text>
          </Pressable>

          <Text
            style={[
              styles.textCentered,
              { color: theme.placeholderText, fontSize: 12 },
            ]}
          >
            © {CURRENT_YEAR} {APP_NAME}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AboutPage;
