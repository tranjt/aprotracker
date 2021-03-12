import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import RepsInputForm from './RepsInputForm';
import TimedInputForm from './TimedInputForm';
import WeightedInputForm from './WeightedInputForm';


const SelectedExerciseList = ({ exercises, handleChange, doDelete }) => {
  const renderExerciseForm = (exercise, exerciseIndex) => {
    switch (exercise.type) {
      case 'timed':
        return (
          <TimedInputForm
            key={`exercise-${exerciseIndex}`}
            exercise={exercise}
            exerciseIndex={exerciseIndex}
            handleChange={handleChange}
            doDelete={doDelete}
          />);
      case 'weighted':
        return (
          <WeightedInputForm
            key={`exercise-${exerciseIndex}`}
            exercise={exercise}
            exerciseIndex={exerciseIndex}
            handleChange={handleChange}
            doDelete={doDelete}
          />);
      default:
        return (
          <RepsInputForm
            key={`exercise-${exerciseIndex}`}
            exercise={exercise}
            exerciseIndex={exerciseIndex}
            handleChange={handleChange}
            doDelete={doDelete}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        You can edit each field to set your target goal for each exercises.
        Default values will be used as placeholder if none are given.
      </Text>
      <View >
        {
          exercises.map((exercise, exerciseIndex) => {
            return renderExerciseForm(exercise, exerciseIndex);
          })
        }
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8eaf6',
    paddingHorizontal: 5,
    flex: 1
  },
  text: {
    backgroundColor: 'white',
    color: '#7e7e7e',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: -5,
    marginBottom: 6,
  }
});

export default SelectedExerciseList;