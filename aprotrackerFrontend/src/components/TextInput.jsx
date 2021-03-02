import React from 'react';
import { TextInput as NativeTextInput, View, StyleSheet } from 'react-native';
import theme from '../theme';


const TextInput = ({ style, error, ...props }) => {
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
      <NativeTextInput style={textInputStyle} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {   
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
    margin: 10
  },
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  borderColorError: {
    borderColor: theme.colors.error,
  }
});

export default TextInput;