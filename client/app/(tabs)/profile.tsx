import {
  View,
  Text,
  Platform,
  ImageBackground,
  ScrollView,
  Pressable,
  TextInput,
  Switch,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { styles } from "@/styles/GlobalStyles";
import { COLORS } from "@/constants/Theme";
import Counter from "@/components/features/profile/Counter";
import * as Haptics from "expo-haptics";
import { storage } from "@/utils/storage";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { NEWCOLORS } from "@/constants/NewTheme";

import { LinearGradient } from "expo-linear-gradient";
import DisplaySaved from "@/components/features/saved/DisplaySaved";
import SwitchToggle from "@/components/common/SwitchToggle";
import { useIsDarkMode, useToggleColorScheme } from "@/contexts/ColorSchemeContext";

export default function Profile() {
  const [editMode, setEditMode] = useState(false);

  const [lastSavedName, setLastSavedName] = useState("");

  const [nameQ, setNameQ] = useState("");

  const nameInputRef = useRef<TextInput>(null);

  const isDark = useIsDarkMode();
  const { toggleColorScheme } = useToggleColorScheme();

  const handleEditPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setEditMode(true);
  };

  const handleCancelPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    nameInputRef.current?.blur();
    setNameQ(lastSavedName);
    setEditMode(false);
  };

  const handleSavePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    nameInputRef.current?.blur();
    storage.set("name", nameQ);
    setLastSavedName(nameQ);
    setEditMode(false);
  };

  useEffect(() => {
    if (editMode) {
      const frame = requestAnimationFrame(() => {
        nameInputRef.current?.focus();
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [editMode]);

  useEffect(() => {
    const storedName = storage.getString("name") ?? "";

    if (storedName) {
      try {
        setNameQ(storedName);
        setLastSavedName(storedName);
      } catch (e) {
        console.error("Failed to get name:", e);
      }
    }
  }, []);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: NEWCOLORS.backgroundColor,
          position: "relative",
        }}
      >
        <ScrollView
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 25,
            paddingTop: 20,
            paddingBottom: 170,
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
                  {
                    fontSize: 28,
                  },
                ]}
              >
                Profile
              </Text>
              <SwitchToggle
                value={isDark}
                onValueChange={toggleColorScheme}
              ></SwitchToggle>
            </View>

            <View style={{ gap: 30 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: 25,
                  marginTop: 15,
                }}
              >
                <View style={styles.pfp}></View>
                <View style={{ flex: 1, gap: 10 }}>
                  <View
                    style={{ height: 32, justifyContent: "center" }}
                    pointerEvents={editMode ? "auto" : "none"}
                  >
                    <TextInput
                      ref={nameInputRef}
                      style={styles.nameInput}
                      autoCorrect={false}
                      maxLength={15}
                      autoCapitalize="none"
                      keyboardType="default"
                      spellCheck={false}
                      value={editMode ? nameQ : nameQ == "" ? "Guest" : nameQ}
                      onChangeText={setNameQ}
                      placeholder="Add Name"
                      placeholderTextColor={COLORS.addPlusGrey}
                      cursorColor={NEWCOLORS.basicText}
                      selectionColor={NEWCOLORS.basicText}
                    ></TextInput>
                  </View>
                  {!editMode ? (
                    <Pressable
                      onPress={handleEditPress}
                      style={[
                        styles.circleButton,
                        styles.basicBoxShadow,
                        {
                          alignSelf: "flex-start",
                          height: 28,
                          gap: 6,
                          paddingHorizontal: 10,
                          flexDirection: "row",
                          alignItems: "center",
                        },
                      ]}
                    >
                      <CustomIcon
                        name="pencil"
                        filled={true}
                        color={NEWCOLORS.greyBlock}
                        size={13}
                      />

                      <Text
                        style={[
                          styles.textLeftSemiBold,
                          { color: NEWCOLORS.greyBlock, fontSize: 13 },
                        ]}
                      >
                        Edit Profile
                      </Text>
                    </Pressable>
                  ) : (
                    <View
                      style={{
                        flexDirection: "row",
                        alignSelf: "flex-start",
                        gap: 10,
                      }}
                    >
                      <Pressable
                        onPress={handleCancelPress}
                        style={[
                          styles.circleButton,
                          styles.basicBoxShadow,
                          {
                            height: 28,
                            gap: 6,
                            paddingHorizontal: 12,
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: NEWCOLORS.greyBlock,
                          },
                        ]}
                      >
                        <CustomIcon
                          name="close"
                          filled={true}
                          color={COLORS.fontColor}
                          size={13}
                        />
                        <Text
                          style={[
                            styles.textLeftSemiBold,
                            { color: COLORS.fontColor, fontSize: 13 },
                          ]}
                        >
                          Cancel
                        </Text>
                      </Pressable>
                      <Pressable
                        onPress={handleSavePress}
                        style={[
                          styles.circleButton,
                          styles.basicBoxShadow,
                          {
                            height: 28,
                            gap: 6,
                            paddingHorizontal: 12,
                            flexDirection: "row",
                            alignItems: "center",
                          },
                        ]}
                      >
                        <CustomIcon
                          name="check"
                          filled={true}
                          color={NEWCOLORS.greyBlock}
                          size={13}
                        />
                        <Text
                          style={[
                            styles.textLeftSemiBold,
                            { color: NEWCOLORS.greyBlock, fontSize: 13 },
                          ]}
                        >
                          Save
                        </Text>
                      </Pressable>
                    </View>
                  )}
                </View>
              </View>

              <View style={{ gap: 15 }}>
                <Text
                  style={[
                    styles.basicTextLeft,
                    styles.bold,
                    {
                      fontSize: 28,
                    },
                  ]}
                >
                  Stats
                </Text>

                <View
                  style={{
                    gap: 12,
                    flexDirection: "row",
                    flex: 1,
                  }}
                >
                  <Counter
                    variable="mealsnumber"
                    text="Meals Generated"
                  ></Counter>
                  <Counter
                    variable="savesnumber"
                    text={"Saved\nRecipes"}
                  ></Counter>
                  <Counter
                    variable="pantrynumber"
                    text={"Ingredients\nin Pantry"}
                  ></Counter>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <LinearGradient
          colors={[
            "rgba(255, 248, 237, 0)",
            "rgba(255, 248, 237, 0.75)",
            "rgba(255, 248, 237, 0.98)",
            NEWCOLORS.backgroundColor,
          ]}
          locations={[0, 0.4, 0.75, 1]}
          style={{
            position: "absolute",
            bottom: -40,
            left: 0,
            right: 0,
            height: 160,
            zIndex: 10,
          }}
          pointerEvents="none"
        />
      </View>
    </>
  );
}
