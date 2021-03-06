import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';

import ExerciseList from './ExerciseList';
import exerciseService from '../../service/exercise';
import theme from '../../theme';


const ExerciseScreen = ({ navigation, route }) => {
  const [exercises, setExercises] = useState([]);

  const getExercises = async () => {
    const localExercises = await exerciseService.getExercises();
    if (localExercises) {
      setExercises(localExercises);
    }
  }; 

  useEffect(() => {
    getExercises();
  }, [route.params?.newExercise]);  

  const createExercise = () => {
    navigation.navigate('createExercise');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise Screen</Text>
      <ExerciseList
        createExercise={createExercise}
        route={route}
        exercises={exercises}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    alignSelf: 'center',
    paddingBottom: 15,
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.title
  }
});

export default ExerciseScreen;