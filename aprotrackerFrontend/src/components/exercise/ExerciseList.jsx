import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Exercise from './Exercise';

import exerciseService from '../../service/exercise';


const ItemSeparator = () => <View style={styles.separator} />;

const ExerciseList = () => {
  const exercises = exerciseService.getExercises();
  
  return (
    <FlatList
      data={exercises}
      renderItem={({ item }) => <Exercise exercise={item} />}      
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item, index) => `$exercises-${index}`}
    />
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'center'
  },
  text: {
    color: '#7e7e7e'
  },
  separator: {
    height: 10,
  },
});


export default ExerciseList;