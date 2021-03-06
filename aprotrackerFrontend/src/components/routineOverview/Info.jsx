import React from 'react';
import { View, Modal, StyleSheet, Text } from 'react-native';

import Button from '../Button';
import theme from '../../theme';


const Info = ({ infoModalVisible, setInfoModalVisible, exercise }) => {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={infoModalVisible}
      onRequestClose={() => {
        setInfoModalVisible(false);
      }}
    >
      <View style={styles.modalView}>
        <Text style={styles.title}>{`${exercise?.name}`}</Text>
        {exercise?.description ? <Text style={styles.description}>{exercise.description}</Text> :
          <Text style={styles.description}>
            No description available!
       </Text>}
      </View>
      <Button
        title='Close'
        titleStyle={styles.closeButton}
        onPress={() => setInfoModalVisible(false)}
      ></Button>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: 'white',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  title: {
    alignSelf: 'center',
    paddingBottom: 15,
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.title
  },
  description: {
    padding: 10,
    color: '#7e7e7e',
  },
  closeButton: {
    color: '#7e7e7e',         
    fontSize: 16
  }
});

export default Info;