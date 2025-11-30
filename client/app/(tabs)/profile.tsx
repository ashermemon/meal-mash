import {
  View,
  Text,
  Platform,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "@/styles/auth.styles";
import MobileHeader from "../../components/universal/mobileheader";
import { COLORS } from "@/constants/theme";
import Counter from "../../components/counter";
import { Pressable, TextInput } from "react-native-gesture-handler";

import { storage } from "../../utils/storage";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { NEWCOLORS } from "@/constants/newtheme";
import LoginPage from "@/components/login";

export default function Profile() {
  const [editMode, setEditMode] = useState(false);

  const [lastSavedName, setLastSavedName] = useState("");

  const [nameQ, setNameQ] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

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

  return loggedIn ? (
    <LoginPage></LoginPage>
  ) : (
    <>
      <MobileHeader pageTitle="Profile" backEnabled={true}></MobileHeader>
      <View style={styles.profileHeader}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={styles.pfp}></View>
          {editMode ? (
            <TextInput
              style={[styles.nameInput]}
              autoCorrect={false}
              maxLength={15}
              autoCapitalize="none"
              keyboardType="default"
              spellCheck={false}
              value={nameQ}
              onChangeText={setNameQ}
              placeholder="Add Name"
              placeholderTextColor={COLORS.addPlusGrey}
            ></TextInput>
          ) : (
            <Text style={styles.nameInput}>
              {nameQ == "" ? "Add Name" : nameQ}
            </Text>
          )}
          <Pressable
            onPress={() => setLoggedIn(true)}
            style={[
              styles.circleButton,
              {
                width: 100,
                height: 30,
                borderRadius: 10,
                margin: 20,
                justifyContent: "center",
              },
            ]}
          >
            <Text
              style={[styles.basicTextCenter, { color: NEWCOLORS.greyBlock }]}
            >
              Log In
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => [
            setEditMode(!editMode),
            editMode
              ? [storage.set("name", nameQ), setLastSavedName(nameQ)]
              : undefined,
          ]}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            margin: 20,
          }}
        >
          {editMode ? (
            <CustomIcon
              name="check"
              filled={true}
              color={COLORS.fontColor}
              size={20}
            />
          ) : (
            <CustomIcon
              name="pencil"
              filled={true}
              color={COLORS.fontColor}
              size={20}
            />
          )}
        </Pressable>

        {editMode ? (
          <Pressable
            onPress={() => [setEditMode(!editMode), setNameQ(lastSavedName)]}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              margin: 20,
            }}
          >
            <CustomIcon
              name="close"
              filled={true}
              color={COLORS.fontColor}
              size={20}
            />
          </Pressable>
        ) : (
          <></>
        )}
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={[styles.generatorContainer, { paddingTop: 0, width: "100%" }]}
      >
        <View style={[styles.container, { width: "100%", flex: 1 }]}>
          <Text
            style={[
              styles.textCentered,
              {
                fontSize: 20,
                fontFamily: "Nunito-Bold",
                textDecorationColor: COLORS.fontColor,
                textDecorationStyle: "solid",
                textDecorationLine: "underline",
                marginBottom: 20,
                marginTop: 5,
              },
            ]}
          >
            Your Statistics
          </Text>

          <Counter
            variable="mealsnumber"
            text="Lifetime Meals Generated"
          ></Counter>
          <Counter
            variable="savesnumber"
            text="Recipes in RecipeBook"
          ></Counter>
          <Counter
            variable="favsnumber"
            text="Favorited Ingredients & Leftovers"
          ></Counter>
        </View>
      </ScrollView>
    </>
  );
}
