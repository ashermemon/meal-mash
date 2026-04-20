import { View, Text } from "react-native";
import React from "react";
import ProgressBar from "./progressbar";
import { styles } from "@/styles/auth.styles";

type Props = {};

const FollowRecipe = (props: Props) => {
  return (
    <View>
      <View style={styles.recipeMovement}>
        <ProgressBar progress={1}></ProgressBar>
      </View>
    </View>
  );
};

export default FollowRecipe;
