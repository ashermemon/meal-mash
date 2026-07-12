import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { styles } from "@/styles/auth.styles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import { NEWCOLORS } from "@/constants/NewTheme";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { PantryDetailsContext } from "@/contexts/PantryDetails";

type Props = {
  pantryName: string;
  pantryPage?: boolean;
};

const PantryPill = (props: Props) => {
  const [pantryDetails, setPantryDetails] = useContext(PantryDetailsContext);
  return (
    <View style={{ justifyContent: "space-between" }}>
      <View
        style={[
          styles.sliderPill,
          styles.basicBoxShadow,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          {pantryDetails.icon === "" ? (
            <CustomIcon
              size={22}
              name={"emoji"}
              filled={false}
              color={NEWCOLORS.unselectedShape}
            ></CustomIcon>
          ) : (
            <Text style={{ fontSize: 18 }}>{pantryDetails.icon}</Text>
          )}
          <Text
            style={[
              styles.textCentered,
              {
                fontSize: 18,
                color: NEWCOLORS.placeholderText,
                fontFamily: "Nunito-SemiBold",
              },
            ]}
          >
            {props.pantryName}
          </Text>
        </View>
        <Pressable
          style={[
            styles.selectPill,
            {
              flex: 0,
              width: 100,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
          onPress={() => [
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
            router.navigate("/pantry"),
          ]}
        >
          <Text
            style={[
              styles.textCentered,
              {
                fontSize: 13,
                color: NEWCOLORS.placeholderText,
                fontFamily: "Nunito-SemiBold",
              },
            ]}
          >
            {props.pantryPage ? "Rename" : "Edit Pantry"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PantryPill;
