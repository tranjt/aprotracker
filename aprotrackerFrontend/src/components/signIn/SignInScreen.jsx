import React from 'react';
import { View, StyleSheet } from 'react-native';

import SignIn from './SignIn';
import Notification from '../Notification';
import useNotifiction from '../../hooks/useNotification';

const SignInScreen = () => {
  const [notification, setNotifiction] = useNotifiction();

  return (
    <View style={styles.container}>
      <Notification notification={notification} />
      <SignIn setNotifiction={setNotifiction} />
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
