import React from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';
import * as yup from 'yup';

import CreateExerciseForm from './CreateExerciseForm';
import exerciseService from '../../service/exercise';


const initialValues = {
  exerciseName: '',
  exerciseType: '',
  description: ''
};

const validationSchema = yup.object().shape({
  exerciseName: yup
    .string()
    .required('Exercise name is required'),
  exerciseType: yup
    .string()
    .required(),
});

const CreateExercise = ({ navigation, setNotifiction }) => {

  const onSubmit = async (values) => {
    const { exerciseName, exerciseType, description } = values;
    const newExercise = {
      name: exerciseName,
      type: exerciseType,
      description,
      editable: true
    };
    console.log(JSON.stringify(newExercise));

    try {
      await exerciseService.addExercise(newExercise);

      navigation.navigate('Home', {
        screen: 'Exercise',
        params: {
          newExercise
        }
      });
    } catch (e) {
      setNotifiction(e);      
    }
  };

  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, dirty, isValid }) =>
          <CreateExerciseForm onSubmit={handleSubmit} dirty={dirty} isValid={isValid} />}
      </Formik>
    </View>
  );
};

export default CreateExercise;