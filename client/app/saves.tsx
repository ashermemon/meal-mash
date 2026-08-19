import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import DisplaySaved from "@/components/features/saved/DisplaySaved";
import { useStyles } from "@/styles/GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/contexts/ColorSchemeContext";
import { hexToRgba } from "@/utils/color";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { SafeAreaView } from "react-native-safe-area-context";
import { type RecipeCategories } from "@/contexts/RecipeContext";

type Props = {};

const saves = (props: Props) => {
  const styles = useStyles();
  const theme = useTheme();
  const navigation = useNavigation();
  const { filter, filterTitle } = useLocalSearchParams<{
    filter?: "all" | keyof RecipeCategories;
    filterTitle?: string;
  }>();
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.nestedBG,
          position: "relative",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginTop: 10,
            paddingHorizontal: 25,
            paddingBottom: 10,
          }}
        >
          <Pressable
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            style={{
              zIndex: 1000,
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
              color={
                navigation.canGoBack() ? theme.fontColor : theme.addPlusGrey
              }
              size={20}
            />
          </Pressable>
          <Text
            style={[
              styles.textLeftBold,
              { marginTop: 0, marginLeft: 14, fontSize: 20 },
            ]}
          >
            {filterTitle}
          </Text>
        </View>

        <ScrollView
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 25,
            paddingTop: 0,
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
              <DisplaySaved filter={filter}></DisplaySaved>
            </View>
          </View>
        </ScrollView>
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
            zIndex: 99990,
          }}
          pointerEvents="none"
        />
      </SafeAreaView>
    </>
  );
};

export default saves;
