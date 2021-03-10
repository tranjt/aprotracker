import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Button } from 'react-native';

import ExerciseSelector from './ExerciseSelector';
import SelectedExerciseList from './SelectedExerciseList';
import TextInput from '../TextInput';
import { stringToHmsFormat } from '../../utils/timedate';
import Notification from '../Notification';
import useNotifiction from '../../hooks/useNotification';
import routineService from '../../service/routine';
import { useLocalData } from '../../state/localDataContext';


const CreateRoutine = ({ navigation }) => {
  const [routineName, setRoutineName] = useState('');
  const [exercises, setExercises] = useState([]);
  const [exerciseSelectorVisible, setExerciseSelectorVisible] = useState(false);
  const [notification, setNotifiction] = useNotifiction();
  const [, dispatch] = useLocalData();

  const addExercises = (newExercises) => {
    setExercises([...exercises, ...newExercises]);
  };

  const handleChange = ({ value, exerciseIndex, inputType }) => {
    const updatedExercises = [...exercises];
    console.log(`value ${value} exerciseIndex ${exerciseIndex} inputType ${inputType}`);

    switch (inputType) {
      case 'timedPlaceholder':
        value = value.replace(/:/g, '');
        value = value.replace(/^0+/, ''); // removing leading zeroes
        updatedExercises[exerciseIndex].sets[inputType] = stringToHmsFormat(value);
        break;
      default:
        updatedExercises[exerciseIndex].sets[inputType] = value;
        break;
    }
    setExercises(updatedExercises);
  };

  const doDelete = (exerciseIndex) => {
    const updatedExercises = [...exercises];

    updatedExercises.splice(exerciseIndex, 1);
    console.log(JSON.stringify(updatedExercises));
    setExercises(updatedExercises);
  };

  const testDelete = async () => {
    try {
      await routineService.deleteRoutine('Test');
      dispatch({ type: 'DELETE_ROUTINE', routineName: 'Test' });
      navigation.navigate('Home', { screen: 'Workout' });

    } catch (error) {
      setNotifiction(error);
    }
  };

  const doSave = async ({ routineName, exercises }) => {
    const newRoutine = {
      name: routineName,
      exercises,
      editable: true
    };
    console.log(`newRoutine ${JSON.stringify(newRoutine)}`);

    try {
      await routineService.addRoutine(newRoutine);
      dispatch({ type: 'ADD_ROUTINE', newRoutine });
      navigation.navigate('Home', { screen: 'Workout' });

    } catch (error) {
      setNotifiction(error);
    }
  };

  const handleSave = () => {
    if (routineName.length === 0) {
      setNotifiction('Please enter a name for the routine!');
    }
    if (exercises.length === 0) {
      setNotifiction('Routine must contain at least one exercise!');
    }
    if (routineName.length > 0 && exercises.length > 0) {
      console.log(`routineName ${JSON.stringify(routineName)} exercises ${JSON.stringify(exercises)} `);
      doSave({ routineName, exercises });
    }
  };

  return (
    <View style={styles.container}>
      <Notification notification={notification} />
      <TextInput
        placeholder='enter routine name'
        onChangeText={value => setRoutineName(value)}
        value={routineName}
        selectTextOnFocus
      />
      <ScrollView>
        {
          exercises.length > 0 ?
            <SelectedExerciseList
              exercises={exercises}
              handleChange={handleChange}
              doDelete={doDelete}
            />
            : null
        }
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => setExerciseSelectorVisible(true)}
          title='Add exercise'
          titleStyle={{ color: 'blue' }}
        />
        <Button
          onPress={() => handleSave()}
          title='Save'
          titleStyle={{ color: 'black' }}
        />
        <Button
          onPress={() => testDelete()}
          title='testDelete'
          titleStyle={{ color: 'black' }}
        />
      </View>
      <ExerciseSelector
        modalVisible={exerciseSelectorVisible}
        setModalVisible={setExerciseSelectorVisible}
        addExercises={addExercises}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 5
  }
});

export default CreateRoutine;