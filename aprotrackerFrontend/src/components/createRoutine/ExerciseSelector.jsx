import React, { useEffect, useState } from 'react';
import { View, Modal, StyleSheet, FlatList } from 'react-native';

import { useLocalData } from '../../state/localDataContext';
import Exercise from './Exercise';
import ExerciseSelectorHeader from './ExerciseSelectorHeader';
import RoundButton from '../RoundButton';


const ExerciseSelector = ({ modalVisible, setModalVisible, addExercises }) => {
  const [state] = useLocalData();
  const [modalExercises, setModalExercises] = useState([]);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setModalExercises(state.exercises.map(exercise => {
      return {
        ...exercise,
        selected: false
      };
    }));

    setValid(false);
  }, [modalVisible]);

  const selectExercise = (exerciseIndex) => {
    const updatedExercises = [...modalExercises];
    updatedExercises[exerciseIndex].selected = !modalExercises[exerciseIndex].selected;

    setModalExercises(updatedExercises);
    checkSelectedExercises();
  };

  const checkSelectedExercises = () => {
    const selectedCount = modalExercises.reduce((acc, curr) => {
      return acc + curr.selected ? 1 : 0;
    }, 0);

    if (selectedCount > 0) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const onSelectionDone = () => {
    const selectedExercises = modalExercises.filter(exercise => {
      return exercise.selected;
    }).map((exercise) => {
      return {
        name: exercise.name,
        type: exercise.type,
        sets: exercise.sets
      };
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
          data={modalExercises}
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