import React from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import theme from '../../theme';


const WeightedInputForm = ({ exercise, exerciseIndex, handleChange, doDelete }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {exercise.name}
      </Text>
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.label} >
            Sets number
          </Text>
          <TextInput
            style={styles.textInput}
            value={exercise.sets.setCount.toString()}
            onChangeText={value => handleChange({ value, exerciseIndex, inputType: 'setCount' })}
            keyboardType='number-pad'
            exerciseIndex={exerciseIndex}
            selectTextOnFocus
          />
        </View>
        <View>
          <Text style={styles.label}>
            Reps number
          </Text>
          <TextInput
            value={exercise.sets.repsPlaceholder.toString()}
            style={styles.textInput}
            onChangeText={value => handleChange({ value, exerciseIndex, inputType: 'repsPlaceholder' })}
            keyboardType='number-pad'
            exerciseIndex={exerciseIndex}
            selectTextOnFocus
          />
        </View>
        <View>
          <Text style={styles.label}>
            kg
          </Text>
          <TextInput
            value={exercise.sets.kgPlaceholder.toString()}
            style={styles.textInput}
            onChangeText={value => handleChange({ value, exerciseIndex, inputType: 'kgPlaceholder' })}
            keyboardType='number-pad'
            exerciseIndex={exerciseIndex}
            selectTextOnFocus
          />
        </View>
      </View>
      <View>
        <Pressable
          style={styles.deleteButton}
          onPress={() => doDelete(exerciseIndex)}
        >
          <MaterialCommunityIcons name='delete-forever' size={24} color='#464646' />
        </Pressable>
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
    color: theme.colors.primary,
    marginBottom: 20,
    marginTop: 10
  },
  textInput: {
    borderRadius: 4,
    textAlign: 'center',
    flexGrow: 1,
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10
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