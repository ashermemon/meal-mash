import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useStyles } from "@/styles/GlobalStyles";
import AppImage from "@/components/universal/AppImage";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { useTheme } from "@/contexts/ColorSchemeContext";
import { useTintedBoxShadow } from "@/hooks/useBoxShadow";
import { moderateScale, scale } from "@/utils/responsive";

export default function Camera() {
  const styles = useStyles();
  const theme = useTheme();
  const circleButtonShadow = useTintedBoxShadow(theme.primary);
  const generateButtonShadow = useTintedBoxShadow(theme.greenAccent);
  const ref = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>("back");

  const [uri, setUri] = useState<string | null>(null);

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    if (photo?.uri) setUri(photo.uri);
  };
  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const renderPicture = (uri: string) => {
    return (
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            borderRadius: moderateScale(10),
            overflow: "hidden",
            marginHorizontal: moderateScale(20),
          }}
        >
          <AppImage
            source={{ uri }}
            contentFit="cover"
            style={{ width: "100%", aspectRatio: 1 }}
          />
        </View>

        <Pressable
          onPress={() => setUri(null)}
          style={[
            styles.circleButton,
            circleButtonShadow,
            {
              marginTop: moderateScale(20),
              paddingVertical: moderateScale(10),
              width: scale(200),
            },
          ]}
        >
          <Text
            style={[styles.basicTextCenter, { color: theme.pureWhite }]}
          >
            Retake photo?
          </Text>
        </Pressable>
        <Pressable
          onPress={() => console.log("Generate Meal")}
          style={[
            styles.circleButton,
            generateButtonShadow,
            {
              marginTop: moderateScale(10),
              paddingVertical: moderateScale(10),
              width: scale(200),
              backgroundColor: theme.greenAccent,
            },
          ]}
        >
          <Text
            style={[styles.basicTextCenter, { color: theme.pureWhite }]}
          >
            Generate Meal
          </Text>
        </Pressable>
      </View>
    );
  };

  const renderCamera = () => {
    return (
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          marginHorizontal: moderateScale(20),
          marginBottom: moderateScale(80),
        }}
      >
        <CameraView
          style={{
            flex: 1,
            borderRadius: moderateScale(10),
          }}
          ref={ref}
          mode={"picture"}
          facing={facing}
          mute={false}
          responsiveOrientationWhenOrientationLocked
        />

        <View style={styles.shutterContainer}>
          <Pressable onPress={takePicture}>
            {({ pressed }) => (
              <View
                style={[
                  styles.shutterBtn,
                  {
                    opacity: pressed ? 0.851 : 1,
                    width: scale(pressed ? 90 : 85),
                    height: scale(pressed ? 90 : 85),
                  },
                ]}
              >
                <View
                  style={[
                    {
                      width: scale(pressed ? 85 : 70),
                      height: scale(pressed ? 85 : 70),
                      borderRadius: 100,
                      backgroundColor: theme.pureWhite,
                    },
                  ]}
                />
              </View>
            )}
          </Pressable>
        </View>
        <View style={styles.flipContainer}>
          <Pressable onPress={toggleFacing}>
            <CustomIcon
              name="refresh-3"
              filled={false}
              color={theme.pureWhite}
              size={20}
            ></CustomIcon>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {uri ? renderPicture(uri) : renderCamera()}
    </View>
  );
}
