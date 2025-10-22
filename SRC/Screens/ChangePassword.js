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
import {useSelector} from 'react-redux';
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

const ChangePassword = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(state => state.authReducer.token);
  const userRole = useSelector(state => state.commonReducer.selectedRole);

  const handleReset = async values => {
    const url = 'auth/change_password';
    const body = {
      current_password: values.currentPassword,
      new_password: values.newPassword,
      confirm_password: values.confirmNewPassword,
    };
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
            userRole.toLowerCase() == 'pilot' ? Color.primary : Color.secondary,
        },
      ]}>
      <Header
        title="change password"
        headerColor={
          userRole.toLowerCase() == 'pilot' ? Color.primary : Color.secondary
        }
        textstyle={{color: Color.white}}
        // showBack
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
              userRole.toLowerCase() == 'pilot'
                ? Color.primary
                : Color.white,
          },
        ]}>
        <Formik
          validationSchema={changePasswordSchema}
          initialValues={{
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
          }}
          onSubmit={handleReset}>
          {({handleChange, handleSubmit, values, errors, touched}) => {
            return (
              <View style={styles.text_input}>
                <TextInputWithTitle
                  titleStlye={{
                    color:
                      userRole.toLowerCase() == 'pilot'
                        ? Color.white
                        : Color.black,
                  }}
                  title={'current Password *'}
                  placeholder={'Current Password'}
                  setText={handleChange('currentPassword')}
                  value={values.currentPassword}
                  secureText={true}
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
                {touched.currentPassword && errors.currentPassword && (
                  <CustomText style={styles.schemaText}>
                    {errors.currentPassword}
                  </CustomText>
                )}
                <TextInputWithTitle
                  titleStlye={{
                    color:
                      userRole.toLowerCase() == 'pilot'
                        ? Color.white
                        : Color.black,
                  }}
                  title={'new password *'}
                  titleText={'New Password'}
                  placeholder={'New Password'}
                  setText={handleChange('newPassword')}
                  value={values.newPassword}
                  secureText={true}
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
                {touched.newPassword && errors.newPassword && (
                  <CustomText style={styles.schemaText}>
                    {errors.newPassword}
                  </CustomText>
                )}
                <TextInputWithTitle
                  titleStlye={{
                    color:
                      userRole.toLowerCase() == 'pilot'
                        ? Color.white
                        : Color.black,
                  }}
                  title={'confirm new password *'}
                  titleText={'Confirm your new password'}
                  placeholder={'Confirm Your New Password'}
                  setText={handleChange('confirmNewPassword')}
                  value={values.confirmNewPassword}
                  secureText={true}
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
                {touched.confirmNewPassword && errors.confirmNewPassword && (
                  <CustomText style={styles.schemaText}>
                    {errors.confirmNewPassword}
                  </CustomText>
                )}
                <CustomButton
                  onPress={handleSubmit}
                  text={
                    isLoading ? (
                      <ActivityIndicator size={'small'} color={Color.white} />
                    ) : (
                      'RESET'
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
            );
          }}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
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
    height: windowHeight * 0.52,
    borderRadius: 20,
    paddingTop: windowHeight * 0.03,
    paddingHorizontal: moderateScale(20, 0.6),
  },

  schemaText: {
    fontSize: moderateScale(10, 0.6),
    color: 'red',
    alignSelf: 'flex-start',
  },
});
