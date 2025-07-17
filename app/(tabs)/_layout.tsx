import { Redirect, Stack } from "expo-router";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Svg, { G, Path } from "react-native-svg";
import SavesIcon from "../../Icons/SavesIcon";
import HomeIcon from "../../Icons/HomeIcon";
import ProfileIcon from "../../Icons/ProfileIcon";
import HomeFilled from "../../Icons/HomeFilled";
import SavesFilled from "../../Icons/SavesFilled";
import ProfileFilled from "../../Icons/ProfileFilled";
import GenIcon from "../../Icons/GenIcon";
import { COLORS } from "@/constants/theme";
import { Pressable, View } from "react-native";
import { Platform } from "react-native";
import { ImageBackground } from "react-native";
import { styles } from "@/styles/auth.styles";

export default function TabsLayout() {
  const iconSizeWeb = 40;

  return (
    <>
      <Tabs
        initialRouteName="index"
        backBehavior="history"
        screenOptions={{
          tabBarShowLabel: Platform.OS == "web" ? true : false,
          headerShown: false,

          tabBarPosition: Platform.OS == "web" ? "left" : "bottom",
          tabBarStyle: {
            backgroundColor: COLORS.navBG,

            ...(Platform.OS === "web"
              ? {
                  borderRightColor: COLORS.navBorder,
                  borderRightWidth: 3,
                }
              : {
                  borderTopColor: COLORS.navBorder,
                  borderTopWidth: 3,
                }),
          },

          tabBarItemStyle: {
            paddingVertical: 10,
            paddingHorizontal: Platform.OS == "web" ? 20 : 10,
          },
          tabBarLabelStyle: {
            fontSize: 35,
            fontFamily: "Nunito",
            fontWeight: 700,
            margin: "auto",
            textAlign: "center",
            lineHeight: 60,
            height: 60,
          },
          tabBarIconStyle: {
            ...(Platform.OS === "web"
              ? {
                  marginHorizontal: 20,
                  marginVertical: 10,
                  height: iconSizeWeb,
                }
              : {}),
          },

          tabBarLabelPosition: "beside-icon",
          tabBarActiveTintColor: COLORS.navSecondary,
          tabBarInactiveTintColor: COLORS.navPrimary,
          headerShadowVisible: false,
          tabBarActiveBackgroundColor:
            Platform.OS == "web" ? COLORS.navSelected : undefined,
          tabBarInactiveBackgroundColor:
            Platform.OS == "web" ? COLORS.navUnselected : undefined,
        }}
      >
        <Tabs.Screen
          name="saves"
          options={{
            tabBarLabel: "Saves",

            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <SavesFilled
                  iconsetcolor={color}
                  setheight={Platform.OS === "web" ? iconSizeWeb : undefined}
                ></SavesFilled>
              ) : (
                <SavesIcon
                  iconsetcolor={color}
                  setheight={Platform.OS === "web" ? iconSizeWeb : undefined}
                ></SavesIcon>
              ),
          }}
        />

        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <HomeFilled
                  iconsetcolor={color}
                  setheight={Platform.OS === "web" ? iconSizeWeb : undefined}
                ></HomeFilled>
              ) : (
                <HomeIcon
                  iconsetcolor={color}
                  setheight={Platform.OS === "web" ? iconSizeWeb : undefined}
                ></HomeIcon>
              ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: "Profile",

            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <ProfileFilled
                  iconsetcolor={color}
                  setheight={Platform.OS === "web" ? iconSizeWeb : undefined}
                ></ProfileFilled>
              ) : (
                <ProfileIcon
                  iconsetcolor={color}
                  setheight={Platform.OS === "web" ? iconSizeWeb : undefined}
                ></ProfileIcon>
              ),
          }}
        />
      </Tabs>
    </>
  );
}
