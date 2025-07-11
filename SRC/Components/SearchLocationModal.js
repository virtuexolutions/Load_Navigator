import React, {useEffect, useRef} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import 'react-native-get-random-values';
import Modal from 'react-native-modal';
import PlacesInput from 'react-native-places-input';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';

import {useDispatch} from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const SearchLocationModal = ({
  isModalVisible,
  setIsModalVisible,
  setUserAddress,
  locationType,
  setPickupLocation,
  setdropOffLocation,
  userAddress,
  setState = state => {},
}) => {
  const dispatch = useDispatch();
  const googlePlacesRef = useRef(null);
  useEffect(() => {}, [userAddress]);
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
      <KeyboardAvoidingView
        // behavior="padding"
        keyboardVerticalOffset={100}
        style={{flex: 1}}>
        {/* <ScrollView 
        // keyboardShouldPersistTaps="always"
        // keyboardDismissMode='on-drag'
        > */}
        <View style={styles.maincontainer}>
          <CustomText
            style={{
              color: Color.themeBlack,
              marginBottom: moderateScale(40, 0.3),
              fontSize: moderateScale(22, 0.6),
            }}
            isBold>
            Select Location
          </CustomText>
          <GooglePlacesAutocomplete
            onFail={error => console.error(error, 'errrrrrorrrr')}
            placeholder="Search"
            enablePoweredByContainer={true}
            nearbyPlacesAPI="GooglePlacesSearch"
            minLength={2}
            // suppressDefaultStyles
            // disableScroll={false}
            keepResultsAfterBlur={true}
            timeout={10000}
            debounce={10}
            textInputProps={{
              placeholderTextColor: '#5d5d5d',
              focusable: true,
            }}
            onPress={(data, details = null) => {
              console.log('Selected data:', data?.description);
              console.log(
                'Details:',
                details?.geometry?.location?.lat,
                details?.geometry?.location?.lng,
                data?.description,
              );
              const components = details.address_components;
              const state = components.find(c =>
                c.types.includes('administrative_area_level_1'),
              )?.long_name;
              const city = components.find(c =>
                c.types.includes('locality'),
              )?.long_name;
              const zip = components.find(c =>
                c.types.includes('postal_code'),
              )?.long_name;
              // setZipCode(zip)
              setState(state);
              // setCity(city)

              console.log('======================== >>>>>', state, city, zip);
              const location = {
                name: data?.description,
                lat: details?.geometry?.location?.lat,
                lng: details?.geometry?.location?.lng,
              };

              console.log('Location ========>>>>', location);

              if (locationType === 'origin') {
                setPickupLocation(location);
                console.log('origin ', location);
              } else if (locationType === 'destination') {
                setdropOffLocation(location);
              } else if (locationType === 'address') {
                setUserAddress(location);
              }
              Keyboard.dismiss();
              setIsModalVisible(false);
            }}
            listViewDisplayed="auto"
            query={{
              key: 'AIzaSyDacSuTjcDtJs36p3HTDwpDMLkvnDss4H8',
              language: 'en',
            }}
            predefinedPlaces={[]}
            isRowScrollable={true}
            fetchDetails={true}
            // textInputHidesKeyboard={true}

            styles={{
              textInputContainer: {
                width: windowWidth * 0.8,
                marginLeft: moderateScale(5, 0.6),
              },
              textInput: {
                height: windowHeight * 0.06,
                color: '#5d5d5d',
                fontSize: 16,
                borderWidth: 2,
                borderColor: Color.lightGrey,
                borderRadius: moderateScale(20, 0.6),
              },
              listView: {
                width: windowWidth * 0.8,
                marginLeft: moderateScale(5, 0.6),
                borderColor: Color.veryLightGray,
              },
              description: {
                color: 'black',
              },
            }}
          />

          {/* <GooglePlacesAutocomplete
          placeholder="Where to?"
          fetchDetails={true}
          debounce={200}
          enablePoweredByContainer={true}
          nearbyPlacesAPI="GooglePlacesSearch"
          minLength={2}
          timeout={10000}
          // keyboardShouldPersistTaps="always"
          
          listViewDisplayed="auto"
          
          keepResultsAfterBlur={false}
          currentLocation={false}
          currentLocationLabel="Current location"
          enableHighAccuracyLocation={true}
          onFail={() => console.warn('Google Places Autocomplete failed')}
          onNotFound={() => console.log('No results found')}
          onTimeout={() => console.warn('Google Places request timeout')}
          predefinedPlaces={[]}
          // predefinedPlacesAlwaysVisible={true}
          
          styles={{
            textInputContainer: {
              width: windowWidth * 0.8,
              height: windowHeight * 0.055,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: moderateScale(15, 0.6),
              borderWidth: 0.3,
              alignSelf: 'center',
              // marginHorizontal: 20,
              position: 'relative',
              shadowColor: '#d4d4d4',
              overflow: 'hidden',
            },
            textInput: {
              // backgroundColor: 'red',
              fontWeight: '600',
              fontSize: 16,
              marginTop: 5,
              width: '100%',
              fontFamily: 'JakartaSans-Medium',
              color: '#000',
            },
            // listView: {
            //   position: 'relative',
            //   top: 0,
            //   width: '100%',
            //   zIndex: 999,
            //   borderRadius: 10,
            //   shadowColor: '#d4d4d4',
            // },
            listView: {
              width: windowWidth * 0.8,
              marginLeft: moderateScale(5, 0.6),
              borderColor: Color.veryLightGray,
            },
          }}
          query={{
            key: 'AIzaSyDacSuTjcDtJs36p3HTDwpDMLkvnDss4H8',
            language: 'en',
            // types: 'geocode',
          }}
          onPress={(data, details = null) => {
            console.log('Selected data:', data?.description);
            console.log(
              'Details:',
              details?.geometry?.location?.lat,
              details?.geometry?.location?.lng,
              data?.description,
            );
            const components = details.address_components;
            const state = components.find(c =>
              c.types.includes('administrative_area_level_1'),
            )?.long_name;
            const city = components.find(c =>
              c.types.includes('locality'),
            )?.long_name;
            const zip = components.find(c =>
              c.types.includes('postal_code'),
            )?.long_name;
            // setZipCode(zip)
            setState(state)
            // setCity(city)
 
            console.log('======================== >>>>>', state, city, zip);
            const location = {
              name: data?.description,
              lat:  details?.geometry?.location?.lat,
              lng: details?.geometry?.location?.lng,
            };
 
            console.log('Location ========>>>>', location);
 
            if (locationType === 'origin') {
              setPickupLocation(location);
              console.log("origin ", location)
            } else if (locationType === 'destination') {
              setdropOffLocation(location);
            } else if (locationType === 'address') {
              setUserAddress(location);
            }
            Keyboard.dismiss();
            setIsModalVisible(false);
            // if (!details?.geometry?.location) {
            //   console.warn('Missing geometry details!');
            //   return;
            // }
 
            // handlePress({
            //   latitude: details?.geometry?.location?.lat,
            //   longitude: details?.geometry?.location?.lng,
            //   address: data.description,
            // });
          }}
          textInputProps={{
            placeholderTextColor: 'gray',
            placeholder: 'search',
            // blurOnSubmit: false,
            // focusable: true,
          }}
        />
  */}
          {/* <PlacesInput
            googleApiKey={'AIzaSyDacSuTjcDtJs36p3HTDwpDMLkvnDss4H8'}
            placeHolder="Search location"
            textInputProps={{
              placeholderTextColor: Color.darkGray, // ✅ set here
            }}
            onSelect={(data, details = null) => {
              console.log("🚀 ~ data:", JSON.stringify(data,null,2))
              const location = {
                name: data?.result?.formatted_address,
                lat: data?.result?.geometry?.location?.lat,
                lng: data?.result?.geometry?.location?.lng,
              };

              console.log('Location ========>>>>', location);

              if (locationType === 'origin') {
                setPickupLocation(location);
              } else if (locationType === 'destination') {
                setdropOffLocation(location);
              } else if (locationType === 'address') {
                setUserAddress(location);
              }

              setIsModalVisible(false);
            }}
            stylesContainer={{
              position: 'absolute',
              top: '10%',
              alignSelf: 'center',
              zIndex: 9999,
              elevation: 10,
            }}
            listViewProps={{
              keyboardShouldPersistTaps: 'handled',
              nestedScrollEnabled: true,
            }}
            stylesInput={{
              height: windowHeight * 0.06,
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 30,
              paddingHorizontal: moderateScale(15, 0.6),
              backgroundColor: Color.white,
              color: Color.black,
            }}
          /> */}
        </View>

        {/* </ScrollView> */}
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default SearchLocationModal;

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: Color.white,
    width: windowWidth * 0.9,
    height: windowHeight * 0.8,
    alignItems: 'center',
    borderRadius: moderateScale(20, 0.3),
    paddingVertical: moderateScale(15, 0.3),
    borderWidth: 1,
    borderColor: Color.mediumGray,
  },
});
