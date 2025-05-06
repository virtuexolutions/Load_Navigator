import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import {moderateScale} from 'react-native-size-matters';
import {background, color, position} from 'native-base/lib/typescript/theme/styled-system';
import {mode} from 'native-base/lib/typescript/theme/tools';
import Color from '../Assets/Utilities/Color';

const StartScreen = () => {
  return (
    <ImageBackground
      imageStyle={{
        height: windowHeight,
        width: windowWidth,
      }}
      style={styles.main_con}
      source={require('../Assets/Images/start_bg.png')}>
      <View
        style={{
          alignSelf: 'center',
          height: windowHeight * 0.3,
          position: 'absolute',
          bottom: 15,
        }}>
        <CustomButton
          text={'Trucking Company'}
          textColor={Color.white}
          height={windowHeight * 0.07}
          borderColor={Color.white}
          borderWidth={1}
          borderRadius={moderateScale(30, 0.6)}
          width={windowWidth * 0.85}
        />
        <CustomButton
          text={'Pilot Car'}
          marginTop={moderateScale(10, 0.6)}
          textColor={Color.white}
          height={windowHeight * 0.07}
          borderColor={Color.white}
          borderWidth={1}
          borderRadius={moderateScale(30, 0.6)}
          width={windowWidth * 0.85}
        />

        <CustomText
          style={{
            fontSize: moderateScale(10, 0.6),
            // paddingHorizontal: moderateScale(15, 0.6),
            // textAlign : 'center' ,
            color : Color.white ,
            position: 'absolute',
            bottom : 20 ,
            // width : windowWidth *0.95,

            // paddingVertical : moderateScale(15,.6)
  
  }}>
  
          Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nullam La
          Oreet Urna Vel Hendrerit Commodo. Etiam Ullamcorper Non Arcu Et
          Interdum.
        </CustomText>
      </View>
    </ImageBackground>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  main_con: {
    width: windowWidth,
    height: windowHeight,
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
