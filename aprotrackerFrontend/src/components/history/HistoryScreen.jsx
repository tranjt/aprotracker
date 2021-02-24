import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import useRoutines from '../../hooks/useRoutines';
import RoutineList from './RoutineList';


function HistoryScreen() {
  const { routines, loading } = useRoutines();

  console.log(JSON.stringify(routines));
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      {loading ? null : <RoutineList routines={routines} />}    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,    
    backgroundColor: "white",
  },
  title: {
     fontSize: 30,
     marginLeft: 10
  }
});


export default HistoryScreen;