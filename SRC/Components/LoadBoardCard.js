import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import navigationService from '../navigationService';
import CustomText from './CustomText';
import {Icon} from 'native-base';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {SafeAreaView} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Get} from '../Axios/AxiosInterceptorFunction';
import moment from 'moment';
import BottomSheet from './BottomSheet';

const LoadBoardCard = ({item}) => {
  const userData = useSelector(state => state.commonReducer.userData);
  const rbref = useRef();
  const [isRecent, setIsRecent] = useState(false);
  const emailVerified = useSelector(state => state.authReducer.emailVerified);
  const numberVerified = useSelector(state => state.authReducer.numberVerified);
  const [loadStatus, setLoadStatus] = useState(item?.status);
  const origin =
    typeof item?.origin === 'string' ? JSON.parse(item?.origin) : item.origin;
  const destination =
    typeof item?.destination === 'string'
      ? JSON.parse(item?.destination)
      : item?.destination;
  useEffect(() => {
    const THREE_HOURS = 3 * 60 * 60 * 1000; // 3 hours in ms
    const now = new Date();
    const createdTime = new Date(item?.created_at);
    const recent = now - createdTime <= THREE_HOURS;
    setIsRecent(recent);
  }, []);

  return (
    <>
      <View style={styles.recentLoadBoards}>
        <View
          style={[
            styles.row_view,
            {
              position: 'absolute',
              paddingTop: moderateScale(10, 0.6),
              right: 10,
            },
          ]}>
          <View style={styles.row_view}>
            <CustomText style={styles.text}>{item?.recency}</CustomText>
            {isRecent && (
              <CustomText
                style={{
                  color: Color.black,
                  fontSize: moderateScale(10, 0.6),
                  backgroundColor: Color.lightGrey,
                  // padding : moderateScale(3,.6),
                  paddingHorizontal: moderateScale(5, 0.6),
                  borderRadius: moderateScale(10, 0.6),
                }}>
                recent
              </CustomText>
            )}

            <TouchableOpacity
              style={[
                styles.btn,
                {
                  backgroundColor:
                    // item?.status.toLowerCase() == 'cover'
                    loadStatus.toLowerCase() == 'pending'
                      ? 'yellow'
                      : loadStatus.toLowerCase() == 'cover'
                      ? Color.green
                      : '#42d1fa',
                },
              ]}>
              <CustomText
                style={{
                  color: Color.black,
                  fontSize: moderateScale(10, 0.6),
                }}>
                {/* {item?.status.toLowerCase() == 'cover' ? 'Covered' : 'Open'} */}
                {loadStatus.toLowerCase() == 'cover'
                  ? 'Covered'
                  : loadStatus.toLowerCase() == 'complete'
                  ? 'Complete'
                  : 'Open'}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <CustomText numberOfLines={1} isBold style={styles.heading_text}>
            {userData?.company_name}
          </CustomText>
          {emailVerified == true && numberVerified == true && (
            <Icon
              style={{
                marginTop: moderateScale(16, 0.6),
                marginHorizontal: moderateScale(5, 0.6),
              }}
              as={MaterialIcons}
              name="verified"
              color={Color.blue}
              size={moderateScale(13, 0.6)}
            />
          )}
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
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={[
              styles.infoRow,
              {
                width: windowWidth * 0.4,
              },
            ]}>
            <View style={styles.icon_box}>
              <Icon
                as={Entypo}
                name="location-pin"
                color={Color.white}
                size={moderateScale(13, 0.6)}
              />
            </View>
            <CustomText numberOfLines={1} style={styles.details_text}>
              {origin?.name}
            </CustomText>
          </View>
          <View
            style={[
              styles.infoRow,
              {
                width: windowWidth * 0.35,
              },
            ]}>
            <View
              style={[
                styles.icon_box,
                {
                  backgroundColor: Color.white,
                  // backgroundColor: Color.mediumGray,
                },
              ]}>
              <Icon
                as={Feather}
                name="arrow-right"
                color={Color.darkGray}
                size={moderateScale(13, 0.6)}
              />
            </View>
            <CustomText numberOfLines={1} style={styles.details_text}>
              {destination?.name}
            </CustomText>
          </View>
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
        {/* <View style={styles.infoRow}>
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
                </View> */}
        {/* Weight */}
        {/* <View style={styles.infoRow}>
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
                </View> */}
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
            {moment(item?.start_date).format('DD-MM-YYYY')}
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

        {/* <View style={styles.infoRow}>
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
                </View> */}

        {/* Rate */}
        {/* <View style={styles.infoRow}>
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
                </View> */}

        {/* Contact */}
        {/* <View style={styles.infoRow}>
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
                </View> */}

        {/* Date */}
        {/* <View style={styles.infoRow}>
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
                </View> */}

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

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            rbref?.current?.open();
            // navigationService.navigate('PostScreen', {item: item});
          }}
          style={styles.load_more_btn}>
          <CustomText
            isBold
            style={{
              color: Color.white,
              fontSize: moderateScale(11, 0.6),
            }}>
            Load more
          </CustomText>
        </TouchableOpacity>
      </View>

      <BottomSheet
        Rbref={rbref}
        setLoadStatus={setLoadStatus}
        item={item}
        loadStatus={loadStatus}
      />
    </>
  );
};

export default LoadBoardCard;

const styles = StyleSheet.create({
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
    paddingHorizontal: moderateScale(5, 0.6),
    paddingVertical: moderateScale(10, 0.6),
    // width: windowWidth * 0.45,
  },
  text: {
    fontSize: moderateScale(10, 0.6),
    color: Color.black,
  },
  btn: {
    paddingHorizontal: moderateScale(10, 0.6),
    // width: moderateScale(50, 0.6),
    backgroundColor: 'rgba(243, 10, 10, 1)',
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
  load_more_btn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.22,
    backgroundColor: Color.secondary,
    height: windowHeight * 0.03,
    marginTop: moderateScale(8, 0.6),
    borderRadius: 10,
  },
});
