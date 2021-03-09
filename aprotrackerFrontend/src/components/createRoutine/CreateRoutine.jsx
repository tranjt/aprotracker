import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import ExerciseSelector from './ExerciseSelector';
import SelectedExerciseList from './SelectedExerciseList';
import Button from '../Button';
import TextInput from '../TextInput';


const CreateRoutine = () => {
  const [routineName, setRoutineName] = useState('');
  const [exercises, setExercises] = useState([]);

  const [exerciseSelectorVisible, setExerciseSelectorVisible] = useState(false);

  const addExercises = (newExercises) => {
    setExercises([...exercises, ...newExercises]);
  };

  const handleChange = ({ value, exerciseIndex, inputType }) => {
    const updatedExercises = [...exercises];
    console.log(`value ${value} exerciseIndex ${exerciseIndex} inputType ${inputType}`);
    if (inputType == 'setCount') {
      updatedExercises[exerciseIndex].sets[inputType] = value;
    }
    if (inputType == 'repsPlaceholder') {
      updatedExercises[exerciseIndex].sets[inputType] = value;
    }
    setExercises(updatedExercises);
  };

  // const renderExerciseForm = (exercise, exerciseIndex) => {
  //   console.log(JSON.stringify(exerciseIndex));
  //   console.log(JSON.stringify(exercise));
  //   return (
  //     <RepsInputForm
  //       key={`exercise-${exerciseIndex}`}
  //       exercise={exercise}
  //       exerciseIndex={exerciseIndex}
  //       handleChange={handleChange}
  //     />
  //   );
  // };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='routine name'
        onChangeText={value => setRoutineName(value)}
        value={routineName}
        selectTextOnFocus
      />
      <ScrollView>
        {
          exercises.length > 0 ?
            <SelectedExerciseList exercises={exercises} handleChange={handleChange} />
            : null
        }
      </ScrollView>
      {/* <Text>
        {JSON.stringify(exercises)}
      </Text> */}
      <Button
        onPress={() => setExerciseSelectorVisible(true)}
        title='Add exercise'
        titleStyle={{ color: 'blue' }}
      />
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
});

export default CreateRoutine;