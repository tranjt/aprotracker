import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import RepsInputForm from './RepsInputForm';


const SelectedExerciseList = ({ exercises, handleChange }) => {

  const renderExerciseForm = (exercise, exerciseIndex) => {
    return (
      <RepsInputForm
        key={`exercise-${exerciseIndex}`}
        exercise={exercise}
        exerciseIndex={exerciseIndex}
        handleChange={handleChange}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Please set number of sets and reps as your goal for exercises.
        Default values will be used if none are given.
      </Text>
      {
        exercises.map((exercise, exerciseIndex) => {
          return renderExerciseForm(exercise, exerciseIndex);
        })
      }
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
  },
  text: {
    padding: 10,
    marginBottom: 10
  }
});

export default SelectedExerciseList;