import React from 'react';
import { useField } from 'formik';

import TextInputWLabel from './TextInputWLabel';


const FormikTextArea = ({ label, name, ...props }) => {
  const [field, , helpers] = useField(name);

  return (
    <>
      <TextInputWLabel
        onChangeText={value => helpers.setValue(value)}
        value={field.value}
        label={label}
        {...props}
      />
    </>
  );
};

export default FormikTextArea;