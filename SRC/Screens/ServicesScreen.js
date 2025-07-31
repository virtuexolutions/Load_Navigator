import {Icon} from 'native-base';
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import {windowHeight, windowWidth} from '../Utillity/utils';
import navigationService from '../navigationService';
import { useSelector } from 'react-redux';

const ServicesScreen = () => {
    
  return (
    <SafeAreaView style={styles.main_view}>
      <Header
        title="JLS Pilot Car Services"
        headerColor={Color.secondary}
        textstyle={{color: Color.white}}
        // showBack
      />
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'light-content'}
      />
      <View style={styles.mainScreen}>
        <View
          style={{
            height: windowHeight * 0.9,
          }}>
          <View
            style={{
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#C32C2745',
              width: windowWidth * 0.9,
              paddingHorizontal: moderateScale(15, 0.6),
              paddingVertical: moderateScale(25, 0.6),
              marginTop: moderateScale(20, 0.6),
            }}>
            <CustomText
              style={{
                fontSize: moderateScale(15, 0.6),
                color: Color.black,
              }}>
              Posted
            </CustomText>
            <CustomText style={styles.txt}> 33 minute ago</CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(15, 0.6),
                color: Color.black,
                paddingTop: moderateScale(12, 0.6),
              }}>
              status
            </CustomText>
            <CustomText style={styles.txt}>33 minute ago</CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(15, 0.6),
                color: Color.black,
                paddingTop: moderateScale(12, 0.6),
              }}>
              Load Date
            </CustomText>
            <CustomText style={styles.txt}>04/24/2025</CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(15, 0.6),
                color: Color.black,
                paddingTop: moderateScale(12, 0.6),
              }}>
              Phone
            </CustomText>
            <CustomText
              style={{
                color: Color.secondary,
                fontSize: moderateScale(13, 0.6),
              }}>
              ( 123 ) 281-6350
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(15, 0.6),
                color: Color.black,
                paddingTop: moderateScale(12, 0.6),
              }}>
              Origin
            </CustomText>
            <CustomText style={styles.txt}>
              Pennsylvania Furnace, PA, USA
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(15, 0.6),
                color: Color.black,
                paddingTop: moderateScale(12, 0.6),
              }}>
              Destination
            </CustomText>
            <CustomText style={styles.txt}>Florence, SC, USA</CustomText>

            <CustomText
              style={{
                fontSize: moderateScale(15, 0.6),
                color: Color.black,
                paddingTop: moderateScale(12, 0.6),
              }}>
              Est. Mileage
            </CustomText>
            <CustomText style={styles.txt}>609 mi</CustomText>

            <CustomText
              style={{
                fontSize: moderateScale(15, 0.6),
                color: Color.black,
                paddingTop: moderateScale(12, 0.6),
              }}>
              Rate
            </CustomText>
            <CustomText style={styles.txt}>$5.00/mi</CustomText>
              <CustomText
              style={{
                fontSize: moderateScale(15, 0.6),
                color: Color.black,
                paddingTop: moderateScale(12, 0.6),
              }}>
              position
            </CustomText>
            <CustomText style={[styles.txt ,{
                backgroundColor:Color.darkGray,
                color : Color.white,
                width : windowWidth*0.15,
                textAlign : 'center',
                padding: moderateScale(5,.6),
                borderRadius : moderateScale(15,.6)
                
            }]}>chase</CustomText>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ServicesScreen;

const styles = StyleSheet.create({
  mainScreen: {
    width: windowWidth,
    // height : windowHeight *0.9,
    backgroundColor: Color.white,
    alignItems: 'center',
  },
  main_view: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.secondary,
  },
  recentLoadBoards: {
    backgroundColor: Color.white,
    width: windowWidth * 0.9,
    paddingHorizontal: moderateScale(20, 0.2),
    paddingVertical: moderateScale(20, 0.2),
    marginTop: moderateScale(20, 0.2),
    borderRadius: moderateScale(20, 0.3),
    borderColor: '#C32C2745',
    borderWidth: 1,
  },
  row_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading_text: {
    fontSize: moderateScale(18, 0.6),
    color: Color.secondary,
  },
  text: {
    fontSize: moderateScale(10, 0.6),
    color: Color.black,
  },
  btn: {
    width: moderateScale(50, 0.6),
    backgroundColor: Color.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(20, 0.6),
    marginLeft: moderateScale(10, 0.6),
  },
  icon_box: {
    width: moderateScale(20, 0.6),
    height: moderateScale(20, 0.6),
    backgroundColor: Color.secondary,
    borderRadius: moderateScale(100, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(7, 0.6),
  },
  details_text: {
    fontSize: moderateScale(11, 0.6),
    color: Color.black,
    flexShrink: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(10, 0.6),
  },
  txt: {
    fontSize: moderateScale(13, 0.6),
    color: Color.black,
  },
});
