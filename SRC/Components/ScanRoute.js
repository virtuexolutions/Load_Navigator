import React, {useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';
import 'react-native-get-random-values';
import Modal from 'react-native-modal';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';
import {CropView} from 'react-native-image-crop-tools';
import {useDispatch} from 'react-redux';
import {RNCamera} from 'react-native-camera';
import CustomButton from './CustomButton';
import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

const ScanRoute = ({
  isModalVisible,
  setIsModalVisible,
  handleOnPress,
  cameraRef,
  imageuri,
}) => {
  const cropViewRef = useRef();
  const [isTip, setIsTip] = useState(false);

  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = Object.values(devices).find(d => d.position === 'back');

  // console.log('All devices:', devices);
  // console.log('Selected device:', device);

  if (!device) {
    return <Text style={{color: 'white'}}>No back camera found</Text>;
  }

  useEffect(() => {
    (async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === 'granted');
    })();
  }, []);

  if (!hasPermission) {
    return <Text style={styles.text}>Requesting camera permission...</Text>;
  }

  if (!device) {
    return <Text style={styles.text}>Loading back camera...</Text>;
  }

  return (
    <Modal
      // avoidKeyboard={true}
      hasBackdrop={true}
      // useNativeDriver
      style={{
        // justifyContent: 'center',
        alignItems: 'center',
      }}
      isVisible={isModalVisible}
      onBackdropPress={() => {
        setIsModalVisible(false);
      }}
      // animationIn={'bounceInLeft'}
    >
      {/* > */}
      {/* <KeyboardAvoidingView keyboardVerticalOffset={100} style={{flex: 1}}> */}
      <View
        style={{
          width: windowWidth,
          height: windowHeight,
          backgroundColor: 'rgba(0,0,0,0.6)',
          justifyContent: 'center',
          // alignItems: 'center',
        }}>
        <View
          style={{
            width: windowWidth * 0.87,
            // height: windowHeight * 0.8,
            backgroundColor: '#6e6e6e',
            alignSelf: 'center',
            borderRadius: moderateScale(20, 0.3),
            borderWidth: 1,
            borderColor: Color.mediumGray,
            alignItems: 'center',
            paddingVertical: moderateScale(20, 0.6),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
            }}>
            <Icon
              onPress={() => {
                setIsTip(!isTip);
              }}
              as={Ionicons}
              name={'information-circle'}
              size={moderateScale(25, 0.6)}
              color={Color.white}
            />
            <CustomText
              style={{
                color: Color.white,
                marginBottom: moderateScale(40, 0.3),
                fontSize: moderateScale(22, 0.6),
              }}
              isBold>
              {'scan permit'}
            </CustomText>
            <Icon
              onPress={() => {
                setIsModalVisible(false);
                // console.log('sdjkfhjkasdhjkfh');
              }}
              style={
                {
                  // position: 'absolute',
                  // right: 165,
                }
              }
              as={Entypo}
              name={'cross'}
              size={moderateScale(25, 0.6)}
              color={Color.white}
            />
          </View>
          {isTip && (
            <CustomText
              style={{
                fontSize: moderateScale(13, 0.6),
                color: Color.black,
                position: 'absolute',
                top: 50,
                backgroundColor: 'red',
                left: 15,
                paddingVertical: moderateScale(5, 0.6),
                borderRadius: 10,
                backgroundColor: '#e7f5ffff',
                paddingHorizontal: moderateScale(3, 0.6),
                zIndex: 1,
              }}>
              This scanner currently works with permits issued in the following
              states: Arkansas, Illinois, Kentucky, Alberta, Indiana, South
              Dakota, Texas, Mississippi, Georgia, Utah, Colorado, Nevada,
              Minnesota, Connecticut, Iowa, Missouri, California, Delaware,
              Wisconsin, Montana, Nebraska, and Idaho.
            </CustomText>
          )}
          {/* <View style={styles.scanBoxContainer}> */}
          <View style={styles.scanBox}>
            <Camera
              ref={cameraRef}
              style={styles.cameraStyle}
              device={device}
              isActive={true}
              photo={true} // ✅ REQUIRED for takePhoto()
            />
            {/* <RNCamera
                ref={cameraRef}
                style={styles.cameraStyle}
                type={RNCamera.Constants.Type.back}
                useCamera2Api={false}
                captureAudio={false}>
                <View style={styles.overlayContainer}>
                  <View style={[styles.corner, styles.topLeft]} />
                  <View style={[styles.corner, styles.topRight]} />
                  <View style={[styles.corner, styles.bottomLeft]} />
                  <View style={[styles.corner, styles.bottomRight]} />
                </View>
              </RNCamera> */}
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
            marginTop={moderateScale(20, 0.6)}
            onPress={() => {
              handleOnPress();
              // setIsModalVisible(true)
              // takePicture();
            }}
          />
          <CustomText
            style={{
              zIndex: 1,
              color: Color.white,
              fontSize: moderateScale(11, 0.6),
              paddingVertical: moderateScale(10, 0.5),
              // marginTop: windowHeight * 0.17,
              // backgroundColor: 'red',
              textAlign: 'center',
              width: windowWidth * 0.8,
              // alignSelf : 'center'
            }}>
            Note: Please make sure to capture the permit only where the Origin
            and Destination fields are clearly visible.
          </CustomText>
          {/* </View> */}
        </View>
      </View>
      {/* </KeyboardAvoidingView> */}
    </Modal>
  );
};

export default ScanRoute;

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: 'green',
    // backgroundColor: '#6e6e6e',
    width: windowWidth * 0.9,

    // height: windowHeight * 0.75,
    alignItems: 'center',
    // alignSelf :'center',
    // justifyContent :'center',
    // marginVertical: moderateScale(65, 0.6),
    borderRadius: moderateScale(20, 0.3),
    padding: moderateScale(20, 0.6),
    // paddingVertical: moderateScale(20, 0.3),
    borderWidth: 1,
    borderColor: Color.mediumGray,
  },
  scanBoxContainer: {
    backgroundColor: 'red',
    // backgroundColor: '#6e6e6e',
    borderRadius: moderateScale(10, 0.6),
    // padding: moderateScale(10, 0.6),
    alignItems: 'center',
    width: windowWidth * 0.74,
    // height: windowHeight * 0.44,
    borderWidth: moderateScale(1, 0.6),
    // borderColor: Color.secondary,
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: moderateScale(10, 0.6),
    fontSize: moderateScale(18, 0.6),
  },
  // scanBox: {
  //   borderColor: '#fff',
  //   width: windowWidth * 0.8,
  //   height: windowWidth * 0.7,
  //   // position: 'relative',
  //   // justifyContent: 'center',
  //   // alignItems: 'center',
  //   // marginBottom: moderateScale(10, 0.6),
  // },
  corner: {
    position: 'absolute',
    width: moderateScale(20, 0.6),
    height: moderateScale(20, 0.6),
    borderColor: '#fff',
    borderLeftWidth: moderateScale(2, 0.6),
    borderTopWidth: moderateScale(2, 0.6),
  },
  cameraStyle: {
    width: windowWidth * 0.75,
    height: windowHeight * 0.45,
    alignSelf: 'center',
    // marginTop: windowHeight * 0.09,
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
