import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import {Icon} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Header from '../Components/Header';
import navigationService from '../navigationService';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';

const ViewLeadBoard = () => {
  const IsFocused = useIsFocused();
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  console.log('🚀 ~ ViewLeadBoard ~ userData:', userData);
  console.log('🚀 ~ ViewLeadBoard ~ token:', token);
  const [isLoading, setIsLoading] = useState(false);
  const [leaderData, setLeaderData] = useState([]);

  const leadBoard_array = [
    {
      id: 1,
      name: 'Ovila, Services',
      startLocation: 'start location',
      endLocation: 'End LOcation',
      phoneNumber: '0000000000',
      date: '05 Apr 2025',
      time: '05 Day Ago',
      type: 'open',
    },
    {
      id: 2,
      name: 'Ovila, Services',
      startLocation: 'start location',
      endLocation: 'End LOcation',
      phoneNumber: '0000000000',
      date: '05 Apr 2025',
      time: '05 Day Ago',
      type: 'cover',
    },
    {
      id: 3,
      name: 'Ovila, Services',
      startLocation: 'start location',
      endLocation: 'End LOcation',
      phoneNumber: '0000000000',
      date: '05 Apr 2025',
      time: '05 Day Ago',
      type: 'cover',
    },
    {
      id: 4,
      name: 'Ovila, Services',
      startLocation: 'start location',
      endLocation: 'End LOcation',
      phoneNumber: '0000000000',
      date: '05 Apr 2025',
      time: '05 Day Ago',
      type: 'open',
    },
  ];

  const getLoadList = async () => {
    const url = 'auth/load_list';
    setIsLoading(true);
    const response = await Get(url, token);
    console.log('🚀 ~ getLoad ~ response:', response?.data?.load_detail);
    setIsLoading(false);
    if (response != undefined) {
      setLeaderData(response?.data?.load_detail);
    }
  };

  useEffect(() => {
    getLoadList();
  }, [IsFocused]);

  return (
    <SafeAreaView
      // scrollEnabled={false}
      style={styles.mainScreen}
      //   conltentContainerStyle={{
      //     aignItems: 'center',
      //   }}
    >
      <View style={styles.main_view}>
        <Header
          title="View Leader Board"
          headerColor={'transparent'}
          textstyle={{color: Color.white}}
          showBack
          menu
        />
        {/* <CustomText style={styles.heading}>View Leader Board</CustomText> */}
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
          }}
          data={leaderData}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigationService.navigate('CreateRoute');
                }}
                style={styles.card}>
                <View style={styles.row}>
                  <CustomText isBold style={styles.card_heading}>
                    {item?.user?.company_name}
                  </CustomText>
                  <View style={styles.badges}>
                    <CustomText style={styles.text}>{item?.status}</CustomText>
                  </View>
                </View>
                <View style={[styles.row, {marginTop: moderateScale(10, 0.6)}]}>
                  <View style={styles.row}>
                    <View style={styles.icon_view}>
                      <Icon
                        name="map-pin"
                        as={Feather}
                        size={moderateScale(12, 0.6)}
                        color={Color.white}
                      />
                    </View>
                    <CustomText
                      numberOfLines={2}
                      style={[
                        styles.text,
                        {
                          width: windowWidth * 0.7,
                        },
                      ]}>
                      {item?.origin?.name}
                    </CustomText>
                  </View>
                </View>
                <View
                  style={[
                    styles.row,
                    //    {marginLeft: moderateScale(10, 0.6)}
                  ]}>
                  <View style={styles.icon_view}>
                    <Icon
                      name="map-pin"
                      as={Feather}
                      size={moderateScale(12, 0.6)}
                      color={Color.white}
                    />
                  </View>
                  <CustomText style={styles.text}>
                    {item?.destination?.name}
                  </CustomText>
                </View>
                <View style={[styles.row, {marginTop: moderateScale(10, 0.6)}]}>
                  <View style={styles.icon_view}>
                    <Icon
                      name="corporate-fare"
                      as={MaterialIcons}
                      size={moderateScale(12, 0.6)}
                      color={Color.white}
                    />
                  </View>
                  <CustomText style={styles.text}>{'Call For rate'}</CustomText>
                </View>
                <View style={[styles.row, {marginTop: moderateScale(10, 0.6)}]}>
                  <View style={styles.icon_view}>
                    <Icon
                      name="phone"
                      as={AntDesign}
                      size={moderateScale(12, 0.6)}
                      color={Color.white}
                    />
                  </View>
                  <CustomText style={styles.text}>{item?.contact}</CustomText>
                </View>
                <View style={[styles.row, {marginTop: moderateScale(10, 0.6)}]}>
                  <View style={styles.icon_view}>
                    <Icon
                      name="date"
                      as={Fontisto}
                      size={moderateScale(12, 0.6)}
                      color={Color.white}
                    />
                  </View>
                  <CustomText style={styles.text}>
                    {moment(item?.created_at).format('l')}
                  </CustomText>
                </View>
                <View style={[styles.row, {marginTop: moderateScale(10, 0.6)}]}>
                  <View style={styles.icon_view}>
                    <Icon
                      name="clockcircle"
                      as={AntDesign}
                      size={moderateScale(12, 0.6)}
                      color={Color.white}
                    />
                  </View>
                  <CustomText style={styles.text}>
                    {moment(item?.created_at).format('LT')}
                  </CustomText>
                </View>
                <CustomText
                  style={[
                    styles.text,
                    {
                      marginTop: moderateScale(10, 0.6),
                    },
                  ]}>
                  Lead
                </CustomText>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ViewLeadBoard;

const styles = StyleSheet.create({
  mainScreen: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.primary,
    aignItems: 'center',
  },
  main_view: {
    // paddingHorizontal: moderateScale(20, 0.6),
    // paddingVertical: moderateScale(30, 0.6),
  },
  heading: {
    fontSize: moderateScale(20, 0.6),
    color: Color.white,
    textAlign: 'center',
  },
  card: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.34,
    backgroundColor: Color.grey,
    borderRadius: moderateScale(20, 0.6),
    marginTop: moderateScale(10, 0.6),
    borderWidth: 1,
    borderColor: Color.secondary,
    paddingLeft: moderateScale(15, 0.6),
    paddingVertical: moderateScale(15, 0.6),
  },
  card_heading: {
    fontSize: moderateScale(18, 0.6),
    color: Color.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon_view: {
    width: moderateScale(20, 0.6),
    height: moderateScale(20, 0.6),
    backgroundColor: Color.secondary,
    borderRadius: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: moderateScale(12, 0.6),
    marginLeft: moderateScale(5, 0.6),
    color: Color.white,
    // backgroundColor :'red'
  },
  badges: {
    width: moderateScale(70, 0.6),
    height: moderateScale(20, 0.6),
    backgroundColor: 'red',
    position: 'absolute',
    right: 0,
    borderTopLeftRadius: moderateScale(15, 0.6),
    borderBottomLeftRadius: moderateScale(15, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
