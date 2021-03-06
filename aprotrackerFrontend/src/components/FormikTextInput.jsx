import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';
import TextInputWLabel from './TextInputWLabel';
import Text from './Text';
import theme from '../theme';


const FormikTextInput = ({ label, name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInputWLabel
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
        label={label}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};


const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: theme.colors.error,
    paddingLeft: 10,
  },
});

export default FormikTextInput;