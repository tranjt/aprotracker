import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Exercise from './Exercise';

import exerciseService from '../../service/exercise';


const ItemSeparator = () => <View style={styles.separator} />;

const ExerciseList = () => {
  const exercises = exerciseService.getExercises();

  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        renderItem={({ item }) => <Exercise exercise={item} />}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item, index) => `$exercises-${index}`}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ebecf0',
    padding: 5
  },
  text: {
    color: '#7e7e7e'
  },
  separator: {
    height: 2,
  },
});


export default ExerciseList;