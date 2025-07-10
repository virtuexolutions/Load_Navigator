import React, {useEffect, useRef} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import 'react-native-get-random-values';
import Modal from 'react-native-modal';
import PlacesInput from 'react-native-places-input';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';

import {useDispatch} from 'react-redux';

const SearchLocationModal = ({
  isModalVisible,
  setIsModalVisible,
  setUserAddress,
  locationType,
  setPickupLocation,
  setdropOffLocation,
  userAddress,
}) => {
  const dispatch = useDispatch();
  const googlePlacesRef = useRef(null);
  useEffect(() => {}, [userAddress]);
  return (
    <Modal
      hasBackdrop={true}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      isVisible={isModalVisible}
      onBackdropPress={() => {
        setIsModalVisible(false);
      }}>
      <KeyboardAvoidingView>
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

          <PlacesInput
            googleApiKey={'AIzaSyDacSuTjcDtJs36p3HTDwpDMLkvnDss4H8'}
            placeHolder="Search location"
            textInputProps={{
              placeholderTextColor: Color.darkGray, // ✅ set here
            }}
            onSelect={(data, details = null) => {
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
          />
        </View>
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
