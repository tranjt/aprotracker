import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';

import Notification from '../Notification';
import useNotifiction from '../../hooks/useNotification';



const CreateRoutineScreen = () => {
  const [notification] = useNotifiction();

  return (
    <View style={styles.container}>
      <Notification notification={notification} />
      <Text>CreateRoutineScreen</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
});

export default CreateRoutineScreen;