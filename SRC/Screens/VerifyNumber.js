import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomImage from '../Components/CustomImage';
import { color } from 'native-base/lib/typescript/theme/styled-system';

const VerifyNumber = props => {
  const SelecteduserRole = useSelector(
    state => state.commonReducer.selectedRole,
  );
  const navigationN = useNavigation();

  //params
  const email = props?.route?.params?.email;
  const phoneNumber = props?.route?.params?.phoneNumber;
  const { user_type } = useSelector(state => state.authReducer);

  //states
  const [code, setCode] = useState('');
  console.log("🚀 ~ code:", code)
  const [isLoading, setIsLoading] = useState(false);
  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({ code, cellCount: CELL_COUNT });
  const [abcd, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });
  const [time, settime] = useState(120);
  const [timerLabel, settimerLabel] = useState('Resend In ');
  if (time > 0) {
    setTimeout(function () {
      settime(time - 1);
    }, 1000);
  }

  const label = () => {
    time == 0 && (settimerLabel('Resend otp '), settime(''));
  };

  useEffect(() => {
    label();
  }, [time]);

  const sendOTP = async () => {
    const url = 'password/code/check';
    setIsLoading(true);
    const response = await Post(url, { code: code }, apiHeader());
    setIsLoading(false);
    if (response != undefined) {
      navigationN.navigate('ResetPassword', { email: email });
      Platform.OS == 'android'
        ? ToastAndroid.show(`Otp Verified Successfully`, ToastAndroid.SHORT)
        : Alert.alert(`Otp Verified Successfully`);
    }
  };

  const VerifyOTP = async () => {
    const url = 'password/code/check';
    setIsLoading(true);
    console.log(code);
    const response = await Post(url, { code: code }, apiHeader());
    setIsLoading(false);
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show(`otp verified`, ToastAndroid.SHORT)
        : alert(`otp verified`);

      navigationN.navigate('ResetPassword', { email: email });
    }
  };

  useEffect(() => {
    label();
  }, [time]);

  useEffect(() => {
    if (timerLabel == 0) {
      sendOTP();
    }
  }, [timerLabel]);

  return (
    <ImageBackground
      style={styles.bg_con}
      resizeMode={'stretch'}
      source={require('../Assets/Images/login_bg.png')}>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />

      <TouchableOpacity
        onPress={() => {
          navigationN.goBack();
        }}
        activeOpacity={0.8}
        style={styles.back}>
        <Icon
          name={'arrowleft'}
          as={AntDesign}
          size={moderateScale(15, 0.3)}
          color={Color.white}
          onPress={() => {
            navigationN.goBack();
          }}
        />
      </TouchableOpacity>

      <View style={styles.logo}>
        <CustomImage
          style={{
            height: '100%',
            width: '100%',
          }}
          source={require('../Assets/Images/logo.png')}
        />
      </View>

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(20, 0.3),
          marginTop: windowHeight * 0.03,
          alignItems: 'center',
          width: '100%',
          height: windowHeight,
        }}>
        <CustomText isBold style={styles.h2}>
          Enter Verification Code
        </CustomText>
        <CustomText
          style={{ fontSize: moderateScale(11, 0.6), color: Color.white, textAlign: 'center', width: windowWidth * 0.7, }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque turpis iaculis
        </CustomText>
        <CodeField
          placeholder={'0'}
          ref={ref}
          value={code}
          onChangeText={setCode}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}>
              <CustomText
                style={[styles.cellText, isFocused && { color: Color.white }]}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </CustomText>
            </View>
          )}
        />
        <CustomText style={[styles.txt3, { width: windowWidth * 0.6 }]}>
          Didn’t get Code yet?
        </CustomText>
        {
          <TouchableOpacity
            disabled={timerLabel == 'Resend otp ' ? false : true}
            onPress={() => {
              settimerLabel('ReSend in '), settime(120);
            }}>
            <CustomText style={[styles.txt4]}>
              {timerLabel} {time}
            </CustomText>
          </TouchableOpacity>
        }
        <CustomButton
          text={
            isLoading ? (
              <ActivityIndicator size={'small'} color={Color.white} />
            ) : (
              'Verify'
            )
          }
          isBold
          textColor={Color.white}
          width={windowWidth * 0.85}
          height={windowHeight * 0.065}
          borderRadius={30}
          marginTop={moderateScale(20, 0.3)}
          onPress={() => {
            sendOTP()
          }}
          bgColor={Color.secondry}
        />
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

const styles = ScaledSheet.create({
  bg_con: {
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
  },
  txt3: {
    color: Color.mediumGray,
    fontSize: moderateScale(11, 0.6),
    textAlign: 'center',
    width: '95%',
    marginTop: moderateScale(10, 0.3),
    lineHeight: moderateScale(20, 0.3),
  },
  txt4: {
    color: Color.themeBlack,
    fontSize: moderateScale(13, 0.6),
    borderBottomWidth: 1,
    borderColor: Color.white,
    fontWeight: '600',
  },
  codeFieldRoot: {
    marginTop: moderateScale(20, 0.3),
    marginBottom: moderateScale(15, 0.3),
    width: windowWidth * 0.7,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: moderateScale(45, 0.3),
    height: moderateScale(45, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Color.white,
    borderWidth: 1,
    borderRadius: moderateScale(5, 0.3),
  },
  focusCell: {
    borderColor: Color.themeBlack,
    borderWidth: 1,
  },
  cellText: {
    color: Color.white,
    fontSize: moderateScale(20, 0.3),
    textAlign: 'center',
  },
  h1: {
    fontSize: moderateScale(22, 0.6),
    color: Color.white,
    textAlign: 'left',
    width: '80%',
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  h2: {
    fontSize: moderateScale(20.6),
    color: Color.white,
    textAlign: 'left',
    width: '80%',
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'none',
  },
  logo: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.4,
    marginTop: windowHeight * 0.1,
  },
  back: {
    position: 'absolute',
    top: moderateScale(20, 0.3),
    left: moderateScale(20, 0.3),
    height: moderateScale(20, 0.3),
    width: moderateScale(20, 0.3),
    borderRadius: moderateScale(30, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Color.white,
    borderWidth: 1,
    zIndex: 1,
  },
});

export default VerifyNumber;
