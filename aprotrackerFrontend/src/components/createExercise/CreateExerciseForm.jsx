import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

import FormikTextInput from '../FormikTextInput';
import FormikExercisePicker from './FormikExercisePicker';

const CreateExerciseForm = ({ onSubmit, dirty, isValid }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name='exerciseName'
        placeholder='exercise name'
      />
      <FormikExercisePicker
        name='exerciseType'
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