import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


const Button = ({ title, style, titleStyle, onPress, disabled, ...props }) => {
  const buttonStyle = [
    styles.container,
    style,
    disabled && styles.disabled
  ];

  const textStyle = [
    styles.text,
    titleStyle,
    disabled && styles.textDisabled
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      {...props}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  disabled: {
    backgroundColor: '#DDDDDD',
  },
  text: {
  },
  textDisabled: {
    color: '#A9A9A9'
  }
});

export default Button;