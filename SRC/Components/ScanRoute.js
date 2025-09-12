import React, {useEffect, useRef} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import 'react-native-get-random-values';
import Modal from 'react-native-modal';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';

import {useDispatch} from 'react-redux';
import {RNCamera} from 'react-native-camera';
import CustomButton from './CustomButton';

const ScanRoute = ({
  isModalVisible,
  setIsModalVisible,
  handleOnPress,
  cameraRef,
}) => {
  return (
    <Modal
      avoidKeyboard={true}
      hasBackdrop={true}
      // useNativeDriver
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      isVisible={isModalVisible}
      onBackdropPress={() => {
        setIsModalVisible(false);
      }}>
      {/* > */}
      <KeyboardAvoidingView keyboardVerticalOffset={100} style={{flex: 1}}>
        <View style={styles.maincontainer}>
          <CustomText
            style={{
              color: Color.white,
              marginBottom: moderateScale(40, 0.3),
              fontSize: moderateScale(22, 0.6),
            }}
            isBold>
            {'scan permit'}
          </CustomText>
          <View style={styles.scanBoxContainer}>
            {/* <CustomText style={styles.label}>Scan Permit</CustomText> */}
            {/*  */}
            <View style={styles.scanBox}>
              <RNCamera
                ref={cameraRef}
                style={styles.cameraStyle}
                type={RNCamera.Constants.Type.back}
                captureAudio={false}>
                <View style={styles.overlayContainer}>
                  <View style={[styles.corner, styles.topLeft]} />
                  <View style={[styles.corner, styles.topRight]} />
                  <View style={[styles.corner, styles.bottomLeft]} />
                  <View style={[styles.corner, styles.bottomRight]} />
                </View>
              </RNCamera>
            </View>
            <CustomButton
              text={'create your route'}
              textColor={Color.white}
              height={windowHeight * 0.06}
              borderColor={Color.secondary}
              borderWidth={1}
              borderRadius={moderateScale(30, 0.6)}
              width={windowWidth * 0.72}
              bgColor={Color.secondary}
              marginTop={windowHeight*0.15}
              onPress={() => {
                handleOnPress();
                // setIsModalVisible(true)
                // takePicture();
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ScanRoute;

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: '#6e6e6e',
    width: windowWidth * 0.9,
    height: windowHeight * 0.7,
    alignItems: 'center',
    marginVertical: moderateScale(65, 0.6),
    borderRadius: moderateScale(20, 0.3),
    paddingVertical: moderateScale(20, 0.3),
    borderWidth: 1,
    borderColor: Color.mediumGray,
  },
  scanBoxContainer: {
    backgroundColor: '#6e6e6e',
    borderRadius: moderateScale(10, 0.6),
    // padding: moderateScale(10, 0.6),
    alignItems: 'center',
    width: windowWidth * 0.74,
    height: windowHeight * 0.46,
    borderWidth: moderateScale(1, 0.6),
    borderColor: Color.secondary,
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: moderateScale(10, 0.6),
    fontSize: moderateScale(18, 0.6),
  },
  scanBox: {
    borderColor: '#fff',
    width: windowWidth * 0.8,
    height: windowWidth * 0.7,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(10, 0.6),
  },
  corner: {
    position: 'absolute',
    width: moderateScale(20, 0.6),
    height: moderateScale(20, 0.6),
    borderColor: '#fff',
    borderLeftWidth: moderateScale(2, 0.6),
    borderTopWidth: moderateScale(2, 0.6),
  },
  cameraStyle: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.65,
    alignSelf: 'center',
    marginTop: windowHeight * 0.14,
    borderRadius: 30,
  },

  topLeft: {
    top: 0,
    left: 20,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  topRight: {
    top: 0,
    right: 20,
    transform: [{rotate: '90deg'}],
  },
  bottomLeft: {
    bottom: 0,
    left: 20,
    transform: [{rotate: '-90deg'}],
  },
  bottomRight: {
    bottom: 0,
    right: 20,
    transform: [{rotate: '180deg'}],
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});
