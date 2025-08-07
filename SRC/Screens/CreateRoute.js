import {pick} from '@react-native-documents/picker';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MLKitOcr from 'react-native-mlkit-ocr';
import Modal from 'react-native-modal';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import {wait, windowHeight, windowWidth} from '../Utillity/utils';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import axios from 'axios';
import {RNCamera} from 'react-native-camera';
import navigationService from '../navigationService';

const CreateRoute = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const cameraRef = useRef(null);
  const onSuccess = e => {
    setScannedData(e.data);
    setModalVisible(true);
  };

  const [show, setShow] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const [fileObject, setFileObject] = useState({});
  const [image, setImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState([]);
  const [location, setlocation] = useState('');
  const [origin, setOrigin] = useState('');
  console.log('🚀 ~ CreateRoute ~ origin:', origin, destination);
  const [destination, setDestination] = useState('');
  const [route, setRoute] = useState([]);
  const [waypoint, setWaypoint] = useState([]);
  console.log('🚀 ~ CreateRoute ~ waypoint:', waypoint);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      console.log('📸 Photo captured:', data?.uri);
      setModalVisible(true);
      setisLoading(true);
      if (data?.uri) {
        const path = data?.uri;
        const resultText = await MLKitOcr.detectFromFile(path);
      //  return console.log("🚀 ~ takePicture ~ resultText:", resultText)
        setRecognizedText(resultText);

        // extractPermitDetails(resultText);
        // setRecognizedText(resultText?.map((item ,index )=> item?.text) .join(' '))
      }
      // OCR logic ya jo bhi karna hai
    }
  };

  const detectTextWithRetry = async (uri, maxRetries = 5) => {
    let retries = 0;
    while (retries < maxRetries) {
      try {
        const result = await MLKitOcr.detectFromUri(uri);
        return result;
      } catch (error) {
        if (
          error?.message?.includes(
            'Waiting for the text optional module to be downloaded',
          )
        ) {
          console.warn(
            `Model not ready yet. Retrying in 2s... (${
              retries + 1
            }/${maxRetries})`,
          );
          await wait(2000); // wait 2 seconds
          retries++;
        } else {
          throw error;
        }
      }
    }
    throw new Error(
      'Text recognition model did not load in time. Try again later.',
    );
  };

  const pickAndRecognizeText = async () => {
    console.log('first ================== > from image picker function');
    const result = await launchImageLibrary({mediaType: 'photo'});

    if (result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      console.log('Picked image URI:', uri);

      try {
        console.log('first ================ >>>>>>> from utl');
        if (uri) {
          const resultText = await MLKitOcr.detectFromFile(uri);

          setisLoading(true);
          setModalVisible(true);
        }

        // const allBlockText = blocks.map(block => block.text).join('\n');
        // console.log('Block-wise text:', allBlockText);
        // console.log('Full text:', text);
      } catch (err) {
        console.log('Text recognition error:', err);
      }
    }
  };
  //
  //   useEffect(() => {
  //     handleNavigate();
  //   }, [recognizedText]);

  //   const GOOGLE_API_KEY = 'AIzaSyDacSuTjcDtJs36p3HTDwpDMLkvnDss4H8';

  //   // --- Helper: Extract route text
  //   const extractRouteParts = text => {
  //     let origin = '';
  //     let destination = '';
  //     const waypoints = [];

  //     for (let wordObj of text) {
  //       const isLocation = wordObj.text;

  //       const parts = isLocation.split(/end on/i); // case insensitive
  //       const rawText = parts[0];
  //       const lowerText = rawText.replace(/\n/g, ' ').toLowerCase();
  //       // console.log(
  //       //   '🚀 ~ extractRouteParts ~ lowerText:========== >>>',
  //       //   lowerText,
  //       // );
  //       // const fullLower = lowerText.replace(/\n/g, ' ').toLowerCase();

  //       const startMatch =
  //         lowerText.match(/start on\s+(.*?)(,|\n|\.|$)/i) ||
  //         lowerText.match(/origin\s*[:-]?\s*(.*?)(?=[.,\n]|$)/i);
  //       if (startMatch) origin = startMatch[1].trim();
  //       setOrigin(startMatch);

  //       const endMatch =
  //         lowerText.match(/end on\s+(.*?)(,|\n|\.|$)/i) ||
  //         lowerText.match(/destination\s*[:-]?\s*(.*?)(?=[.,\n]|$)/i);
  //       console.log("🚀 ~ extractRouteParts ~ endMatch:", endMatch)
  //       if (endMatch) destination = endMatch[1].trim();
  //       setDestination(endMatch);

  //       const allRoutes = recognizedText?.map(obj => obj.text).join('\n');
  //       extractRoutes(allRoutes);
  //       // console.log('🚀 ~ extractRouteParts ~ allRoutes:', allRoutes);
  //       if (allRoutes) {
  //         // allRoutes.forEach(route => {
  //         //   if (route !== origin && route !== destination) waypoints.push(route);
  //         getCleanRoutes(allRoutes);
  //         // setWaypoint(route);
  //         //   }
  //         // );
  //       }
  //     }

  //     return {origin, destination, allRoutes};
  //   };

  //   const extractRoutes = (fullText) => {

  //   // Clean and normalize the text
  //   const cleanText = fullText.replace(/\s+/g, ' ').toUpperCase();

  //   // Match patterns like I-86, US-20, NY-352, PA-17, etc.
  //   const pattern = /\b(?:I|US|NY|PA)-\d{1,4}[A-Z]*\b/g;
  //   const matches = cleanText.match(pattern);

  //   if (!matches || matches.length === 0) {
  //     console.warn('❌ No route matches found');
  //     return [];
  //   }

  //   // Remove duplicates while preserving order
  //   const uniqueRoutes = [...new Set(matches)];
  //   setWaypoint(uniqueRoutes)
  //   console.log('✅ ALL Routes in ONE array:', uniqueRoutes);

  //   return uniqueRoutes;
  // };

  //   // --- Helper: Get lat/lng from location name
  //   const getLatLng = async location => {
  //     const response = await fetch(
  //       `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  //         location,
  //       )}&key=${GOOGLE_API_KEY}`,
  //     );
  //     const data = await response.json();
  //     return data.results[0]?.geometry?.location || null;
  //   };

  //   // --- Helper: Build Google Maps URL
  //   const buildGoogleMapsURL = (origin, destination, waypoints) => {
  //     console.log(
  //       '🚀 ~ buildGoogleMapsURL ~ origin, destination, waypoints:',
  //       origin,
  //       destination,
  //       waypoints,
  //     );
  //     const waypointsStr = waypoints.map(w => `${w.lat},${w.lng}`).join('|');
  //     console.log("🚀 ~ buildGoogleMapsURL ~ waypointsStr:", waypointsStr)
  //     return `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&waypoints=${waypointsStr}&travelmode=driving`;
  //   };

  //   const [status, setStatus] = useState('Idle');

  //   const handleNavigate = async () => {
  //     console.log('first======================== >');
  //     // setStatus('Parsing text...');

  //     // 👇 Dummy text - replace with OCR output
  //     const permitText = recognizedText;
  //     // console.log("🚀 ~ handleNavigate ~ permitText:", permitText)

  //     const {origin, destination, waypoints} = extractRouteParts(permitText);
  //     console.log("🚀 ~ handleNavigate ~ waypoints:", waypoints)
  //     if (!origin || !destination) {
  //       setStatus('Failed to extract route.');

  //       return;
  //     }

  //     setStatus('Fetching coordinates...');
  //     const [originCoords, destinationCoords, ...waypointsCoords] =
  //       await Promise.all([
  //         getLatLng(origin),
  //         getLatLng(destination),
  //         ...waypoints.map(w => getLatLng(w)),
  //       ]);

  //     if (!originCoords || !destinationCoords) {
  //       setStatus('Invalid location data.');
  //       return;
  //     }

  //     const validWaypoints = waypointsCoords.filter(Boolean);
  //     console.log('🚀 ~ handleNavigate ~ validWaypoints:', validWaypoints);
  //     const mapURL = buildGoogleMapsURL(
  //       originCoords,
  //       destinationCoords,
  //       waypoint,
  //     );

  //     setStatus('Opening Google Maps...');
  //     Linking.openURL(mapURL);
  //   };

  useEffect(() => {
    // extractPermitDetails(recognizedText);
    findLocations();
    if ((origin && destination, route)) {
      isLocationValid(destination, origin, route);
    }
  }, [recognizedText]);

  const extractPermitDetails = text => {
    // const fullText = text?.map(item => item.text).join('\n');

    // let origin = '';
    // let destination = '';

    // const fullLower = fullText.replace(/\n/g, ' ').toLowerCase();
    // console.log('🚀 ~ extractPermitDetails ~ fullLower:', fullLower);

    for (let wordObj of text) {
      const isLocation = wordObj.text;

      const parts = isLocation.split(/end on/i); // case insensitive
      const rawText = parts[0];
      const lowerText = rawText.replace(/\n/g, ' ').toLowerCase();
      const originMatch =
        lowerText.match(/start on\s+(.*?)(?=[.,\n]|$)/i) ||
        lowerText.match(/origin\s*[:-]?\s*(.*?)(?=[.,\n]|$)/i);

      // if (originMatch && originMatch[1]) {
      //   origin = originMatch[1].trim();
      //   setOrigin(origin);
      // }

      // Destination: match "end on" or "destination:"
      const z =
        lowerText.match(/end on\s+(.*?)(?=[.,\n]|$)/i) ||
        lowerText.match(/destination\s*[:-]?\s*(.*?)(?=[.,\n]|$)/i);

      // if (destinationMatch && destinationMatch[1]) {
      //   destination = destinationMatch[1].trim();
      //   setDestination(destination);
      // }

      console.log('✅ Extracted Origin:', origin);
      console.log('✅ Extracted Destination:', destination);
      const routeRegex = /(-?\d+|I-\d+|US-\d+|SR-\d+)/g;
      const cleanedText = lowerText?.replace(/[\(\)\.]/g, ' ');

      const routeMatches = [...cleanedText.matchAll(routeRegex)].map(m => m[1]);

      const cleanedRoutes = getCleanRoutes(routeMatches);
      setRoute(cleanedRoutes);

      // const [originCoords, destinationCoords] = await Promise.all([
      //   isRouteRelated(origin),
      //   isRouteRelated(destination),
      // ]);
      // Destination from "end on" to end of string
      // }
      //   return {origin, destination};
      // } else {
      // fallback: only origin found
      // return {origin: text.trim(), destination: ''};
    }

    // Origin: match "start on" or "origin:"

    return {origin, destination};
  };

  const getCleanRoutes = routesArray => {
    const validRoutes = new Set();

    routesArray.forEach(item => {
      // Remove empty or non-number strings
      const cleaned = item.trim();

      // If already in correct format
      if (/^(I|US|SR)-\d+$/.test(cleaned)) {
        validRoutes.add(cleaned.toUpperCase());
      }

      // If starts with "-", assume it's I-Route like -380 => I-380
      else if (/^-\d+$/.test(cleaned)) {
        validRoutes.add(`I${cleaned}`);
      }

      // If it's a number like 80, 20, 29 etc – guess it's I-Route (optional)
      else if (
        /^\d+$/.test(cleaned) &&
        Number(cleaned) >= 10 &&
        Number(cleaned) <= 999
      ) {
        validRoutes.add(`I-${cleaned}`);
      }
    });

    return Array.from(validRoutes);
  };

  const findLocations = async () => {
    console.log('check location are VAlid ?s');

    for (let wordObj of recognizedText) {
      const isLocation = wordObj.text;

      const parts = isLocation.split(/end on/i); // case insensitive
      const rawText = parts[0];
      const lowerText = rawText.replace(/\n/g, ' ').toLowerCase();
      const startIndex = Math.max(
        lowerText.indexOf('start on'),
        lowerText.indexOf('origin'),
        // lowerText.indexOf('from')
      );
      const endIndex = Math.max(
        lowerText.indexOf('end on'),
        lowerText.indexOf('destination'),
        // lowerText.indexOf('to'),
      );
      const routeMatch = lowerText.match(/route:\s*(.*)/i);

      console.log(
        '==================== <<<<<<<<<<< reset',
        startIndex,
        endIndex,
        routeMatch,
      );
      if (startIndex !== -1 && endIndex !== -1) {
        const checkOrigin = rawText.slice(startIndex, endIndex).trim();
        const finalorigin = checkOrigin.replace(/start on\s*/i, '').trim();
      //  return console.log("🚀 ~ findLocations ~ finalorigin:", finalorigin)
        setOrigin(finalorigin);
        const checkdestination = rawText.slice(endIndex).trim();
        const finaldestination = checkdestination
          .toLowerCase()
          .replace(/end on\s*/i, '')
          .trim();
        setDestination(finaldestination);

        const routeRegex = /(-?\d+|I-\d+|US-\d+|SR-\d+)/g;
        const cleanedText = lowerText?.replace(/[\(\)\.]/g, ' ');

        const routeMatches = [...cleanedText.matchAll(routeRegex)].map(
          m => m[1],
        );

        const cleanedRoutes = getCleanRoutes(routeMatches);
        setRoute(cleanedRoutes);
        // const [originCoords, destinationCoords] = await Promise.all([
        //   isRouteRelated(origin),
        //   isRouteRelated(destination),
        // ]);
        // Destination from "end on" to end of string
        // }
        //   return {origin, destination};
        // } else {
        // fallback: only origin found
        // return {origin: text.trim(), destination: ''};
      }
      // const isLocation = isRouteRelated(word)
      // const finalResult  = await checkWithGeoAPI(word);
    }
  };

  // const isRouteRelated = text => {
  //   const highwayRegex = /(I-\d+|US-\d+|Route\s\d+)/i;
  //   const directionRegex = /\b(WB|EB|NB|SB|Exit|Junction|Mile)\b/i;
  //   const stateBorderRegex = /STATE BORDER OF/i;

  //   return (
  //     highwayRegex.test(text) ||
  //     directionRegex.test(text) ||
  //     stateBorderRegex.test(text)
  //   );
  // };

  // // const openGallery = () => {
  // //   let options = {
  // //     mediaType: 'photo',
  // //     maxWidth: 500,
  // //     maxHeight: 500,
  // //     quailty: 0.9,
  // //     saveToPhotos: true,
  // //   };

  // //   launchImageLibrary(options, response => {
  // //     if (Platform.OS === 'ios') {
  // //       setShow(false);
  // //     }
  // //     if (response.didCancel) {
  // //     } else if (response.error) {
  // //     } else if (response.customButton) {
  // //       Alert.alert(response.customButton);
  // //     } else {
  // //       setFileObject({
  // //         uri: response?.assets[0]?.uri,
  // //         type: response?.assets[0]?.type,
  // //         name: response?.assets[0]?.fileName,
  // //       });

  // //     }
  // //   });
  // //   // }
  // // };

  // const selectDocument = async () => {
  //   try {
  //     const result = await pick({
  //       allowMultiSelection: false,
  //       type: ['application/pdf'],
  //     });
  //     console.log('first ================= >>>>>', result);
  //     setisLoading(true);
  //     setModalVisible(true);
  //     try {
  //       if (result?.uri) {
  //         console.log('first ================= >>>>> from if');
  //         const uri = result?.uri;
  //         const resultText = await MLKitOcr.detectFromFile(uri);

  //         // setRecognizedText(resultText);
  //       }
  //     } catch (error) {
  //       console.error(
  //         '❌ Error in takePicture or detectFromFile:================ >>>',
  //         error,
  //       );
  //     }
  //   } catch (err) {
  //     if (err.code === 'DOCUMENT_PICKER_CANCELED') {
  //       console.log('User canceled the picker');
  //     } else {
  //       console.error('Unknown error:', err);
  //     }
  //   }
  // };

  // const handleSelectImage = () => {
  //   ImagePicker.launchCamera({}, async response => {
  //     if (response.assets && response.assets.length > 0) {
  //       const uri = response.assets[0].uri;
  //       setImage(uri);

  //       const result = await TextRecognition.recognize(uri);
  //       // setRecognizedText(result.join(' ')); // result is an array of strings
  //     }
  //   });
  // };

  const isLocationValid = async (origin, destination, routes) => {
    // const isOriginValid = await checkIfLocation(origin);
    // const isDestinationValid = await checkIfLocation(destination);
    const routeCoords = await Promise.all(
      routes.map(route => checkIfLocation(`${route} highway`)),
    );
    const validRouteCoords = routeCoords.filter(Boolean);
    console.log('🚀 ~ isLocationValid ~ validRouteCoords:', validRouteCoords);
    setWaypoint(validRouteCoords);
    const [originCoords, destinationCoords] = await Promise.all([
      checkIfLocation(origin),
      checkIfLocation(destination),
    ]);
    if (originCoords && destinationCoords) {
      //
      onPressStartNavigation(originCoords, destinationCoords, validRouteCoords);
      // navigationService.navigate('MapScreen', {
      //   data: {origin: originCoords, destination: destinationCoords},
      // });

      console.log('✅aaaa Both locations are valid!');
    } else {
    setModalVisible(false);

      setisLoading(false);
      alert('something went worg please try again');
      console.log('❌ One or both locations are invalid.');
    }
  };

  const onPressStartNavigation = async (pickup, destination, waypoints) => {
    console.log(
      ' =================== > from redirect map fussnction==========',
      pickup,
      destination,
      waypoints,
    );
    // if (pickup && destination != ) {
    console.log('from if condition ============== >');
    const url = `https://www.google.com/maps/dir/?api=1&origin=${pickup?.lat},${pickup?.lng}&destination=${destination?.lat},${destination?.lng}&waypoints=${waypoint}&travelmode=driving`;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
    setModalVisible(false);
    setisLoading(false);
    setWaypoint([]);
    setDestination('');
    setOrigin('');
    // }
  };

  const checkIfLocation = async place => {
    console.log(' ======================== > from checkif');
    const apiKey = 'AIzaSyDacSuTjcDtJs36p3HTDwpDMLkvnDss4H8';
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        place,
      )}&key=${apiKey}`,
    );
    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      console.warn('❌ No results for:', place);
      return null;
    }

    const fullMatches = data.results.filter(res => !res.partial_match);
    const bestMatch = fullMatches[0] || data.results[0];

    return bestMatch?.geometry?.location || null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create A Route</Text>
      <View style={styles.scanBoxContainer}>
        <Text style={styles.label}>Scan Permit</Text>
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
          text={'Scan QR COde'}
          textColor={Color.white}
          height={windowHeight * 0.06}
          borderColor={Color.secondary}
          borderWidth={1}
          borderRadius={moderateScale(30, 0.6)}
          width={windowWidth * 0.72}
          bgColor={Color.secondary}
          marginTop={windowHeight * 0.13}
          onPress={
            () => {
              takePicture();
            }
            // handleSelectImage()
            //   async () => {
            //     const result = await launchCamera({mediaType: 'photo'});
            //     if (result.assets && result.assets.length > 0) {
            //       const path = result.assets[0].uri;
            //       const resultText = await MLKitOcr.detectFromFile(path);
            //       // setRecognizedText(resultText?.map((item ,index )=> item?.text) .join(' '))
            //       setRecognizedText(resultText);
            //     }
            //   }
          }
        />
        {/* <View style={styles.scanBox}>
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
        </View> */}
      </View>
      <CustomButton
        style={{}}
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
          pickAndRecognizeText();
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
          // selectDocument();
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
            {isLoading && (
              <ActivityIndicator size={'large'} color={Color.secondary} />
            )}
            {/* <CustomText style={styles.modalTitle}>Scanned QR Code</CustomText>
            <CustomText style={styles.modalData}>{scannedData}</CustomText>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity> */}
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
    height: windowHeight * 0.58,
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
    width: windowWidth * 0.7,
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
    width: windowWidth * 0.7,
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    margin: 20,
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
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    // flex: 1,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});
