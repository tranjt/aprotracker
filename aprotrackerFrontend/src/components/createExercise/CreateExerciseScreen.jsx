import React from 'react';
import { View, Text, Button } from 'react-native';
import exerciseService from '../../service/exercise';
import { useNavigation } from '@react-navigation/native';

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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is the CreateExerciseScreen!</Text>
      <Button
        onPress={onSubmit}
        title="Test create"
      />
      <Button
        onPress={onDelete}
        title="Test Delete create"
      />     
      <CreateExercise/>
    </View>
  );
};



export default CreateExerciseScreen;