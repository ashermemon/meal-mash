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
  progress: number;
};
const FollowRecipeHeader = (props: HeaderProps) => {
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
        style={{ marginVertical: 10, width: "100%", paddingHorizontal: 30 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingVertical: 8,
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
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={[
                styles.textCenterBold,
                { fontSize: 18, fontFamily: "Nunito-SemiBold" },
              ]}
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
      <View style={{ width: "100%" }}>
        <ProgressBar progress={props.progress}></ProgressBar>
      </View>
    </>
  );
};
export default FollowRecipeHeader;
