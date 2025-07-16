import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import ScreenBoiler from '../Components/ScreenBoiler';
import {setUserLogoutAuth, setUserToken} from '../Store/slices/auth';
import {SetUserRole} from '../Store/slices/auth-slice';
import {setUserLogOut} from '../Store/slices/common';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {Icon} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Drawer = React.memo(() => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const role = useSelector(state => state.authReducer.role);
  const userData = useSelector(state => state.commonReducer.userData);
  console.log('🚀 ~ Drawer ~ userData:userData', userData?.role);
  const companyData = [
    {
      id: 1,
      name: 'Load Board ',
      onPress: () => {
        // navigation.navigate('LoadBoard');
        navigation.navigate('MyDrawer', {screen: 'LoadBoard'});
      },
      iconName: 'post',
      iconType: MaterialCommunityIcons,
    },
    {
      id: 2,
      name: 'Directory',
      onPress: () => {
        // setIsModalVisible(true);
        // navigation.navigate('CarDirectory');
        navigation.navigate('MyDrawer', {screen: 'CarDirectory'});
      },
      iconName: 'folder',
      iconType: Feather,
    },
    {
      id: 9,
      name: 'Profile',
      onPress: () => {
        navigation.navigate('MyDrawer', {screen: 'Profile'});
      },
      iconName: 'user',
      iconType: FontAwesome5,
    },
    {
      id: 2,
      name: 'Help/FAQS',
      onPress: () => {
        navigation.navigate('MyDrawer', {screen: 'Help'});
      },
      iconName: 'hands-helping',
      iconType: FontAwesome5,
    },
    {
      id: 3,
      name: 'Change Password',
      onPress: () => {
        navigation.navigate('MyDrawer', {screen: 'ChangePassword'});
      },
      iconName: 'setting',
      iconType: AntDesign,
    },
    {
      id: 4,
      name: 'Terms & Conditions',
      onPress: () => {
        navigation.navigate('MyDrawer', {screen: 'TermsAndConditions'});
      },
      iconName: 'book-open-page-variant',
      iconType: MaterialCommunityIcons,
    },
    {
      id: 5,
      name: 'Privacy Policy',
      onPress: () => {
        navigation.navigate('MyDrawer', {screen: 'PrivacyPolicy'});
      },
      iconName: 'shield-lock-outline',
      iconType: MaterialCommunityIcons,
    },
  ];

  const pilotData = [
    {
      id: 1,
      name: 'View Load Board',
      onPress: () => {
        navigation.navigate('MyDrawer', {screen: 'ViewLeadBoard'});
      },
      iconName: 'clipboard-list',
      iconType: FontAwesome5,
    },
    {
      id: 9,
      name: 'Profile',
      onPress: () => {
        navigation.navigate('MyDrawer', {screen: 'Profile'});
      },
      iconName: 'user',
      iconType: FontAwesome5,
    },
    {
      id: 2,
      name: 'Help/FAQS',
      onPress: () => {
        navigation.navigate('MyDrawer', {screen: 'Help'});
      },
      iconName: 'hands-helping',
      iconType: FontAwesome5,
    },
    {
      id: 3,
      name: 'Change Password',
      onPress: () => {
        navigation.navigate('MyDrawer', {screen: 'ChangePassword'});
      },
      iconName: 'setting',
      iconType: AntDesign,
    },
    {
      id: 4,
      name: 'Terms & Conditions',
      onPress: () => {
        navigation.navigate('MyDrawer', {screen: 'TermsAndConditions'});
      },
      iconName: 'book-open-page-variant',
      iconType: MaterialCommunityIcons,
    },
    {
      id: 5,
      name: 'Privacy Policy',
      onPress: () => {
        navigation.navigate('MyDrawer', {screen: 'PrivacyPolicy'});
      },
      iconName: 'shield-lock-outline',
      iconType: MaterialCommunityIcons,
    },
  ];
  const adminData1 = [];

  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <View
        style={[
          styles.drawer_view,
          {
            backgroundColor:
              userData?.role == 'pilot' ? '#292929' : Color.white,
          },
        ]}>
        <View
          style={[
            styles.header_view,
            {
              backgroundColor:
                userData?.role !== 'pilot' ? Color.secondary : Color.black,
            },
          ]}>
          <View style={styles.image_view}>
            <CustomImage
              style={styles.image}
              source={require('../Assets/Images/logo.png')}
            />
          </View>
          <CustomText isBold style={styles.heading_text}>
            Load Manager
          </CustomText>
        </View>
        <View
          style={{
            paddingHorizontal: moderateScale(15, 0.6),
            paddingVertical: moderateScale(15, 0.6),
          }}>
          {  userData?.role?.toLowerCase() !== 'pilot' ?  companyData?.map(item => {
            return (
              <TouchableOpacity onPress={item?.onPress} style={styles.row_view}>
                <Icon
                  name={item?.iconName}
                  as={item?.iconType}
                  size={moderateScale(15, 0.6)}
                  color={
                    userData?.role !== 'pilot' ? Color.black : Color.lightGrey
                  }
                />
                <CustomText
                  style={[
                    styles.text,
                    {
                      color:
                        userData?.role != 'pilot'
                          ? Color.black
                          : Color.lightGrey,
                    },
                  ]}>
                  {item?.name}
                </CustomText>
              </TouchableOpacity>
            );
          }) :pilotData?.map(item => {
            return (
              <TouchableOpacity onPress={item?.onPress} style={styles.row_view}>
                <Icon
                  name={item?.iconName}
                  as={item?.iconType}
                  size={moderateScale(15, 0.6)}
                  color={
                    userData?.role != 'pilot' ? Color.black : Color.lightGrey
                  }
                />
                <CustomText
                  style={[
                    styles.text,
                    {
                      color:
                        userData?.role != 'pilot'
                          ? Color.black
                          : Color.lightGrey,
                    },
                  ]}>
                  {item?.name}
                </CustomText>
              </TouchableOpacity>
            );
          }) }
          {/* <View style={styles.line} />
          {adminData1.map(item => {
            return (
              <TouchableOpacity style={styles.row_view}>
                <Icon
                  name={item?.iconName}
                  as={item?.iconType}
                  size={moderateScale(15, 0.6)}
                  color={
                    userData?.role == 'company' ? Color.black : Color.lightGrey
                  }
                />
                <CustomText
                  style={[
                    styles.text,
                    {
                      color:
                        userData?.role == 'company'
                          ? Color.black
                          : Color.lightGrey,
                    },
                  ]}>
                  {item?.name}
                </CustomText>
              </TouchableOpacity>
            );
          })} */}
        </View>
        <TouchableOpacity
          onPress={() => {
            dispatch(setUserLogoutAuth());
            // dispatch(setUserLogOut())
            dispatch(setUserToken());
            dispatch(SetUserRole());
            dispatch(setUserLogOut());
          }}
          style={[
            styles.row_view,
            {
              position: 'absolute',
              bottom: 80,
              marginLeft: moderateScale(15, 0.6),
            },
          ]}>
          <Icon
            name={'logout'}
            as={MaterialCommunityIcons}
            size={moderateScale(15, 0.6)}
            color={Color.secondary}
          />
          <CustomText style={[styles.text, {color: Color.secondary}]}>
            {'Logout'}
          </CustomText>
        </TouchableOpacity>
      </View>
    </ScreenBoiler>
  );
});

export default Drawer;

const styles = StyleSheet.create({
  drawer_view: {
    height: windowHeight,
  },
  header_view: {
    width: '100%',
    height: windowHeight * 0.2,
    backgroundColor: Color.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image_view: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.2,
    marginTop: moderateScale(10, 0.6),
  },
  image: {
    width: '100%',
    height: '100%',
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
    marginTop: moderateScale(20, 0.6),
  },
  text: {
    fontSize: moderateScale(14, 0.6),
    color: Color.lightGrey,
    marginLeft: moderateScale(10, 0.6),
  },
  line: {
    width: '90%',
    height: 1,
    backgroundColor: Color.lightGrey,
    marginVertical: moderateScale(20, 0.6),
  },
});
