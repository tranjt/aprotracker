import React from 'react';
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import theme from '../../theme';

import Button from '../Button';
import RepsInput from './RepsInput';
import RepsInputHeader from './RepsInputHeader';


const RepsExerciseCard = ({ exercise, exerciseIndex, handleChange, handleExerciseSetDone, addSet }) => {

  if (!exercise.sets) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.card}>
      <View style={styles.container}>
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
              exercise={exercise}
            />
          ))
        }
        <Button
          title='ADD SET'
          onPress={() => addSet({ exerciseIndex, exerciseType: exercise.type })}
          style={styles.button}
          titleStyle={styles.titleStyle}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6
  },
  container: {
    padding: 10
  },
  exerciseName: {
    marginLeft: 20,
    fontWeight: theme.fontWeights.bold,
    fontSize: 16,
    color: theme.colors.textSecondary
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#ececec',
  },
  titleStyle: {
    fontWeight: theme.fontWeights.bold,
    fontSize: 12,
    color: '#7e7e7e'
  }
});

export default RepsExerciseCard;