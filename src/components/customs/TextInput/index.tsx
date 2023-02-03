import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import themes from '../../../themes';
export default (
  props: JSX.IntrinsicAttributes &
    JSX.IntrinsicClassAttributes<TextInput> &
    Readonly<TextInputProps>,
) => {
  const {
    color = themes.colors.primaryText,
    fontSize = themes.fontSize.fontSizeDefault,
    fontFamily = 'Roboto-Regular',
  } = StyleSheet.flatten(props.style || {});

  return (
    <TextInput
      {...props}
      placeholderTextColor={themes.colors.placeholderTextInput}
      style={[props.style, {fontFamily: fontFamily, color, fontSize}]}>
      {props.children}
    </TextInput>
  );
};
