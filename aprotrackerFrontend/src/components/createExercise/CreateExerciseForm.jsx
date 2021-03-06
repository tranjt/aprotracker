import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

import FormikTextInput from '../FormikTextInput';
import FormikPicker from '../FormikPicker';
import FormikTextArea from '../FormikTextArea';
import theme from '../../theme';


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
        label='Exercise name'
      />
      <View style={styles.typePicker}>
        <FormikPicker
          name='exerciseType'
          options={exerciseTypeOptions}
        />
      </View>
      <FormikTextArea
        name='description'
        placeholder='optional description'
        multiline={true}
        numberOfLines={10}
        label='Optional description'
        style={styles.textArea}
      />
      <View style={styles.buttonContainer}>
        <Button
          onPress={onSubmit}
          title='Create Exercise'
          disabled={!dirty || !isValid}
          color={theme.colors.primary}
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
  },
  textArea: {
    height: 200,
    textAlignVertical: 'top',
  },
  typePicker: {
    paddingLeft: 12
  }
});

export default CreateExerciseForm;