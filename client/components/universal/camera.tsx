import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { styles } from "@/styles/auth.styles";
import { Image } from "expo-image";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { COLORS } from "@/constants/theme";
import { NEWCOLORS } from "@/constants/newtheme";

export default function Camera() {
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
            borderRadius: 10,
            overflow: "hidden",
            marginHorizontal: 20,
          }}
        >
          <Image
            source={{ uri }}
            contentFit="cover"
            style={{ width: "100%", aspectRatio: 1 }}
          />
        </View>

        <Pressable
          onPress={() => setUri(null)}
          style={[
            styles.circleButton,
            styles.basicBoxShadow,
            { marginTop: 20, paddingVertical: 10, width: 200 },
          ]}
        >
          <Text
            style={[styles.basicTextCenter, { color: NEWCOLORS.greyBlock }]}
          >
            Retake photo?
          </Text>
        </Pressable>
        <Pressable
          onPress={() => console.log("Generate Meal")}
          style={[
            styles.circleButton,
            styles.basicBoxShadow,
            {
              marginTop: 10,
              paddingVertical: 10,
              width: 200,
              backgroundColor: "green",
            },
          ]}
        >
          <Text
            style={[styles.basicTextCenter, { color: NEWCOLORS.greyBlock }]}
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
          marginHorizontal: 20,
          marginBottom: 80,
        }}
      >
        <CameraView
          style={{
            flex: 1,
            borderRadius: 10,
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
                    width: pressed ? 90 : 85,
                    height: pressed ? 90 : 85,
                  },
                ]}
              >
                <View
                  style={[
                    {
                      width: pressed ? 85 : 70,
                      height: pressed ? 85 : 70,
                      borderRadius: 100,
                      backgroundColor: NEWCOLORS.greyBlock,
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
              color={NEWCOLORS.greyBlock}
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
