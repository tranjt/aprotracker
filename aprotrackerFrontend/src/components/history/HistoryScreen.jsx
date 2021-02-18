import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import useRoutines from '../../hooks/useRoutines';


function HistoryScreen() {
  const { routines } = useRoutines();
  
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30 }}>This is the History screen!</Text>
      
      <Text>{JSON.stringify(routines)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});


export default HistoryScreen;