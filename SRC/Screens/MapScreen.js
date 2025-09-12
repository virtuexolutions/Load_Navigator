import {isValidCoordinate} from 'geolib';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import Header from '../Components/Header';
import {customMapStyle} from '../Utillity/mapstyle';
import {windowHeight, windowWidth} from '../Utillity/utils';

const MapScreen = props => {
  const data = props?.route?.params?.data;

  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  const userRole = useSelector(state => state.commonReducer.selectedRole);

  const mapRef = useRef(null);

  const [isRouteFitted, setIsRouteFitted] = useState(false);
  const origin = {latitude: 37.3318456, longitude: -122.0296002}; // Apple HQ
  const destination = {latitude: 37.771707, longitude: -122.4053769}; // SF

  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  // useEffect(() => {
  //   getCurrentLocation();
  // }, []);

  useEffect(() => {
    if (isValidCoordinate(origin)) {
      mapRef.current?.animateToRegion(
        {
          latitude: origin?.latitude,
          longitude: origin?.longitude,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0521,
        },
        1000,
      );
    }
  }, [origin]);

  // const getCurrentLocation = async () => {
  //   try {
  //     const position = await new Promise((resolve, reject) => {
  //       Geolocation.getCurrentPosition(
  //         position => {
  //           const coords = {
  //             latitude: position.coords.latitude,
  //             longitude: position.coords.longitude,
  //           };
  //           resolve(coords);
  //           getAddressFromCoordinates(
  //             position.coords.latitude,
  //             position.coords.longitude,
  //           );
  //         },
  //         error => {
  //           reject(new Error(error.message));
  //         },
  //         {
  //           enableHighAccuracy: true,
  //           timeout: 15000,
  //           maximumAge: 10000,
  //         },
  //       );
  //     });
  //     setCurrentPosition(position);
  //   } catch (error) {
  //     console.error('Error getting location:', error);
  //     throw error;
  //   }
  // };

  // const getAddressFromCoordinates = async (latitude, longitude) => {
  //   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data?.origin?.latitude},${data?.origin?.longitude}&key=${GOOGLE_MAPS_API_KEY}`;
  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     if (data.status === 'OK') {
  //       const givenaddress = data.results[0].formatted_address;
  //       setAddress(givenaddress);
  //     } else {
  //       console.log('No address found');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const apikey = 'AIzaSyDacSuTjcDtJs36p3HTDwpDMLkvnDss4H8';

  return (
    <SafeAreaView
      style={[
        styles.safe_are,
        {
          backgroundColor:
            userRole.toLowerCase() == 'pilot' ? Color.primary : Color.secondary,
        },
      ]}>
      <Header
        textstyle={{
          color: Color.white,
        }}
        showBack={true}
        title={'route'}
        headerColor={
          userRole.toLowerCase() == 'pilot' ? Color.primary : Color.secondary
        }
      />
      <View style={styles.main_view}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: parseInt(origin?.latitude),
            longitude: parseInt(origin?.longitude),
            // latitude: data?.origin?.lat,
            // longitude: data?.origin?.lng,
            latitudeDelta: 0.0522,
            longitudeDelta: 0.0521,
          }}
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          customMapStyle={customMapStyle}>
          {/* {Object.keys(data?.origin)?.length > 0 &&
            isValidCoordinate(data?.origin) && ( */}
          <>
            <Marker
              coordinate={{
                latitude: destination.latitude,
                longitude: destination.longitude,
              }}
              title="Drop-off Location"
              pinColor="black"
            />
            {/* <Marker
              coordinate={{
                latitude: origin?.latitude,
                longitude: origin?.longitude,
              }}
              title="pickup  Location"
              pinColor={Color.red}> */}
            {/* <View
                    style={{
                      height: windowHeight * 0.051,
                      width: windowWidth * 0.1,
                    }}>
                    <CustomImage
                      // source={require('../Assets/Images/tracking-pin.png')}
                      style={{
                        height: '100%',
                        width: '100%',
                      }}
                    />
                  </View> */}
            {/* </Marker>s */}
          </>
          {/* // )} */}

          <MapViewDirections
            apikey={'AIzaSyDacSuTjcDtJs36p3HTDwpDMLkvnDss4H8'}
            // origin={data?.origin}
            // destination={data?.destination}
            origin={{latitude: 37.78825, longitude: -122.4324}}
            destination={{latitude: 37.759703, longitude: -122.428093}}
            // waypoints={waypoints?.length > 0 ? waypoints : undefined}
            strokeColor={Color.blue}
            strokeWidth={5}
            onStart={e => {
              console.log(
                'start route ========================= >>>>> aaaa',
                e,
              );
            }}
            onError={error => console.log('MapViewDirections Error:', error)}
            onReady={result => {
              if (mapRef.current && !isRouteFitted) {
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: 50,
                    left: 50,
                    top: 300,
                    bottom: 100,
                  },
                });
                setIsRouteFitted(true);
              }
            }}
          />

          {destination != null &&
            Object.keys(destination)?.length > 0 &&
            isValidCoordinate(destination) && (
              <Marker
                coordinate={{
                  latitude: parseInt(destination?.latitude),
                  longitude: parseInt(destination?.longitude),
                }}
                title="Drop-off Location"
                pinColor={Color.black}
              />
            )}
        </MapView>
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  safe_are: {
    width: windowWidth,
    height: windowHeight,
    paddingVertical: moderateScale(20, 0.6),
  },

  main_view: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.white,
  },

  map: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Color.grey,
  },
});

















 // useEffect(() => {
  //   if ((origin && destination, route)) {
  //     isLocationValid(destination, origin, route);
  //   }
  // }, [recognizedText]);

  // const extractPermitDetails = text => {
  //   // const fullText = text?.map(item => item.text).join('\n');

  //   // let origin = '';
  //   // let destination = '';

  //   // const fullLower = fullText.replace(/\n/g, ' ').toLowerCase();

  //   for (let wordObj of text) {
  //     const isLocation = wordObj.text;

  //     const parts = isLocation.split(/end on/i); // case insensitive
  //     const rawText = parts[0];
  //     const lowerText = rawText.replace(/\n/g, ' ').toLowerCase();
  //     const originMatch =
  //       lowerText.match(/start on\s+(.*?)(?=[.,\n]|$)/i) ||
  //       lowerText.match(/origin\s*[:-]?\s*(.*?)(?=[.,\n]|$)/i);

  //     // if (originMatch && originMatch[1]) {
  //     //   origin = originMatch[1].trim();
  //     //   setOrigin(origin);
  //     // }

  //     // Destination: match "end on" or "destination:"
  //     const z =
  //       lowerText.match(/end on\s+(.*?)(?=[.,\n]|$)/i) ||
  //       lowerText.match(/destination\s*[:-]?\s*(.*?)(?=[.,\n]|$)/i);

  //     // if (destinationMatch && destinationMatch[1]) {
  //     //   destination = destinationMatch[1].trim();
  //     //   setDestination(destination);
  //     // }

  //     console.log('✅ Extracted Origin:', origin);
  //     console.log('✅ Extracted Destination:', destination);
  //     const routeRegex = /(-?\d+|I-\d+|US-\d+|SR-\d+)/g;
  //     const cleanedText = lowerText?.replace(/[\(\)\.]/g, ' ');

  //     const routeMatches = [...cleanedText.matchAll(routeRegex)].map(m => m[1]);

  //     const cleanedRoutes = getCleanRoutes(routeMatches);
  //     setRoute(cleanedRoutes);

  //     // const [originCoords, destinationCoords] = await Promise.all([
  //     //   isRouteRelated(origin),
  //     //   isRouteRelated(destination),
  //     // ]);
  //     // Destination from "end on" to end of string
  //     // }
  //     //   return {origin, destination};
  //     // } else {
  //     // fallback: only origin found
  //     // return {origin: text.trim(), destination: ''};
  //   }

  //   // Origin: match "start on" or "origin:"

  //   return {origin, destination};
  // };

  // const getCleanRoutes = routesArray => {
  //   const validRoutes = new Set();

  //   routesArray.forEach(item => {
  //     // Remove empty or non-number strings
  //     const cleaned = item.trim();

  //     // If already in correct format
  //     if (/^(I|US|SR)-\d+$/.test(cleaned)) {
  //       validRoutes.add(cleaned.toUpperCase());
  //     }

  //     // If starts with "-", assume it's I-Route like -380 => I-380
  //     else if (/^-\d+$/.test(cleaned)) {
  //       validRoutes.add(`I${cleaned}`);
  //     }

  //     // If it's a number like 80, 20, 29 etc – guess it's I-Route (optional)
  //     else if (
  //       /^\d+$/.test(cleaned) &&
  //       Number(cleaned) >= 10 &&
  //       Number(cleaned) <= 999
  //     ) {
  //       validRoutes.add(`I-${cleaned}`);
  //     }
  //   });

  //   return Array.from(validRoutes);
  // };

  // const findLocations = async text => {
  //   console.log('check location are VAlid ?s', text);

  //   for (let wordObj of text) {
  //     const isLocation = wordObj.text;

  //     const parts = isLocation.split(/end on/i); // case insensitive
  //     const rawText = parts[0];
  //     const lowerText = rawText.replace(/\n/g, ' ').toLowerCase();
  //     const startIndex = Math.max(
  //       lowerText.indexOf('start on'),
  //       lowerText.indexOf('origin'),
  //       // lowerText.indexOf('from')
  //     );
  //     const endIndex = Math.max(
  //       lowerText.indexOf('end on'),
  //       lowerText.indexOf('destination'),
  //       // lowerText.indexOf('to'),
  //     );
  //     const routeMatch = lowerText.match(/route:\s*(.*)/i);

  //     console.log(
  //       '==================== <<<<<<<<<<< reset',
  //       startIndex,
  //       endIndex,
  //       routeMatch,
  //     );
  //     if (startIndex !== -1 && endIndex !== -1) {
  //       const checkOrigin = rawText.slice(startIndex, endIndex).trim();
  //       const finalorigin = checkOrigin.replace(/start on\s*/i, '').trim();
  //       //  return console.log("🚀 ~ findLocations ~ finalorigin:", finalorigin)
  //       setOrigin(finalorigin);
  //       const checkdestination = rawText.slice(endIndex).trim();
  //       const finaldestination = checkdestination
  //         .toLowerCase()
  //         .replace(/end on\s*/i, '')
  //         .trim();
  //       setDestination(finaldestination);

  //       const routeRegex = /(-?\d+|I-\d+|US-\d+|SR-\d+)/g;
  //       const cleanedText = lowerText?.replace(/[\(\)\.]/g, ' ');

  //       const routeMatches = [...cleanedText.matchAll(routeRegex)].map(
  //         m => m[1],
  //       );

  //       const cleanedRoutes = getCleanRoutes(routeMatches);
  //       setRoute(cleanedRoutes);
  //       // const [originCoords, destinationCoords] = await Promise.all([
  //       //   isRouteRelated(origin),
  //       //   isRouteRelated(destination),
  //       // ]);
  //       // Destination from "end on" to end of string
  //       // }
  //       //   return {origin, destination};
  //       // } else {
  //       // fallback: only origin found
  //       // return {origin: text.trim(), destination: ''};
  //     }
  //     // const isLocation = isRouteRelated(word)
  //     // const finalResult  = await checkWithGeoAPI(word);
  //   }
  // };

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