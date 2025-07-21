import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import {Icon} from 'native-base';
import React, {useRef, useState} from 'react';
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

const LeadBoardCard = ({item}) => {
  const IsFocused = useIsFocused();
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  const [isLoading, setIsLoading] = useState(false);
  const [leaderData, setLeaderData] = useState([]);
  const rbref = useRef();
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        // onPress={() => {
        //   navigationService.navigate('CreateRoute');
        // }}
        style={styles.card}>
        <View style={styles.row}>
          <CustomText isBold style={styles.card_heading}>
            {item?.company}
          </CustomText>
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
        {/* <View> */}
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
                width: windowWidth * 0.6,
              },
            ]}>
            {item?.origin?.name}
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
                width: windowWidth * 0.6,
              },
            ]}>
            {item?.destination?.name}
          </CustomText>
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
              name="chat"
              as={MaterialIcons}
              size={moderateScale(12, 0.6)}
              color={Color.white}
            />
          </View>
          <CustomText style={styles.text}>{`${item?.miles} miles`}</CustomText>
        </View>
        {/* <View
                    style={[styles.row, {marginTop: moderateScale(10, 0.6)}]}>
                    <View style={styles.icon_view}>
                      <Icon
                        name="weight"
                        as={FontAwesome5}
                        size={moderateScale(12, 0.6)}
                        color={Color.white}
                      />
                    </View>

                    <CustomText style={styles.text}>{item?.weight}</CustomText>
                  </View> */}
        {/* <View
                    style={[styles.row, {marginTop: moderateScale(10, 0.6)}]}>
                    <View style={styles.icon_view}>
                      <Icon
                        name="height"
                        as={MaterialIcons}
                        size={moderateScale(12, 0.6)}
                        color={Color.white}
                      />
                    </View>
                    <CustomText style={styles.text}>{item?.height}</CustomText>
                  </View>
                  <View
                    style={[styles.row, {marginTop: moderateScale(10, 0.6)}]}>
                    <View style={styles.icon_view}>
                      <Icon
                        name="corporate-fare"
                        as={MaterialIcons}
                        size={moderateScale(12, 0.6)}
                        color={Color.white}
                      />
                    </View>
                    <CustomText style={styles.text}>
                      {'Call For rate'}
                    </CustomText>
                  </View>
                  <View
                    style={[styles.row, {marginTop: moderateScale(10, 0.6)}]}>
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
                  <View
                    style={[styles.row, {marginTop: moderateScale(10, 0.6)}]}>
                    <View style={styles.icon_view}>
                      <Icon
                        name="attach-money"
                        as={MaterialIcons}
                        size={moderateScale(12, 0.6)}
                        color={Color.white}
                      />
                    </View>
                    <CustomText style={styles.text}>{`${item?.total_rate} (total)` }</CustomText>
                  </View>
                  <View
                    style={[styles.row, {marginTop: moderateScale(10, 0.6)}]}>
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
                  </View>
                  <CustomText
                  style={[
                    styles.text,
                    {
                        marginTop: moderateScale(10, 0.6),
                        },
                        ]}>
                        Lead
                        </CustomText> */}
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
        <TouchableOpacity
          onPress={() => {
            rbref?.current?.open();
          }}
          style={styles.load_btn}>
          <CustomText
            style={{
              color: Color.white,
              fontSize: moderateScale(12, 0.6),
            }}>
            Load more
          </CustomText>
        </TouchableOpacity>
      </TouchableOpacity>
      <BottomSheet Rbref={rbref} item={item} />
    </>
  );
};

export default LeadBoardCard;

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
    width: windowWidth * 0.8,
    height: windowHeight * 0.29,
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
    marginTop: moderateScale(10, 0.6),
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
  load_btn: {
    backgroundColor: Color.secondary,
    height: windowHeight * 0.032,
    marginTop: moderateScale(7, 0.6),
    width: windowWidth * 0.24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(5, 0.6),
  },
});
