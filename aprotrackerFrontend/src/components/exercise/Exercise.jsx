import React from 'react';
import { Text, View, StyleSheet, } from 'react-native';

import theme from '../../theme';


const Exercise = ({ exercise }) => {
  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
      >
        {`${exercise.name} `}
      </Text>
      <Text style={styles.text}>
        {`(${exercise.type})`}
      </Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    elevation: 1,
    borderRadius: 1,
    borderColor: 'black',
  },
  title: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    color: '#0e1111',
  },
  text: {
    color: '#7e7e7e'
  },

});


export default Exercise;