import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import themes from "../../../themes";
export default (
  props: JSX.IntrinsicAttributes &
    JSX.IntrinsicClassAttributes<Text> &
    Readonly<TextProps>
) => {
  const {
    color = themes.colors.primaryText,
    fontSize = themes.fontSize.fontSizeDefault,
    fontFamily = "Roboto-Regular",
  } = StyleSheet.flatten(props.style || {});

  return (
    <Text
      {...props}
      style={[
        props.style,
        {
          fontFamily,
          color,
          fontSize,
        },
      ]}
    >
      {props.children}
    </Text>
  );
};
