import React from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import theme from '../../theme';


const ExerciseSelectorHeader = ({ setModalVisible, modalVisible }) => {
  return (
    <View style={styles.header}>
      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
      >
        <MaterialIcons name='cancel' size={24} color='black' />
      </Pressable>
      <Text style={styles.title}>Add exercises</Text>
    </View>
  );
};


const styles = StyleSheet.create({

  header: {
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 17,
    paddingLeft: 12,
    paddingBottom: 15,
    marginBottom: 3
  },
  title: {
    fontSize: 16,
    paddingLeft: 29,
    flex: 1,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: theme.colors.primary
  },
});


export default ExerciseSelectorHeader;