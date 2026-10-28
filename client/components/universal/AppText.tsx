import React from "react";
import {
  Text as RNText,
  TextInput as RNTextInput,
  TextInputProps,
  TextProps,
} from "react-native";

export const MAX_FONT_SCALE = 1.3;

export type Text = RNText;
export type TextInput = RNTextInput;

export const Text = ({
  maxFontSizeMultiplier = MAX_FONT_SCALE,
  ...props
}: TextProps & { ref?: React.Ref<RNText> }) => (
  <RNText maxFontSizeMultiplier={maxFontSizeMultiplier} {...props} />
);

export const TextInput = ({
  maxFontSizeMultiplier = MAX_FONT_SCALE,
  ...props
}: TextInputProps & { ref?: React.Ref<RNTextInput> }) => (
  <RNTextInput maxFontSizeMultiplier={maxFontSizeMultiplier} {...props} />
);
