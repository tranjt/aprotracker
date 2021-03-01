import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

const Button = ({ title, style, titleStyle, onPress }) => {
  const buttonStyle = [
    styles.button,
    style
  ];

  const textStyle = [
    styles.text,
    titleStyle
  ];

  return (
    <Pressable
      style={buttonStyle}
      onPress={onPress}
    >
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  text: {

  }
});

export default Button;