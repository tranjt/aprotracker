import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import ExerciseSelector from './ExerciseSelector';
import Button from '../Button';
import TextInput from '../TextInput';


const CreateRoutine = () => {
  const [routineName, setRoutineName] = useState('');
  const [exercises, setExercises] = useState([]);
  const [exerciseSelectorVisible, setExerciseSelectorVisible] = useState(false);

  const addExercises = (newExercises) => {
    setExercises([...exercises, ...newExercises]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='routine name'
        onChangeText={value => setRoutineName(value)}
        value={routineName}
        selectTextOnFocus
      />
      <ExerciseSelector
        modalVisible={exerciseSelectorVisible}
        setModalVisible={setExerciseSelectorVisible}
        addExercises={addExercises}
      />
      <Button
        onPress={() => setExerciseSelectorVisible(true)}
        title='Add exercise'
        titleStyle={{ color: 'blue' }}
      />
      <Text>
        {JSON.stringify(exercises)}
      </Text>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {    
    flex: 1,
  },
});

export default CreateRoutine;