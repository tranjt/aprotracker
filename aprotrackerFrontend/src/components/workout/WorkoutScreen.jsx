import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';

import RoutineOptions from './RoutineOptions';
import theme from '../../theme';


const WorkoutScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout</Text>
      <RoutineOptions navigation={navigation} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  title: {
    alignSelf: 'center',
    paddingBottom: 15,
    color: 'white',
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.title
  }
});

export default WorkoutScreen;