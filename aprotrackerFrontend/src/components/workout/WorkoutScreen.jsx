import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Text from '../Text';

import RoutineOptions from './RoutineOptions';


const WorkoutScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text fontWeight="bold" fontSize="title">Workout Screen</Text>
      <Button
        onPress={() => navigation.navigate('RoutineOverview')}
        title="Open routine overview screen (select a routine)"
      />
      <RoutineOptions navigation={navigation} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "white"
  },
});

export default WorkoutScreen;