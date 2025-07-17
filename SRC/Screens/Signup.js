import { useNavigation } from '@react-navigation/native';
import { Icon } from 'native-base';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CountryStatePicker from '../Components/CountryStatePicker';
import CustomButton from '../Components/CustomButton';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import SearchLocationModal from '../Components/SearchLocationModal';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import { setUserToken } from '../Store/slices/auth-slice';
import { setUserData } from '../Store/slices/common';
import Entypo from 'react-native-vector-icons/Entypo';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import { SetUserRole } from '../Store/slices/auth';

const Signup = props => {
  const selectedArea = props?.route?.params?.selectedArea;

  const role = useSelector(state => state.authReducer.role);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [Contact, setContact] = useState('');
  const [company, setcompany] = useState('');
  const [userAddress, setUserAddress] = useState({});
  const [mcNumber, setmcNumber] = useState('');
  const [dotNumber, setdotNumber] = useState('');
  const [password, setpassword] = useState('');
  const [Experience, setExperience] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [aboutUs, setaboutUs] = useState({});
  const [Policy, setPolicy] = useState(false);
  const [InsuranceCertificate, setInsuranceCertificate] = useState(false);
  const [CarDirectory, setCarDirectory] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [phoneError, setPhoneError] = useState('')
  const [commnuicationMode, setCommunicationMode] = useState('call');
  const [selectedUserType, setSelectedUserType] = useState('');
  console.log("🚀 ~ selectedUserType:", selectedUserType)
  const [isSelected, setIsSelected] = useState(false);

  const onPressregister = async values => {
    const body = {
      first_name: firstName,
      last_name: LastName,
      email: email,
      contact: Contact,
      company_name: company,
      address: userAddress?.name,
      dot_number: dotNumber,
      mc_number: mcNumber,
      password: password,
      confirm_password: confirmPassword,
      hear_about_us: aboutUs?.name,
      agree_to_terms: Policy,
      selected_area: selectedArea,
      // role: selectedUserType == 'Company' && 'Company',
      role: selectedUserType,
      // state: selectedState?.label,
      state: selectedState,
    };
    const body1 = {
      first_name: firstName,
      last_name: LastName,
      email: email,
      contact: Contact,
      company_name: company,
      password: password,
      confirm_password: confirmPassword,
      hear_about_us: aboutUs?.name,
      agree_to_terms: Policy,
      experience: Experience,
      car_certificate: InsuranceCertificate,
      includeme_car_directory: CarDirectory,
      selected_area: selectedArea,
      role: selectedUserType === 'Trucking' && 'Company',
      // role: selectedUserType == 'pilot' && 'Pilot',
      address: userAddress?.name,
      state: selectedState,
      // state: selectedState?.label,
    };
    // return console.log("body === > ", JSON.stringify(body, null, 2));
    for (let key in selectedUserType == 'Trucking' ? body : body1) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(` ${key} field is empty`, ToastAndroid.SHORT)
          : Alert.alert(` ${key} field is empty`);
      }
    }
    const url = 'register';
    setIsLoading(true);
    const response = await Post(
      url,
      selectedUserType == 'Company' ? body : body1,
      apiHeader(),
    );
    setIsLoading(false);
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show('Sign up successfully', ToastAndroid.SHORT)
        : Alert.alert('Sign up successfully');
      dispatch(setUserData(response?.data?.user_info));
      dispatch(setUserToken({ token: response?.data?.token }));
      dispatch(SetUserRole(response?.data?.user_info?.role));
    }
  };
  const dummyarray = [
    { id: 1, name: 'Search Engine' },
    { id: 2, name: 'Social Media' },
    { id: 3, name: 'Word Of Mouth' },
    { id: 4, name: 'App Store' },
    { id: 5, name: 'Other' },
  ];

  const isValidCanadianNumber = (phone) => {
    const regex = /^\+1\d{10}$/;
    return regex.test(phone);
  };


  return (
    <SafeAreaView>
      <ImageBackground
        style={styles.bg_con}
        resizeMode={'stretch'}
        source={require('../Assets/Images/login_bg.png')}>
        <CustomStatusBar />
        {/* <Header
          title=" "
          headerColor={'transparent'}
          textstyle={{color: Color.white}}
          // showBack
        /> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
          }}>
          <CustomText isBold style={styles.text}>
            Create A Account
          </CustomText>
          <CustomText
            style={{
              color: Color.white,
              fontSize: moderateScale(11, 0.6),
            }}>
            Start Your 30-Day Free Trial
          </CustomText>
          <CustomText
            style={{
              color: Color.white,
              width: windowWidth * 0.9,
              fontSize: moderateScale(9, 0.6),
              textAlign: 'center',
            }}>
            Note: You Can Sign Up For Both Account Types But You Must Register
            Using Separate Email Addresses.
          </CustomText>
          {/* <TouchableOpacity
            onPress={() => {
              setIsSelected(!isSelected);
            }}
            style={{
              marginTop: moderateScale(10, 0.6),
              width: windowWidth * 0.92,
              height: windowHeight * 0.058,
              borderWidth: 1,
              borderRadius: moderateScale(30, 0.6),
              alignSelf: 'center',
              borderColor: Color.white,
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: moderateScale(20, 0.6),
              flexDirection: 'row',
            }}>
            <CustomText
              style={{
                color: Color.mediumGray,
                fontSize: moderateScale(12, 0.6),
              }}>
              {selectedUserType ? selectedUserType : ' select user type'}
            </CustomText>
            <Icon
              name={isSelected ? "chevron-up" :"chevron-down"}
              as={Entypo}
              color={Color.mediumGray}
              size={moderateScale(15, 0.6)}
            />
          </TouchableOpacity>
          {isSelected && (
            <View
              style={{
                // height: windowHeight * 0.07,
                width : windowWidth *0.9,
                zIndex:1,
                top: moderateScale(150, 0.6),
                position:"absolute",
                // marginTop: moderateScale(1, 0.6),
                borderRadius: moderateScale(15, 0.6),
                borderWidth: 1,
                backgroundColor:Color.black,
                borderColor: Color.white,
                paddingVertical: moderateScale(2, 0.6),
                paddingHorizontal: moderateScale(15, 0.6),
              }}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedUserType('Pilot');
                  setIsSelected(false);
                }}>
                <CustomText
                  style={{
                    color: Color.mediumGray,
                    fontSize: moderateScale(12, 0.6),
                    paddingVertical: moderateScale(3, 0.6),
                    borderBottomWidth: 0.5,
                    borderBottomColor: Color.white,
                  }}>
                  Pilot
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedUserType('Trucking');
                  setIsSelected(false);
                }}>
                <CustomText
                  style={{
                    color: Color.mediumGray,
                    fontSize: moderateScale(12, 0.6),

                    paddingVertical: moderateScale(5, 0.6),
                  }}>
                  company
                </CustomText>
              </TouchableOpacity>
            </View>
          )} */}
          <DropDownSingleSelect
            array={["Pilot", "Trucking"]}
            item={selectedUserType}
            setItem={setSelectedUserType}
            width={windowWidth * 0.9}
            // placeHolderColor={Color.darkGray}
            // placeholder={'Ápproval for Admittance'}
            placeholder={'Select User Type'}
            dropdownStyle={{
              borderBottomWidth: 0,
              width: windowWidth * 0.85,
              marginTop: 10,
              // paddingVertical:15,
            }}
            menuStyle={{    // backgroundColor:Color.red,
              // borderColor:Color.mediumGray,
              backgroundColor: Color.black,
              borderColor: Color.mediumGray,
              width: "84%",
              left: 32,
              borderWidth: 1,
              overflow: "hidden",
              marginTop: moderateScale(-6, 0.2),
              // 
              // position:"absolute",
              // top:-10,
              // borderTopLeftRadius:moderateScale(5,0.2),
              // borderTopRightRadius:moderateScale(5,0.2),
              borderBottomRightRadius: moderateScale(15, 0.2),
              borderBottomLeftRadius: moderateScale(15, 0.2)
            }}
            menuTextColor={Color.mediumGray}
            changeColorOnSelect={true}
            btnStyle={{
              backgroundColor: 'transparent',
              height: windowHeight * 0.057,
              borderWidth: 1
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              width: windowWidth * 0.93,
              justifyContent: 'space-between',
            }}>
            <TextInputWithTitle
              placeholder={'FirstName'}
              setText={setFirstName}
              value={firstName}
              viewHeight={0.06}
              viewWidth={0.45}
              inputWidth={0.43}
              border={1}
              borderRadius={30}
              backgroundColor={'transparent'}
              borderColor={Color.white}
              marginTop={moderateScale(10, 0.3)}
              placeholderColor={Color.mediumGray}
              titleStlye={{ right: 10 }}
            />
            <TextInputWithTitle
              placeholder={'LastName'}
              setText={setLastName}
              value={LastName}
              viewHeight={0.06}
              viewWidth={0.45}
              inputWidth={0.43}
              border={1}
              borderRadius={30}
              backgroundColor={'transparent'}
              borderColor={Color.white}
              marginTop={moderateScale(10, 0.3)}
              placeholderColor={Color.mediumGray}
              titleStlye={{ right: 10 }}
            />
          </View>
          <TextInputWithTitle
            placeholder={'Email'}
            setText={setEmail}
            value={email}
            viewHeight={0.06}
            viewWidth={0.93}
            inputWidth={0.83}
            border={1}
            borderRadius={30}
            backgroundColor={'transparent'}
            borderColor={Color.white}
            marginTop={moderateScale(10, 0.3)}
            placeholderColor={Color.mediumGray}
            titleStlye={{ right: 10 }}
          />
          <TextInputWithTitle
            placeholder={'Phone'}
            setText={(text) => {
              setContact(text);
              if (text.length === 0) {
                setPhoneError('Phone number is required');
              } else if (!isValidCanadianNumber(text)) {
                setPhoneError('Enter valid Canadian number e.g. +1XXXXXXXXXX');
              } else {
                setPhoneError(''); // ✅ Clear error when valid
              }
            }}
            value={Contact}
            viewHeight={0.06}
            viewWidth={0.93}
            inputWidth={0.83}
            border={1}
            borderRadius={30}
            backgroundColor={'transparent'}
            borderColor={Color.white}
            marginTop={moderateScale(10, 0.3)}
            placeholderColor={Color.mediumGray}
            titleStlye={{ right: 10 }}
            maxLength={12}
          />
          {phoneError !== '' && (
            <CustomText style={{ color: 'red', marginTop: 5, marginLeft: 15, textAlign: 'left', width: '90%', fontSize: moderateScale(9, 0.6) }}>
              {phoneError}
            </CustomText>
          )}
          <TextInputWithTitle
            placeholder={'Comapny Name'}
            setText={setcompany}
            value={company}
            viewHeight={0.06}
            viewWidth={0.93}
            inputWidth={0.83}
            border={1}
            borderRadius={30}
            backgroundColor={'transparent'}
            borderColor={Color.white}
            marginTop={moderateScale(10, 0.3)}
            placeholderColor={Color.mediumGray}
            titleStlye={{ right: 10 }}
          />
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(true);
            }}
            style={styles.address_btn}>
            <CustomText
              numberOfLines={1}
              style={{
                fontSize: moderateScale(13, 0.6),
                color: Color.mediumGray,
              }}>
              {userAddress?.name ? userAddress?.name : 'Address'}
            </CustomText>
          </TouchableOpacity>
          <View

            style={styles.address_btn}>
            <CustomText
              numberOfLines={1}
              style={{
                fontSize: moderateScale(13, 0.6),
                color: Color.mediumGray,
              }}>
              {selectedState ? selectedState : 'State'}
            </CustomText>
          </View>

          {/* <CountryStatePicker
            country={selectedArea == 'Sign Up For Canada' ? 'USA' : 'Canada'}
            setSelectedState={setSelectedState}
            selectedState={selectedState}
          /> */}

          {selectedUserType != 'Pilot' && (
            <TextInputWithTitle
              placeholder={'Dot Number'}
              setText={setdotNumber}
              value={dotNumber}
              viewHeight={0.06}
              viewWidth={0.93}
              inputWidth={0.83}
              border={1}
              borderRadius={30}
              backgroundColor={'transparent'}
              borderColor={Color.white}
              marginTop={moderateScale(10, 0.3)}
              placeholderColor={Color.mediumGray}
              titleStlye={{ right: 10 }}
            />
          )}
          {selectedUserType != 'Pilot' && (
            <TextInputWithTitle
              placeholder={'Mc Number'}
              setText={setmcNumber}
              value={mcNumber}
              viewHeight={0.06}
              viewWidth={0.93}
              inputWidth={0.83}
              border={1}
              borderRadius={30}
              backgroundColor={'transparent'}
              borderColor={Color.white}
              marginTop={moderateScale(10, 0.3)}
              placeholderColor={Color.mediumGray}
              titleStlye={{ right: 10 }}
            />
          )}
          <View
            style={{
              flexDirection: 'row',
              width: windowWidth * 0.93,
              justifyContent: 'space-between',
            }}>
            <TextInputWithTitle
              secureText={true}
              placeholder={'Password'}
              setText={setpassword}
              value={password}
              viewHeight={0.06}
              viewWidth={0.45}
              inputWidth={0.43}
              border={1}
              borderRadius={30}
              backgroundColor={'transparent'}
              borderColor={Color.white}
              marginTop={moderateScale(10, 0.3)}
              placeholderColor={Color.mediumGray}
              titleStlye={{ right: 10 }}
            />
            <TextInputWithTitle
              secureText={true}
              placeholder={'Confirm Pasward'}
              setText={setconfirmPassword}
              value={confirmPassword}
              viewHeight={0.06}
              viewWidth={0.45}
              inputWidth={0.43}
              border={1}
              borderRadius={30}
              backgroundColor={'transparent'}
              borderColor={Color.white}
              marginTop={moderateScale(10, 0.3)}
              placeholderColor={Color.mediumGray}
              titleStlye={{ right: 10 }}
            />
          </View>
          <CustomText
            style={{
              textAlign: 'left',
              width: windowWidth * 0.9,
              paddingVertical: moderateScale(5, 0.6),
              fontSize: moderateScale(9, 0.6),
              color: Color.lightGrey,
            }}>
            Password Must Be At Least 8 Characters Long
          </CustomText>
          {selectedUserType == 'Pilot' && (
            <TouchableOpacity
              onPress={() => {
                setCarDirectory(!CarDirectory);
              }}
              style={{
                flexDirection: 'row',
                width: windowWidth * 0.93,
              }}>
              <View
                style={{
                  width: windowWidth * 0.035,
                  height: windowWidth * 0.035,
                  borderWidth: 1,
                  borderColor: Color.white,
                  alignItems: 'center',
                  backgroundColor: CarDirectory ? Color.red : 'transparent',
                }}>
                {CarDirectory && (
                  <Icon
                    as={AntDesign}
                    name="check"
                    size={moderateScale(12, 0.6)}
                    color={Color.white}
                  />
                )}
              </View>
              <CustomText
                style={{
                  width: windowWidth * 0.8,
                  fontSize: moderateScale(10, 0.6),
                  color: Color.white,
                  marginHorizontal: moderateScale(5, 0.6),
                }}>
                Include Me In The Pilot Car Directory
              </CustomText>
            </TouchableOpacity>
          )}
          {selectedUserType == 'Pilot' && (
            <TouchableOpacity
              onPress={() => {
                setInsuranceCertificate(!InsuranceCertificate);
              }}
              style={{
                flexDirection: 'row',
                width: windowWidth * 0.93,
              }}>
              <View
                style={{
                  width: windowWidth * 0.035,
                  height: windowWidth * 0.035,
                  borderWidth: 1,
                  borderColor: Color.white,
                  alignItems: 'center',
                  backgroundColor: InsuranceCertificate
                    ? Color.red
                    : 'transparent',
                }}>
                {InsuranceCertificate && (
                  <Icon
                    as={AntDesign}
                    name="check"
                    size={moderateScale(12, 0.6)}
                    color={Color.white}
                  />
                )}
              </View>
              <CustomText
                style={{
                  width: windowWidth * 0.8,
                  fontSize: moderateScale(9, 0.6),
                  color: Color.white,
                  marginHorizontal: moderateScale(5, 0.6),
                }}>
                I Have Pilot Car Certifications And Insurance
              </CustomText>
            </TouchableOpacity>
          )}

          {selectedUserType == 'Pilot' && (
            <TextInputWithTitle
              placeholder={'Years Of Experience'}
              setText={setExperience}
              value={Experience}
              viewHeight={0.06}
              viewWidth={0.93}
              inputWidth={0.83}
              border={1}
              borderRadius={30}
              backgroundColor={'transparent'}
              borderColor={Color.white}
              marginTop={moderateScale(10, 0.3)}
              placeholderColor={Color.mediumGray}
              titleStlye={{ right: 10 }}
            />
          )}
          <CustomText
            isBold
            style={{
              textAlign: 'left',
              width: windowWidth * 0.9,
              paddingVertical: moderateScale(5, 0.6),
              fontSize: moderateScale(11, 0.6),
              color: Color.lightGrey,
            }}>
            How Did You Hear About Us?
          </CustomText>
          <View
            style={{
              paddingBottom: moderateScale(10, 0.6),
            }}>
            {dummyarray?.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setaboutUs(item);
                  }}
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View
                    style={[
                      styles.social_option,
                      {
                        backgroundColor:
                          aboutUs?.id == item?.id ? 'red' : 'transparent',
                      },
                    ]}></View>
                  <CustomText style={styles.label}>{item?.name}</CustomText>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            onPress={() => {
              setPolicy(!Policy);
            }}
            style={styles.row}>
            <View
              style={[
                styles.check_box,
                {
                  backgroundColor: Policy ? Color.red : 'transparent',
                },
              ]}>
              {Policy && (
                <Icon
                  as={AntDesign}
                  name="check"
                  size={moderateScale(12, 0.6)}
                  color={Color.white}
                />
              )}
            </View>
            <CustomText
              style={{
                width: windowWidth * 0.8,
                fontSize: moderateScale(9, 0.6),
                color: Color.white,
                marginHorizontal: moderateScale(5, 0.6),
                lineHeight: moderateScale(10, 0.6),
              }}>
              {selectedUserType == 'Pilot'
                ? 'I Agree To The Terms Of Use, Privacy Policy, And Cookies Policy. You May Receive SMS & Email Notifications From Us And Can Opt Out Any Time.'
                : 'I Agree To The Terms Of Use, Privacy Policy, And Cookies Policy.'}
            </CustomText>
          </TouchableOpacity>

          <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator size={'small'} color={Color.white} />
              ) : (
                'sign up for free '
              )
            }
            fontSize={moderateScale(153, 0.3)}
            textColor={Color.white}
            borderWidth={0}
            borderColor={Color.white}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.85}
            height={windowHeight * 0.065}
            bgColor={Color.secondry}
            marginTop={moderateScale(10, 0.6)}
            textTransform={'capitalize'}
            elevation={true}
            onPress={() => {
              onPressregister();
            }}
          />
          <CustomButton
            text={'already have an account? login instead '}
            fontSize={moderateScale(13, 0.3)}
            textColor={Color.black}
            borderWidth={0}
            borderColor={Color.white}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.85}
            height={windowHeight * 0.065}
            bgColor={Color.white}
            marginTop={moderateScale(10, 0.6)}
            marginBottom={moderateScale(10, 0.6)}
            textTransform={'capitalize'}
            elevation={true}
            onPress={() => {
              navigation.goBack();
            }}
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
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  bg_con: {
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
    paddingVertical: moderateScale(20, 0.6),
  },
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  text: {
    fontSize: moderateScale(22, 0.6),
    color: Color.white,
    width: windowWidth * 0.7,
    textAlign: 'center',
    letterSpacing: 0.5,
    paddingTop: moderateScale(20, 0.6),
  },
  schemaText: {
    fontSize: moderateScale(10, 0.6),
    color: 'red',
    alignSelf: 'flex-start',
  },
  address_btn: {
    width: windowWidth * 0.93,
    borderWidth: 0.6,
    height: windowHeight * 0.06,
    borderColor: Color.white,
    marginTop: moderateScale(10, 0.6),
    borderRadius: moderateScale(30, 0.6),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(15, 0.6),
  },
  check_box: {
    width: windowWidth * 0.035,
    height: windowWidth * 0.035,
    borderWidth: 1,
    borderColor: Color.white,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    width: windowWidth * 0.93,
  },
  social_option: {
    width: windowWidth * 0.03,
    height: windowWidth * 0.03,
    borderRadius: (windowWidth * 0.03) / 2,
    borderWidth: 1.5,
    borderColor: Color.white,
    marginTop: moderateScale(3, 0.6),
  },
  label: {
    textAlign: 'left',
    width: windowWidth * 0.9,
    paddingHorizontal: moderateScale(5, 0.6),
    fontSize: moderateScale(11, 0.6),
    color: Color.lightGrey,
  },
});

export default Signup;
