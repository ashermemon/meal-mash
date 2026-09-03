import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Pressable,
  TextInput,
  Switch,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useStyles } from "@/styles/GlobalStyles";
import Counter from "@/components/features/profile/Counter";
import * as Haptics from "expo-haptics";
import {
  readProfileName,
  writeProfileName,
  readProfilePictureFile,
  writeProfilePictureFile,
  resetAllData,
  useStats,
  defaultPantry,
} from "@/utils/storage";
import {
  clearProfilePictures,
  persistProfilePicture,
  readProfilePictureUri,
} from "@/utils/profilePicture";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { hexToRgba } from "@/utils/color";
// import * as Updates from "expo-updates";
import { LinearGradient } from "expo-linear-gradient";
import DisplaySaved from "@/components/features/saved/DisplaySaved";
import SwitchToggle from "@/components/common/SwitchToggle";
import {
  useIsDarkMode,
  useToggleColorScheme,
  useTheme,
} from "@/contexts/ColorSchemeContext";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import AchievementsContext, {
  AchievementData,
} from "@/contexts/AchievementsContext";
import SavedRecipesContext from "@/contexts/SavedRecipesContext";
import { PantryDetailsContext } from "@/contexts/PantryDetails";
import GroceryListContext from "@/contexts/GroceryListContext";
import CheckedGroceryListContext from "@/contexts/CheckedGroceryListContext";
import Achievement from "@/components/features/profile/Achievement";
import { getUnlockedAchievementIds } from "@/utils/achievements";
import { ACHIEVEMENTS } from "@/constants/Achievements";
import { Image } from "expo-image";
import icons3d from "@/components/universal/3dIcons";
import { useTintedBoxShadow } from "@/hooks/useBoxShadow";
import * as ImagePicker from "expo-image-picker";

export default function Profile() {
  const styles = useStyles();
  const theme = useTheme();
  const [editMode, setEditMode] = useState(false);

  const [lastSavedName, setLastSavedName] = useState("");

  const [nameQ, setNameQ] = useState("");

  const nameInputRef = useRef<TextInput>(null);

  const isDark = useIsDarkMode();
  const [achievements, setAchievements] = useContext(AchievementsContext);
  const [savedRecipes, setSavedRecipes] = useContext(SavedRecipesContext);
  const [pantryDetails, setPantryDetails] = useContext(PantryDetailsContext);
  const [, setGroceryList] = useContext(GroceryListContext);
  const [, setCheckedGroceryList] = useContext(CheckedGroceryListContext);
  const stats = useStats();
  const { toggleColorScheme } = useToggleColorScheme();
  const circleButtonShadow = useTintedBoxShadow(theme.primary);
  const cancelButtonShadow = useTintedBoxShadow(theme.greyBlock);
  const savesCardShadow = useTintedBoxShadow(theme.blueBlock);
  const dangerZoneShadow = useTintedBoxShadow(theme.redAccent);
  const pfpShadow = useTintedBoxShadow(theme.lightGrey);

  const [imageUri, setImageUri] = useState<string | null>(() =>
    readProfilePictureUri(readProfilePictureFile()),
  );

  const handlePickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the camera roll is required!",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) return;

    saveProfilePicture(result.assets[0].uri);
  };

  const saveProfilePicture = (pickedUri: string) => {
    try {
      const previousFile = readProfilePictureFile();
      const fileName = persistProfilePicture(pickedUri, previousFile);

      writeProfilePictureFile(fileName);
      setImageUri(readProfilePictureUri(fileName));

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.error("Failed to save profile picture:", error);

      Alert.alert(
        "Couldn't Save Picture",
        "That image could not be saved to your profile. Please try another one.",
      );
    }
  };

  const handleImageError = () => {
    writeProfilePictureFile("");
    setImageUri(null);
  };

  const resetData = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert(
      "Are you sure?",
      "This removes all data from your account including saved recipes, achievements and pantry items. This action cannot be reversed.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset Data",
          style: "destructive",

          onPress: async () => {
            try {
              resetAllData();
              clearProfilePictures();
              setImageUri(null);

              setSavedRecipes([]);
              setPantryDetails({ ...defaultPantry, ingredients: [] });
              setGroceryList([]);
              setCheckedGroceryList([]);
              setNameQ("");
              setLastSavedName("");
              setAchievements(buildAvailableAchievements());

              // await Updates.reloadAsync();
            } catch (error) {
              console.error("Failed to reload the application safely:", error);

              Alert.alert(
                "Error",
                "Please manually restart the app to complete the reset.",
              );
            }
          },
        },
      ],
    );
  };

  const buildAvailableAchievements = (): AchievementData[] => {
    const unlockedIds = getUnlockedAchievementIds();
    return ACHIEVEMENTS.map(({ id, title, description, emoji, colorKey }) => ({
      id,
      title,
      description,
      emoji,
      color: theme[colorKey],
      unlocked: unlockedIds.includes(id),
    }));
  };
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
    writeProfileName(nameQ);
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
    setAchievements(buildAvailableAchievements());
  }, [theme]);

  useFocusEffect(
    React.useCallback(() => {
      setAchievements(buildAvailableAchievements());
    }, [theme]),
  );

  useEffect(() => {
    const storedName = readProfileName();
    if (storedName) {
      setNameQ(storedName);
      setLastSavedName(storedName);
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
                onValueChange={() => {
                  toggleColorScheme();

                  requestAnimationFrame(() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  });
                }}
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
                <Pressable
                  style={[styles.pfp, pfpShadow]}
                  onPress={handlePickImage}
                  disabled={!editMode}
                >
                  {imageUri ? (
                    <>
                      <Image
                        source={{ uri: imageUri }}
                        style={[
                          StyleSheet.absoluteFillObject,
                          { borderRadius: 200 },
                        ]}
                        contentFit="cover"
                        transition={200}
                        onError={handleImageError}
                      />
                      {editMode ? (
                        <View
                          style={[
                            StyleSheet.absoluteFillObject,
                            {
                              borderRadius: 200,
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "rgba(0, 0, 0, 0.4)",
                            },
                          ]}
                        >
                          <CustomIcon
                            name="camera-2"
                            filled
                            size={34}
                            color={theme.pureWhite}
                          ></CustomIcon>
                        </View>
                      ) : null}
                    </>
                  ) : (
                    <CustomIcon
                      name={editMode ? "camera-2" : "user-2"}
                      filled
                      size={editMode ? 40 : 47}
                      color={editMode ? theme.pillX : theme.placeholderText}
                    ></CustomIcon>
                  )}
                </Pressable>
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
                        circleButtonShadow,
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
                          cancelButtonShadow,
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
                          circleButtonShadow,
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
                    value={stats.mealsGenerated}
                    text="Meals Generated"
                  ></Counter>
                  <Counter
                    value={savedRecipes.length}
                    text={"Saved\nRecipes"}
                  ></Counter>
                  <Counter
                    value={pantryDetails.ingredients.length}
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
                  style={[styles.savesCard, savesCardShadow]}
                  onPress={() => router.navigate("/saveshome")}
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
                  Danger Zone
                </Text>

                <Pressable
                  style={[
                    styles.savesCard,
                    dangerZoneShadow,

                    { backgroundColor: theme.redAccent },
                  ]}
                  onPress={resetData}
                >
                  <Text
                    style={[
                      styles.textCenterBold,

                      {
                        color: theme.pureWhite,
                        fontSize: 16,
                      },
                    ]}
                  >
                    Reset App & Delete All Data
                  </Text>
                </Pressable>
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
