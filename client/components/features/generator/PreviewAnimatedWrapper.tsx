import React from "react";
import { Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
  runOnJS,
} from "react-native-reanimated";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import GenerationCardPreview from "./GenerationCardPreview";

const SCREEN_WIDTH = Dimensions.get("window").width;

type Props = {
  title: string | undefined;
  description: string;
  difficulty: string;
  time: string;
  tags: string[];
};

const PreviewAnimatedWrapper = (props: Props) => {
  const translateX = useSharedValue(0);

  const ROTATION = 10;

  const recipes = [1];

  const saveRecipe = () => {
    translateX.value = withTiming(SCREEN_WIDTH + 100);
    console.log("SAVE");
  };

  const skipRecipe = () => {
    translateX.value = withTiming(-SCREEN_WIDTH - 100);
    console.log("SKIP");
  };

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })

    .onEnd(() => {
      // RIGHT SWIPE
      if (translateX.value > 120) {
        runOnJS(saveRecipe)();
      }

      // LEFT SWIPE
      else if (translateX.value < -120) {
        runOnJS(skipRecipe)();
      }

      // SNAP BACK
      else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      [-ROTATION, 0, ROTATION],
    );

    return {
      transform: [{ translateX: translateX.value }, { rotate: `${rotate}deg` }],
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <>
        {recipes.map((recipe, index) => (
          <Animated.View
            key={index}
            style={[
              {
                width: "100%",
                flex: 1,
              },

              animatedStyle,
            ]}
          >
            <GenerationCardPreview
              title={props.title}
              description={props.description}
              difficulty={props.difficulty}
              time={props.time}
              tags={props.tags}
              saveRecipe={saveRecipe}
              skipRecipe={skipRecipe}
            />
          </Animated.View>
        ))}
      </>
    </GestureDetector>
  );
};

export default PreviewAnimatedWrapper;
