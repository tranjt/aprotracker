import React from 'react';
import { View, Modal, StyleSheet, Text } from 'react-native';

import Button from '../Button';
import theme from '../../theme';


const Info = ({ infoModalVisible, setInfoModalVisible, description }) => {
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
        <Text style={styles.title}>Info</Text>        
          {description ? <Text style={styles.description}>{description}</Text> :
            <Text style={styles.description}>
              No description available!
       </Text>}        
      </View>
      <Button title='close'
        titleStyle={{ color: '#7e7e7e' }}
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
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.title
  },
  description: {
    padding: 10,
    color: '#7e7e7e',
  }
});

export default Info;