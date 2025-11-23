import {
  View,
  Text,
  Platform,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "@/styles/auth.styles";
import MobileHeader from "../../components/mobileheader";
import ProfileFilled from "../../Icons/ProfileFilled";
import { COLORS } from "@/constants/theme";
import Counter from "../../components/counter";
import { Pressable, TextInput } from "react-native-gesture-handler";
import EditIcon from "../../Icons/EditIcon";
import CheckIcon from "../../Icons/CheckIcon";
import DiscardIcon from "../../Icons/DiscardIcon";
import { storage } from "../../utils/storage";
import { CustomIcon } from "@/icon-loader/icon-loader";

export default function Profile() {
  const image = require("@/assets/images/newBackground.png");
  const [editMode, setEditMode] = useState(false);

  const [lastSavedName, setLastSavedName] = useState("");

  const [nameQ, setNameQ] = useState("");

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
      <ImageBackground source={image} style={styles.image} resizeMode="cover">
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
      </ImageBackground>
    </>
  );
}
