import React from 'react';
import { TextInput as NativeTextInput, View, StyleSheet, Pressable } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import theme from '../../theme';


const Numberinput = ({ value, handleChange, exerciseIndex, inputType, ...props }) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => handleChange({ value: Number(Number(value) - 1), exerciseIndex, inputType })}
      >
        <Entypo name="squared-minus" size={24} color="black" />
      </Pressable>
      <View style={styles.inputContainer} >
        <NativeTextInput
          onChangeText={value => handleChange({ value, exerciseIndex, inputType })}
          value={value.toString()}
          style={styles.textInput}
          keyboardType='number-pad'
          {...props} />
      </View>
      <Pressable
        onPress={() => handleChange({ value: Number(Number(value) + 1), exerciseIndex, inputType })}
      >
        <Entypo name="squared-plus" size={24} color="black" />
      </Pressable>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    margin: 5
  },
  inputContainer: {
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 3,
    margin: 10,
  },
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  textInput: {
    borderRadius: 4,
    textAlign: 'center',
    flexGrow: 1,
    color: theme.colors.textPrimary,
    width: 60
  }
});

export default Numberinput;