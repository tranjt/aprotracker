import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../Button';

import SignIn from './SignIn';
import Notification from '../Notification';
import useNotifiction from '../../hooks/useNotification';


const SignInScreen = ({ navigation }) => {
  const [notification, setNotifiction] = useNotifiction();

  return (
    <View style={styles.container}>
      <Notification notification={notification} />
      <SignIn setNotifiction={setNotifiction} />      
      <Button
        onPress={() => navigation.navigate('SignUp')}
        title='SIGN UP'
        style={styles.signUpButton}
      />      
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
  },
  signUpButton: {
    margin: 10
  }
});

export default SignInScreen;
