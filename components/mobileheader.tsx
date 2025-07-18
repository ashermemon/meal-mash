import { Platform, Pressable, Text, View } from "react-native";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useActionState,
  useContext,
} from "react";
import { styles } from "@/styles/auth.styles";
import GenIcon from "@/Icons/GenIcon";
import BackArrow from "@/Icons/BackArrow";
import { COLORS } from "@/constants/theme";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import DiscardIcon from "@/Icons/DiscardIcon";
import { Image } from "expo-image";
import MealsLeftContext from "@/contexts/MealsLeftContext";

type HeaderProps = {
  pageTitle: string;
  backEnabled: boolean;
  setGenerated?: Dispatch<SetStateAction<boolean>>;
};

export default function MobileHeader(props: HeaderProps) {
  const navigation = useNavigation();
  const [mealsLeft, setMealsLeft] = useContext(MealsLeftContext);
  return (
    <>
      <View
        style={[
          styles.headerContainer,
          {
            flexDirection: "row",
          },
        ]}
      >
        <View style={[{ flex: 1.5 }, styles.centeredBox]}>
          <Pressable
            onPress={() =>
              props.backEnabled
                ? navigation.canGoBack()
                  ? navigation.goBack()
                  : null
                : props.setGenerated
                ? props.setGenerated(false)
                : null
            }
          >
            {props.backEnabled ? (
              <BackArrow
                iconsetcolor={
                  navigation.canGoBack() ? COLORS.fontColor : COLORS.addPlusGrey
                }
                setheight={14}
                setwidth={30}
              ></BackArrow>
            ) : (
              <DiscardIcon
                iconsetcolor={COLORS.fontColor}
                setheight={14}
                setwidth={14}
              ></DiscardIcon>
            )}
          </Pressable>
        </View>

        <View style={[{ flex: 3 }, styles.centeredBox]}>
          <Text style={styles.headerText}>{props.pageTitle}</Text>
        </View>

        <View style={[{ flex: 1.5, flexDirection: "row" }, styles.centeredBox]}>
          <View style={[styles.centeredBox]}>
            <Text style={[styles.textCentered, { fontSize: 20 }]}>
              {mealsLeft}
            </Text>
          </View>
          <View style={[styles.centeredBox]}>
            <Image
              source={require("@/assets/images/Meal.png")}
              style={{ width: 30, height: 30, marginHorizontal: 8 }}
            ></Image>
          </View>
        </View>
      </View>
    </>
  );
}
