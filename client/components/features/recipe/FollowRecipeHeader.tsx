import { View, Text, Pressable } from "react-native";
import React from "react";
import ProgressBar from "@/components/features/recipe/ProgressBar";
import { styles } from "@/styles/GlobalStyles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { useNavigation } from "expo-router";
import { COLORS } from "@/constants/Theme";
import * as Haptics from "expo-haptics";

type HeaderProps = {
  pageTitle: string;
};
const FollowRecipe = (props: HeaderProps) => {
  const navigation = useNavigation();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      Haptics.selectionAsync();
      navigation.goBack();
    }
  };

  return (
    <>
      <View
        style={[
          styles.headerContainer,
          {
            flexDirection: "row",
            alignItems: "center",

            justifyContent: "space-between",
          },
        ]}
      >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <Pressable onPress={handleBack}>
                    <CustomIcon
                      name="arrow-left"
                      filled={false}
                      color={COLORS.fontColor}
                      size={20}
                    />
                  </Pressable>
                          <View>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={[styles.headerText, { alignSelf: "center" }]}
          >
            {props.pageTitle}
          </Text>
        </View>
                  <Pressable onPress={() => {}}>
                    <CustomIcon
                      name="bookmark"
                      filled={false}
                      color={COLORS.fontColor}
                      size={20}
                    />
                  </Pressable>
                </View>


      </View>
      <View style={styles.recipeMovement}>
        <ProgressBar progress={1}></ProgressBar>
      </View>
    </>
  );
}
export default FollowRecipe;
