import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Button from '../Button';

import SignIn from './SignIn';
import Notification from '../Notification';
import useNotifiction from '../../hooks/useNotification';
import theme from '../../theme';


const SignInScreen = ({ navigation }) => {
  const [notification, setNotifiction] = useNotifiction();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Aprotracker</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Welcome!</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Notification notification={notification} />
        <SignIn setNotifiction={setNotifiction} />
        <Button
          onPress={() => navigation.navigate('SignUp')}
          title='SIGN UP'
          style={styles.signUpButton}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primaryDark,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  bodyContainer: {
    flex: 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: theme.fontWeights.bold,
  },
  headerText: {
    color: '#fff',
    fontSize: theme.fontSizes.title,
    fontWeight: theme.fontWeights.bold,
  },
  signUpButton: {
    margin: 10
  }
});

export default SignInScreen;
