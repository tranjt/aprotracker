import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Button from '../Button';
import theme from '../../theme';


const ProfileHeader = ({ doneRoutinesLen, currentUser, logout }) => {
  return (
    <View style={styles.profile}>
      <View>
        <View style={styles.profilePic}>
          <FontAwesome name="user-circle" size={40} color="black" />
          <Text style={styles.profileText}>
            {currentUser ? currentUser.username : null}
          </Text>
        </View>
        <Text style={styles.workoutText}>{`${doneRoutinesLen} workouts`}</Text>
      </View>
      <Button
        style={styles.logoutButton}
        onPress={() => logout()}
        title='Sign out'
        titleStyle={{ color: '#7e7e7e' }}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  profile: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    paddingVertical: 20
  },
  profilePic: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileText: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    paddingLeft: 10
  },
  workoutText: {
    color: theme.colors.smallerText,
    marginBottom: 5,
    fontSize: theme.fontSizes.smallerText
  },
  logoutButton: {
    width: 100,
    borderRadius: 100
  },

});

export default ProfileHeader;