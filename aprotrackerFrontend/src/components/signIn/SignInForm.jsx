
import React from 'react';
import { View, StyleSheet } from 'react-native';

import FormikTextInput from '../FormikTextInput';
import Button from '../Button';
import theme from '../../theme';


const SignInForm = ({ onSubmit, dirty, isValid }) => {
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
      <View style={styles.buttonContainer}>
        <Button
          onPress={onSubmit}
          title="Sign In"
          disabled={!dirty || !isValid}
          style={styles.buttonSignIn}
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
  buttonSignIn: {
    backgroundColor: theme.colors.primary,
    borderRadius: 100
  },
  buttonTextStyle: {
    color: '#fff',
    fontWeight: theme.fontWeights.bold
  }
});

export default SignInForm;