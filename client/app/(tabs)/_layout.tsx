import { Tabs } from "expo-router";
import { Platform, View } from "react-native";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { COLORS } from "@/constants/theme";
import { ImageBackground } from "react-native";
import { styles } from "@/styles/auth.styles";
import { NEWCOLORS } from "@/constants/newtheme";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function TabsLayout() {
  const iconSizeMobile = 30;
  const image = require("@/assets/images/newBackground.png");

  return (
    <>
      <ImageBackground source={image} style={styles.image} />
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Tabs
            initialRouteName="index"
            backBehavior="history"
            screenOptions={{
              tabBarShowLabel: Platform.OS == "web" ? true : false,
              headerShown: false,
              tabBarPosition: Platform.OS == "web" ? "left" : "bottom",

              tabBarStyle: {
                position: "absolute",

                height: 60,
                marginHorizontal: 20,
                borderRadius: 100,
                backgroundColor: NEWCOLORS.greyBlock,

                shadowColor: "#000",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                paddingBottom: 0,
                borderTopWidth: 0,
              },

              tabBarItemStyle: {
                paddingVertical: 10,
                paddingHorizontal: Platform.OS == "web" ? 20 : 10,
              },

              sceneStyle: {
                backgroundColor: "transparent",
              },

              tabBarLabelPosition: "beside-icon",
              tabBarActiveTintColor: NEWCOLORS.greyBlock,
              tabBarInactiveTintColor: NEWCOLORS.darkButton,
              headerShadowVisible: false,
              tabBarActiveBackgroundColor: "transparent",
              tabBarInactiveBackgroundColor: "transparent",
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color, focused }) => (
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 100,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: focused
                        ? NEWCOLORS.darkButton
                        : "transparent",
                    }}
                  >
                    <CustomIcon
                      name="home-4"
                      filled={focused}
                      color={color}
                      size={iconSizeMobile}
                    />
                  </View>
                ),
              }}
            />

            <Tabs.Screen
              name="generationpage"
              options={{
                tabBarLabel: "Generator",
                tabBarIcon: ({ color, focused }) => (
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 100,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: focused
                        ? NEWCOLORS.darkButton
                        : "transparent",
                    }}
                  >
                    <CustomIcon
                      name="sparkles"
                      filled={focused}
                      color={color}
                      size={iconSizeMobile}
                    />
                  </View>
                ),
              }}
            />

            <Tabs.Screen
              name="saves"
              options={{
                tabBarLabel: "Saves",
                tabBarIcon: ({ color, focused }) => (
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 100,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: focused
                        ? NEWCOLORS.darkButton
                        : "transparent",
                    }}
                  >
                    <CustomIcon
                      name="bookmark"
                      filled={focused}
                      color={color}
                      size={iconSizeMobile}
                    />
                  </View>
                ),
              }}
            />

            <Tabs.Screen
              name="profile"
              options={{
                tabBarLabel: "Profile",
                tabBarIcon: ({ color, focused }) => (
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 100,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: focused
                        ? NEWCOLORS.darkButton
                        : "transparent",
                    }}
                  >
                    <CustomIcon
                      name="user-2"
                      filled={focused}
                      color={color}
                      size={iconSizeMobile}
                    />
                  </View>
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
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}
