import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import exerciseService from '../../service/exercise';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';

import CreateExercise from './CreateExercise';

const CreateExerciseScreen = () => {
  const navigation = useNavigation();

  const onSubmit = async () => {
    try {
      await exerciseService.addExercise({
        name: 'Test Squat',
        type: 'repsOnly',
        sets: { setCount: 3, repsPlaceholder: 5 }
      });

      navigation.navigate('Home', {
        screen: 'Exercise',
        params: {
          newExercise: {
            name: 'Test Squat',
            type: 'repsOnly',
            sets: { setCount: 3, repsPlaceholder: 5 }
          }
        }
      });

    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async () => {
    try {
      await exerciseService.deleteExercise('Test Squat');

      navigation.navigate('Home', {
        screen: 'Exercise',
        params: { deletedName: 'Test Squat' },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={onSubmit}
        title="Test create"
      />
      <Button
        onPress={onDelete}
        title="Test Delete create"
      />
      <CreateExercise />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
});

export default CreateExerciseScreen;