import { Platform, Pressable, Text, View } from "react-native";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useActionState,
  useCallback,
  useContext,
  useRef,
  useState,
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
import * as Haptics from "expo-haptics";
import { CustomIcon } from "@/icon-loader/icon-loader.jsx";

type HeaderProps = {
  pageTitle: string;
  backEnabled: boolean;
  setGenerated?: Dispatch<SetStateAction<boolean>>;
  setTitle?: Dispatch<SetStateAction<string | undefined>>;
  title?: string | undefined;
};

export default function MobileHeader(props: HeaderProps) {
  const [dropdownActive, setDropdownActive] = useState(false);
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
                  ? [navigation.goBack(), Haptics.selectionAsync()]
                  : null
                : props.setGenerated
                ? [
                    props.setGenerated(false),
                    Haptics.selectionAsync(),
                    props.title && props.setTitle
                      ? props.setTitle(undefined)
                      : null,
                  ]
                : null
            }
          >
            {props.backEnabled ? (
              <CustomIcon
                name="arrow-left"
                filled={false}
                color={
                  navigation.canGoBack() ? COLORS.fontColor : COLORS.addPlusGrey
                }
                size={20}
              />
            ) : (
              <CustomIcon
                name="close"
                filled={false}
                color={
                  navigation.canGoBack() ? COLORS.fontColor : COLORS.addPlusGrey
                }
                size={20}
              ></CustomIcon>
            )}
          </Pressable>
        </View>

        <View style={[{ flex: 3, paddingHorizontal: 15 }, styles.centeredBox]}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={[styles.headerText]}
          >
            {props.pageTitle}
          </Text>
        </View>

        <View style={[{ flex: 1.5, flexDirection: "row" }, styles.centeredBox]}>
          <Pressable
            style={[styles.centeredBox]}
            onPress={() => (
              handlePresentModalPress(), Haptics.selectionAsync()
            )}
          >
            <CustomIcon
              name="menu"
              filled={false}
              color={COLORS.fontColor}
              size={20}
            ></CustomIcon>
          </Pressable>
        </View>
      </View>
    </>
  );
}
