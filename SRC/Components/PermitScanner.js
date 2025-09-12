import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Dimensions,
  Linking
} from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { moderateScale } from 'react-native-size-matters';
import TextRecognition from '@react-native-ml-kit/text-recognition';
// import RNFS from 'react-native-fs';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import Color from '../Assets/Utilities/Color';
import { windowHeight, windowWidth } from '../Utillity/utils';

const PermitScanner = ({ onPermitScanned }) => {
  const camera = useRef(null);
  const devices = useCameraDevices('');
  const device = devices.back;
  console.log("🚀 ~ PermitScanner ~ device:", device)
  const [isLoading, setIsLoading] = useState(false);

  const requestCameraPermission = async () => {
    const permission = await Camera.requestCameraPermission();
    return permission === 'authorized';
  };

  const takePicture = async () => {
    try {
      setIsLoading(true);
      if (!camera.current) return;

      const photo = await camera.current.takePhoto({
        qualityPrioritization: 'quality',
        flash: 'auto',
      });

      const imagePath = `file://${photo.path}`;
      const result = await TextRecognition.recognize(imagePath);
      
      // Process the OCR result
      if (result.text) {
        const permitData = parsePermitText(result.text);
        if (permitData) {
          onPermitScanned(permitData);
        } else {
          Alert.alert('Error', 'Could not detect valid permit information. Please try again.');
        }
      }
      
      // Clean up the temporary image file
    //   await RNFS.unlink(imagePath);
      
    } catch (error) {
      Alert.alert('Error', 'Failed to process permit. Please try again.');
      console.error('Permit scanning error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const parsePermitText = (text) => {
    try {
      // Extract permit ID using regex
      const permitIdMatch = text.match(/Permit(?:\\s+|\\s*#\\s*)(\\w+)/i);
      const permitId = permitIdMatch ? permitIdMatch[1] : null;

      // Extract route information
      const routeMatch = text.match(/Route(?:\\s*|:\\s*)(.*?)(?=\\n|$)/i);
      const route = routeMatch ? routeMatch[1].trim() : null;

      // Extract origin and destination
      const originMatch = text.match(/From(?:\\s*|:\\s*)(.*?)(?=\\n|To|$)/i);
      const destMatch = text.match(/To(?:\\s*|:\\s*)(.*?)(?=\\n|$)/i);
      
      const origin = originMatch ? originMatch[1].trim() : null;
      const destination = destMatch ? destMatch[1].trim() : null;

      // Extract waypoints if any
      const waypointsMatch = text.match(/Waypoints(?:\\s*|:\\s*)(.*?)(?=\\n|$)/i);
      const waypoints = waypointsMatch 
        ? waypointsMatch[1].split(',').map(wp => wp.trim())
        : [];

      if (!permitId || !origin || !destination) {
        return null;
      }

      return {
        permitId,
        route,
        origin,
        destination,
        waypoints
      };
    } catch (error) {
      console.error('Error parsing permit text:', error);
      return null;
    }
  };

  if (!device) {
    return (
      <View style={styles.container}>
        <CustomText>Camera not available</CustomText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={styles.camera}
        device={device}
        isActive={true}
        photo={true}
      >
        <View style={styles.overlay}>
          <View style={styles.scanFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
          
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="large" color={Color.white} />
            ) : (
              <CustomButton
                text="Scan Permit"
                textColor={Color.white}
                width={windowWidth * 0.4}
                height={windowHeight * 0.06}
                onPress={takePicture}
              />
            )}
          </View>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.red,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.3,
    borderWidth: 2,
    borderColor: Color.white,
    backgroundColor: 'transparent',
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: Color.white,
  },
  topLeft: {
    top: -2,
    left: -2,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  topRight: {
    top: -2,
    right: -2,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
});

export default PermitScanner;
