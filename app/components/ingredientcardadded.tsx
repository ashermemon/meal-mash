import { styles } from "@/styles/auth.styles";
import { Pressable, View, Text, Image } from "react-native";

import { COLORS } from "@/constants/theme";
import { useContext, useState } from "react";
import emojiImages from "./emoji-images";

type CardProps = {
  cardBColor: string;
  ingredientName: string;
  bHue: number;
};

export default function IngredientCardAdded(props: CardProps) {
  var hsl = require("hsl-to-hex");
  let backgroundColor = hsl(props.bHue, 88, 97);
  let strokeColor = hsl(props.bHue, 45, 79);
  return (
    <View
      style={[
        {
          borderColor: COLORS.greenButtonColorOuline,
          backgroundColor: props.cardBColor,
        },
        styles.addContainerIngredient,
      ]}
    >
      <View style={styles.ingredientPanel}>
        <View style={styles.ingredientFlexEmojiCard}>
          <View
            style={[
              styles.emojiWrapCard,
              { borderColor: strokeColor, backgroundColor: backgroundColor },
            ]}
          >
            <Image
              style={styles.ingredientEmoji}
              source={emojiImages[props.ingredientName]}
            ></Image>
          </View>
        </View>
        <View style={styles.ingredientFlexCard}>
          <Text style={styles.textLeftSemiBold}>{props.ingredientName}</Text>
        </View>
      </View>
    </View>
  );
}
