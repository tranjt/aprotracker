import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import NumberInput from './NumberInput';
import theme from '../../theme';


const RepsInputForm = ({ exercise, exerciseIndex, handleChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exercise.name}</Text>

      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.label} >
            Sets number
          </Text>
          <NumberInput
            value={exercise.sets.setCount}
            handleChange={handleChange}
            inputType='setCount'
            exerciseIndex={exerciseIndex}
          />
        </View>
        <View>
          <Text style={styles.label}>
            Reps number
          </Text>
          <NumberInput
            value={exercise.sets.repsPlaceholder}
            handleChange={handleChange}
            inputType='repsPlaceholder'
            exerciseIndex={exerciseIndex}
          />
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    paddingBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colors.primary
  },
  label: {
    textAlign: 'center'
  }
});

export default RepsInputForm;