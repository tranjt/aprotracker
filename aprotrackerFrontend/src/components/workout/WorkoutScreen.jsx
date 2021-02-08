import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Text from '../Text';

import RoutineOptions from './RoutineOptions';
import theme from '../../theme';


const WorkoutScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text fontWeight="bold" fontSize="title" style={styles.title}>Workout Screen</Text>
      <RoutineOptions navigation={navigation} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    alignSelf: "center",
    paddingBottom: 15,    
    color: theme.colors.primary
  }
});

export default WorkoutScreen;