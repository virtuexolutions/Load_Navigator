/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NativeBaseProvider } from 'native-base';
import SplashScreen from './SRC/Screens/SplashScreen';
import { persistor, store } from './SRC/Store/index';
import {
  requestCameraPermission,
  requestLocationPermission,
  requestWritePermission,
} from './SRC/Utillity/utils';
import AppNavigator from './SRC/appNavigation';
import { StripeProvider } from '@stripe/stripe-react-native';
import PostLoadScreen from './SRC/Screens/PostLoadScreen';
import CarDirectory from './SRC/Screens/CarDirectory';

const App = () => {
  return (
    <StripeProvider
      publishableKey={
        'pk_test_51RoieKFIiQxtLicEZZqk0AwV9gdF7RWYSQsTOVEPgiGQmJQKhN5ZIINW7i5HC7LcX4teSDXXSfnwP8AJl1nUVjFg00ycMYLDEw'
      }>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NativeBaseProvider>
            <MainContainer />
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
