import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { styles } from "@/styles/auth.styles";
import { COLORS } from "@/constants/theme";
import { Image } from "expo-image";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect, useRouter } from "expo-router";
import { NEWCOLORS } from "@/constants/newtheme";
import { CustomIcon } from "@/icon-loader/icon-loader";
import FeaturedRecipes from "./featuredrecipes";
import ExploreSection from "./exploresection";
import Camera from "./camera";
import { useCameraPermissions } from "expo-camera";
import { BackHandler } from "react-native";

export default function Welcome() {
  const router = useRouter();
  const [showCamera, setShowCamera] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (showCamera) {
          setShowCamera(false);
          return true;
        }
        return false;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [showCamera])
  );
  return showCamera ? (
    <View style={{ width: "100%", flex: 1 }}>
      <Camera></Camera>
    </View>
  ) : (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      overScrollMode="never"
      alwaysBounceVertical={false}
      style={{
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}
    >
      <View style={{ width: "100%", marginBottom: 30 }}>
        <Text
          style={[
            styles.basicTextLeft,
            styles.bold,
            {
              fontSize: 28,
              marginBottom: 5,
            },
          ]}
        >
          Welcome to MealMash!
        </Text>
        <View style={[styles.recipeBar, styles.basicBoxShadow]}>
          <Pressable
            style={[
              styles.circleButton,
              {
                height: 38,
                width: 38,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
            onPress={() => [
              permission
                ? !permission.granted
                  ? [requestPermission(), setShowCamera(true)]
                  : setShowCamera(true)
                : [requestPermission(), setShowCamera(true)],
            ]}
          >
            <CustomIcon name="camera" filled={true} color={"white"} />
          </Pressable>
          <TextInput
            keyboardType="default"
            spellCheck={false}
            autoCorrect={false}
            autoCapitalize="sentences"
            placeholder={"What are you craving today?"}
            placeholderTextColor={NEWCOLORS.placeholderText}
            style={[
              styles.basicTextLeft,
              {
                flex: 1,
                fontSize: 18,
                color: NEWCOLORS.basicText,
                marginLeft: 10,
                marginRight: 10,
                height: 46,
              },
            ]}
          ></TextInput>
          <View style={{ marginRight: 5 }}>
            <CustomIcon name="sparkles" filled={true} color={"grey"} />
          </View>
        </View>

        <FeaturedRecipes></FeaturedRecipes>

        <Text
          style={[
            styles.basicTextLeft,
            styles.bold,
            {
              fontSize: 28,
              marginBottom: 10,
            },
          ]}
        >
          Explore
        </Text>

        <ExploreSection></ExploreSection>
        <View style={{ paddingVertical: 25 }}></View>
      </View>
    </ScrollView>
  );
}
//<CustomIcon name="heart" filled={true} color="red" size={24} />
