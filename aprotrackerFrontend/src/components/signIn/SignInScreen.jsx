import React from 'react';
import { View, StyleSheet } from 'react-native';
import SignIn from './SignIn';

const SignInScreen = ({ setAuth }) => {
  return (
    <View style={styles.container}>
      <SignIn setAuth={setAuth} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
  },

});

export default SignInScreen;
