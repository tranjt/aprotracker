import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';

import SignInForm from './SignInForm';
import useSignIn from '../../hooks/useSignIn';
import { useLocalData } from '../../state/localDataContext';


const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, dirty, isValid }) => <SignInForm onSubmit={handleSubmit} dirty={dirty} isValid={isValid} />}
    </Formik>
  );
};

const SignIn = ({ setNotifiction }) => {
  const [signIn] = useSignIn();
  const navigation = useNavigation();
  const [, dispatch] = useLocalData();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      dispatch({ type: 'LOGGED_IN' });
      navigation.navigate('Home', { screen: 'Profile' });
    } catch (e) {
      setNotifiction(e.message);
    }
  };

  return (
    <SignInContainer onSubmit={onSubmit} />
  );
};

export default SignIn;

