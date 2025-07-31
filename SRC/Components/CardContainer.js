import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';

const CardContainer = ({children, style}) => {
  return (
    <View style={[styles.container, style && style]}>
      {children}
    </View>
  );
};

export default CardContainer;

const styles = ScaledSheet.create({
  container: {
    height: windowHeight * 0.4,
    alignSelf: 'center',
    width: windowWidth * 0.9,
    backgroundColor: Color.white,
    borderRadius: moderateScale(10, 0.3),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
});
