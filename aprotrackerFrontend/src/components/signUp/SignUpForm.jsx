import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import FormikTextInput from '../FormikTextInput';


const SignUpForm = ({ onSubmit, dirty, isValid }) => {

  return (
    <View style={styles.container}>
      <FormikTextInput
        name="username"
        placeholder="Username"        
      />
      <FormikTextInput
        secureTextEntry
        name="password"
        placeholder="Password"        
      />
      <FormikTextInput
        secureTextEntry
        name="passwordConfirm"
        placeholder="Re-enter Password"        
      />
      <View style={styles.buttonContainer}>
        <Button
          onPress={onSubmit}
          title="Sign Up"
          disabled={!dirty || !isValid}          
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

export default SignUpForm;