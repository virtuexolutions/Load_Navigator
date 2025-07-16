import {Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import {windowHeight, windowWidth} from '../Utillity/utils';
import navigationService from '../navigationService';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Get} from '../Axios/AxiosInterceptorFunction';
import moment from 'moment';

const LoadBoard = () => {
  const IsFocused = useIsFocused();
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  console.log('🚀 ~ LoadBoard ~ userData:', userData?.company_name);

  console.log('🚀 ~ ViewLeadBoard ~ token:', token);
  const [isLoading, setIsLoading] = useState(false);
  const [loadData, setloadData] = useState([]);
  const data = loadData?.map((item, index) => {
    console.log('itttttttttttttteeeeeeeeeemmmmmmmmmmmmmm', item);
  });

  const dummyleads = [
    {
      id: 1,
      company: 'JLS Pilot Car Services',
      status: 'Open',
      recency: 'Recent',
      description: 'Calculating Notifications Sent To Drivers',
      location: 'Pennsylvania Furnace, PA, USA',
      estimatedDistanceMi: '609 Mi',
      ratePerMile: '$5.00/Mi',
      contact: '(123) 281-6350',
      date: '04/24/2025',
      timePosted: 'Less Than A Minute Ago',
      type: 'Lead',
    },
    {
      id: 2,
      company: 'JLS Pilot Car Services',
      status: 'Open',
      recency: 'Recent',
      description: 'Calculating Notifications Sent To Drivers',
      location: 'Pennsylvania Furnace, PA, USA',
      estimatedDistanceMi: '609 Mi',
      ratePerMile: '$5.00/Mi',
      contact: '(123) 281-6350',
      date: '04/24/2025',
      timePosted: 'Less Than A Minute Ago',
      type: 'Lead',
    },
    {
      id: 3,
      company: 'JLS Pilot Car Services',
      status: 'Open',
      recency: 'Recent',
      description: 'Calculating Notifications Sent To Drivers',
      location: 'Pennsylvania Furnace, PA, USA',
      estimatedDistanceMi: '609 Mi',
      ratePerMile: '$5.00/Mi',
      contact: '(123) 281-6350',
      date: '04/24/2025',
      timePosted: 'Less Than A Minute Ago',
      type: 'Lead',
    },
  ];

  const getLoad = async () => {
    const url = 'auth/load_detail';
    setIsLoading(true);
    console.log('from apiiiiiiiiiiiiiiiiiiii');
    const response = await Get(url, token);
    //  return  console.log('🚀 ~ getLoad ~ response:=============>>>', response?.data?.load_detail);
    setIsLoading(false);
    if (response != undefined) {
      setloadData(response?.data?.load_detail);
    }
  };

  useEffect(() => {
    getLoad();
  }, [IsFocused]);

  return (
    <SafeAreaView style={styles.main_view}>
      <Header
        title="Load Board Details"
        headerColor={Color.secondary}
        textstyle={{color: Color.white}}
        showBack
        menu
      />
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'light-content'}
      />
      <View style={styles.mainScreen}>
        {isLoading ? (
          <ActivityIndicator
            style={{
              height: '100%',
              width: '100%',
            }}
            size={'large'}
            color={Color.secondary}
          />
        ) : (
          <FlatList
            contentContainerStyle={{
              paddingBottom: moderateScale(90, 0.6),
            }}
            data={loadData}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigationService.navigate('PostScreen', {item: item});
                }}
                style={styles.recentLoadBoards}>
                <View style={styles.row_view}>
                  <CustomText isBold style={styles.heading_text}>
                    {userData?.company_name}
                  </CustomText>
                  <View style={styles.row_view}>
                    <CustomText style={styles.text}>{item?.recency}</CustomText>
                    <TouchableOpacity
                      onPress={() => {
                        navigationService.navigate('PostScreen', {item: item});
                      }}
                      style={styles.btn}>
                      <CustomText
                        style={{
                          color: Color.white,
                          fontSize: moderateScale(10, 0.6),
                        }}>
                        {item?.status}
                      </CustomText>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Description */}
                <View style={styles.infoRow}>
                  <View style={styles.icon_box}>
                    <Icon
                      as={MaterialCommunityIcons}
                      name="message-reply-text"
                      color={Color.white}
                      size={moderateScale(13, 0.6)}
                    />
                  </View>
                  <CustomText style={styles.details_text}>
                    {/* {item?.description} */}
                    Calculating Notifications Sent To Drivers
                  </CustomText>
                </View>

                {/* Location */}
                <View style={styles.infoRow}>
                  <View style={styles.icon_box}>
                    <Icon
                      as={Entypo}
                      name="location-pin"
                      color={Color.white}
                      size={moderateScale(13, 0.6)}
                    />
                  </View>
                  <CustomText numberOfLines={2} style={styles.details_text}>
                    {item?.origin?.name}
                  </CustomText>
                </View>
                <View style={styles.infoRow}>
                  <View style={styles.icon_box}>
                    <Icon
                      as={Entypo}
                      name="location-pin"
                      color={Color.white}
                      size={moderateScale(13, 0.6)}
                    />
                  </View>
                  <CustomText numberOfLines={2} style={styles.details_text}>
                    {item?.destination?.name}
                  </CustomText>
                </View>
                {/* Title */}
                {/* <View style={styles.infoRow}>
                  <View style={styles.icon_box}>
                    <Icon
                      name="format-title"
                      as={MaterialCommunityIcons}
                      color={Color.white}
                      size={moderateScale(13, 0.6)}
                    />
                  </View>
                  <CustomText numberOfLines={2} style={styles.details_text}>
                    {item?.title}
                  </CustomText>
                </View> */}
                {/* Type */}
                <View style={styles.infoRow}>
                  <View style={styles.icon_box}>
                    <Icon
                      name="height"
                      as={MaterialIcons}
                      color={Color.white}
                      size={moderateScale(13, 0.6)}
                    />
                  </View>
                  <CustomText numberOfLines={2} style={styles.details_text}>
                    {item?.height}
                  </CustomText>
                </View>
                {/* Weight */}
                <View style={styles.infoRow}>
                  <View style={styles.icon_box}>
                    <Icon
                      name="chat"
                      as={MaterialIcons}
                      color={Color.white}
                      size={moderateScale(13, 0.6)}
                    />
                  </View>
                  <CustomText numberOfLines={2} style={styles.details_text}>
                    {item?.communication_mode}
                  </CustomText>
                </View>
                {/* Dimensions */}
                <View style={styles.infoRow}>
                  <View style={styles.icon_box}>
                  <Icon
                        name="calendar-today"
                        as={MaterialIcons}
                        size={moderateScale(12, 0.6)}
                        color={Color.white}
                      />
                  </View>
                  <CustomText numberOfLines={2} style={styles.details_text}>
                    {moment(item?.start_date).format("DD-MM-YYYY")}
                  </CustomText>
                </View>

                {/* Distance */}
                <View style={styles.infoRow}>
                  <View style={styles.icon_box}>
                    <Icon
                      as={MaterialCommunityIcons}
                      name="map-marker-distance"
                      color={Color.white}
                      size={moderateScale(13, 0.6)}
                    />
                  </View>
                  <CustomText style={styles.details_text}>
                    {item?.miles} miles
                  </CustomText>
                </View>

                <View style={styles.infoRow}>
                  <View style={styles.icon_box}>
                    <Icon
                        name="attach-money"
                        as={MaterialIcons}
                      color={Color.white}
                      size={moderateScale(13, 0.6)}
                    />
                  </View>
                  <CustomText numberOfLines={2} style={styles.details_text}>
                    {`${item?.total_rate} (total)` }
                  </CustomText>
                </View>

                {/* Rate */}
                <View style={styles.infoRow}>
                  <View style={styles.icon_box}>
                    <Icon
                      as={FontAwesome}
                      name="dollar"
                      color={Color.white}
                      size={moderateScale(13, 0.6)}
                    />
                  </View>
                  <CustomText style={styles.details_text}>
                    {item?.rate}
                  </CustomText>
                </View>

                {/* Contact */}
                <View style={styles.infoRow}>
                  <View style={styles.icon_box}>
                    <Icon
                      as={Ionicons}
                      name="call"
                      color={Color.white}
                      size={moderateScale(13, 0.6)}
                    />
                  </View>
                  <CustomText style={styles.details_text}>
                    {item?.contact}
                  </CustomText>
                </View>

                {/* Date */}
                <View style={styles.infoRow}>
                  <View style={styles.icon_box}>
                    <Icon
                      as={Ionicons}
                      name="storefront"
                      color={Color.white}
                      size={moderateScale(13, 0.6)}
                    />
                  </View>
                  <CustomText style={styles.details_text}>
                    {moment(item?.created_at).format('l')}
                  </CustomText>
                </View>


                {/* Time Posted */}
                <View style={styles.infoRow}>
                  <View style={styles.icon_box}>
                    <Icon
                      as={Entypo}
                      name="clock"
                      color={Color.white}
                      size={moderateScale(13, 0.6)}
                    />
                  </View>
                  <CustomText style={styles.details_text}>
                    {moment(item?.created_at).format('LT')}
                  </CustomText>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default LoadBoard;

const styles = StyleSheet.create({
  mainScreen: {
    width: windowWidth,
    height: windowHeight * 0.9,
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
});
