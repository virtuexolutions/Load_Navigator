import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import {Icon} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import BottomSheet from '../Components/BottomSheet';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import AddCard from './AddCard';
import CustomImage from './CustomImage';

const JobCard = ({item, fromMyjobs}) => {
  const IsFocused = useIsFocused();
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const finalorigin = JSON.parse(item?.origin);
  const finaldestination = JSON.parse(item?.destination);

  const [isLoading, setIsLoading] = useState(false);
  const [leaderData, setLeaderData] = useState([]);
  const rbref = useRef();
  const [isRecent, setIsRecent] = useState(false);

  useEffect(() => {
    const THREE_HOURS = 3 * 60 * 60 * 1000; // 3 hours in ms
    const now = new Date();
    const createdTime = new Date(item?.created_at);
    const recent = now - createdTime <= THREE_HOURS;
    setIsRecent(recent);
  }, []);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        // onPress={() => {
        //   navigationService.navigate('CreateRoute');
        // }}
        style={styles.card}>
        <View style={styles.row}>
          {isRecent && (
            <CustomText
              style={{
                color: Color.black,
                fontSize: moderateScale(10, 0.6),
                backgroundColor: Color.lightGrey,
                paddingHorizontal: moderateScale(5, 0.6),
                borderRadius: moderateScale(10, 0.6),
                position: 'absolute',
                right: 90,
              }}>
              recent
            </CustomText>
          )}

          <View
            style={[
              styles.badges,
              {
                backgroundColor:
                  item?.status.toLowerCase() == 'cover'
                    ? Color.green
                    : 'yellow',
              },
            ]}>
            <CustomText style={styles.text}>
              {item?.status.toLowerCase() == 'cover' ? 'Covered' : 'Open'}
            </CustomText>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingTop: moderateScale(10, 0.6),
            paddingHorizontal: moderateScale(5, 0.6),
          }}>
          <View
            style={{
              width: moderateScale(15, 0.6),
              height: moderateScale(15, 0.6),
              marginTop: moderateScale(6, 0.6),
            }}>
            <CustomImage
              style={{
                height: '100%',
                width: '100%',
              }}
              source={
                item?.card == null
                  ? require('../Assets/Images/alert.png')
                  : require('../Assets/Images/secure-payment.png')
              }
            />
          </View>
          <CustomText numberOfLines={1} isBold style={styles.card_heading}>
            {item?.company}
          </CustomText>
          {item?.user?.is_email_verified == 1 &&
            item?.user?.is_number_verified == 1 && (
              <Icon
                style={{
                  marginTop: moderateScale(8, 0.6),
                  marginHorizontal: moderateScale(5, 0.6),
                }}
                as={MaterialIcons}
                name="verified"
                color={Color.blue}
                size={moderateScale(14, 0.6)}
              />
            )}
        </View>
        {/* <View> */}

        <View
          style={{
            flexDirection: 'row',
          }}>
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
              numberOfLines={1}
              style={[
                styles.text,
                {
                  width: windowWidth * 0.33,
                },
              ]}>
              {finalorigin?.name}
            </CustomText>
          </View>
          {/* </View> */}
          <View
            style={[
              styles.row,
              //    {marginLeft: moderateScale(10, 0.6)}
            ]}>
            <View style={styles.icon_view}>
              <Icon
                name="arrow-right"
                as={Feather}
                size={moderateScale(12, 0.6)}
                color={Color.white}
              />
            </View>
            <CustomText
              numberOfLines={1}
              style={[
                styles.text,
                {
                  width: windowWidth * 0.3,
                },
              ]}>
              {finaldestination?.name}
            </CustomText>
          </View>
        </View>

        <View style={[styles.row, {marginTop: moderateScale(10, 0.6)}]}>
          <View style={styles.icon_view}>
            <Icon
              name="calendar-today"
              as={MaterialIcons}
              size={moderateScale(12, 0.6)}
              color={Color.white}
            />
          </View>
          <CustomText style={styles.text}>
            {moment(item?.start_date).format('DD-MM-YYYY')}
          </CustomText>
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

        <TouchableOpacity
          disabled={item?.card != null}
          onPress={() => {
            setIsModalVisible(true);
          }}
          // disabled={item?.card != null ? true : false}
          style={[styles.load_btn ,[
            
            {
              borderWidth :1,
              // borderColor :  Color.secondary,
              backgroundColor:item?.card != null ? Color.lightGrey :  Color.secondary,
            }
          ]]}>
          <CustomText
            style={{
              color: item?.card != null  ? Color.darkGray :Color.white,
              fontSize: moderateScale(12, 0.6),
            }}>
            {item?.card != null ? 'Card Added' : 'Add Card'}
          </CustomText>
        </TouchableOpacity>
      </TouchableOpacity>
      <AddCard
        item={item}
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
      />
    </>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  mainScreen: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.primary,
    aignItems: 'center',
  },
  heading: {
    fontSize: moderateScale(20, 0.6),
    color: Color.white,
    textAlign: 'center',
  },
  card: {
    width: windowWidth * 0.85,
    paddingVertical: moderateScale(10, 0.6),
    backgroundColor: Color.grey,
    borderRadius: moderateScale(20, 0.6),
    marginTop: moderateScale(10, 0.6),
    borderWidth: 1,
    borderColor: Color.secondary,
    paddingLeft: moderateScale(15, 0.6),
    paddingVertical: moderateScale(15, 0.6),

    overflow: 'hidden',
  },
  card_heading: {
    fontSize: moderateScale(18, 0.6),
    color: Color.white,
    paddingHorizontal: moderateScale(5, 0.6),
  },
  row: {
    marginTop: moderateScale(5, 0.6),
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
    color: Color.black,
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
  load_btn: {
    height: windowHeight * 0.032,
    marginTop: moderateScale(7, 0.6),
    width: windowWidth * 0.24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(5, 0.6),
  },
});
