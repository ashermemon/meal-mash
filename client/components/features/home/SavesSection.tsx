import { View, Pressable, ScrollView } from "react-native";
import { Text } from "@/components/universal/AppText";
import React, { useContext, useMemo } from "react";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { useStyles } from "@/styles/GlobalStyles";
import { useTheme, useIsDarkMode } from "@/contexts/ColorSchemeContext";
import SavedRecipesContext from "@/contexts/SavedRecipesContext";
import AppImage from "@/components/universal/AppImage";
import icons3d from "@/components/universal/3dIcons";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { getTintedBoxShadow } from "@/utils/shadow";
import { moderateScale, scale } from "@/utils/responsive";
import {
  countSavesInCategory,
  saveCategories,
} from "@/constants/SaveCategories";

export default function SavesSection() {
  const styles = useStyles();
  const theme = useTheme();
  const isDark = useIsDarkMode();
  const [saves] = useContext(SavedRecipesContext);
  const sortedCategories = useMemo(
    () =>
      saveCategories
        .map((category) => ({
          ...category,
          count: countSavesInCategory(saves, category.filter),
        }))
        .sort((a, b) => b.count - a.count),
    [saves],
  );

  return (
    <View style={{ marginTop: moderateScale(25), gap: moderateScale(10) }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={[
            styles.basicTextLeft,
            styles.bold,
            { fontSize: moderateScale(28), flexShrink: 1 },
          ]}
          numberOfLines={1}
        >
          Your Saves
        </Text>
        <Pressable
          hitSlop={moderateScale(10)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: moderateScale(4),
          }}
          onPress={() => [
            Haptics.selectionAsync(),
            router.navigate("/saveshome"),
          ]}
        >
          <Text
            style={[
              styles.textLeftSemiBold,
              { fontSize: moderateScale(15), color: theme.placeholderText },
            ]}
          >
            See all
          </Text>
          <CustomIcon
            name="arrow-right"
            size={moderateScale(16)}
            color={theme.placeholderText}
          />
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        overScrollMode="never"
        contentContainerStyle={{
          gap: moderateScale(10),
          paddingBottom: moderateScale(10),
        }}
      >
        {sortedCategories.map((category) => {
          const count = category.count;
          return (
            <Pressable
              key={category.filter}
              style={[
                styles.homeBlock,
                {
                  backgroundColor: theme.greyBlock,
                  width: scale(100),
                  minHeight: scale(110),
                  justifyContent: "space-between",
                  gap: moderateScale(6),
                },
                getTintedBoxShadow(theme.greyBlock, isDark),
              ]}
              onPress={() => [
                Haptics.selectionAsync(),
                router.navigate({
                  pathname: "/saves",
                  params: {
                    filter: category.filter,
                    filterTitle: category.title,
                  },
                }),
              ]}
            >
              <AppImage
                source={icons3d[category.image] || icons3d.Default}
                style={{
                  width: scale(44),
                  height: scale(44),
                }}
                contentFit="contain"
              />
              <View>
                <Text
                  style={[
                    styles.textLeftBold,
                    { fontSize: moderateScale(13) },
                  ]}
                  numberOfLines={2}
                >
                  {category.title}
                </Text>
                <Text
                  style={[
                    styles.basicTextLeft,
                    {
                      fontSize: moderateScale(11),
                      color: theme.placeholderText,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {count} Saved
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
