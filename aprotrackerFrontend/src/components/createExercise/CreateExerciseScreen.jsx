import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import exerciseService from '../../service/exercise';
import Notification from '../Notification';
import useNotifiction from '../../hooks/useNotification';
import CreateExercise from './CreateExercise';
import { useLocalData } from '../../state/localDataContext';

const CreateExerciseScreen = ({ navigation }) => {
  const [notification, setNotifiction] = useNotifiction();
  const [, dispatch] = useLocalData();

  const onDelete = async () => { 
    try {
      await exerciseService.deleteExercise('Test');
      dispatch({ type: 'DELETE_EXERCISE', exerciseName: 'Test' });
      navigation.navigate('Home', { screen: 'Exercise' });
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Notification notification={notification} />
      <CreateExercise
        navigation={navigation}
        setNotifiction={setNotifiction}
      />
      <Button
        onPress={onDelete}
        title="Test Delete create"
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