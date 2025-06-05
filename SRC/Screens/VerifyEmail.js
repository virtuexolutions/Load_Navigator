// import messaging from '@react-native-firebase/messaging';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Platform,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import ImagePickerModal from '../Components/ImagePickerModal';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import { forgotpasswordSchema, loginSchema } from '../Constant/schema';
import { setUserToken } from '../Store/slices/auth-slice';
import { setUserData } from '../Store/slices/common';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import { mode } from 'native-base/lib/typescript/theme/tools';
import { Icon } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const VerifyEmail = props => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.authReducer.token);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePicker, setImagePicker] = useState(false);
  const [image, setImage] = useState({});
  const navigation = useNavigation();
  const [loginMethod, setLoginMethod] = useState('');
  const [device_token, setDeviceToken] = useState(null);
  const navigationN = useNavigation();

  const loginWithGoogle = async response1 => {
    const body = { ...response1?.data };
    const url = 'google-login';
    const response = await Post(url, body, apiHeader(token));
    if (response != undefined) {
      dispatch(setUserToken({ token: response?.data?.token }));
      dispatch(setUserData(response?.user_info));
    }
  };

  const onPressSubmit = async values => {
    const body = {
      email: values.email,
    };
    console.log("🚀 ~ body:", body)
    const url = 'password/email';
    setIsLoading(true);
    const response = await Post(url, body, apiHeader());
    console.log("🚀 ~ response:", response?.data)
    setIsLoading(false);
    if (response != undefined) {
        Platform.OS == 'android'
        ? ToastAndroid.show(`OTP sent to ${values.email}`, ToastAndroid.SHORT)
        : Alert.alert(`OTP sent to ${values.email}`);
      navigationN.navigate('VerifyNumber', { email: values.email })
    }
  };

  return (
    <ImageBackground
      imageStyle={{
        width: '100%',
        height: '100%',
      }}
      resizeMode="stretch"
      source={require('../Assets/Images/login_bg.png')}
      style={{
        height: windowHeight,
        width: windowWidth,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <View style={styles.main_container}>
        <TouchableOpacity
          onPress={() => {
            navigationN.goBack();
          }}
          activeOpacity={0.8}
          style={styles.back}>
          <Icon
            name={'arrowleft'}
            as={AntDesign}
            size={moderateScale(22, 0.3)}
            color={Color.white}
            onPress={() => {
              navigationN.goBack();
            }}
          />
        </TouchableOpacity>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <CustomText isBold style={styles.txt2}>
            Forget Password
          </CustomText>
          <CustomText style={styles.txt3}>
            Forgot your password ? don't worry, jsut take a simple step and
            create your new password!
          </CustomText>
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={forgotpasswordSchema}
            onSubmit={onPressSubmit}>
            {({ values, handleChange, handleSubmit, touched, errors }) => {
              return (
                <View style={styles.text_input}>
                  <TextInputWithTitle
                    title={'Email  *'}
                    placeholder={'Email'}
                    setText={handleChange('email')}
                    value={values.email}
                    viewHeight={0.06}
                    viewWidth={0.85}
                    inputWidth={0.85}
                    border={1}
                    borderRadius={moderateScale(30, 0.3)}
                    borderColor={'#000'}
                    backgroundColor={Color.white}
                    marginTop={moderateScale(10, 0.3)}
                    color={Color.black}
                    placeholderColor={Color.veryLightGray}
                    titleStlye={{
                      color: Color.white
                    }}
                  />
                  {touched.email && errors.email && (
                    <CustomText textAlign={'left'} style={styles.schemaText}>
                      {errors.email}
                    </CustomText>
                  )}
                  <CustomButton
                    onPress={handleSubmit}
                    text={
                      isLoading ? (
                        <ActivityIndicator color={Color.white} size={'small'} />
                      ) : (
                        'Submit'
                      )
                    }
                    fontSize={moderateScale(14, 0.3)}
                    textColor={Color.white}
                    borderWidth={1.5}
                    borderColor={Color.secondry}
                    borderRadius={moderateScale(30, 0.3)}
                    width={windowWidth * 0.85}
                    marginTop={moderateScale(20, 0.3)}
                    height={windowHeight * 0.065}
                    bgColor={Color.secondry}
                    textTransform={'capitalize'}
                  />
                </View>
              );
            }}
          </Formik>
        </KeyboardAwareScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: moderateScale(24, 0.6),
    color: Color.white,
    paddingVertical: moderateScale(10, 0.6),
    width: windowWidth * 0.7,
    textAlign: 'center',
  },
  container: {
    paddingBottom: moderateScale(20, 0.3),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: windowHeight,
  },
  back: {
    position: 'absolute',
    top: moderateScale(20, 0.3),
    left: moderateScale(20, 0.3),
    height: moderateScale(30, 0.3),
    width: moderateScale(30, 0.3),
    borderRadius: moderateScale(5, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.themeBlack,
    zIndex: 1,
  },
  txt2: {
    color: Color.white,
    fontSize: moderateScale(24, 0.6),
  },
  txt3: {
    color: Color.themeLightGray,
    fontSize: moderateScale(11, 0.6),
    textAlign: 'center',
    width: '80%',
    marginVertical: moderateScale(15, 0.3),
    lineHeight: moderateScale(17, 0.3),
  },
  text_input: {
    alignItems: 'center',
    borderWidth: 1,
    width: windowWidth * 0.9,
    borderColor: Color.secondary,
    height: windowHeight * 0.25,
    borderRadius: 20,
    paddingTop: windowHeight * 0.03,
    paddingHorizontal: moderateScale(30, 0.6),
  },
  forgotpassword: {
    fontSize: moderateScale(10, 0.6),
    color: Color.white,
    textAlign: 'right',
    width: '95%',
    paddingVertical: moderateScale(4, 0.6),
    fontWeight: '700',
    alignSelf: 'flex-end'
  },
  button_container: {
    paddingTop: windowHeight * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
  },
  soc_text: {
    fontSize: moderateScale(11, 0.6),
    paddingVertical: moderateScale(8, 0.6),
    textAlign: 'center',
    letterSpacing: 0.7,
    color: Color.white,
    marginHorizontal: moderateScale(10, 0.6),
  },
  do_text: {
    paddingVertical: moderateScale(10, 0.6),
    textTransform: 'none',
    letterSpacing: 0.5,
    fontSize: moderateScale(12, 0.6),
    color: Color.white,
  },
  Sign_text: {
    color: Color.secondry,
    paddingRight: moderateScale(5, 0.6),
    fontSize: moderateScale(12, 0.6),
    borderBottomWidth: 1,
    borderBottomColor: Color.secondry,
  },
  line: {
    width: windowWidth * 0.2,
    borderBottomWidth: 1,
    borderBottomColor: Color.white,
  },
  icon_con: {
    height: windowHeight * 0.04,
    width: windowHeight * 0.04,
    borderRadius: (windowHeight * 0.04) / 2,
    backgroundColor: 'white',
    overflow: 'hidden',
    marginHorizontal: moderateScale(5, 0.6),
    marginTop: moderateScale(10, 0.6),
  },
  icon: {
    height: '75%',
    width: '70%',
    marginTop: moderateScale(5, 0.6),
    marginLeft: moderateScale(3, 0.6),
  },
  icon2: {
    height: '75%',
    width: '67%',
    marginTop: moderateScale(4, 0.6),
    marginLeft: moderateScale(5.4, 0.6),
  },
});

export default VerifyEmail;
