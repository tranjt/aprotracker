import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";

const Button = ({ title, style, onPress }) => {
  const butonStyle = [
    styles.button,
    style
  ];

  return (
    <Pressable
      style={butonStyle}
      onPress={onPress}
    >
      <Text>{title}</Text>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },

});

export default Button;