import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Platform,
  SafeAreaView,
  ToastAndroid,
  View,
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import ImagePickerModal from '../Components/ImagePickerModal';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import { SignupSchema } from '../Constant/schema';
import { setUserData } from '../Store/slices/common';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import Header from '../Components/Header';
import CustomStatusBar from '../Components/CustomStatusBar';
import { setUserToken } from '../Store/slices/auth-slice';

const Signup = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [imagePicker, setImagePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user_type } = useSelector(state => state.authReducer);

  const onPressregister = async values => {
    const body = {
      name: values.name,
      email: values.email,
      password: values.password,
      phone: values.contact,
      confirm_password: values.confirmPassword,
      role: 'company',
      address: values.address
    };
    console.log("🚀 ~ Signup ~ body:", body)
    const url = 'register';
    setIsLoading(true);
    const response = await Post(url, body, apiHeader());
    console.log("🚀 ~ Signup ~ response:", response?.data)
    setIsLoading(false);
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show('Sign up successfully', ToastAndroid.SHORT)
        : Alert.alert('Sign up successfully');
      dispatch(setUserData(response?.data?.user_info));
      dispatch(setUserToken(response?.data?.token))
    }
  };


  return (
    <SafeAreaView>
      <ImageBackground
        style={styles.bg_con}
        resizeMode={'stretch'}
        source={require('../Assets/Images/login_bg.png')}>
        <CustomStatusBar />
        <Header
          // title="Pilot Car Directory"
          headerColor={'transparent'}
          textstyle={{ color: Color.white }}
          showBack
        />
        <CustomText isBold style={styles.text}>
          Trucking Company Create Your Account
        </CustomText>
        <Formik
          initialValues={{
            name: '',
            email: '',
            contact: 0,
            password: '',
            address: '',
            confirmPassword: ''
          }}
          validationSchema={SignupSchema}
          onSubmit={onPressregister}>
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
          }) => {
            return (
              <View>
                <TextInputWithTitle
                  placeholder={'Business Name'}
                  setText={handleChange('name')}
                  value={values.name}
                  viewHeight={0.06}
                  viewWidth={0.85}
                  inputWidth={0.83}
                  border={1}
                  borderRadius={30}
                  backgroundColor={'transparent'}
                  borderColor={Color.white}
                  marginTop={moderateScale(15, 0.3)}
                  placeholderColor={Color.mediumGray}
                  titleStlye={{ right: 10 }}
                />
                {touched.name && errors.name && (
                  <CustomText style={styles.schemaText}>{errors.name}</CustomText>
                )}
                <TextInputWithTitle
                  titleText={'Address'}
                  placeholder={'Address'}
                  setText={handleChange('address')}
                  value={values.address}
                  viewHeight={0.06}
                  viewWidth={0.85}
                  inputWidth={0.83}
                  border={1}
                  borderRadius={30}
                  backgroundColor={'transparent'}
                  borderColor={Color.white}
                  marginTop={moderateScale(15, 0.3)}
                  placeholderColor={Color.mediumGray}
                  titleStlye={{ right: 10 }}
                />
                {touched.address && errors.address && (
                  <CustomText
                    textAlign={'left'}
                    style={{
                      fontSize: moderateScale(10, 0.6),
                      color: Color.red,
                      alignSelf: 'flex-start',
                    }}>
                    {errors.address}
                  </CustomText>
                )}

                <TextInputWithTitle
                  placeholder={'Email'}
                  setText={handleChange('email')}
                  value={values.email}
                  viewHeight={0.06}
                  viewWidth={0.85}
                  inputWidth={0.83}
                  border={1}
                  borderRadius={30}
                  backgroundColor={'transparent'}
                  borderColor={Color.white}
                  marginTop={moderateScale(15, 0.3)}
                  placeholderColor={Color.mediumGray}
                  titleStlye={{ right: 10 }}
                />
                {touched.email && errors.email && (
                  <CustomText style={styles.schemaText}>
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
                  titleStlye={{ right: 10 }}
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
                <TextInputWithTitle
                  secureText={true}
                  placeholder={'confirm password'}
                  setText={handleChange('confirmPassword')}
                  value={values.confirmPassword}
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
                  titleStlye={{ right: 10 }}
                />
                {touched.confirmPassword && errors.confirmPassword && (
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
                <TextInputWithTitle
                  placeholder={'Phone Number'}
                  setText={handleChange('contact')}
                  value={values.contact}
                  viewHeight={0.06}
                  viewWidth={0.85}
                  inputWidth={0.83}
                  border={1}
                  borderRadius={30}
                  backgroundColor={'transparent'}
                  borderColor={Color.white}
                  marginTop={moderateScale(15, 0.3)}
                  placeholderColor={Color.mediumGray}
                  titleStlye={{ right: 10 }}
                />
                {touched.contact && errors.contact && (
                  <CustomText style={styles.schemaText}>
                    {errors.contact}
                  </CustomText>
                )}
                <CustomButton
                  onPress={handleSubmit}
                  text={
                    isLoading ? (
                      <ActivityIndicator color={Color.white} size={'small'} />
                    ) : (
                      'sign up '
                    )
                  }
                  fontSize={moderateScale(14, 0.3)}
                  textColor={Color.white}
                  borderWidth={1.5}
                  borderColor={Color.secondry}
                  borderRadius={moderateScale(30, 0.3)}
                  width={windowWidth * 0.85}
                  marginTop={moderateScale(35, 0.3)}
                  height={windowHeight * 0.065}
                  bgColor={Color.secondry}
                  textTransform={'capitalize'}
                />
              </View>
            );
          }}
        </Formik>

        {/* <ImagePickerModal
        show={imagePicker}
        setShow={setImagePicker}
        setFileObject={setImage}
      /> */}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  bg_con: {
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  text: {
    fontSize: moderateScale(22, 0.6),
    color: Color.white,
    paddingVertical: moderateScale(10, 0.6),
    width: windowWidth * 0.7,
    textAlign: 'center',
    letterSpacing: 0.5,
    paddingTop: moderateScale(40, 0.6),
  },
  schemaText: {
    fontSize: moderateScale(10, 0.6),
    color: 'red',
    alignSelf: 'flex-start',
  },
});

export default Signup;
