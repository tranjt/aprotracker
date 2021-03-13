import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import SignUp from './SignUp';
import Notification from '../Notification';
import useNotifiction from '../../hooks/useNotification';
import theme from '../../theme';

const SignUpScreen = () => {
  const [notification, setNotifiction] = useNotifiction();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Sign up</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Notification notification={notification} />
        <SignUp setNotifiction={setNotifiction} />
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
    flex: 2,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  bodyContainer: {
    flex: 9,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  title: {
    color: '#fff',
    fontSize: theme.fontSizes.title,
    fontWeight: theme.fontWeights.bold,
  }
});

export default SignUpScreen;
