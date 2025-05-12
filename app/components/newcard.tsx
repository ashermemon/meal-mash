import { styles } from "@/styles/auth.styles";
import { Pressable, View } from "react-native";
import AddIcon from "../Icons/AddIcon";
import { COLORS } from "@/constants/theme";
import { useContext, useState } from "react";
import SearchContext from "../contexts/SearchContext";
import LeftoversEnabled from "../contexts/LeftoversOn";

type CardProps = {
  bColor: string;
  leftover: boolean;
};

export default function NewCard(props: CardProps) {
  const setSearchActive = useContext(SearchContext);
  const [leftoversEnabled, setLeftoversEnabled] = useContext(LeftoversEnabled);

  return (
    <View style={[{ borderColor: props.bColor }, styles.addContainer]}>
      <Pressable
        style={styles.addButton}
        onPress={() => [
          setSearchActive(true),
          props.leftover
            ? setLeftoversEnabled(true)
            : setLeftoversEnabled(false),
        ]}
      >
        <AddIcon iconsetcolor={COLORS.addPlusGrey} setheight={35}></AddIcon>
      </Pressable>
    </View>
  );
}
