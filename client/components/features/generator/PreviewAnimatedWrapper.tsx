import React, { useState } from "react";
import { View, Dimensions, ViewStyle } from "react-native";
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
  const [cards, setCards] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const translateX = useSharedValue(0);

  const ROTATION = 10;

  const removeTopCardJS = () => setCards((prev) => prev.slice(0, -1));

  const saveRecipe = () => {
    "worklet";
    translateX.value = withTiming(SCREEN_WIDTH + 100, undefined, (finished) => {
      if (finished) {
        translateX.value = 0;
        runOnJS(removeTopCardJS)();
      }
    });
  };

  const skipRecipe = () => {
    "worklet";
    translateX.value = withTiming(
      -SCREEN_WIDTH - 100,
      undefined,
      (finished) => {
        if (finished) {
          translateX.value = 0;
          runOnJS(removeTopCardJS)();
        }
      },
    );
  };

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })

    .onEnd(() => {
      if (translateX.value > 120) {
        saveRecipe();
      } else if (translateX.value < -120) {
        skipRecipe();
      } else {
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

  const reversedCards = [...cards].reverse();

  const cardOffsetStyle = (index: number): ViewStyle => ({
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: cards.length - index,
    alignSelf: "center",
  });

  return (
    <View
      style={{
        width: "100%",

        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {reversedCards.map((recipe, index) => {
        const isTop = index === 0;
        const card = (
          <Animated.View
            key={recipe}
            style={[cardOffsetStyle(index), isTop ? animatedStyle : null]}
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
        );

        return isTop ? (
          <GestureDetector gesture={pan} key={recipe}>
            {card}
          </GestureDetector>
        ) : (
          card
        );
      })}
    </View>
  );
};

export default PreviewAnimatedWrapper;
