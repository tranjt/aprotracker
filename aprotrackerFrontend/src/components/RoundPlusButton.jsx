import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { StyleSheet, Pressable } from 'react-native';


const RoundPlusButton = ({ style, onPress, size, color }) => {
  const buttonStyle = [
    styles.container,
    style
  ];

  return (
    <Pressable
      style={buttonStyle}
      onPress={onPress}
    >
      <Entypo name="plus" size={size} color={color} />
    </Pressable>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 60,
    right: 15,
    height: 70,
    backgroundColor: '#69f0ae',
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
});

export default RoundPlusButton;