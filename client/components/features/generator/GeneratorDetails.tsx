import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "@/styles/auth.styles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import SliderField from "@/components/common/SliderField";

type Props = {};

const GeneratorDetails = (props: Props) => {
  const modes: string[] = [
    "Pantry Ingredients Only",
    "Pantry + ≤3 Extra Ingredients",
    "Any Ingredients",
  ];
  const [genMode, setGenMode] = useState<number>(0);
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      overScrollMode="never"
      alwaysBounceVertical={false}
      style={styles.generatorContainer}
    >
      <View style={{ paddingHorizontal: 25, paddingVertical: 20, flex: 1 }}>
        <Text
          style={[
            styles.basicTextLeft,
            styles.bold,
            {
              fontSize: 28,
              marginBottom: 15,
            },
          ]}
        >
          Generate recipes
        </Text>

        <SliderField
          options={modes}
          selected={genMode}
          setSelected={setGenMode}
        ></SliderField>
      </View>
    </ScrollView>
  );
};

export default GeneratorDetails;
