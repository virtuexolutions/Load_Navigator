import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import { changePasswordSchema } from '../Constant/schema';
import navigationService from '../navigationService';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import CountryStatePicker from '../Components/CountryStatePicker';
import SearchLocationModal from '../Components/SearchLocationModal';
import { Checkbox, Icon } from 'native-base';
import { setUserData } from '../Store/slices/common';
import AntDesign from 'react-native-vector-icons/AntDesign'
const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  console.log("🚀 ~ Profile ~ userData:", userData)
  const [email, setEmail] = useState(userData?.email || '');
  const [Contact, setContact] = useState(userData?.contact || '');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [firstName, setFirstName] = useState(userData?.first_name || '');
  const [LastName, setLastName] = useState(userData?.last_name || '');
  const [company, setcompany] = useState(userData?.company_name || '');
  // const [company, setExperience] = useState(userD
  const [includeme, setIncludeMe] = useState(false);
  const [Insurance, setInsurance] = useState(false);
  const [userAddress, setUserAddress] = useState(userData?.address || '');
  const [selectedState, setSelectedState] = useState(userData?.state || '');
  const [Experience, setExperience] = useState(userData?.experience || '');
  const [phoneError, setPhoneError] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(
    userData?.selected_area == 'Sign Up For Canada' ? 'Canada' : 'USA',
  );
  const countryOptions = ['Canada', 'USA'];
  const [InsuranceCertificate, setInsuranceCertificate] = useState(
    userData?.car_certificate || '',
  );
  const [selectedPosition, setSelectedPosition] = useState([]);


  const positionOptions = [
    {
      id: 1,
      text: 'Lead',
    },
    {
      id: 2,
      text: 'Chase',
      key: 'chase',
    },
    {
      id: 3,
      text: 'High Pole',
      key: 'pole',
    },
    {
      id: 4,
      text: 'Steer',
      key: 'steer',
    },
    {
      id: 5,
      text: 'Route Survey',
      key: 'survey',
    },
    {
      id: 6,
      text: 'Third Car',
      key: 'thirdCar',
    },
    {
      id: 7,
      text: 'Fourth Car',
      key: 'fourthCar',
    },
  ];


  const isValidCanadianNumber = (phone) => {
    const regex = /^\+1\d{10}$/;
    return regex.test(phone);
  };



  // const updateProfile = async () => {
  //   const body = {
  //     first_name: firstName,
  //     //     last_name: LastName,
  //     //     email: email,
  //     contact: Contact,
  //     company_name: company,
  //     address: userAddress,
  //     role: selectedUserType,
  //     state: selectedState,
  //   };
  //   const body1 = {
  //     first_name: firstName,
  //     last_name: LastName,
  //     email: email,
  //     contact: Contact,
  //     experience: Experience,
  //     car_certificate: InsuranceCertificate,
  //     includeme_car_directory: includeme,
  //     address: userAddress,
  //     state: selectedState,
  //   };
  //   const response = await Post(
  //     url,
  //     userData?.role== 'pilot' ? body1 : body,
  //     apiHeader(token),
  //   );
  //   if (response != undefined) {
  //   }
  // };

  // const updateProfile = async () => {

  //   const body = {
  //     first_name: firstName,
  //     last_name: LastName,
  //     email: email,
  //     contact: Contact,
  //     company_name: company,
  //     address: userAddress,
  //     role: selectedUserType,
  //     state: selectedState,
  //   };
  //   const body1 = {
  //     first_name: firstName,
  //     last_name: LastName,
  //     email: email,
  //     contact: Contact,
  //     experience: Experience,
  //     car_certificate: InsuranceCertificate,
  //     includeme_car_directory: includeme,
  //     address: userAddress,
  //     state: selectedState,
  //   };
  //   return console.log("body === > ", JSON.stringify(body1, null, 2));
  //   for (let key in userData?.role== 'pilot' ? body1 : body) {
  //     if (body[key] == '') {
  //       return Platform.OS == 'android'
  //       ? ToastAndroid.show(` ${key} field is empty`, ToastAndroid.SHORT)
  //       : Alert.alert(` ${key} field is empty`);
  //     }
  //   }
  //   const url = 'auth/profile';
  //   setIsLoading(true);
  //   const response = await Post(url, body, apiHeader(token));
  //   setIsLoading(false);
  //   if (response?.data != undefined) {
  //     Platform.OS == 'android'
  //       ? ToastAndroid.show('change password uccessfully', ToastAndroid.SHORT)
  //       : Alert.alert('change password uccessfully');
  //     navigationService.navigate('PostLoadScreen');
  //   }
  // };
  const updateProfile = async () => {
    const body = {
      // first_name: firstName,
      // last_name: LastName,
      email: email,
      contact: Contact,
      company_name: company,
      address: userAddress?.name,
      // role: selectedUserType,
      state: selectedState,
      escort_positions: []
    };

    const body1 = {
      first_name: firstName,
      last_name: LastName,
      email: email,
      contact: Contact,
      experience: Experience,
      car_certificate: Insurance,
      includeme_car_directory: includeme,
      address: userAddress,
      state: selectedState,
      escort_positions: selectedPosition
    };

    const isPilot = userData?.role === 'pilot';
    const selectedBody = isPilot ? body1 : body;

    console.log('body === > ', JSON.stringify(selectedBody, null, 2)); // ✅

    for (let key in selectedBody) {
      if (selectedBody[key] === '') {
        return Platform.OS === 'android'
          ? ToastAndroid.show(` ${key} field is empty`, ToastAndroid.SHORT)
          : Alert.alert(` ${key} field is empty`);
      }
    }

    const url = 'auth/profile';
    setIsLoading(true);
    const response = await Post(url, selectedBody, apiHeader(token));
    console.log(response?.data, '============================>')
    setIsLoading(false);

    if (response?.data !== undefined) {
      Platform.OS === 'android'
        ? ToastAndroid.show('Profile updated successfully', ToastAndroid.SHORT)
        : Alert.alert('Profile updated successfully');

      dispatch(setUserData(response?.data?.user_info));
      isPilot
        ? navigationService.navigate('ViewLeadBoard')
        : navigationService.navigate('PostLoadScreen');
    }
  };
  return (
    <SafeAreaView
      style={[
        styles.main_view,
        {
          backgroundColor:
            userData?.role == 'pilot'
              ? Color.primary
              : Color.secondary,
        },
      ]}>
      <Header
        title="Profile"
        headerColor={
          userData?.role == 'pilot'
            ? Color.primary
            : Color.secondary
        }
        textstyle={{ color: Color.white }}
        showBack
        menu
      />
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'light-content'}
      />
      <View
        style={[
          styles.mainScreen,
          {
            backgroundColor:
              userData?.role == 'pilot'
                ? Color.primary
                : Color.white,
          },
        ]}>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: moderateScale(70, 0.6),
          }}
          style={styles.text_input}>
          {userData?.role == 'pilot' ? (
            <>
              <TextInputWithTitle
                titleStlye={{
                  color:
                    userData?.role == 'pilot'
                      ? Color.white
                      : Color.black,
                }}
                title={'First Name'}
                placeholder={'CFirst Name'}
                setText={setFirstName}
                value={firstName}
                // secureText={true}
                viewHeight={0.06}
                viewWidth={0.8}
                inputWidth={0.75}
                border={1}
                borderRadius={moderateScale(30, 0.3)}
                borderColor={'#000'}
                backgroundColor={Color.white}
                marginTop={moderateScale(10, 0.3)}
                color={Color.black}
                placeholderColor={Color.veryLightGray}
              />

              <TextInputWithTitle
                titleStlye={{
                  color:
                    userData?.role == 'pilot'
                      ? Color.white
                      : Color.black,
                }}
                title={'Last Name'}
                titleText={'Last Name'}
                placeholder={'Last Name'}
                setText={setLastName}
                value={LastName}
                // secureText={true}
                viewHeight={0.06}
                viewWidth={0.8}
                inputWidth={0.75}
                border={1}
                borderRadius={moderateScale(30, 0.3)}
                borderColor={'#000'}
                backgroundColor={Color.white}
                marginTop={moderateScale(10, 0.3)}
                color={Color.black}
                placeholderColor={Color.veryLightGray}
              />
            </>
          ) : (
            <>
              <TextInputWithTitle
                titleStlye={{
                  color:
                    userData?.role == 'pilot'
                      ? Color.white
                      : Color.black,
                }}
                title={'Company'}
                titleText={'Company'}
                placeholder={'Company'}
                setText={setcompany}
                value={company}
                secureText={false}
                viewHeight={0.06}
                viewWidth={0.8}
                inputWidth={0.75}
                border={1}
                borderRadius={moderateScale(30, 0.3)}
                borderColor={'#000'}
                backgroundColor={Color.white}
                marginTop={moderateScale(10, 0.3)}
                color={Color.black}
                placeholderColor={Color.veryLightGray}
              />
            </>
          )}

          <TextInputWithTitle
            titleStlye={{
              color:
                userData?.role == 'pilot'
                  ? Color.white
                  : Color.black,
            }}
            title={'Email'}
            titleText={'Email'}
            placeholder={'Confirm your new password'}
            setText={setEmail}
            value={email}
            secureText={false}
            viewHeight={0.06}
            viewWidth={0.8}
            inputWidth={0.75}
            border={1}
            borderRadius={moderateScale(30, 0.3)}
            borderColor={'#000'}
            backgroundColor={Color.white}
            marginTop={moderateScale(10, 0.3)}
            color={Color.black}
            placeholderColor={Color.veryLightGray}
            disabled
          />
          <TextInputWithTitle
            titleStlye={{
              color:
                userData?.role == 'pilot'
                  ? Color.white
                  : Color.black,
            }}
            title={'Contact'}
            titleText={'Contact'}
            placeholder={'Contact'}
            setText={(text) => {
              setContact(text);
              if (text.length === 0) {
                setPhoneError('Phone number is required');
              } else if (!isValidCanadianNumber(text)) {
                setPhoneError('Enter valid Canadian number e.g. +1XXXXXXXXXX');
              } else {
                setPhoneError('');
              }
            }}
            value={Contact}
            secureText={false}
            viewHeight={0.06}
            viewWidth={0.8}
            inputWidth={0.75}
            border={1}
            borderRadius={moderateScale(30, 0.3)}
            borderColor={'#000'}
            backgroundColor={Color.white}
            marginTop={moderateScale(10, 0.3)}
            color={Color.black}
            placeholderColor={Color.veryLightGray}
          // disabled
          />
          {phoneError !== '' && (
            <CustomText style={{ color: 'red', marginTop: 5, marginLeft: 15, textAlign: 'left', width: '90%', fontSize: moderateScale(9, 0.6) }}>
              {phoneError}
            </CustomText>
          )}
          <CustomText
            style={{
              fontSize: moderateScale(12, 0.6),
              textAlign: 'left',
              width: windowWidth * 0.68,
              paddingTop: moderateScale(10, 0.6),
              color:
                userData?.role == 'pilot'
                  ? Color.white
                  : Color.black,
            }}>
            Address
          </CustomText>
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(true);
            }}
            style={[styles.address_btn]}>
            <CustomText
              numberOfLines={1}
              style={{
                fontSize: moderateScale(13, 0.6),
                color: Color.mediumGray,
              }}>
              {userAddress?.name ? userAddress?.name : userData?.address}
            </CustomText>
          </TouchableOpacity>
          <CustomText
            isBold
            style={{
              // alignSelf: 'flex-start',
              color:
                userData?.role == 'pilot'
                  ? Color.white
                  : Color.darkGray,
              paddingVertical: moderateScale(10, 0.6),
              width: windowWidth * 0.68,
            }}>
            State
          </CustomText>

          <View
            style={{
              height: windowHeight * 0.06,
              width: windowWidth * 0.8,
              borderWidth: 1,
              borderRadius: 30,
              paddingVertical: moderateScale(13, 0.6),
              paddingHorizontal: moderateScale(15, 0.6),
              borderColor: Color.lightGrey,
              backgroundColor: Color.white,
            }}>
            <CustomText
              style={{
                fontSize: moderateScale(12, 0.6),
              }}>
              {selectedState}
            </CustomText>
          </View>
          {userData?.role == 'pilot' && (
            <TextInputWithTitle
              titleStlye={{
                color:
                  userData?.role == 'pilot'
                    ? Color.white
                    : Color.black,
              }}
              title={'experience'}
              titleText={'experience'}
              placeholder={'Experience'}
              setText={setExperience}
              value={Experience}
              secureText={false}
              viewHeight={0.06}
              viewWidth={0.8}
              inputWidth={0.75}
              border={1}
              borderRadius={moderateScale(30, 0.3)}
              borderColor={'#000'}
              backgroundColor={Color.white}
              marginTop={moderateScale(10, 0.3)}
              marginBottom={moderateScale(10, 0.6)}
              color={Color.black}
              placeholderColor={Color.veryLightGray}
            // disabled
            />
          )}
          {userData?.role == 'pilot' && (
            <>
              <CustomText
                isBold
                style={{
                  // alignSelf: 'flex-start',
                  color:
                    userData?.role == 'pilot'
                      ? Color.white
                      : Color.darkGray,
                  paddingVertical: moderateScale(10, 0.6),
                  width: windowWidth * 0.68,
                }}>
                Select Escort Position
              </CustomText>
              {positionOptions?.map(item => {
                const isActive = selectedPosition?.includes(item?.text);
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      if (selectedPosition?.includes(item?.text)) {
                        setSelectedPosition(prev =>
                          prev.filter(pos => pos !== item?.text),
                        );
                      } else {
                        setSelectedPosition(prev => [...prev, item?.text]);
                      }
                    }}
                    style={[
                      styles.row_view,
                      {
                        width: windowWidth * 0.8,
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        marginBottom: moderateScale(7, 0.6),
                        marginLeft: moderateScale(10, 0.6),
                      },
                    ]}>
                    <View
                      style={[
                        styles.box,
                        {
                          borderWidth: 1,
                          borderColor: isActive ? Color.secondary : 'black',
                          backgroundColor: isActive
                            ? Color.secondary
                            : Color.white,
                        },
                      ]}>
                      <Icon
                        name="check"
                        as={AntDesign}
                        size={moderateScale(14, 0.6)}
                        color={Color.white}
                      />
                    </View>
                    <CustomText style={styles.text}>{item.text}</CustomText>
                  </TouchableOpacity>

                );
              })}
              <Checkbox
                style={{
                  alignItems: 'flex-start',
                }}
                colorScheme={'red'}
                value={includeme}
                onChange={isSelected => {
                  setIncludeMe(!includeme);
                }}
                _text={{ color: Color.white, fontSize: moderateScale(13, 0.6) }}
                my={2}>
                Include Me In The Pilot Car Directory {'         '}
              </Checkbox>
              <Checkbox
                colorScheme={'red'}
                value={Insurance}
                onChange={isSelected => {
                  setInsurance(!Insurance);
                }}
                _text={{ color: Color.white, fontSize: moderateScale(13, 0.6) }}
                my={2}
                style={{
                  color: 'white',
                }}>
                I Have Pilot Car Certifications And Insurance
              </Checkbox>
            </>
          )}
          {/* <CountryStatePicker
            style_dropDown={{
              height: windowHeight * 0.06,
              backgroundColor:
                userData?.role?== 'pilot'
                  ? Color.white
                  : 'transparent',
              width: windowWidth * 0.8,
              borderWidth: 0.5,
              justifyContent: 'center',

              paddingHorizontal: moderateScale(15, 0.6),
              borderColor: Color.veryLightGray,
              borderRadius: moderateScale(30, 0.6),
            }}
            country={selectedCountry}
            setSelectedState={setSelectedState}
            selectedState={selectedState}
          /> */}
          <CustomButton
            onPress={() => {
              updateProfile();
            }}
            text={
              isLoading ? (
                <ActivityIndicator size={'small'} color={Color.white} />
              ) : (
                'Update'
              )
            }
            fontSize={moderateScale(12, 0.3)}
            textColor={Color.white}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.8}
            height={windowHeight * 0.065}
            marginTop={moderateScale(20, 0.3)}
            bgColor={Color.secondary}
            isBold
            elevation
          />
          <SearchLocationModal
            locationType={'address'}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            setUserAddress={setUserAddress}
            userAddress={userAddress}
            setState={setSelectedState}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
const styles = ScaledSheet.create({
  mainScreen: {
    width: windowWidth,
    height: windowHeight * 0.9,
    backgroundColor: Color.white,
    alignItems: 'center',
  },
  main_view: {
    height: windowHeight,
    width: windowWidth,
  },

  text_input: {
    marginTop: windowHeight * 0.06,
    borderWidth: 1,
    borderColor: '#C32C2745',
    width: windowWidth * 0.9,
    borderRadius: 20,
    paddingTop: windowHeight * 0.03,
    paddingVertical: moderateScale(20, 0.6),
    paddingHorizontal: moderateScale(20, 0.6),
  },

  schemaText: {
    fontSize: moderateScale(10, 0.6),
    color: 'red',
    alignSelf: 'flex-start',
  },
  address_btn: {
    width: windowWidth * 0.8,
    borderWidth: 0.6,
    height: windowHeight * 0.06,
    borderColor: Color.lightGrey,
    marginTop: moderateScale(15, 0.6),
    borderRadius: moderateScale(30, 0.6),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(15, 0.6),
    backgroundColor: Color.white,
  },
  row_view: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    height: moderateScale(16, 0.6),
    width: moderateScale(16, 0.6),
    marginRight: moderateScale(6, 0.6),
    borderRadius: moderateScale(4, 0.6),
  },
  text: {
    fontSize: moderateScale(12, 0.6),
    color: Color.white
  },
});
