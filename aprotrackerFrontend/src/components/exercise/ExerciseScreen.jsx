import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import ExerciseList from './ExerciseList';

import theme from '../../theme';


const ExerciseScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise Screen</Text>
      <ExerciseList />
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