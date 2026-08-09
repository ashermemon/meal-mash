import { View, Text, Pressable, TextInput } from "react-native";
import React, { useContext, useRef, useState } from "react";
import { styles } from "@/styles/auth.styles";
import { NEWCOLORS } from "@/constants/NewTheme";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { PantryDetailsContext } from "@/contexts/PantryDetails";
import EmojiButton from "@/components/universal/EmojiButton";

type Props = {
  pantryName: string;
  pantryPage?: boolean;
};

const PantryPill = (props: Props) => {
  const [pantryDetails, setPantryDetails] = useContext(PantryDetailsContext);
  const [rename, setRename] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleRenamePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (props.pantryPage) {
      if (!rename) {
        setRename(true);

        setTimeout(() => {
          inputRef.current?.focus();
        }, 50);
      } else {
        setRename(false);
      }
    } else {
      router.navigate("/pantry");
    }
  };

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
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            marginRight: 10,
          }}
        >
          <EmojiButton
            emoji={pantryDetails.icon}
            editable={rename}
            fontSize={18}
            iconSize={22}
            onEmojiChange={(newEmoji) =>
              setPantryDetails((prev) => ({ ...prev, icon: newEmoji }))
            }
          />

          {rename ? (
            <TextInput
              ref={inputRef}
              value={pantryDetails.name}
              onChangeText={(text) =>
                setPantryDetails((prev) => ({ ...prev, name: text }))
              }
              onBlur={() => setRename(false)}
              onSubmitEditing={() => setRename(false)}
              returnKeyType="done"
              maxLength={24}
              style={[
                styles.basicTextLeft,
                {
                  flex: 1,
                  fontSize: 18,
                  color: NEWCOLORS.placeholderText,
                  fontFamily: "Nunito-SemiBold",
                  paddingVertical: 0,
                  paddingHorizontal: 0,
                  margin: 0,
                },
              ]}
            />
          ) : (
            <Text
              numberOfLines={1}
              style={[
                styles.basicTextLeft,
                {
                  flex: 1,
                  fontSize: 18,
                  color: NEWCOLORS.placeholderText,
                  fontFamily: "Nunito-SemiBold",
                },
              ]}
            >
              {pantryDetails.name}
            </Text>
          )}
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
          onPress={handleRenamePress}
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
            {props.pantryPage ? (rename ? "Done" : "Rename") : "Edit Pantry"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PantryPill;
