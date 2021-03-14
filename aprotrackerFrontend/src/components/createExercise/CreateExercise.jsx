import React from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';
import * as yup from 'yup';

import CreateExerciseForm from './CreateExerciseForm';
import exerciseService from '../../service/exercise';
import { useLocalData } from '../../state/localDataContext';


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
  const [, dispatch] = useLocalData();

  const getSets = (exerciseType) => {
    switch (exerciseType) {
      case 'repsOnly':
        return { setCount: 1, repsPlaceholder: 5 };
      case 'weighted':
        return { setCount: 1, kgPlaceholder: 5, repsPlaceholder: 5 };
      default: //timed
        return { setCount: 1, timedPlaceholder: '00:30' };
    }
  };

  const onSubmit = async (values) => {
    const { exerciseName, exerciseType, description } = values;

    const newExercise = {
      name: exerciseName,
      type: exerciseType,
      description,
      sets: getSets(exerciseType),
      editable: true
    };

    try {
      await exerciseService.addExercise(newExercise);
      dispatch({ type: 'ADD_EXERCISE', newExercise });
      navigation.navigate('Home', { screen: 'Exercise' });

    } catch (error) {
      setNotifiction(error);
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