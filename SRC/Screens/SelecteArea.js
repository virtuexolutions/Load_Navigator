import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import {useSelector} from 'react-redux';
import navigationService from '../navigationService';

const SelecteArea = () => {
  const role = useSelector(state => state.authReducer.role);
  const [selectedArea, setSelectedArea] = useState('');
  return (
    <ImageBackground
      style={styles.main_bg}
      source={require('../Assets/Images/siginbg.png')}>
      <View
        style={{
          height: windowHeight * 0.4,
          width: windowWidth,
          position: 'absolute',
          top: '56%',
        }}>
        <CustomText
          isBold
          style={{
            fontSize: moderateScale(20, 0.6),
            textAlign: 'center',
            paddingVertical: moderateScale(10, 0.6),
            color: Color.white,
          }}>
          Login Area
        </CustomText>
        <CustomButton
          text={'Sign Up For Canada'}
          marginTop={moderateScale(10, 0.6)}
          textColor={Color.white}
          height={windowHeight * 0.07}
          borderColor={Color.white}
          borderWidth={1}
          borderRadius={moderateScale(30, 0.6)}
          width={windowWidth * 0.85}
          onPress={() => {
            navigationService.navigate('LoginScreen', {
              selectedArea: 'Sign Up For Canada',
            });
          }}
        />
        <CustomButton
          text={role == 'Company' ? 'Pilot Car' : 'sign up for usa'}
          marginTop={moderateScale(10, 0.6)}
          textColor={Color.white}
          height={windowHeight * 0.07}
          borderColor={Color.white}
          borderWidth={1}
          borderRadius={moderateScale(30, 0.6)}
          width={windowWidth * 0.85}
          onPress={() => {
            navigationService.navigate('LoginScreen', {
              selectedArea: role == 'Company' ? 'Pilot Car' : 'sign up for usa',
            });
          }}
        />
        <CustomButton
          text={role == 'Company' ? 'Pilot Car' : 'sign up for both'}
          marginTop={moderateScale(10, 0.6)}
          textColor={Color.white}
          height={windowHeight * 0.07}
          borderColor={Color.white}
          borderWidth={1}
          borderRadius={moderateScale(30, 0.6)}
          width={windowWidth * 0.85}
          onPress={() => {
            navigationService.navigate('LoginScreen', {
              selectedArea:
                role == 'Company' ? 'Pilot Car' : 'sign up for both',
            });
          }}
        />
        <CustomText
          style={{
            fontSize: moderateScale(9, 0.6),
            textAlign: 'center',
            paddingVertical: moderateScale(10, 0.6),
            color: Color.white,
            paddingHorizontal: moderateScale(14, 0.6),
            marginTop: moderateScale(30, 0.6),
          }}>
          Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nullam La
          Oreet Urna Vel Hendrerit Commodo. Etiam Ullamcorper Non Arcu Et
          Interdum.
        </CustomText>
      </View>
    </ImageBackground>
  );
};

export default SelecteArea;

const styles = StyleSheet.create({
  main_bg: {
    width: windowWidth,
    height: windowHeight,
  },
});
