import React from 'react';
import { TextInput as NativeTextInput, View, StyleSheet, Text } from 'react-native';
import theme from '../theme';


const NumberInputWLabel = ({ label, value, style, error, ...props }) => {

  const textInputStyle = [
    styles.text,
    style,
  ];

  const containerStyle = [
    styles.container,
    error && styles.borderColorError,
  ];

  return (
    <View style={containerStyle} >
      <Text style={styles.label}>
        {label}
      </Text>
      <NativeTextInput
        value={value}
        style={textInputStyle}
        keyboardType='number-pad'
        {...props}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.textSecondary,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 3,
  },
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  borderColorError: {
    borderColor: theme.colors.error,
  },
  label: {
    position: 'absolute',
    top: -14,
    left: 10,
    backgroundColor: 'white',
    fontSize: 12,
    padding: 4,
    color: '#7e7e7e'
  },
});

export default NumberInputWLabel;