import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const ExerciseList = ({ exercises }) => {
  return (
    <View>
      {
        exercises.map((exercise, key) => {
          return (
            <Text
              key={`exercise-${key}`}
              style={styles.text}
            >
              {`${exercise.sets.setCount} x ${exercise.name}  (${exercise.type})`}
            </Text>
          );
        })
      }
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'center'
  },
  text: {
    color: '#7e7e7e'
  }
});

export default ExerciseList;