
import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

import FormikTextInput from '../FormikTextInput';
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
          color= {theme.colors.primary}
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
  }
});

export default SignInForm;