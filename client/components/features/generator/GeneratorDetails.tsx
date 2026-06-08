import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "@/styles/auth.styles";
import { CustomIcon } from "@/icon-loader/icon-loader";
import SliderField from "@/components/common/SliderField";
import MultiSelectPills from "@/components/common/MultiSelectPills";
import CountFieldPill from "@/components/common/CountFieldPill";
import DropDownPill from "@/components/common/DropDownPill";

type Props = {};

const GeneratorDetails = (props: Props) => {
  const modes: string[] = [
    "Pantry Ingredients Only",
    "Pantry + ≤3 Extra Ingredients",
    "Any Ingredients",
  ];
  const [genMode, setGenMode] = useState<number>(0);
  const [diffculties, setDifficulties] = useState<number[]>([]);
  const [times, setTimes] = useState<number[]>([]);
  const [num, setNum] = useState<number>(1);
  const [mealType, setMealType] = useState<string[]>(["Any"]);
  const [cuisine, setCuisine] = useState<string[]>(["Any"]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([
    "None",
  ]);

  const mealTypeOptions: string[] = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snack",
    "Side",
    "Drink",
    "Dessert",
  ];
  const cuisineOptions: string[] = [];
  const dietaryRestrictionOptions: string[] = [];

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

        <View style={{ flexDirection: "column", gap: 36 }}>
          <SliderField
            options={modes}
            selected={genMode}
            setSelected={setGenMode}
          ></SliderField>
          <MultiSelectPills
            title="Difficulty:"
            selected={diffculties}
            setSelected={setDifficulties}
            labels={["Easy", "Intermediate", "Expert"]}
            diff
          ></MultiSelectPills>
          <MultiSelectPills
            title="Recipe Time:"
            selected={times}
            setSelected={setTimes}
            labels={["<15m", "~30m", "1hr+"]}
          ></MultiSelectPills>
          <CountFieldPill
            num={num}
            setNum={setNum}
            title={"Number of Servings:"}
          ></CountFieldPill>
          <DropDownPill
            title={"Meal Type:"}
            options={mealTypeOptions}
            selections={mealType}
            setSelection={setMealType}
          ></DropDownPill>
          <DropDownPill
            title={"Cuisine:"}
            options={cuisineOptions}
            selections={cuisine}
            setSelection={setCuisine}
          ></DropDownPill>
          <DropDownPill
            title={"Dietary Preferences:"}
            options={dietaryRestrictionOptions}
            selections={dietaryRestrictions}
            setSelection={setDietaryRestrictions}
          ></DropDownPill>
        </View>
      </View>
    </ScrollView>
  );
};

export default GeneratorDetails;
