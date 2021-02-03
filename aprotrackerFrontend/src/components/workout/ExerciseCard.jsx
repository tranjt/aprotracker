import React from 'react';
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native';

import Button from '../Button';
import RepsInput from './RepsInput';
import RepsInputHeader from './RepsInputHeader';


const ExerciseCard = ({ exercise, exerciseIndex, handleChange, handleExerciseSetDone, addSet }) => {

  if (!exercise.sets) {
    return <ActivityIndicator />;
  }

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
      <Button
        title="Add new set"
        onPress={() => addSet({ exerciseIndex, exerciseType: exercise.type })}
      />
    </View>
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