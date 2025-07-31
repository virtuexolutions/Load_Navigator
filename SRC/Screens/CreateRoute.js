import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Modal from 'react-native-modal';
import CustomText from '../Components/CustomText';
import navigationService from '../navigationService';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {pick} from '@react-native-documents/picker';
import { convertImageToText , detectFromFile } from '@react-native-ml-kit/text-recognition';

const CreateRoute = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const onSuccess = e => {
    setScannedData(e.data); // Save scanned data
    setModalVisible(true); // Show modal
  };
  const [show, setShow] = useState(false);
  const [fileObject, setFileObject] = useState({});
  const [image, setImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');

  const pickImageAndRecognizeText = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result.assets && result.assets.length > 0) {
      const path = result.assets[0].uri;
      const recognizedText = await MLKitOcr.detectFromFile(path);
      console.log(
        'Text found:',
        recognizedText.map(block => block.text).join('\n'),
      );
    }
  };

  // const openGallery = () => {
  //   let options = {
  //     mediaType: 'photo',
  //     maxWidth: 500,
  //     maxHeight: 500,
  //     quailty: 0.9,
  //     saveToPhotos: true,
  //   };

  //   launchImageLibrary(options, response => {
  //     if (Platform.OS === 'ios') {
  //       setShow(false);
  //     }
  //     if (response.didCancel) {
  //     } else if (response.error) {
  //     } else if (response.customButton) {
  //       Alert.alert(response.customButton);
  //     } else {
  //       setFileObject({
  //         uri: response?.assets[0]?.uri,
  //         type: response?.assets[0]?.type,
  //         name: response?.assets[0]?.fileName,
  //       });

  //     }
  //   });
  //   // }
  // };

  const selectDocument = async () => {
    try {
      const result = await pick({
        allowMultiSelection: false,
        type: ['application/pdf'],
      });
      console.log('Selected document:', result);
    } catch (err) {
      if (err.code === 'DOCUMENT_PICKER_CANCELED') {
        console.log('User canceled the picker');
      } else {
        console.error('Unknown error:', err);
      }
    }
  };

  const handleSelectImage = () => {
    ImagePicker.launchCamera({}, async response => {
      if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setImage(uri);

        const result = await TextRecognition.recognize(uri);
        setRecognizedText(result.join(' ')); // result is an array of strings
      }
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create A Route</Text>
      <View style={styles.scanBoxContainer}>
        <Text style={styles.label}>Scan Permit</Text>

        <View style={styles.scanBox}>
          <QRCodeScanner
            onRead={onSuccess}
            reactivate={true}
            showMarker={true}
            cameraStyle={styles.cameraStyle}
            customMarker={
              <>
                <View style={styles.corner} />
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
              </>
            }
          />
        </View>
        <CustomButton
          text={'Scan QR COde'}
          textColor={Color.white}
          height={windowHeight * 0.06}
          borderColor={Color.secondary}
          borderWidth={1}
          borderRadius={moderateScale(30, 0.6)}
          width={windowWidth * 0.72}
          bgColor={Color.secondary}
          marginTop={moderateScale(20, 0.6)}
          onPress={async () => {
            const result = await launchCamera({mediaType: 'photo'});
            if (result.assets && result.assets.length > 0) {
              const path = result.assets[0].uri;
              const recognizedText = await MLKitOcr.detectFromFile(path);
              console.log(
                'Text found:',
                recognizedText.map(block => block.text).join('\n'),
              );
            }
          }}
        />
      </View>
      <CustomButton
        text={'Upload File'}
        textColor={Color.white}
        height={windowHeight * 0.06}
        borderColor={Color.secondary}
        borderWidth={1}
        borderRadius={moderateScale(30, 0.6)}
        width={windowWidth * 0.72}
        bgColor={Color.secondary}
        marginTop={moderateScale(20, 0.6)}
        onPress={() => {
          // console.log('============== >')
          // openGallery();
          pickImageAndRecognizeText();
        }}
      />
      <CustomButton
        text={'Upload PDF'}
        textColor={Color.white}
        height={windowHeight * 0.06}
        borderColor={Color.secondary}
        borderWidth={1}
        borderRadius={moderateScale(30, 0.6)}
        width={windowWidth * 0.72}
        bgColor={Color.secondary}
        marginTop={moderateScale(20, 0.6)}
        onPress={() => {
          selectDocument();
        }}
      />

      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque
        turpis iaculis
      </Text>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <CustomText style={styles.modalTitle}>Scanned QR Code</CustomText>
            <CustomText style={styles.modalData}>{scannedData}</CustomText>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CreateRoute;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingTop: moderateScale(50, 0.6),
  },
  title: {
    fontSize: moderateScale(22, 0.6),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: moderateScale(20, 0.6),
  },
  scanBoxContainer: {
    backgroundColor: '#6e6e6e',
    borderRadius: moderateScale(10, 0.6),
    padding: moderateScale(10, 0.6),
    alignItems: 'center',
    width: windowWidth * 0.85,
    height: windowHeight * 0.55,
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
    borderWidth: moderateScale(2.5, 0.6),
    borderColor: '#fff',
    width: windowWidth * 0.65,
    height: windowWidth * 0.8,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(10, 0.6),
    backgroundColor: Color.black,
    borderRadius: moderateScale(7, 0.6),
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
    width: windowWidth * 0.66,
    height: windowWidth * 0.5,
    alignSelf: 'center',
    marginTop: moderateScale(10, 0.6),
  },

  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  topRight: {
    top: 0,
    right: 0,
    transform: [{rotate: '90deg'}],
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    transform: [{rotate: '-90deg'}],
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    transform: [{rotate: '180deg'}],
  },
  button: {
    backgroundColor: '#B91C1C',
    paddingVertical: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(40, 0.6),
    borderRadius: moderateScale(30, 0.6),
    marginTop: moderateScale(5, 0.6),
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(14, 0.6),
  },
  description: {
    color: '#b0b0b0',
    textAlign: 'center',
    marginTop: moderateScale(50, 0.6),
    fontSize: moderateScale(12, 0.6),
    width: '80%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalData: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  closeText: {
    color: 'white',
    fontSize: 16,
  },
});
