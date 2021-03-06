import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import RoundPlusButton from '../RoundPlusButton';

import Exercise from './Exercise';
import exerciseService from '../../service/exercise';


const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);

  const getExercises = async () => {
    const localExercises = await exerciseService.getExercises();
    if (localExercises) {
      setExercises(localExercises);
    }
  };

  useEffect(() => {
    getExercises();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        renderItem={({ item }) => <Exercise exercise={item} />}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item, index) => `$exercises-${index}`}
        contentContainerStyle={{ paddingBottom: 45 }}
      />
      <RoundPlusButton size={40} color='black' />
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;


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