import { styles } from "@/styles/auth.styles";
import { Pressable, View } from "react-native";
import AddIcon from "../Icons/AddIcon";
import { COLORS } from "@/constants/theme";
import { useContext, useState } from "react";
import SearchContext from "../contexts/SearchContext";

type CardProps = {
  bColor: string;
};

export default function NewCard(props: CardProps) {
  const setSearchActive = useContext(SearchContext);
  return (
    <View style={[{ borderColor: props.bColor }, styles.addContainer]}>
      <Pressable style={styles.addButton} onPress={() => setSearchActive(true)}>
        <AddIcon iconsetcolor={COLORS.addPlusGrey} setheight={35}></AddIcon>
      </Pressable>
    </View>
  );
}
