import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import NumberInputWLabel from '../NumberInputWLabel';
import theme from '../../theme';


const WeightedInputForm = ({ exercise, exerciseIndex, handleChange, doDelete }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {exercise.name}
      </Text>
      <View style={styles.inputContainer}>
        <NumberInputWLabel
          style={styles.textInput}
          value={exercise.sets.setCount.toString()}
          onChangeText={value => handleChange({ value, exerciseIndex, inputType: 'setCount' })}
          exerciseIndex={exerciseIndex}
          label='Sets'
          selectTextOnFocus
        />
        <NumberInputWLabel
          value={exercise.sets.repsPlaceholder.toString()}
          style={styles.textInput}
          onChangeText={value => handleChange({ value, exerciseIndex, inputType: 'repsPlaceholder' })}
          exerciseIndex={exerciseIndex}
          label='Reps'
          selectTextOnFocus
        />
        <NumberInputWLabel
          value={exercise.sets.kgPlaceholder.toString()}
          style={styles.textInput}
          onChangeText={value => handleChange({ value, exerciseIndex, inputType: 'kgPlaceholder' })}
          exerciseIndex={exerciseIndex}
          label='KG'
          selectTextOnFocus
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => doDelete(exerciseIndex)}
        >
          <MaterialCommunityIcons name='delete-forever' size={24} color='#464646' />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    elevation: 1,
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
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center',
    color: theme.colors.textSecondary,
    marginBottom: 20,
    marginTop: 10
  },
  textInput: {
    textAlign: 'center',
    flexGrow: 1,
    width: 70
  },
  label: {
    textAlign: 'center'
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 100,
    paddingLeft: 5
  },
});

export default WeightedInputForm;