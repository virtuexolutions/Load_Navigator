import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from '../Components/CustomButton';
import {moderateScale} from 'react-native-size-matters';
import navigationService from '../navigationService';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {useSelector} from 'react-redux';

const SelectRoute = () => {
  const role = useSelector(state => state.authReducer.role);
  console.log("🚀 ~ SelectRoute ~ role:", role)

  return (
    <ImageBackground
      imageStyle={{
        width: '100%',
        height: '100%',
      }}
      resizeMode="stretch"
      source={require('../Assets/Images/route.png')}
      style={{
        height: windowHeight,
        width: windowWidth,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          alignSelf: 'center',
          height: windowHeight * 0.2,
          position: 'absolute',
          bottom: 0,
        }}>
        <CustomButton
          text={'Create A Route' }
          textColor={Color.white}
          height={windowHeight * 0.07}
          borderColor={Color.white}
          borderWidth={1}
          borderRadius={moderateScale(30, 0.6)}
          width={windowWidth * 0.85}
          onPress={() => {
          
              navigationService.navigate('CreateRoute');
          
          }}
        />
        <CustomButton
          text={ 'View Leader Board'}
          marginTop={moderateScale(10, 0.6)}
          textColor={Color.white}
          height={windowHeight * 0.07}
          borderColor={Color.white}
          borderWidth={1}
          borderRadius={moderateScale(30, 0.6)}
          width={windowWidth * 0.85}
          onPress={() => {
          
              navigationService.navigate('ViewLeadBoard');
           
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default SelectRoute;

const styles = StyleSheet.create({});
