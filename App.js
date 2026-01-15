/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {StripeProvider} from '@stripe/stripe-react-native';
import {NativeBaseProvider} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from './SRC/Screens/SplashScreen';
import {persistor, store} from './SRC/Store/index';
import {
  requestBackgroundLocationPermission,
  requestCameraPermission,
  requestLocationPermission,
  requestWritePermission,
} from './SRC/Utillity/utils';
import AppNavigator from './SRC/appNavigation';
import {LogBox} from 'react-native';
import {ModalProvider} from './SRC/Components/ModalContext';
import CustomAlertModal from './SRC/Components/CustomAlertModal';
import BackgroundGeolocation from 'react-native-background-geolocation';
const App = () => {
  LogBox.ignoreLogs([
    'Warning: ...',
    'VirtualizedLists should never be nested',
  ]);
  LogBox.ignoreAllLogs();
  return (
    <StripeProvider
      publishableKey={
        'pk_test_51RrOdl143ClE9hFYBJMyzFmAmYmTEF2EV1pEmiuZkxvUaLCIWzuKGbzchPNGHCBu0F9oDiVNkirzsgMDY9t8W80400Jx7u1WcD'
      }>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NativeBaseProvider>
            {/* <ModalProvider> */}
            <MainContainer />
            {/* <CustomAlertModal/> */}
            {/* </ModalProvider> */}
          </NativeBaseProvider>
        </PersistGate>
      </Provider>
    </StripeProvider>
  );
};

const MainContainer = () => {
  useEffect(() => {
    async function GetPermission() {
      await requestLocationPermission();
      await requestCameraPermission();
      await requestWritePermission();
      await requestBackgroundLocationPermission();
    }
    GetPermission();
  }, []);

  const [isloading] = useloader(true);
  if (isloading == true) {
    return <SplashScreen />;
  }

  return <AppNavigator />;
  // return <PostLoadScreen />
};

const useloader = value => {
  const [isloading, setIsloading] = useState(value);
  const [loadingTime] = useState(5000);
  useEffect(() => {
    setTimeout(() => setIsloading(false), loadingTime);
  }, []);
  return [isloading];
};
export default App;

// import React, {useEffect, useState} from 'react';
// import {SafeAreaView, View, Text, Button, StyleSheet, Alert, Platform} from 'react-native';
// import BackgroundGeolocation from 'react-native-background-geolocation';
// export default function App() {
//   const [enabled, setEnabled] = useState(false);
//   const [lastLocation, setLastLocation] = useState(null);
//   const [status, setStatus] = useState('unknown');
//   useEffect(() => {
//     // Event listeners
//     const onLocation = BackgroundGeolocation.onLocation(location => {
//       console.log('[onLocation] ', location);
//       setLastLocation(location);
//     }, error => {
//       console.warn('[onLocation] ERROR', error);
//     });
//     const onMotionChange = BackgroundGeolocation.onMotionChange(event => {
//       console.log('[onMotionChange] ', event);
//     });
//     const onProviderChange = BackgroundGeolocation.onProviderChange(provider => {
//       console.log('[onProviderChange] ', provider);
//       setStatus(provider.status);
//     });
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
//     }).then(state => {
//       console.log('- BackgroundGeolocation ready: ', state);
//       setEnabled(state.enabled);
//     }).catch(err => console.warn('ready error', err));
//     return () => {
//       // Remove listeners and stop plugin when component unmounts (optional)
//       onLocation.remove();
//       onMotionChange.remove();
//       onProviderChange.remove();
//       BackgroundGeolocation.removeListeners();
//     };
//   }, []);
//   const start = async () => {
//     try {
//       const status = await BackgroundGeolocation.requestPermission();
//       console.log('permission status:', status);
//     } catch (e) {
//       console.warn('permission request error', e);
//     }
//     BackgroundGeolocation.start().then(() => {
//       console.log('Tracking started');
//       setEnabled(true);
//     }).catch(e => console.warn(e));
//   };
//   const stop = () => {
//     BackgroundGeolocation.stop().then(() => {
//       console.log('Tracking stopped');
//       setEnabled(false);
//     }).catch(e => console.warn(e));
//   };
//   const getCurrent = () => {
//     BackgroundGeolocation.getCurrentPosition({
//       persist: true,
//       timeout: 30
//     }).then(location => {
//       Alert.alert('Current Position', JSON.stringify(location.coords, null, 2));
//     }).catch(err => {
//       console.warn('getCurrentPosition error', err);
//     });
//   };
//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>React Native Background Geolocation — Demo</Text>
//       <View style={styles.row}>
//         <Text>Status: {enabled ? 'Tracking' : 'Stopped'}</Text>
//       </View>
//       <View style={styles.row}>
//         <Button title="Start Tracking" onPress={start} />
//         <View style={{width:12}} />
//         <Button title="Stop Tracking" onPress={stop} />
//       </View>
//       <View style={styles.row}>
//         <Button title="Get Current Position" onPress={getCurrent} />
//       </View>
//       <View style={{marginTop:20}}>
//         <Text style={{fontWeight:'600'}}>Last Location:</Text>
//         <Text>{lastLocation ? JSON.stringify(lastLocation.coords, null, 2) : 'No location yet'}</Text>
//       </View>
//       <View style={{marginTop:10}}>
//         <Text>Provider status: {status}</Text>
//       </View>
//       <View style={{marginTop:24}}>
//         <Text style={{fontSize:12, color:'#666'}}>Note: Test on a real device. Configure native install per README.</Text>
//       </View>
//     </SafeAreaView>
//   );
// }
// const styles = StyleSheet.create({
//   container:{flex:1, padding:16},
//   title:{fontSize:18, fontWeight:'700', marginBottom:12},
//   row:{flexDirection:'row', alignItems:'center', marginBottom:12}
// });
