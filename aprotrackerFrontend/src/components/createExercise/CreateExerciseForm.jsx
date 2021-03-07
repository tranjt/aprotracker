import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

import FormikTextInput from '../FormikTextInput';
import FormikPicker from './FormikPicker';

const CreateExerciseForm = ({ onSubmit, dirty, isValid }) => {
  const exerciseTypeOptions = [
    {
      label: 'Select exercise type',
      value: ''
    },
    {
      label: 'repsOnly',
      value: 'repsOnly'
    },
    {
      label: 'timed',
      value: 'timed'
    },
    {
      label: 'weighted',
      value: 'weighted'
    },
  ];

  return (
    <View style={styles.container}>
      <FormikTextInput
        name='exerciseName'
        placeholder='exercise name'
      />
      <FormikPicker
        name='exerciseType'
        options={exerciseTypeOptions}
      />
      <View style={styles.buttonContainer}>
        <Button
          onPress={onSubmit}
          title='Create Exercise'
          disabled={!dirty || !isValid}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  buttonContainer: {
    margin: 10,
  }
});

export default CreateExerciseForm;