import React, {useState, useEffect} from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';
import {getDistance} from 'geolib';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';
import Feather from 'react-native-vector-icons/Feather';
import {Icon} from 'native-base';
import CustomImage from './CustomImage';
import FastImage from 'react-native-fast-image';
const NearDropoffModal = ({setIsModalVisible, isVisible}) => {
  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.imageContainer}>
            <FastImage
              style={{width: '100%', height: '100%', borderRadius: 12}}
              source={require('../Assets/Images/nearDropoff.gif')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <CustomText  style={styles.title}  >
            You are near the destination !
          </CustomText>
          {/* <CustomText style={styles.subtitle}>
            Please get ready to drop off your item.
          </CustomText> */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsModalVisible(false)}>
            <CustomText style={styles.buttonText}>OK</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NearDropoffModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: windowWidth * 0.8,
    padding: moderateScale(20, 0.6),
    backgroundColor: Color.white,
    borderRadius: moderateScale(20, 0.6),
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(18, 0.6),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: moderateScale(14, 0.6),
    marginBottom: moderateScale(20, 0.6),
    textAlign: 'center',
  },
  button: {
    backgroundColor: Color.secondary,
    width: windowWidth * 0.25,
    height: windowHeight * 0.04,
    justifyContent: 'center',
    borderRadius: 25,
  },
  buttonText: {
    textAlign: 'center',
    color: Color.white,
    fontSize : moderateScale(16, 0.6),
    fontWeight: 'bold',
  },
  imageContainer: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.3,
    // marginBottom :moderateScale(15,0.6),
  },
});
