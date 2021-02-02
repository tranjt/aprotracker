import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import RepsInput from './RepsInput';


const ExerciseCard = ({ exercise, exerciseIndex, handleChange }) => {

  return (
    <View style={styles.container}>
      <Text>{exercise.name} </Text>
      {
        exercise.sets.map((set, setIndex) => (
          <RepsInput
            key={`set-${setIndex}`}
            set={set}
            setIndex={setIndex}
            exerciseIndex={exerciseIndex}
            handleChange={handleChange}
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
});

export default ExerciseCard;