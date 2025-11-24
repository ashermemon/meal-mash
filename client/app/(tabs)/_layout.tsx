import { Redirect, Stack } from "expo-router";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Svg, { G, Path } from "react-native-svg";
import SavesIcon from "@/Icons/SavesIcon";
import HomeIcon from "@/Icons/HomeIcon";
import ProfileIcon from "@/Icons/ProfileIcon";
import HomeFilled from "@/Icons/HomeFilled";
import SavesFilled from "@/Icons/SavesFilled";
import ProfileFilled from "@/Icons/ProfileFilled";
import GenIcon from "@/Icons/GenIcon";
import { COLORS } from "@/constants/theme";
import { Pressable, View } from "react-native";
import { Platform } from "react-native";
import { ImageBackground } from "react-native";
import { styles } from "@/styles/auth.styles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { Image } from "expo-image";

export default function TabsLayout() {
  const iconSizeWeb = 40;
  const iconSizeMobile = 30;
  const image = require("@/assets/images/newBackground.png");
  return (
    <>
      <ImageBackground source={image} style={styles.image} />
      <Tabs
        initialRouteName="index"
        backBehavior="history"
        screenOptions={{
          tabBarShowLabel: Platform.OS == "web" ? true : false,
          headerShown: false,

          tabBarPosition: Platform.OS == "web" ? "left" : "bottom",
          tabBarStyle: {
            backgroundColor: COLORS.newHeader,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 60,
            borderTopWidth: 3,
            paddingBottom: 5,
            ...(Platform.OS === "web"
              ? {
                  borderRightColor: COLORS.newHeaderB,
                  borderRightWidth: 3,
                }
              : {
                  borderTopColor: COLORS.newHeaderB,
                  borderTopWidth: 3,
                }),
          },

          tabBarItemStyle: {
            paddingVertical: 10,
            paddingHorizontal: Platform.OS == "web" ? 20 : 10,
          },
          sceneStyle: {
            backgroundColor: "transparent",
          },

          //tabBarLabelStyle: {
          // fontSize: 35,
          // fontFamily: "Nunito",
          // fontWeight: 700,
          // margin: "auto",
          //textAlign: "center",
          //lineHeight: 60,
          //height: 60,
          // },
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
          tabBarInactiveTintColor: "#7F7D7D",
          headerShadowVisible: false,
          tabBarActiveBackgroundColor:
            Platform.OS == "web" ? COLORS.navSelected : undefined,
          tabBarInactiveBackgroundColor:
            Platform.OS == "web" ? COLORS.navUnselected : undefined,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, focused }) => (
              <CustomIcon
                name="home-4"
                filled={focused ? true : false}
                color={color}
                size={iconSizeMobile}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="generationpage"
          options={{
            tabBarLabel: "Generator",
            tabBarIcon: ({ color, focused }) => (
              <CustomIcon
                name="sparkles"
                filled={focused ? true : false}
                color={color}
                size={iconSizeMobile}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="saves"
          options={{
            tabBarLabel: "Saves",

            tabBarIcon: ({ color, focused }) => (
              <CustomIcon
                name="bookmark"
                filled={focused ? true : false}
                color={color}
                size={iconSizeMobile}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: "Profile",

            tabBarIcon: ({ color, focused }) => (
              <CustomIcon
                name="user-2"
                filled={focused ? true : false}
                color={color}
                size={iconSizeMobile}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="login"
          options={{
            tabBarLabel: "login",
          }}
        />
      </Tabs>
    </>
  );
}
