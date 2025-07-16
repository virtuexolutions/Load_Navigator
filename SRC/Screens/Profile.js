import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  ToastAndroid,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {changePasswordSchema} from '../Constant/schema';
import navigationService from '../navigationService';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CountryStatePicker from '../Components/CountryStatePicker';
const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  console.log("🚀 ~ Profile ~ userData:", userData?.role,userData)
  const [email, setEmail] = useState(userData?.email || '');
  const [Contact, setContact] = useState(userData?.contact || '');

  const [firstName, setFirstName] = useState(userData?.first_name || '');
  const [LastName, setLastName] = useState( userData?.last_name || '');
  const [company, setcompany] = useState(userData?.company_name || '');
  const [userAddress, setUserAddress] = useState(userData?.address || '');
  console.log("🚀 ~ Profile ~ userAddress:", userAddress)
  const [selectedState, setSelectedState] = useState(userData?.state || '');
  const [Experience, setExperience] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(userData?.selected_area == 'Sign Up For Canada' ? 'Canada' : 'USA');
  const countryOptions = ["Canada", "USA"];
  const [InsuranceCertificate, setInsuranceCertificate] = useState(userData?.car_certificate || '');

  const updateProfile = async values => {
    const url = 'auth/profile';
    const body = {
      first_name: firstName,
      last_name: LastName,
      email: email,
      contact: Contact,
      company_name: company,
      address: userAddress,
  
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
      // company_name: company,
      // password: password,
      // confirm_password: confirmPassword,
      // hear_about_us: aboutUs?.name,
      // agree_to_terms: Policy,
      experience: Experience,
      car_certificate: InsuranceCertificate,
      // includeme_car_directory: CarDirectory,
      // selected_area: selectedArea,
      // role: selectedUserType,
      // role: selectedUserType == 'pilot' && 'Pilot',
      address: userAddress,
      state: selectedState,
      // state: selectedState?.label,
    };
// return console.log("body === > ", JSON.stringify(body, null, 2));
    for (let key in userData?.role == 'pilot' ? body1 : body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(` ${key} field is empty`, ToastAndroid.SHORT)
          : Alert.alert(` ${key} field is empty`);
      }
    }
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response?.data != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show('change password uccessfully', ToastAndroid.SHORT)
        : Alert.alert('change password uccessfully');
      navigationService.navigate('PostLoadScreen');
    }
  };
  return (
    <SafeAreaView
    style={[
      styles.main_view,
      {
        backgroundColor:
          userData?.role.toLowerCase() == 'pilot' ? Color.primary : Color.secondary,
      },
    ]}>
    <Header
      title="Profile"
      headerColor={
        userData?.role?.toLowerCase() == 'pilot' ? Color.primary : Color.secondary
      }
      textstyle={{color: Color.white}}
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
            userData?.role.toLowerCase() == 'pilot'
              ? Color.primary
              : Color.white,
        },
      ]}>
  
            <View style={styles.text_input}>
           { userData?.role?.toLowerCase() == "pilot" ? (<>
              <TextInputWithTitle
                titleStlye={{
                  color:
                    userData?.role.toLowerCase() == 'pilot'
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
                    userData?.role.toLowerCase() == 'pilot'
                      ? Color.white
                      : Color.black,
                }}
                title={"Last Name"}
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
            </>) :
(            <>
              <TextInputWithTitle
                titleStlye={{
                  color:
                    userData?.role.toLowerCase() == 'pilot'
                      ? Color.white
                      : Color.black,
                }}
                title={"Company"}
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
            </>)}
             
              <TextInputWithTitle
                titleStlye={{
                  color:
                    userData?.role.toLowerCase() == 'pilot'
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
                    userData?.role.toLowerCase() == 'pilot'
                      ? Color.white
                      : Color.black,
                }}
                title={'Contact'}
                titleText={'Contact'}

                placeholder={'Contact'}
                setText={setContact}
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
              <CustomText isBold style={{alignSelf:"flex-start", color: userData?.role?.toLowerCase() == "pilot" ? Color.white : Color.darkGray, }}>State</CustomText>
                    <CountryStatePicker
            style_dropDown={{
              height: windowHeight * 0.06,
              backgroundColor: userData?.role?.toLowerCase() == "pilot" ? Color.white : 'transparent',
              width: windowWidth * 0.8,
              borderWidth: 0.5,
              justifyContent: 'center',
              
              paddingHorizontal: moderateScale(15, 0.6),
              borderColor: Color.veryLightGray,
              borderRadius: moderateScale(30, 0.6),
            }}
            
            country={
              selectedCountry
            }
            setSelectedState={setSelectedState}
            selectedState={selectedState}
          /> 
              <CustomButton
                onPress={updateProfile}
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
            </View>
       
      
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
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C32C2745',
    width: windowWidth * 0.9,
    // borderColor: Color.mediumGray,
    // height: windowHeight * 0.52,
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
});
