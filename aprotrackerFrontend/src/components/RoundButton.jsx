import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { StyleSheet, Pressable } from 'react-native';

import theme  from '../theme';


const RoundButton = ({ name, style, onPress, size, color }) => {
  const buttonStyle = [
    styles.container,
    style
  ];

  return (
    <Pressable
      style={buttonStyle}
      onPress={onPress}
    >
      <Entypo name={name} size={size} color={color} />
    </Pressable>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    position: 'absolute',
    bottom: 65,
    right: 20,
    height: 60,
    backgroundColor: theme.colors.primary,
    borderRadius: 100,
    shadowColor: '#000',
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

export default RoundButton;