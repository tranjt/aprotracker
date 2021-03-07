import React from 'react';
import { useField } from 'formik';
import { Picker } from '@react-native-picker/picker';


const FormikPicker = ({ name, options, ...props }) => {
  const [field, , helpers] = useField(name);

  return (
    <>
      <Picker
        selectedValue={field.value}
        onValueChange={value => helpers.setValue(value)}
        {...props}
      >
        {
          options.map((item, index) => {
            return <Picker.Item label={item.label} value={item.value} key={index} />;
          })
        }
      </Picker>
    </>
  );
};

export default FormikPicker;