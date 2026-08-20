import {
  View,
  Text,
  Pressable,
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import CustomCheckbox from "@/components/common/CustomCheckbox";
import { Food } from "../pantry/Search";
import * as Haptics from "expo-haptics";
import { useStyles } from "@/styles/GlobalStyles";
import { useTheme } from "@/contexts/ColorSchemeContext";
import GroceryListContext from "@/contexts/GroceryListContext";
import CheckedGroceryListContext from "@/contexts/CheckedGroceryListContext";
import { PantryDetailsContext } from "@/contexts/PantryDetails";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
  food: Food;
  // "active" = sits in the pending list, tapping checks it off.
  // "checked" = sits in the checked history, tapping restores it to the pending list.
  variant?: "active" | "checked";
};

const GroceryListItem = ({ food, variant = "active" }: Props) => {
  const styles = useStyles();
  const theme = useTheme();
  const [groceryList, setGroceryList] = useContext(GroceryListContext);
  const [checkedList, setCheckedList] = useContext(CheckedGroceryListContext);
  const [pantryDetails, setPantryDetails] = useContext(PantryDetailsContext);

  const startsChecked = variant === "checked";
  const [checked, setChecked] = useState(startsChecked);
  const [busy, setBusy] = useState(false);
  const [rowWidth, setRowWidth] = useState(0);
  const isAnimatingRef = useRef(false);

  const strikeAnim = useRef(new Animated.Value(startsChecked ? 1 : 0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const mountFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(mountFadeAnim, {
      toValue: 1,
      duration: 280,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [mountFadeAnim]);

  const textColorAnim = strikeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.fontColor, theme.searchPlaceholder],
  });

  const toggle = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setBusy(true);

    const checkingOff = variant === "active";
    setChecked(checkingOff);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);

    Animated.sequence([
      Animated.delay(320),
      Animated.timing(strikeAnim, {
        toValue: checkingOff ? 1 : 0,
        duration: 280,
        useNativeDriver: false,
      }),
      Animated.delay(220),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 240,
        useNativeDriver: true,
      }),
    ]).start(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      if (checkingOff) {
        setGroceryList((prev) => prev.filter((item) => item.id !== food.id));
        setCheckedList((prev) =>
          prev.some((item) => item.id === food.id) ? prev : [...prev, food],
        );
        setPantryDetails((prev) => {
          const alreadyAdded = prev.ingredients.some(
            (item) => item.id === food.id,
          );
          return alreadyAdded
            ? prev
            : { ...prev, ingredients: [...prev.ingredients, food] };
        });
      } else {
        setCheckedList((prev) => prev.filter((item) => item.id !== food.id));
        setGroceryList((prev) =>
          prev.some((item) => item.id === food.id) ? prev : [...prev, food],
        );
        setPantryDetails((prev) => ({
          ...prev,
          ingredients: prev.ingredients.filter((item) => item.id !== food.id),
        }));
      }
    });
  };

  return (
    <Animated.View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        opacity: Animated.multiply(fadeAnim, mountFadeAnim),
      }}
    >
      <View style={{ marginRight: 12 }} pointerEvents={busy ? "none" : "auto"}>
        <CustomCheckbox
          checked={checked}
          onChange={toggle}
          size={24}
          borderRadius={100}
          grocery
        />
      </View>
      <Pressable
        style={{ flex: 1, flexDirection: "row", position: "relative" }}
        onPress={toggle}
        disabled={busy}
        onLayout={(e) => setRowWidth(e.nativeEvent.layout.width)}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Animated.Text
            numberOfLines={1}
            style={[
              styles.textLeftSemiBold,
              {
                marginLeft: 0,
                flex: 1,
                fontSize: 15,
                color: textColorAnim,
              },
            ]}
          >
            {food.displayName}
          </Animated.Text>
        </View>

        <Text
          style={[
            styles.textRight,
            {
              fontSize: 15,
              color: theme.searchPlaceholder,
              marginLeft: 12,
            },
          ]}
        >
          {food.category}
        </Text>

        <Animated.View
          pointerEvents="none"
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            marginTop: -1,
            height: 1.5,
            borderRadius: 1,
            backgroundColor: theme.searchPlaceholder,
            width: strikeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, rowWidth],
            }),
          }}
        />
      </Pressable>
    </Animated.View>
  );
};

export default GroceryListItem;
