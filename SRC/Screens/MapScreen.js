import {isValidCoordinate} from 'geolib';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import BackgroundGeolocation from 'react-native-background-geolocation';
import {moderateScale} from 'react-native-size-matters';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import Header from '../Components/Header';
import {setIsTrackingActive} from '../Store/slices/common';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {getDistance} from 'geolib';
import NearDropoffModal from '../Components/NearDropoffModal';
import RouteWatcher from '../Components/RouteWatcher';

const MapScreen = props => {
  const data = props?.route?.params?.data;
  console.log(
    ' ===========a================ >>>>>>>>>>>>>>> from mapscreen data ',
    data,
    parseFloat(data?.origin?.lat),
    typeof data?.origin?.lng,
  );

  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  const userRole = useSelector(state => state.commonReducer.selectedRole);

  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const consecutiveRef = useRef(0);
  console.log('first ================>>>>>> ', consecutiveRef);
  const markerRef = useRef(null);

  const [isRouteFitted, setIsRouteFitted] = useState(false);
  const origin = {latitude: 24.85989, longitude: 67.0623337}; // Apple HQ
  const destination = {latitude: 24.8597519, longitude: 67.0615804};
  const [enabled, setEnabled] = useState(false);
  const [lastLocation, setLastLocation] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [status, setStatus] = useState('');
  const [outOfRoute, setOutOfRoute] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log('first ================= >>> isModalVisible', isModalVisible);
  const [isNear, setIsNear] = useState(false);

  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [markerPosition, setMarkerPosition] = useState({
    latitude: origin?.latitude,
    longitude: origin?.longitude,
  });
  console.log('first ================= >>> marker position', currentPosition);

  useEffect(() => {
    getCurrent();
  }, []);

  useEffect(() => {
    if (isValidCoordinate(origin)) {
      setTimeout(() => {
        mapRef.current?.animateToRegion(
          {
            latitude: parseFloat(currentPosition.latitude),
            longitude: parseFloat(currentPosition.longitude),
            // latitudeDelta: 0.0522,
            // longitudeDelta: 0.0521,
          },
          1000,
        );
      }, 200);
    }
  }, [origin]);

  const getCurrentLocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          position => {
            const coords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            resolve(coords);
            // getAddressFromCoordinates(
            //   position.coords.latitude,
            //   position.coords.longitude,
            // );
          },
          error => {
            reject(new Error(error.message));
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          },
        );
      });
      setCurrentPosition(position);
    } catch (error) {
      console.error('Error getting location:', error);
      throw error;
    }
  };

  // const getAddressFromCoordinates = async (latitude, longitude) => {
  //   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${origin?.latitude},${origin?.longitude}&key=${GOOGLE_MAPS_API_KEY}`;
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

  useEffect(() => {
    // Event listeners
    checkIfNearDropLocation();
    const onLocation = BackgroundGeolocation.onLocation(
      location => {
        setLastLocation(location);
      },
      error => {
        console.warn('[onLocation] ERROR', error);
      },
    );
    const onMotionChange = BackgroundGeolocation.onMotionChange(event => {
      console.log(
        'Device is moving============== >>>[onMotionChange]====================> >> > >>',
        event,
      );
      Alert.alert('Motion Change =============== >>>', JSON.stringify(event));
      if (event.isMoving) {
        // Alert.alert(
        //   'Device is moving============== >>>',
        //   JSON.stringify(event.location.coords, null, 2),
        // );
        setMarkerPosition({
          latitude: event.location.coords.latitude,
          longitude: event.location.coords.longitude,
        });
      }
    });
    const onProviderChange = BackgroundGeolocation.onProviderChange(
      provider => {
        console.log('[onProviderChange] ', provider);
        setStatus(provider.status);
      },
    );
    // ready configuration
    BackgroundGeolocation.ready({
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 0.1,
      stopTimeout: 5,
      debug: false,
      logLevel: BackgroundGeolocation.LOG_LEVEL_OFF,
      stopOnTerminate: false,
      startOnBoot: true,
      autoSync: true,
      batchSync: false,
      // NOTE: Replace with your server URL if you want automatic HTTP sync:
      // url: 'https://yourserver.com/locations',
      // headers: { 'X-APP-TOKEN': 'mytoken' },
      // params: { driver_id: 'DRIVER-123' }
    })
      .then(state => {
        // console.log('- BackgroundGeolocation ready: ', state);
        setEnabled(state.enabled);
      })
      .catch(err => console.warn('ready error', err));
    return () => {
      // Remove listeners and stop plugin when component unmounts (optional)
      onLocation.remove();
      onMotionChange.remove();
      onProviderChange.remove();
      BackgroundGeolocation.removeListeners();
    };
  }, []);
  const startTracking = async () => {
    try {
      const status = await BackgroundGeolocation.requestPermission();
      console.log('permission status:', status);
    } catch (e) {
      console.warn('permission request error', e);
    }
    BackgroundGeolocation.start()
      .then(() => {
        // console.log('o')
        console.log('=====================>>>>>Tracking started');
        setEnabled(true);
        dispatch(setIsTrackingActive(data));
      })
      .catch(e => console.warn(e));
  };
  const stop = () => {
    BackgroundGeolocation.stop()
      .then(() => {
        console.log('Tracking stopped');
        setEnabled(false);
      })
      .catch(e => console.warn(e));
  };
  const getCurrent = () => {
    BackgroundGeolocation.getCurrentPosition({
      persist: true,
      timeout: 30,
    })
      .then(location => {
        // console.log('=================>>>>>>Current Position', location);
        setCurrentPosition({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        // Alert.alert(
        //   'Current Position',
        //   JSON.stringify(location.coords, null, 2),
        // );
      })
      .catch(err => {
        console.warn('getCurrentPosition error', err);
      });
  };

  // Drop location ka example
  // const DROP_LOCATION = {
  //   latitude: 28.7041, // Replace with your drop latitude
  //   longitude: 77.1025, // Replace with your drop longitude
  // };

  // // Threshold distance in meters (example: 50 meters)
  const THRESHOLD_DISTANCE = 90;

  const checkIfNearDropLocation = async () => {
    try {
      // Current location get karna
      const location = await BackgroundGeolocation.getCurrentPosition({
        samples: 1, // Only 1 sample to get fast result
        persist: false,
      });
      console.log(
        'Current Location ====================== >>>>>>>>> form radius :',
        location,
      );

      const distance = getDistance(
        {
          latitude: location?.coords?.latitude,
          longitude: location?.coords?.longitude,
        },
        {latitude: destination?.latitude, longitude: destination?.longitude},
      );

      if (distance <= THRESHOLD_DISTANCE) {
        console.log(
          `✅ You are near the drop location! Distance: ${distance}m`,
        );
        setIsModalVisible(true);
        setIsNear(true);

        // return true;
      } else {
        console.log(
          `❌ You are far from drop location. Distance: ${distance}m`,
        );
        return false;
      }
    } catch (error) {
      console.log('Error getting location:', error);
      return false;
    }
  };

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
          // initialRegion={{
          //   latitude: data?.origin?.lat,
          //   longitude: data?.origin?.lng,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0421,
          // }}

          initialRegion={{
            latitude: origin?.latitude,
            longitude: origin?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          // customMapStyle={customMapStyle}
        >
          {/* {Object?.keys(markerPosition)?.length > 0 &&
            isValidCoordinate(markerPosition) && ( */}
              <Marker
                // ref={markerRef}
                // coordinate={{
                //   latitude: parseFloat(data?.origin?.lat),
                //   longitude: parseFloat(data?.origin?.lng),
                // }}
                // coordinate={markerPosition}
                coordinate={{
                  latitude: parseFloat(markerPosition?.latitude),
                  longitude: parseFloat(markerPosition?.longitude),
                }}
                pinColor="red"
              />
            {/* )} */}
          {Object?.keys(destination)?.length > 0 &&
            isValidCoordinate(destination) && (
              <Marker
                coordinate={{
                  latitude: parseFloat(destination?.latitude),
                  longitude: parseFloat(destination?.longitude),
                }}
                // coordinate={{
                //   latitude: parseFloat(data?.destination?.lat),
                //   longitude: parseFloat(data?.destination?.lng),
                // }}
                pinColor="red"
              />
            )}

          <MapViewDirections
            apikey={'AIzaSyDacSuTjcDtJs36p3HTDwpDMLkvnDss4H8'}
            origin={{
              latitude: parseFloat(origin?.latitude),
              longitude: parseFloat(origin?.longitude),
            }}
            destination={{
              latitude: parseFloat(destination?.latitude),
              longitude: parseFloat(destination?.longitude),
            }}
            // origin={{latitude: parseFloat(data?.origin?.lat), longitude: parseFloat(data?.origin?.lng)}}
            // destination={{latitude: parseFloat(data?.destination?.lat), longitude: parseFloat(data?.destination?.lng)}}
            strokeColor={Color.black}
            strokeWidth={6}
            // waypoints={data?.waypoints}
            onError={error => console.log('MapViewDirections Error:', error)}
            onReady={result => {
              if (mapRef.current) {
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: 50,
                    left: 50,
                    top: 300,
                    bottom: 100,
                  },
                });
              }
            }}
          />
          {/* {Object.keys(destination)?.length > 0 &&
            isValidCoordinate(destination) && (
              <Marker
                pinColor={Color.black}
                coordinate={{
                  latitude: destination?.latitude,
                  longitude: destination?.longitude,
                }}
              />
            )} */}
        </MapView>
        <View style={styles.btn_con}>
          <CustomButton
            text={
              // isloading ? (
              //   <ActivityIndicator size={'small'} color={Color.white} />
              // ) : (
              isNear ? 'end' : 'start '
              // )
            }
            fontSize={moderateScale(14, 0.3)}
            textColor={Color.white}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.85}
            marginTop={moderateScale(10, 0.3)}
            height={windowHeight * 0.07}
            bgColor={Color.secondary}
            borderWidth={1.5}
            borderColor={Color.secondary}
            textTransform={'capitalize'}
            isBold
            onPress={() => {
              // isNear ? stop() :
              startTracking();
              // onPressStartNavigation();
            }}
          />
        </View>
      </View>
      <NearDropoffModal
        isVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      {/* {outOfRoute && ( */}
      <RouteWatcher
        routeCoords={[
          origin,
          destination,
          ...((Array.isArray(data?.waypoints) && data.waypoints) || []),
        ].filter(Boolean)}
        threshold={90} // tune (see notes)
        requiredConsecutive={3}
        outOfRoute={outOfRoute}
        setOutOfRoute={setOutOfRoute}
      />

      {/* )} */}
    </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  safe_are: {
    flex: 1,
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
  btn_con: {
    alignItems: 'center',
    width: windowWidth,
    height: windowHeight * 0.2,
    position: 'absolute',
    bottom: 20,
  },
});
