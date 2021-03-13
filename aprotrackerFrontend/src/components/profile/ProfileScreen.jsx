import React, { useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useApolloClient } from '@apollo/client';
import { Calendar } from 'react-native-calendars';
import Constants from 'expo-constants';

import { useLocalData } from '../../state/localDataContext';
import { dateFormatV2 } from '../../utils/timedate';
import AuthStorageContext from '../../contexts/AuthStorageContext';
import useRoutines from '../../hooks/useRoutines';
import ProfileHeader from './ProfileHeader';
import theme from '../../theme';


const ProfileScreen = () => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const [, dispatch] = useLocalData();
  const { completedRoutines, currentUser, loading } = useRoutines();

  const logout = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    dispatch({ type: 'LOGGED_OUT' });
  };

  const getTrainedDays = (doneRoutines) => {
    const trainedDays = {};
    doneRoutines.forEach(routine => {
      trainedDays[dateFormatV2(routine.createdAt)] = { selected: true, selectedColor: '#4dd0e1' };
    });

    return trainedDays;
  };

  const renderScreen = () => {
    if (loading) {
      return <ActivityIndicator style={styles.activityIndicator} size='large' color='#7e7e7e' />;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.bodyContainer}>
          <ProfileHeader
            doneRoutinesLen={completedRoutines.length}
            currentUser={currentUser}
            logout={logout}
          />
          <View style={styles.workoutCalendar}>
            <Text style={styles.workoutCalendarText}>
              Workout days
              </Text>
            <Calendar
              markedDates={getTrainedDays(completedRoutines)}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      {renderScreen()}
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.primary,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    alignSelf: 'center',
    paddingBottom: 15,
    color: 'white',
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.title
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  workoutCalendar: {
    marginTop: 40
  },
  workoutCalendarText: {
    paddingLeft: 20,
    marginBottom: 10,
    color: '#7e7e7e'
  }
});


export default ProfileScreen;