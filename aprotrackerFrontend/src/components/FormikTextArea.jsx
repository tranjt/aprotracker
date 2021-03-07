import React from 'react';
import { useField } from 'formik';

import TextInput from './TextInput';


const FormikTextArea = ({ name, ...props }) => {
  const [field, , helpers] = useField(name);

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        value={field.value}
        {...props}
      />
    </>
  );
};

export default FormikTextArea;