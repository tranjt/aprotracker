import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import Notification from '../Notification';
import useNotifiction from '../../hooks/useNotification';
import CreateExercise from './CreateExercise';


const CreateExerciseScreen = ({ navigation }) => {
  const [notification, setNotifiction] = useNotifiction();

  return (
    <View style={styles.container}>
      <Notification notification={notification} />
      <CreateExercise
        navigation={navigation}
        setNotifiction={setNotifiction}
      />
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

export default CreateExerciseScreen;