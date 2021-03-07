import React from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';
import * as yup from 'yup';

import CreateExerciseForm from './CreateExerciseForm';


const initialValues = {
  exerciseName: '',
  exerciseType: '',
};

const validationSchema = yup.object().shape({
  exerciseName: yup
    .string()
    .required('exerciseName is required'),
  exerciseType: yup
    .string()
    .required(''),
});

const CreateExercise = () => {

  const onSubmit = (values) => {
    const { exerciseName, exerciseType } = values;
    console.log(exerciseName);
    console.log(exerciseType);
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