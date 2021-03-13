import React from 'react';
import { View, StyleSheet } from 'react-native';

import FormikTextInput from '../FormikTextInput';
import Button from '../Button';
import theme from '../../theme';

const SignUpForm = ({ onSubmit, dirty, isValid }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        label='Username'
      />
      <FormikTextInput
        secureTextEntry
        name="password"
        placeholder="Password"
        label='Password'
      />
      <FormikTextInput
        secureTextEntry
        name="passwordConfirm"
        placeholder="Re-enter Password"
        label='Re-password'
      />
      <View style={styles.buttonContainer}>
        <Button
          onPress={onSubmit}
          title="Sign Up"
          disabled={!dirty || !isValid}
          color={theme.colors.primary}
          style={styles.buttonSignUp}
          titleStyle={styles.buttonTextStyle}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  buttonContainer: {
    margin: 10,
  },
  buttonSignUp: {
    backgroundColor: theme.colors.primary,
    borderRadius: 100
  },
  buttonTextStyle: {
    color: '#fff',
    fontWeight: theme.fontWeights.bold
  }
});

export default SignUpForm;