import React from 'react';
import { useField } from 'formik';
import { Picker } from '@react-native-picker/picker';


const FormikExercisePicker = ({ name, ...props }) => {
  const [field, , helpers] = useField(name);

  return (
    <>
      <Picker
        selectedValue={field.value}
        onValueChange={value => helpers.setValue(value)}
        {...props}
      >
        <Picker.Item label='Select exercise type' key={0} />
        <Picker.Item label='repsOnly' value={'repsOnly'} key={1} />
        <Picker.Item label='timed' value={'timed'} key={2} />
        <Picker.Item label='weighted' value={'weighted'} key={3} />
      </Picker>
    </>
  );
};



export default FormikExercisePicker;