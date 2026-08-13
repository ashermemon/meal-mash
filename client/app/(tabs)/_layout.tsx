import { Tabs, useRouter, useSegments } from "expo-router";
import { Platform, View } from "react-native";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { useTheme } from "@/contexts/ColorSchemeContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { useCallback, useRef } from "react";

import { runOnJS } from "react-native-reanimated";

const TAB_ROUTES = [
  { name: "index", path: "/(tabs)" },
  { name: "pantry", path: "/(tabs)/pantry" },
  { name: "generationpage", path: "/(tabs)/generationpage" },
  { name: "grocery", path: "/(tabs)/grocery" },
  { name: "profile", path: "/(tabs)/profile" },
];

export default function TabsLayout() {
  const theme = useTheme();
  const iconSizeMobile = 30;
  const router = useRouter();
  const segments = useSegments();

  const getCurrentTabIndex = (segs: string[]): number => {
    if (!segs || segs.length === 0) return 0;
    if (segs[0] === "(tabs)") {
      const tabName = segs[1];
      if (!tabName || tabName === "index") return 0;
      const index = TAB_ROUTES.findIndex((tab) => tab.name === tabName);
      return index >= 0 ? index : 0;
    }
    return 0;
  };

  const currentTabIdx = getCurrentTabIndex(segments as string[]);

  const navigateToTab = useCallback(
    (targetIndex: number) => {
      if (targetIndex >= 0 && targetIndex < TAB_ROUTES.length) {
        try {
          Haptics.selectionAsync();
        } catch (e) {
          // ignore if unsupported
        }
        router.navigate(TAB_ROUTES[targetIndex].path as any);
      }
    },
    [router],
  );

  const panGesture = Gesture.Pan()
    .activeOffsetX([-30, 30])
    .failOffsetY([-20, 20])
    .onEnd((event) => {
      "worklet";
      const { translationX, velocityX } = event;

      // Swipe left (drag right-to-left) -> go to next tab
      if (
        (translationX < -50 || velocityX < -300) &&
        currentTabIdx < TAB_ROUTES.length - 1
      ) {
        runOnJS(navigateToTab)(currentTabIdx + 1);
      }
      // Swipe right (drag left-to-right) -> go to prev tab
      else if ((translationX > 50 || velocityX > 300) && currentTabIdx > 0) {
        runOnJS(navigateToTab)(currentTabIdx - 1);
      }
    });

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <GestureDetector gesture={panGesture}>
            <View style={{ flex: 1 }}>
              <Tabs
                initialRouteName="index"
                backBehavior="history"
                screenOptions={{
                  tabBarShowLabel: Platform.OS == "web" ? true : false,
                  headerShown: false,
                  tabBarPosition: Platform.OS == "web" ? "left" : "bottom",

                  tabBarStyle: {
                    position: "absolute",

                    height: 65,
                    marginHorizontal: 20,
                    borderRadius: 100,
                    backgroundColor: theme.greyBlock,

                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    paddingBottom: 0,
                    marginBottom: 10,
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
                  tabBarActiveTintColor: theme.pureWhite,
                  tabBarInactiveTintColor: theme.basicText,
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
                            ? theme.primary
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
                  name="pantry"
                  options={{
                    tabBarLabel: "Pantry",
                    tabBarIcon: ({ color, focused }) => (
                      <View
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 100,
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: focused
                            ? theme.primary
                            : "transparent",
                        }}
                      >
                        <CustomIcon
                          name="fridge"
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
                            ? theme.primary
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
                  name="grocery"
                  options={{
                    tabBarLabel: "Grocery",
                    tabBarIcon: ({ color, focused }) => (
                      <View
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 100,
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: focused
                            ? theme.primary
                            : "transparent",
                        }}
                      >
                        <CustomIcon
                          name="shopping-cart-1"
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
                            ? theme.primary
                            : "transparent",
                        }}
                      >
                        <CustomIcon
                          name="user-3"
                          filled={focused}
                          color={color}
                          size={iconSizeMobile}
                        />
                      </View>
                    ),
                  }}
                />
              </Tabs>
            </View>
          </GestureDetector>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}
