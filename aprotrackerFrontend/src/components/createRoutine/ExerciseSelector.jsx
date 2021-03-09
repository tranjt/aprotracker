import React, { useEffect, useState } from 'react';
import { View, Modal, StyleSheet, FlatList } from 'react-native';

import { useLocalData } from '../../state/localDataContext';
import Exercise from './Exercise';
import ExerciseSelectorHeader from './ExerciseSelectorHeader';
import RoundButton from '../RoundButton';


const ExerciseSelector = ({ modalVisible, setModalVisible, addExercises }) => {
  const [state] = useLocalData();
  const [exercises, setExercises] = useState([]);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setExercises(state.exercises.map(exercise => {
      return {
        ...exercise,
        selected: false
      };
    }));
    setValid(false);
  }, [modalVisible]);

  const selectExercise = (exerciseIndex) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].selected = !exercises[exerciseIndex].selected;
    setExercises(updatedExercises);
    checkSelectedExercises();
  };

  const checkSelectedExercises = () => {
    const selectedCount = exercises.reduce((acc, curr) => {
      return acc + curr.selected ? 1 : 0;
    }, 0);
    if (selectedCount > 0) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const onSelectionDone = () => {
    const selectedExercises = exercises.filter(ex => {
      return ex.selected;
    });
    addExercises(selectedExercises);
    setModalVisible(!modalVisible);
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalView}>
        <ExerciseSelectorHeader setModalVisible={setModalVisible} modalVisible={modalVisible} />
        <FlatList
          data={exercises}
          renderItem={({ item, index }) =>
            <Exercise
              exercise={item}
              exerciseIndex={index}
              selectExercise={selectExercise}
            />}
          ItemSeparatorComponent={ItemSeparator}
          keyExtractor={(item, index) => `$exercises-${index}`}
        />
        {valid ?
          <RoundButton
            style={styles.doneButton}
            size={40}
            name='check'
            color='white'
            onPress={onSelectionDone}
          /> : null
        }
      </View>
    </Modal>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;


const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: '#ebecf0',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  separator: {
    height: 1,
  },
  doneButton: {
    backgroundColor: 'blue'
  }
});

export default ExerciseSelector;