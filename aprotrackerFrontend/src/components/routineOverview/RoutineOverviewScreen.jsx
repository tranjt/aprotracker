
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalData } from '../../state/localDataContext';

import Info from './Info';
import Button from '../Button';
import theme from '../../theme';


const RoutineOverviewScreen = ({ navigation, route }) => {
  const { routineName, routineIndex } = route.params;
  const [state] = useLocalData();
  const { exercises } = state.routines[routineIndex];
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [modalSelectedExercise, setModalSelectedExercise] = useState(null);

  const handleModalOpen = (exerciseIndex) => {
    setModalSelectedExercise(exercises[exerciseIndex]);
    setInfoModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{routineName}</Text>
      <View style={styles.execisesContainer} >
        {exercises.map((execise, idx) => {
          return (
            <View
              key={`execise-${idx}`}
              style={styles.execiseContainer}
            >
              <Text style={styles.text}>
                {`${execise.sets.setCount} x ${execise.name} `}
              </Text>
              <TouchableOpacity
                style={styles.infoButtonStyle}
                onPress={() => handleModalOpen(idx)}
              >
                <Text style={styles.infoText}>
                  Info
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <Info
        infoModalVisible={infoModalVisible}
        setInfoModalVisible={setInfoModalVisible}
        exercise={modalSelectedExercise}
      />
      <Button
        onPress={() => navigation.navigate('DoRoutine', {
          routineIndex
        })}
        title='Do routine'
        style={styles.doRoutineButton}
        titleStyle={styles.buttonTextStyle}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  execisesContainer: {
    paddingBottom: 30,
    flex: 1
  },
  execiseContainer: {
    flexDirection: 'row',
    paddingTop: 15,
  },
  infoText: {
    fontWeight: 'bold',
    paddingRight: 10,
    color: theme.colors.smallerText,
  },
  infoButtonStyle: {
    marginLeft: 'auto',
  },
  text: {
    color: '#7e7e7e'
  },
  doRoutineButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 100
  },
  buttonTextStyle: {
    color: '#fff',
    fontWeight: theme.fontWeights.bold
  }
});


export default RoutineOverviewScreen;
