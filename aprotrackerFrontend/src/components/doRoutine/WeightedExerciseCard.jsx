import React from 'react';
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native';

import Button from '../Button';
import WeightedInput from './WeightedInput';
import WeigthedInputHeader from './WeigthedInputHeader';


const WeightedExerciseCard = ({ exercise, exerciseIndex, handleChange, handleExerciseSetDone, addSet }) => {

  if (!exercise.sets) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <Text style={styles.exerciseName}>{exercise.name} </Text>
        <WeigthedInputHeader />
        {
          exercise.sets.map((set, setIndex) => (
            <WeightedInput
              key={`set-${setIndex}`}
              set={set}
              setIndex={setIndex}
              exerciseIndex={exerciseIndex}
              handleChange={handleChange}
              handleExerciseSetDone={handleExerciseSetDone}
              exerciseType={exercise.type}
            />
          ))
        }
        <Button
          title="ADD SET"
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
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
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
    fontWeight: 'bold',
    fontSize: 16
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: "#ececec",
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#7e7e7e"
  }
});

export default WeightedExerciseCard;