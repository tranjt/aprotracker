import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import theme from '../../theme';


const ProfileHeader = ({ doneRoutinesLen, currentUser }) => {
  return (
    <View style={styles.profile}>
      <View style={styles.profilePic}>
        <FontAwesome name="user-circle" size={40} color="black" />
        <Text style={styles.profileText}>
          {currentUser ? currentUser.username : null}
        </Text>
      </View>
      <Text style={styles.workoutText}>{`${doneRoutinesLen} workouts`}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  profile: {
    paddingLeft: 20
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

});

export default ProfileHeader;