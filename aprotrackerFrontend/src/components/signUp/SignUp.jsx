import React from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';

import SignUpForm from './SignUpForm';
import useSignIn from '../../hooks/useSignIn';
import useSignUp from '../../hooks/useSignUp';
import { useAuth } from '../authContext';


const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
  passwordConfirm: yup.string()
    .oneOf([yup.ref('password'), null], "Passwords don't match")
    .required('Password confirm is required'),
});

const SignUp = ({ setNotifiction }) => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigation = useNavigation();
  const [, setAuth] = useAuth();

  const onSubmit = async (values) => {
    const { username, password } = values;
    console.log(values);

    try {
      await signUp({ username, password });
      await signIn({ username, password });
      setAuth(true);
      navigation.navigate('Home', { screen: 'Profile' });
    } catch (e) {
      setNotifiction(e.message);
    }
  };

  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, dirty, isValid }) => <SignUpForm onSubmit={handleSubmit} dirty={dirty} isValid={isValid} />}
      </Formik>
    </View>
  );
};

export default SignUp;