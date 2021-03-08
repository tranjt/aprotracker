import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import useRoutines from '../../hooks/useRoutines';
import RoutineList from './RoutineList';
import theme from '../../theme';


function HistoryScreen() {
  const { completedRoutines, loading } = useRoutines();

  const renderScreen = () => {
    if (loading) {
      return <ActivityIndicator style={styles.activityIndicator} size='large' color='#7e7e7e' />;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>History</Text>
        <RoutineList routines={completedRoutines} />
      </View>
    );
  };

  return (
    <>
      {renderScreen()}
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.title,
    color: theme.colors.primary,
    alignSelf: 'center',
    marginLeft: 10
  }
});


export default HistoryScreen;