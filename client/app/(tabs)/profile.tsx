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
import React, { useContext, useEffect, useRef, useState } from "react";
import { useStyles } from "@/styles/GlobalStyles";
import Counter from "@/components/features/profile/Counter";
import * as Haptics from "expo-haptics";
import { storage } from "@/utils/storage";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { hexToRgba } from "@/utils/color";

import { LinearGradient } from "expo-linear-gradient";
import DisplaySaved from "@/components/features/saved/DisplaySaved";
import SwitchToggle from "@/components/common/SwitchToggle";
import {
  useIsDarkMode,
  useToggleColorScheme,
  useTheme,
} from "@/contexts/ColorSchemeContext";
import { router } from "expo-router";
import AchievementsContext, {
  AchievementData,
} from "@/contexts/AchievementsContext";
import Achievement from "@/components/features/profile/Achievement";
import { getUnlockedAchievementIds } from "@/utils/achievements";
import { Image } from "expo-image";
import icons3d from "@/components/universal/3dIcons";

export default function Profile() {
  const styles = useStyles();
  const theme = useTheme();
  const [editMode, setEditMode] = useState(false);

  const [lastSavedName, setLastSavedName] = useState("");

  const [nameQ, setNameQ] = useState("");

  const nameInputRef = useRef<TextInput>(null);

  const isDark = useIsDarkMode();
  const [achievements, setAchievements] = useContext(AchievementsContext);
  const { toggleColorScheme } = useToggleColorScheme();

  const unlockedAchievementIds = getUnlockedAchievementIds();

  const availableAchievements: AchievementData[] = [
    {
      id: "first-mash",
      title: "First Mash",
      description: "Make your first meal with MealMash",
      emoji: "Medal",
      color: theme.yellowBlock,
      unlocked: unlockedAchievementIds.includes("first-mash"),
    },
    {
      id: "sweet-tooth",
      title: "Sweet Tooth",
      description: "Generate 10 dessert recipes",
      emoji: "Popsicle",
      color: theme.orangeBlock,
      unlocked: unlockedAchievementIds.includes("sweet-tooth"),
    },
    {
      id: "world-tour",
      title: "World Tour",
      description: "Generate recipes from 5 different cuisines",
      emoji: "<></>",
      color: theme.blueBlock,
      unlocked: unlockedAchievementIds.includes("world-tour"),
    },
    {
      id: "the-cookbook",
      title: "The Cookbook",
      description: "Save 50 generated recipes",
      emoji: "RecipeBook",
      color: theme.greenBlock,
      unlocked: unlockedAchievementIds.includes("the-cookbook"),
    },
    {
      id: "late-night-snack",
      title: "Late-Night Snack",
      description: "Create a recipe after 10pm",
      emoji: "<></>",
      color: theme.purpblueBlock,
      unlocked: unlockedAchievementIds.includes("late-night-snack"),
    },
    {
      id: "leftover-legend",
      title: "Leftover Legend",
      description: "Make 25 meals with leftovers",
      emoji: "HotDog",
      color: theme.orangeBlock,
      unlocked: unlockedAchievementIds.includes("leftover-legend"),
    },
    {
      id: "on-fire",
      title: "On Fire",
      description: "Generate a recipe 7 days in a row",
      emoji: "Fire",
      color: theme.redBlock,
      unlocked: unlockedAchievementIds.includes("on-fire"),
    },
    {
      id: "century",
      title: "Century",
      description: "Make 100 meals",
      emoji: "",
      color: theme.greenBlock,
      unlocked: unlockedAchievementIds.includes("century"),
    },
  ];
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
    setAchievements(availableAchievements);
  }, [theme]);

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
          backgroundColor: theme.backgroundColor,
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
                      placeholderTextColor={theme.addPlusGrey}
                      cursorColor={theme.basicText}
                      selectionColor={theme.basicText}
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
                        color={theme.pureWhite}
                        size={13}
                      />

                      <Text
                        style={[
                          styles.textLeftSemiBold,
                          { color: theme.pureWhite, fontSize: 13 },
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
                            backgroundColor: theme.greyBlock,
                          },
                        ]}
                      >
                        <CustomIcon
                          name="close"
                          filled={true}
                          color={theme.fontColor}
                          size={13}
                        />
                        <Text
                          style={[
                            styles.textLeftSemiBold,
                            { color: theme.fontColor, fontSize: 13 },
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
                          color={theme.pureWhite}
                          size={13}
                        />
                        <Text
                          style={[
                            styles.textLeftSemiBold,
                            { color: theme.pureWhite, fontSize: 13 },
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
                  Saves
                </Text>

                <Pressable
                  style={[styles.savesCard, styles.basicBoxShadow]}
                  onPress={() => router.navigate("/saves")}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 15,
                    }}
                  >
                    <View style={{ paddingBottom: 2 }}>
                      <CustomIcon
                        name="chef-hat"
                        filled={true}
                        color={theme.blueAccent}
                        size={30}
                      />
                    </View>
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={1}
                      style={[
                        styles.textLeftBold,
                        {
                          fontFamily: "Nunito-Bold",

                          color: theme.basicText,
                        },
                      ]}
                    >
                      Click to view your saved recipes
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.textLeftBold,
                      {
                        fontFamily: "Nunito-SemiBold",
                        fontSize: 15,
                        color: theme.placeholderText,
                      },
                    ]}
                  >
                    Look through bookmarked recipes by category or search and
                    pick your favorite!
                  </Text>
                </Pressable>
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
                  Achievements
                </Text>

                <View
                  style={{
                    gap: 12,

                    flex: 1,
                  }}
                >
                  {achievements.map(
                    (achievement: AchievementData, index: number) => (
                      <Achievement
                        title={achievement.title}
                        description={achievement.description}
                        emoji={achievement.emoji}
                        unlocked={achievement.unlocked}
                        color={achievement.color}
                        key={index}
                      ></Achievement>
                    ),
                  )}
                </View>
              </View>
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
            zIndex: 10,
          }}
          pointerEvents="none"
        />
      </View>
    </>
  );
}
