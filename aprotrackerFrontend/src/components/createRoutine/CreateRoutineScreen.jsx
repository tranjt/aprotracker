import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import Notification from '../Notification';
import useNotifiction from '../../hooks/useNotification';
import CreateRoutine from './CreateRoutine';


const CreateRoutineScreen = ({ navigation }) => {
  const [notification] = useNotifiction();

  return (
    <View style={styles.container}>
      <Notification notification={notification} />
      <CreateRoutine navigation={navigation} />
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