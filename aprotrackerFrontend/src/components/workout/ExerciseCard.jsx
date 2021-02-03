import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

import RepsInput from './RepsInput';
import RepsInputHeader from './RepsInputHeader';


const ExerciseCard = ({ exercise, exerciseIndex, handleChange, handleExerciseSetDone }) => {

  return (
    <View>
      <Text style={styles.exerciseName}>{exercise.name} </Text>
      <RepsInputHeader />
      {
        exercise.sets.map((set, setIndex) => (
          <RepsInput
            key={`set-${setIndex}`}
            set={set}
            setIndex={setIndex}
            exerciseIndex={exerciseIndex}
            handleChange={handleChange}
            handleExerciseSetDone={handleExerciseSetDone}
          />
        ))
      }
    </View>
    // add set
  );

};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  exerciseName: {
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default ExerciseCard;