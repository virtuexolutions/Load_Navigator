import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomText from '../Components/CustomText';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../Components/CustomButton';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import Modal from 'react-native-modal';
import CustomImage from '../Components/CustomImage';
import Color from '../Assets/Utilities/Color';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import {Icon} from 'native-base';
import {setUserLogOut, setUserRegisteredComet} from '../Store/slices/common';
// import {
//   setIsEmailVerified,
//   setIsMobileVerified,
//   setUserLogoutAuth,
// } from '../Store/slices/auth';
import {CometChat} from '@cometchat/chat-sdk-react-native';
import {CometChatUIKit} from '@cometchat/chat-uikit-react-native';
import {
  setIsEmailVerified,
  setIsMobileVerified,
  setUserLogoutAuth,
} from '../Store/slices/auth-slice';
// import { CometChat } from '@cometchat-pro/react-native-chat';

const VerificationScreen = () => {
  const dispatch = useDispatch();
  const userRegisterStatus = useSelector(
    state => state.commonReducer.cometRegistrationStatus,
  );
  const userData = useSelector(state => state.commonReducer.userData);
  console.log('🚀 ~ VerificationScreen ~ userData:', userData);
  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ VerificationScreen ~ token:', token);
  const mobileVerified = useSelector(state => state.authReducer.numberVerified);
  const emailVerified = useSelector(state => state.authReducer.emailVerified);
  console.log('🚀 ~ VerificationScreen ~ emailVerified:', emailVerified);
  const [emailCode, setEmailCode] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [phoneVerify, setPhoneVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [timeOutId, setTimeOutId] = useState(null);
  const [time, settime] = useState(0);
  const [number, setNumber] = useState('');
  const [type, setType] = useState('');
  const [code, setCode] = useState('');
  const [mobileCode, setMobileCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [country, setCountry] = useState({
    callingCode: ['1'],
    cca2: 'US',
    currency: ['USD'],
    flag: 'flag-us',
    name: 'United States',
    region: 'Americas',
    subregion: 'North America',
  });
  const [timerLabel, settimerLabel] = useState('Resend Code ');
  const [loader, setLoader] = useState(0);

  const CELL_COUNT = 6;
  const ref = useBlurOnFulfill({code, cellCount: CELL_COUNT});
  const [abcd, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });

  const leftPress = () => {
    dispatch(setMoreAboutMeRegister(body));
    navigation.goBack();
  };

  const formatPhoneNumber = phoneNumber => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(phoneNumberRegex);

    if (match) {
      return `${match[1]} ${match[2]} ${match[3]}`;
    }

    return phoneNumber;
  };

  const sendMobileOtp = async () => {
    const url = 'auth/send_phone_verify_code';
    setIsLoading(true);
    const response = await Post(
      url,
      {phone: userData?.contact},
      apiHeader(token),
    );
    console.log(
      '🚀 ~ sendMobileOtp ~ response===================:',
      response?.data,
    );
    setIsLoading(false);
    if (response?.data) {
      // return console.log(response?.data?.code)
      setMobileCode(response?.data?.code);
      setType('phone');
      setModalVisible(true);
      console.log('OTP sent');
    } else {
      console.log('response mobile send otp', response?.data);
    }
  };
  const ConfirmMobileOTP = async () => {
    const url = 'auth/phone_verify';
    setLoading(true);
    const response = await Post(
      url,
      {phone: userData?.contact, phone_code: phoneCode},
      apiHeader(token),
    );
    setLoading(false);
    if (response != undefined) {
      console.log('verified');
      dispatch(setIsMobileVerified(true));
      setModalVisible(false);
      setPhoneCode('');
    }
  };
  const sendEmailOtp = async () => {
    const url = 'send_verify_code';
    setLoading(true);
    const response = await Post(
      url,
      {email: userData?.email},
      apiHeader(token),
    );
    console.log(
      '🚀 ~ sendEmailOtp ~ response:==========================',
      response?.data,
    );
    setLoading(false);
    if (response?.data) {
      setType('email');
      setModalVisible(true);
      setEmailCode('');
      // console.log('Response ===== verified');
    }
  };
  const ConfirmEmailOTP = async () => {
    console.log(emailCode);
    const url = 'verify';
    setLoading(true);
    const response = await Post(
      url,
      {email: userData?.email, email_code: emailCode},
      apiHeader(token),
    );
    setLoading(false);

    if (response != undefined) {
      dispatch(setIsEmailVerified(true));
      setModalVisible(false);
      setEmailCode('');
      // setLoader(prev => prev + 50);
    }
  };

  // const registerUserCometChat = async user => {
  //   try{
  //     let cometChatUser = new CometChat.User(user?.uid);
  //   cometChatUser.setName(user?.profileName);
  //   // cometChatUser.setre
  //   cometChatUser.setAvatar( user?.profile_images[0]?.url)
  //   const cometChatRegisteredUser = await CometChatUIKit.createUser(
  //     cometChatUser,
  //     '07ba629476752645dbce6a6c4aad7b2fc680b511',
  //     // '07ba629476752645dbce6a6c4aad7b2fc680b511',
  //   );
  //   // dispatch(setUserRegisteredComet(true))
  //   }catch(error){
  //     if(error == 'ERR_UID_ALREADY_EXISTS')
  //     console.log('User alraedy exists')
  //   }

  //   // dispatchCometAction({
  //   //   type: 'COMETCHAT_REGISTER',
  //   //   user: {...cometChatRegisteredUser},
  //   // });
  // };

  // useEffect(() => {
  //     registerUserCometChat(userData);
  //     // dispatch(setIsEmailVerified(true))
  //     // dispatch(setIsMobileVerified(true))
  // }, [])

  useEffect(() => {
    if (number && number.length < 12) {
      const formattedNumber = formatPhoneNumber(number);
      setNumber(formattedNumber);
    }
  }, [number]);
  useEffect(() => {
    if (time > 0) {
      var clearId = setTimeout(function () {
        settime(time - 1);
      }, 2000);
      setTimeOutId(clearId);
    }
  }, [time]);

  // useEffect(() => {
  //   if (emailVerified) {
  //     setLoader(prev => prev + 50);
  //   }
  //   if (mobileVerified) {
  //     setLoader(prev => prev + 50);
  //   }
  // }, [emailVerified, mobileVerified]);

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />

      <View
        style={{
          alignItems: 'center',
          height: windowHeight,
          backgroundColor: Color.primary,
          paddingVertical: moderateScale(40, 0.6),
          //  justifyContent : 'center',

          //  backgroundColor : 'red'
        }}>
        <Header
          textstyle={{
            color: Color.white,
          }}
          headerColor={Color.primary}
          showLeft={true}
          // leftName={'left'}
          title={'Verification'}
          // leftPress={leftPress}
        />
        <View
          style={{
            marginTop: windowHeight * 0.06,
            paddingVertical: moderateScale(40, 0.6),
            paddingHorizontal: moderateScale(20, 0.6),
            borderRadius: moderateScale(10, 0.6),
            borderWidth: 1.3,

            alignItems: 'center',
            backgroundColor: 'rgba(68, 62, 57, 0.4)',
            // shadowColor:'white',
            // shadowOffset: {
            //   width: 0,
            //   height: 2,
            // },
            // shadowOpacity: 0.25,
            // shadowRadius: 3.84,

            // elevation: 5,
          }}>
          <View
            style={{
              width: windowWidth * 0.8,
              height: windowHeight * 0.3,
              // backgroundColor : 'red'
            }}>
            <CustomImage
              source={require('../Assets/Images/lock.png')}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode={'stretch'}
            />
          </View>
          <CustomText
            isBold
            style={{
              width: windowWidth * 0.8,
              textAlign: 'center',
              fontSize: moderateScale(20, 0.6),
              color: Color.white,
            }}>
            Hold On!
          </CustomText>
          <CustomText
            style={{
              width: windowWidth * 0.8,
              textAlign: 'center',
              fontSize: moderateScale(11, 0.6),
              color: Color.white,
            }}>
            Please verify your phone number and email address before Entering{' '}
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              // backgroundColor : 'red',
              alignItems: 'center',
              marginTop: moderateScale(25, 0.3),
            }}>
            <View style={styles.emptyBar}>
              <LinearGradient
                colors={Color.themeBgColor}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={{
                  height: '100%',
                  width: `${emailVerified ? 50 : mobileVerified ? 100 : 0}%`,
                  borderTopRightRadius: moderateScale(10, 0.3),
                  borderBottomRightRadius: moderateScale(10, 0.3),
                }}></LinearGradient>
            </View>
            <Icon
              name={!emailVerified ? 'email' : 'mark-email-read'}
              as={MaterialIcons}
              size={moderateScale(16, 0.6)}
              color={emailVerified ? Color.green : Color.veryLightGray}
              style={{
                marginRight: moderateScale(5, 0.6),
              }}
            />
            <Icon
              name={mobileVerified ? 'phone' : 'phone-off'}
              as={Feather}
              size={moderateScale(15, 0.6)}
              color={mobileVerified ? Color.green : Color.veryLightGray}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: windowWidth * 0.8,
              alignSelf: 'center',
              // backgroundColor : 'red'
              // alignItems: 'center',
            }}>
            <CustomButton
              text={
                loading ? (
                  <ActivityIndicator color={'#FFFFFF'} size={'small'} />
                ) : emailVerified ? (
                  'email verified'
                ) : (
                  'Verify Email'
                )
              }
              textColor={Color.white}
              width={windowWidth * 0.32}
              height={windowHeight * 0.05}
              marginTop={moderateScale(20, 0.3)}
              bgColor={'transparent'}
              borderRadius={moderateScale(25, 0.3)}
              elevation
              borderWidth={1}
              borderColor={Color.secondary}
              fontSize={moderateScale(11, 0.6)}
              onPress={() => {
                sendEmailOtp();
                // setLoader(prev=> prev == 0 ?50 : 0)
              }}
              textTransform={'lowerCase'}
              disabled={emailVerified}
            />
            <CustomButton
              text={
                isloading ? (
                  <ActivityIndicator color={'#FFFFFF'} size={'small'} />
                ) : mobileVerified ? (
                  'number verified'
                ) : (
                  'Verify number'
                )
              }
              textColor={Color.white}
              width={windowWidth * 0.32}
              height={windowHeight * 0.05}
              marginTop={moderateScale(20, 0.3)}
              bgColor={Color.secondary}
              borderRadius={moderateScale(25, 0.3)}
              // elevation
              borderWidth={1}
              // borderColor={Color.black}
              textTransform={'lowerCase'}
              fontSize={moderateScale(11, 0.6)}
              onPress={() => {
                sendMobileOtp();
                // setLoader(prev=> prev == 50 ?100 : 50)
              }}
              disabled={mobileVerified == true}
            />
          </View>
          <CustomText
            onPress={() => {
              console.log('================= >>>>>>>>> sdf');
              dispatch(setUserLogOut(), dispatch(setUserLogoutAuth()));
              dispatch(setIsEmailVerified(false));
              dispatch(setIsMobileVerified(false));
            }}
            style={{
              color: Color.white,
              fontSize: moderateScale(12, 0.6),
              marginTop: moderateScale(13, 0.3),
              textTransform: 'uppercase',
            }}>
            log out
          </CustomText>
        </View>
      </View>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <CustomText style={styles.txt3}>
              Please enter the 6 digit OTP sent to{' '}
              {
                <>
                  <CustomText
                    style={{
                      color: Color.mediumGray,
                    }}>
                    {type == 'phone'
                      ? `${userData?.contact} `
                      : `${userData?.email}\n`}
                  </CustomText>
                  <CustomText
                    style={{
                      color: Color.mediumGray,
                    }}>
                    currently your code is {mobileCode}
                  </CustomText>
                </>
              }
            </CustomText>
            <CodeField
              placeholder={'0'}
              ref={ref}
              value={type == 'email' ? emailCode : phoneCode}
              onChangeText={type == 'email' ? setEmailCode : setPhoneCode}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <View
                  onLayout={getCellOnLayoutHandler(index)}
                  key={index}
                  style={[styles.cellRoot, isFocused && styles.focusCell]}>
                  <CustomText
                    style={[
                      styles.cellText,
                      isFocused && {color: Color.black},
                    ]}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </CustomText>
                </View>
              )}
            />
            {/* <CustomText style={styles.txt3}>
              Haven't Recieved Verification Code ?{'\n'}
              {
                <TouchableOpacity
                  disabled={timerLabel == 'Resend Code ' ? false : true}
                  onPress={() => {
                    settimerLabel('ReSend in '), settime(120);
                  }}>
                  <CustomText style={[styles.txt4]}>
                    {timerLabel} {time}
                  </CustomText>
                </TouchableOpacity>
              }
            </CustomText> */}
          </View>
          <CustomButton
            text={
       
                   loading ? (
                <ActivityIndicator color={'#FFFFFF'} size={'small'} />
              ) : (
                'Submit'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.65}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            bgColor={Color.secondary}
            borderRadius={moderateScale(25, 0.3)}
            elevation
            // isGradient
            fontSize={moderateScale(12, 0.6)}
            onPress={() => {
              type == 'email' ? ConfirmEmailOTP() : ConfirmMobileOTP();
            }}
          />
        </View>
      </Modal>
    </>
  );
};

export default VerificationScreen;

const styles = ScaledSheet.create({
  container: {
    width: windowWidth * 0.9,
    paddingVertical: moderateScale(30, 0.6),
    backgroundColor: Color.white,
    borderRadius: moderateScale(10, 0.6),
    overflow: 'hidden',
  },
  codeFieldRoot: {
    marginTop: moderateScale(20, 0.3),
    marginBottom: moderateScale(15, 0.3),
    width: windowWidth * 0.7,
    marginLeft: 'auto',
    marginRight: 'auto',
    // backgroundColor : 'red'
  },
  emptyBar: {
    width: windowWidth * 0.7,
    // marginTop : moderateScale(20,0.3),
    height: windowHeight * 0.014,
    borderRadius: moderateScale(10, 0.3),
    backgroundColor: Color.lightGrey,
    marginRight: moderateScale(5, 0.3),
    // marginBottom : moderateScale(10,0.3),
    overflow: 'hidden',
  },
  cellRoot: {
    width: moderateScale(40, 0.6),
    height: moderateScale(40, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Color.veryLightGray,
    borderWidth: 1,
    // backgroundColor: Color.black,
    borderRadius: moderateScale(5, 0.3),
  },

  focusCell: {
    // backgroundColor: Color.themeColor,
    // borderRadius: moderateScale(10, 0.3),

    borderBottomColor: Color.themeDarkGray,
    borderBottomWidth: 2,
  },
  cellText: {
    color: Color.black,
    fontSize: moderateScale(16, 0.3),
    textAlign: 'center',
  },
  txt4: {
    color: Color.black,
    fontSize: moderateScale(14, 0.6),
    textAlign: 'center',
  },
  txt3: {
    // backgroundColor : 'green',
    color: Color.themeLightGray,
    fontSize: moderateScale(13, 0.6),
    textAlign: 'center',
    width: windowWidth * 0.65,
    marginTop: moderateScale(20, 0.3),
    lineHeight: moderateScale(20, 0.3),
    // backgroundColor : 'red'
  },
});
