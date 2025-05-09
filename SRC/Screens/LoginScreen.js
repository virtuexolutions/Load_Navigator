// import messaging from '@react-native-firebase/messaging';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import ImagePickerModal from '../Components/ImagePickerModal';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {loginSchema} from '../Constant/schema';
import {setUserToken} from '../Store/slices/auth-slice';
import {setUserData} from '../Store/slices/common';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {mode} from 'native-base/lib/typescript/theme/tools';

const LoginScreen = props => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.authReducer.token);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePicker, setImagePicker] = useState(false);
  const [image, setImage] = useState({});
  const navigation = useNavigation();
  const [loginMethod, setLoginMethod] = useState('');
  const [device_token, setDeviceToken] = useState(null);

  const loginWithGoogle = async response1 => {
    const body = {...response1?.data};
    const url = 'google-login';
    const response = await Post(url, body, apiHeader(token));
    if (response != undefined) {
      dispatch(setUserToken({token: response?.data?.token}));
      dispatch(setUserData(response?.user_info));
    }
  };

  const login = async values => {
    // Alert.alert('fsdfdsfsdfsd')
    //  dispatch(setUserData(values.email));
    dispatch(setUserToken({token: 'dfsdfs'}));
    // const body = {
    //   email: values.email,
    //   password: values.password,
    //   device_token: device_token,
    // };
    // const url = 'login';
    // setIsLoading(true);
    // const response = await Post(url, body, apiHeader(token));
    // setIsLoading(false);
    // if (response != undefined) {
    // }
  };

  // useEffect(() => {
  //   messaging()
  //     .getToken()
  //     .then(_token => {
  //       setDeviceToken(_token);
  //       dispatch(SetFCMToken({fcmToken: _token}));
  //     })
  //     .catch(e => console.log('token error', e));
  // }, []);

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

      <View
        style={{
          height: windowHeight * 0.17,
          width: windowHeight * 0.2,
        }}>
        <CustomImage
          resizeMode="contain"
          source={require('../Assets/Images/logo.png')}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>
      <CustomText isBold style={styles.text}>
        Trucking Company Login To Your Account
      </CustomText>
      <View>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={login}>
          {({handleChange, handleSubmit, values, errors, touched}) => {
            return (
              <>
                <TextInputWithTitle
                  titleText={'Username'}
                  placeholder={'Email'}
                  setText={handleChange('email')}
                  value={values.email}
                  viewHeight={0.062}
                  viewWidth={0.85}
                  inputWidth={0.82}
                  border={1}
                  fontSize={moderateScale(10, 0.6)}
                  borderRadius={30}
                  backgroundColor={'transparent'}
                  borderColor={Color.white}
                  marginTop={moderateScale(10, 0.3)}
                  placeholderColor={Color.mediumGray}
                  titleStlye={{right: 10}}
                />
                {touched.email && errors.email && (
                  <CustomText
                    textAlign={'left'}
                    style={{
                      fontSize: moderateScale(10, 0.6),
                      color: Color.red,
                      alignSelf: 'flex-start',
                    }}>
                    {errors.email}
                  </CustomText>
                )}
                <TextInputWithTitle
                  secureText={true}
                  placeholder={'Password'}
                  setText={handleChange('password')}
                  value={values.password}
                  viewHeight={0.062}
                  viewWidth={0.85}
                  inputWidth={0.82}
                  border={1}
                  borderRadius={30}
                  backgroundColor={'transparent'}
                  borderColor={Color.white}
                  marginTop={moderateScale(15, 0.3)}
                  // color={Color.white}
                  placeholderColor={Color.mediumGray}
                  titleStlye={{right: 10}}
                />
                {touched.password && errors.password && (
                  <CustomText
                    textAlign={'left'}
                    style={{
                      fontSize: moderateScale(10, 0.6),
                      color: Color.red,
                      alignSelf: 'flex-start',
                    }}>
                    {errors.password}
                  </CustomText>
                )}
                <CustomText
                  onPress={() => {
                    navigation.navigate('VerifyEmail');
                  }}
                  style={styles.forgotpassword}>
                  Forgot password ?
                </CustomText>
                <View style={{marginTop: moderateScale(10, 0.6)}} />
                <CustomButton
                  text={
                    isLoading ? (
                      <ActivityIndicator size={'small'} color={Color.white} />
                    ) : (
                      'sign in '
                    )
                  }
                  fontSize={moderateScale(15, 0.3)}
                  textColor={Color.white}
                  borderWidth={0}
                  borderColor={Color.white}
                  borderRadius={moderateScale(30, 0.3)}
                  width={windowWidth * 0.85}
                  height={windowHeight * 0.065}
                  bgColor={Color.secondry}
                  textTransform={'capitalize'}
                  elevation={true}
                  onPress={handleSubmit}
                />
              </>
            );
          }}
        </Formik>
      </View>
      <View style={styles.button_container}>
        <View style={styles.line}></View>
        <CustomText style={styles.soc_text}>You can Connect with</CustomText>

        <View style={styles.line}></View>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View style={styles.icon_con}>
          <CustomImage
            style={styles.icon}
            source={require('../Assets/Images/google.png')}
          />
        </View>
        <View style={styles.icon_con}>
          <CustomImage
            style={styles.icon2}
            source={require('../Assets/Images/mac.png')}
          />
        </View>
      </View>
      <CustomText style={styles.do_text}>
        Don’t have an account?
        <CustomText
          onPress={() => {
            navigation.navigate('Signup');
          }}
          isBold
          style={styles.Sign_text}>
          Sign Up
        </CustomText>
      </CustomText>

      <ImagePickerModal
        show={imagePicker}
        setShow={setImagePicker}
        setFileObject={setImage}
      />
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

  forgotpassword: {
    fontSize: moderateScale(10, 0.6),
    color: Color.white,
    textAlign: 'right',
    width: '95%',
    paddingVertical: moderateScale(4, 0.6),
    fontWeight: '700',
    alignSelf : 'flex-end'
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

export default LoginScreen;
