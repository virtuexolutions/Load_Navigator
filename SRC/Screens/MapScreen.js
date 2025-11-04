// import {isValidCoordinate} from 'geolib';
// import React, {useEffect, useRef, useState} from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   View,
//   Text,
//   Button,
//   Alert,
//   Platform,
//   ActivityIndicator,
// } from 'react-native';
// import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';

// import BackgroundGeolocation from 'react-native-background-geolocation';
// import {moderateScale} from 'react-native-size-matters';

// // import MapViewDirections from 'react-native-maps-directions';
// import {useDispatch, useSelector} from 'react-redux';
// import Color from '../Assets/Utilities/Color';
// import Header from '../Components/Header';
// import {customMapStyle} from '../Utillity/mapstyle';
// import {windowHeight, windowWidth} from '../Utillity/utils';
// import CustomText from '../Components/CustomText';
// import CustomImage from '../Components/CustomImage';
// import Geolocation from '@react-native-community/geolocation';
// import CustomButton from '../Components/CustomButton';
// import {setIsTrackingActive} from '../Store/slices/common';
// // import MapView, {Marker} from 'react-native-maps';

// const MapScreen = props => {
//   console.log(' =========================== >>>>>>>>>>>>>>> from mapscreen ');
//   // const data = props?.route?.params?.data;

//   const token = useSelector(state => state.authReducer.token);
//   const userData = useSelector(state => state.commonReducer.userData);
//   const userRole = useSelector(state => state.commonReducer.selectedRole);
//   const dispatch = useDispatch();
//   const mapRef = useRef(null);

//   const [isRouteFitted, setIsRouteFitted] = useState(false);
//   const origin = {latitude: 24.8598764, longitude: 67.0623659}; // Apple HQ
//   const destination = {latitude: 24.920251, longitude: 67.0639394};

//   const [currentPosition, setCurrentPosition] = useState({
//     latitude: 0,
//     longitude: 0,
//   });
//   console.log(
//     'first============================= >>>>>>>>>>>',
//     currentPosition,
//   );

//   useEffect(() => {
//     getCurrent();
//   }, []);

//   useEffect(() => {
//     if (isValidCoordinate(origin)) {
//       setTimeout(() => {
//         mapRef.current?.animateToRegion(
//           {
//             latitude: parseFloat(currentPosition.latitude),
//             longitude: parseFloat(currentPosition.longitude),
//             // latitudeDelta: 0.0522,
//             // longitudeDelta: 0.0521,
//           },
//           1000,
//         );
//       }, 200);
//     }
//   }, [origin]);

//   const getCurrentLocation = async () => {
//     try {
//       const position = await new Promise((resolve, reject) => {
//         Geolocation.getCurrentPosition(
//           position => {
//             const coords = {
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude,
//             };
//             resolve(coords);
//             // getAddressFromCoordinates(
//             //   position.coords.latitude,
//             //   position.coords.longitude,
//             // );
//           },
//           error => {
//             reject(new Error(error.message));
//           },
//           {
//             enableHighAccuracy: true,
//             timeout: 15000,
//             maximumAge: 10000,
//           },
//         );
//       });
//       setCurrentPosition(position);
//     } catch (error) {
//       console.error('Error getting location:', error);
//       throw error;
//     }
//   };

//   // const getAddressFromCoordinates = async (latitude, longitude) => {
//   //   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${origin?.latitude},${origin?.longitude}&key=${GOOGLE_MAPS_API_KEY}`;
//   //   try {
//   //     const response = await fetch(url);
//   //     const data = await response.json();
//   //     if (data.status === 'OK') {
//   //       const givenaddress = data.results[0].formatted_address;
//   //       setAddress(givenaddress);
//   //     } else {
//   //       console.log('No address found');
//   //     }
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // };

//   const apikey = 'AIzaSyDacSuTjcDtJs36p3HTDwpDMLkvnDss4H8';

//   const [enabled, setEnabled] = useState(false);
//   const [lastLocation, setLastLocation] = useState(null);
//   const [isloading, setIsloading] = useState(false);

//   const [status, setStatus] = useState('unknown');
//   useEffect(() => {
//     // Event listeners
//     const onLocation = BackgroundGeolocation.onLocation(
//       location => {
//         console.log('[onLocation] ', location);
//         setLastLocation(location);
//       },
//       error => {
//         console.warn('[onLocation] ERROR', error);
//       },
//     );
//     const onMotionChange = BackgroundGeolocation.onMotionChange(event => {
//       console.log('[onMotionChange] ', event);
//     });
//     const onProviderChange = BackgroundGeolocation.onProviderChange(
//       provider => {
//         console.log('[onProviderChange] ', provider);
//         setStatus(provider.status);
//       },
//     );
//     // ready configuration
//     BackgroundGeolocation.ready({
//       desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
//       distanceFilter: 1,
//       stopTimeout: 5,
//       debug: false,
//       logLevel: BackgroundGeolocation.LOG_LEVEL_OFF,
//       stopOnTerminate: false,
//       startOnBoot: true,
//       autoSync: true,
//       batchSync: false,
//       // NOTE: Replace with your server URL if you want automatic HTTP sync:
//       // url: 'https://yourserver.com/locations',
//       // headers: { 'X-APP-TOKEN': 'mytoken' },
//       // params: { driver_id: 'DRIVER-123' }
//     })
//       .then(state => {
//         console.log('- BackgroundGeolocation ready: ', state);
//         setEnabled(state.enabled);
//       })
//       .catch(err => console.warn('ready error', err));
//     return () => {
//       // Remove listeners and stop plugin when component unmounts (optional)
//       onLocation.remove();
//       onMotionChange.remove();
//       onProviderChange.remove();
//       BackgroundGeolocation.removeListeners();
//     };
//   }, []);
//   const startTracking = async () => {
//     try {
//       const status = await BackgroundGeolocation.requestPermission();
//       console.log('permission status:', status);
//     } catch (e) {
//       console.warn('permission request error', e);
//     }
//     BackgroundGeolocation.start()
//       .then(() => {
//         // console.log('o')
//         console.log('=====================>>>>>Tracking started');
//         setEnabled(true);
//         dispatch(setIsTrackingActive(true));
//       })
//       .catch(e => console.warn(e));
//   };
//   const stop = () => {
//     BackgroundGeolocation.stop()
//       .then(() => {
//         console.log('Tracking stopped');
//         setEnabled(false);
//       })
//       .catch(e => console.warn(e));
//   };
//   const getCurrent = () => {
//     BackgroundGeolocation.getCurrentPosition({
//       persist: true,
//       timeout: 30,
//     })
//       .then(location => {
//         console.log('=================>>>>>>Current Position', location);
//         setCurrentPosition({
//           latitude: location.coords.latitude,
//           longitude: location.coords.longitude,
//         });
//         // Alert.alert(
//         //   'Current Position',
//         //   JSON.stringify(location.coords, null, 2),
//         // );
//       })
//       .catch(err => {
//         console.warn('getCurrentPosition error', err);
//       });
//   };

//   return (
//     // <View style={{flex: 1}}>
//     //   <CustomText>map screen</CustomText>
//     //   <MapView
//     //     mapType=""
//     //     style={{flex: 1}}
//     //     ref={mapRef}
//     //     initialRegion={{
//     //       latitude: origin.latitude,
//     //       longitude: origin.longitude,
//     //       latitudeDelta: 0.0522,
//     //       longitudeDelta: 0.0521,
//     //     }}>
//     //     <Marker coordinate={origin} />
//     //     <Marker coordinate={destination} />

//     //     <MapViewDirections
//     //       origin={origin}
//     //       destination={destination}
//     //       apikey={apikey}
//     //       strokeWidth={5}
//     //       strokeColor="black"
//     //       onStart={params =>
//     //         console.log('Route started================= >>>>>>>>>', params)
//     //       }
//     //       onReady={result =>
//     //         console.log('Route ready================= >>>>>>>>>', result)
//     //       }
//     //       onError={err =>
//     //         console.log('Directions error================= >>>>>>>>>: ', err)
//     //       }
//     //     />
//     //   </MapView>
//     // </View>

//     <SafeAreaView
//       style={[
//         styles.safe_are,
//         {
//           backgroundColor:
//             userRole.toLowerCase() == 'pilot' ? Color.primary : Color.secondary,
//         },
//       ]}>
//       <Header
//         textstyle={{
//           color: Color.white,
//         }}
//         showBack={true}
//         title={'route'}
//         headerColor={
//           userRole.toLowerCase() == 'pilot' ? Color.primary : Color.secondary
//         }
//       />
//       <View style={styles.main_view}>
//         <MapView
//           style={styles.map}
//           initialRegion={{
//             latitude: currentPosition?.latitude,
//             longitude: currentPosition?.longitude,
//             latitudeDelta: 0.0522,
//             longitudeDelta: 0.0521,
//           }}
//           ref={mapRef}
//           provider={PROVIDER_GOOGLE}
//           // customMapStyle={customMapStyle}
//         >
//           <Marker
//             coordinate={{latitude: 24.7672467, longitude: 67.0492}}
//             pinColor={Color.black}
//           />
//           <MapViewDirections
//             // region={{
//             //   latitude: currentPosition?.latitude,
//             //   longitude: currentPosition?.longitude,
//             //   latitudeDelta: 0.0522,
//             //   longitudeDelta: 0.0521,
//             // }}
//             apikey={'AIzaSyAqNK7IfM16zi79N0u7qX4Ncm5QgGvBqmg'}
//             origin={{
//               latitude: origin?.latitude,
//               longitude: origin?.longitude,
//             }}
//             destination={{
//               latitude: destination?.latitude,
//               longitude: destination?.longitude,
//             }}
//             strokeColor={Color.themeBlack}
//             strokeWidth={6}
//             onStart={e => console.log('first ====================== > onstart')}
//             onError={error =>
//               console.log(
//                 '=============== >>>>>>>>>>>>MapViewDirections Error:',
//                 error,
//               )
//             }
//             onReady={result => {
//               if (mapRef.current) {
//                 mapRef.current.fitToCoordinates([origin, destination], {
//                   edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
//                   animated: true,
//                 });
//               }
//             }}
//           />
//           {Object.keys(destination)?.length > 0 &&
//             isValidCoordinate(destination) && (
//               <Marker
//                 pinColor={Color.black}
//                 coordinate={{
//                   latitude: destination?.latitude,
//                   longitude: destination?.longitude,
//                 }}
//               />
//             )}
//         </MapView>
//         <View style={styles.btn_con}>
//           <CustomButton
//             text={
//               isloading ? (
//                 <ActivityIndicator size={'small'} color={Color.white} />
//               ) : (
//                 'start '
//               )
//             }
//             fontSize={moderateScale(14, 0.3)}
//             textColor={Color.white}
//             borderRadius={moderateScale(30, 0.3)}
//             width={windowWidth * 0.85}
//             marginTop={moderateScale(10, 0.3)}
//             height={windowHeight * 0.07}
//             bgColor={Color.secondary}
//             borderWidth={1.5}
//             borderColor={Color.secondary}
//             textTransform={'capitalize'}
//             isBold
//             onPress={() => {
//               startTracking();
//               // onPressStartNavigation();
//             }}
//           />
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default MapScreen;

// const styles = StyleSheet.create({
//   safe_are: {
//     flex: 1,
//     // width: windowWidth,
//     // height: windowHeight,
//     paddingVertical: moderateScale(20, 0.6),
//   },

//   main_view: {
//     // flex : 1,

//     width: windowWidth,
//     height: windowHeight,
//     backgroundColor: Color.white,
//   },

//   map: {
//     flex: 1,

//     // ...StyleSheet.absoluteFillObject,
//     // backgroundColor: Color.grey,
//   },
//   btn_con: {
//     alignItems: 'center',
//     width: windowWidth,
//     height: windowHeight * 0.2,
//     position: 'absolute',
//     bottom: 20,
//   },
// });

// // useEffect(() => {
// //   if ((origin && destination, route)) {
// //     isLocationValid(destination, origin, route);
// //   }
// // }, [recognizedText]);

// // const extractPermitDetails = text => {
// //   // const fullText = text?.map(item => item.text).join('\n');

// //   // let origin = '';
// //   // let destination = '';

// //   // const fullLower = fullText.replace(/\n/g, ' ').toLowerCase();

// //   for (let wordObj of text) {
// //     const isLocation = wordObj.text;

// //     const parts = isLocation.split(/end on/i); // case insensitive
// //     const rawText = parts[0];
// //     const lowerText = rawText.replace(/\n/g, ' ').toLowerCase();
// //     const originMatch =
// //       lowerText.match(/start on\s+(.*?)(?=[.,\n]|$)/i) ||
// //       lowerText.match(/origin\s*[:-]?\s*(.*?)(?=[.,\n]|$)/i);

// //     // if (originMatch && originMatch[1]) {
// //     //   origin = originMatch[1].trim();
// //     //   setOrigin(origin);
// //     // }

// //     // Destination: match "end on" or "destination:"
// //     const z =
// //       lowerText.match(/end on\s+(.*?)(?=[.,\n]|$)/i) ||
// //       lowerText.match(/destination\s*[:-]?\s*(.*?)(?=[.,\n]|$)/i);

// //     // if (destinationMatch && destinationMatch[1]) {
// //     //   destination = destinationMatch[1].trim();
// //     //   setDestination(destination);
// //     // }

// //     console.log('✅ Extracted Origin:', origin);
// //     console.log('✅ Extracted Destination:', destination);
// //     const routeRegex = /(-?\d+|I-\d+|US-\d+|SR-\d+)/g;
// //     const cleanedText = lowerText?.replace(/[\(\)\.]/g, ' ');

// //     const routeMatches = [...cleanedText.matchAll(routeRegex)].map(m => m[1]);

// //     const cleanedRoutes = getCleanRoutes(routeMatches);
// //     setRoute(cleanedRoutes);

// //     // const [originCoords, destinationCoords] = await Promise.all([
// //     //   isRouteRelated(origin),
// //     //   isRouteRelated(destination),
// //     // ]);
// //     // Destination from "end on" to end of string
// //     // }
// //     //   return {origin, destination};
// //     // } else {
// //     // fallback: only origin found
// //     // return {origin: text.trim(), destination: ''};
// //   }

// //   // Origin: match "start on" or "origin:"

// //   return {origin, destination};
// // };

// // const getCleanRoutes = routesArray => {
// //   const validRoutes = new Set();

// //   routesArray.forEach(item => {
// //     // Remove empty or non-number strings
// //     const cleaned = item.trim();

// //     // If already in correct format
// //     if (/^(I|US|SR)-\d+$/.test(cleaned)) {
// //       validRoutes.add(cleaned.toUpperCase());
// //     }

// //     // If starts with "-", assume it's I-Route like -380 => I-380
// //     else if (/^-\d+$/.test(cleaned)) {
// //       validRoutes.add(`I${cleaned}`);
// //     }

// //     // If it's a number like 80, 20, 29 etc – guess it's I-Route (optional)
// //     else if (
// //       /^\d+$/.test(cleaned) &&
// //       Number(cleaned) >= 10 &&
// //       Number(cleaned) <= 999
// //     ) {
// //       validRoutes.add(`I-${cleaned}`);
// //     }
// //   });

// //   return Array.from(validRoutes);
// // };

// // const findLocations = async text => {
// //   console.log('check location are VAlid ?s', text);

// //   for (let wordObj of text) {
// //     const isLocation = wordObj.text;

// //     const parts = isLocation.split(/end on/i); // case insensitive
// //     const rawText = parts[0];
// //     const lowerText = rawText.replace(/\n/g, ' ').toLowerCase();
// //     const startIndex = Math.max(
// //       lowerText.indexOf('start on'),
// //       lowerText.indexOf('origin'),
// //       // lowerText.indexOf('from')
// //     );
// //     const endIndex = Math.max(
// //       lowerText.indexOf('end on'),
// //       lowerText.indexOf('destination'),
// //       // lowerText.indexOf('to'),
// //     );
// //     const routeMatch = lowerText.match(/route:\s*(.*)/i);

// //     console.log(
// //       '==================== <<<<<<<<<<< reset',
// //       startIndex,
// //       endIndex,
// //       routeMatch,
// //     );
// //     if (startIndex !== -1 && endIndex !== -1) {
// //       const checkOrigin = rawText.slice(startIndex, endIndex).trim();
// //       const finalorigin = checkOrigin.replace(/start on\s*/i, '').trim();
// //       //  return console.log("🚀 ~ findLocations ~ finalorigin:", finalorigin)
// //       setOrigin(finalorigin);
// //       const checkdestination = rawText.slice(endIndex).trim();
// //       const finaldestination = checkdestination
// //         .toLowerCase()
// //         .replace(/end on\s*/i, '')
// //         .trim();
// //       setDestination(finaldestination);

// //       const routeRegex = /(-?\d+|I-\d+|US-\d+|SR-\d+)/g;
// //       const cleanedText = lowerText?.replace(/[\(\)\.]/g, ' ');

// //       const routeMatches = [...cleanedText.matchAll(routeRegex)].map(
// //         m => m[1],
// //       );

// //       const cleanedRoutes = getCleanRoutes(routeMatches);
// //       setRoute(cleanedRoutes);
// //       // const [originCoords, destinationCoords] = await Promise.all([
// //       //   isRouteRelated(origin),
// //       //   isRouteRelated(destination),
// //       // ]);
// //       // Destination from "end on" to end of string
// //       // }
// //       //   return {origin, destination};
// //       // } else {
// //       // fallback: only origin found
// //       // return {origin: text.trim(), destination: ''};
// //     }
// //     // const isLocation = isRouteRelated(word)
// //     // const finalResult  = await checkWithGeoAPI(word);
// //   }
// // };

// // const isRouteRelated = text => {
// //   const highwayRegex = /(I-\d+|US-\d+|Route\s\d+)/i;
// //   const directionRegex = /\b(WB|EB|NB|SB|Exit|Junction|Mile)\b/i;
// //   const stateBorderRegex = /STATE BORDER OF/i;

// //   return (
// //     highwayRegex.test(text) ||
// //     directionRegex.test(text) ||
// //     stateBorderRegex.test(text)
// //   );
// // };

// {
//   /* <View style={styles.scanBox}>
//           <QRCodeScanner
//             onRead={onSuccess}
//             reactivate={true}
//             showMarker={true}
//             cameraStyle={styles.cameraStyle}
//             customMarker={
//               <>
//                 <View style={styles.corner} />
//                 <View style={[styles.corner, styles.topLeft]} />
//                 <View style={[styles.corner, styles.topRight]} />
//                 <View style={[styles.corner, styles.bottomLeft]} />
//                 <View style={[styles.corner, styles.bottomRight]} />
//               </>
//             }
//           />
//         </View> */
// }




import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Color from '../Assets/Utilities/Color';

const GOOGLE_MAPS_APIKEY = 'AIzaSyAqNK7IfM16zi79N0u7qX4Ncm5QgGvBqmg';

export default function App() {
  const mapRef = useRef(null);

  const origin = { latitude: 24.7672467, longitude: 67.0492 };
  const destination = { latitude: 24.8607, longitude: 67.0011 }; // Karachi to Karachi downtown

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates([origin, destination], {
        edgePadding: { top: 50, right: 60, bottom: 60, left: 50 },
        animated: true,
      });
    }
  }, []);

  return (
    <View style={styles.container}>
    <MapView
         ref={MapView => (this.MapView = MapView)}
         style={styles.map}
         initialRegion={this.state.region}
         loadingEnabled = {true}
         loadingIndicatorColor="#666666"
         loadingBackgroundColor="#eeeeee"
         moveOnMarkerPress = {false}
         showsUserLocation={true}
         showsCompass={true}
         showsPointsOfInterest = {false}
         provider="google">
         {/* {this.state.markers.map((marker:any)  => (  
              <MapView.Marker
                key={marker.id}
                coordinate={marker.coordinate}
                title={marker.title}
                description={marker.description}
              />
         ))} */}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
