import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import ScreenBoiler from '../Components/ScreenBoiler';
import { setUserToken } from '../Store/slices/auth';
import { SetUserRole } from '../Store/slices/auth-slice';
import { setUserLogOut } from '../Store/slices/common';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { Icon } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const Drawer = React.memo(() => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const adminData = [
    {
      id: 1,
      name: 'Post Load',
      onPress: () => {
        navigation.navigate('HomeScreen');
      },
      iconName: 'post',
      iconType: MaterialCommunityIcons
    },
    {
      id: 2,
      name: 'Directory',
      onPress: () => {
        // setIsModalVisible(true);
        navigation.navigate('ReferFriendScreen');
      },
      iconName: 'folder',
      iconType: Feather
    },
    {
      id: 3,
      name: 'Setting',
      onPress: () => {
        navigation.navigate('MyJourneys');
      },
      iconName: 'setting',
      iconType: AntDesign
    },


  ];

  const adminData1 = [
    {
      id: 1,
      name: 'Refer a friend',
      onPress: () => {
        navigation.navigate('Earningsscreen');
      },
      iconName: 'handshake',
      iconType: FontAwesome5
    },
    {
      id: 2,
      name: 'Help/FAQS',
      onPress: () => {
        navigation.navigate('History');
      },
      iconName: 'hands-helping',
      iconType: FontAwesome5
    },
    {
      id: 3,
      name: 'Support CHat',
      onPress: () => {
        navigation.navigate('AddYourCar');
      },
      iconName: 'message-reply-text',
      iconType: MaterialCommunityIcons
    },
  ]

  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <View style={styles.drawer_view}>
        <View style={styles.header_view}>
          <View style={styles.image_view}>
            <CustomImage style={styles.image} source={require('../Assets/Images/logo.png')} />
          </View>
          <CustomText isBold style={styles.heading_text}>Load Manager</CustomText>
        </View>
        <View style={{
          paddingHorizontal: moderateScale(15, 0.6),
          paddingVertical: moderateScale(15, 0.6)
        }}>
          {adminData.map((item) => {
            return (
              <View style={styles.row_view}>
                <Icon name={item?.iconName} as={item?.iconType} size={moderateScale(15, 0.6)} color={Color.lightGrey} />
                <CustomText style={styles.text}>{item?.name}</CustomText>
              </View>
            )
          })
          }
          <View style={styles.line} />
          {adminData1.map((item) => {
            return (
              <View style={styles.row_view}>
                <Icon name={item?.iconName} as={item?.iconType} size={moderateScale(15, 0.6)} color={Color.lightGrey} />
                <CustomText style={styles.text}>{item?.name}</CustomText>
              </View>
            )
          })
          }
        </View>
        <View style={[styles.row_view, {
          position: 'absolute',
          bottom: 80,
          marginLeft: moderateScale(15, 0.6),
        }]}>
          <Icon name={'logout'} as={MaterialCommunityIcons} size={moderateScale(15, 0.6)} color={Color.secondary} />
          <CustomText style={[styles.text, { color: Color.secondary }]}>{'Logout'}</CustomText>
        </View>
      </View>
    </ScreenBoiler>
  );
});

export default Drawer;

const styles = StyleSheet.create({
  drawer_view: {
    backgroundColor: '#292929',
    height: windowHeight
  },
  header_view: {
    width: '100%',
    height: windowHeight * 0.2,
    backgroundColor: Color.black,
    justifyContent: "center",
    alignItems: 'center'
  },
  image_view: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.2,
    marginTop: moderateScale(10, 0.6)
  },
  image: {
    width: '100%',
    height: '100%'
  },
  heading_text: {
    fontSize: moderateScale(18, 0.6),
    color: Color.white,
  },
  row_view: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15, 0.6),
    marginTop: moderateScale(20, 0.6)
  },
  text: {
    fontSize: moderateScale(14, 0.6),
    color: Color.lightGrey,
    marginLeft: moderateScale(10, 0.6)
  },
  line: {
    width: '90%',
    height: 1,
    backgroundColor: Color.lightGrey,
    marginVertical: moderateScale(20, 0.6)
  }
});
