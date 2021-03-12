import React, { useState } from 'react';
import { TextInput as NativeTextInput, View, StyleSheet, Text } from 'react-native';
import theme from '../theme';


const TextInputWLabel = ({ label, value, style, error, ...props }) => {
  const [labelVisible, setLabelVisible] = useState(false);

  const textInputStyle = [
    styles.text,
    style,
  ];

  const containerStyle = [
    styles.container,
    error && styles.borderColorError,
  ];

  const handleFocus = () => {
    setLabelVisible(true);
  };

  const handleFlur = () => {
    if (!value) {
      setLabelVisible(false);
    }
  };

  return (
    <View style={containerStyle} >
      {
        labelVisible && !error ? (<Text style={styles.label}>
          {label}
        </Text>) : null
      }

      <NativeTextInput        
        value={value}
        style={textInputStyle}
        onFocus={handleFocus}
        onBlur={handleFlur}
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

export default TextInputWLabel;