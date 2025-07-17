import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from './CustomButton';
import {moderateScale} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {Icon} from 'native-base';
import moment from 'moment';

const BottomSheet = ({Rbref, setRbRef, item}) => {
  return (
    <RBSheet
      // closeOnDragDown={true}
      ref={Rbref}
      height={450}
      // dragFromTopOnly={true}
      openDuration={450}
      // closeOnPressMask={true}
      customStyles={{
        container: {
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          height: windowHeight * 0.54,
        },
      }}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: Color.white,
        }}>
        <View
          style={{
            backgroundColor: Color.lightGrey,
            width: windowWidth * 0.2,
            height: windowHeight * 0.01,
            borderRadius: 10,
            marginTop: moderateScale(10, 0.6),
          }}></View>
        <CustomText
          style={{
            width: windowWidth * 0.6,
            fontSize: moderateScale(17, 0.6),
            textAlign: 'center',
            paddingTop: moderateScale(10, 0.6),
          }}>
          {item?.company}
        </CustomText>
        <View
          style={{
            paddingHorizontal: moderateScale(20, 0.6),
          }}>
          <View
          // style={[{marginTop: moderateScale(10, 0.6)}]}
          >
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
          <View style={[styles.row, {marginRight: moderateScale(18, 0.6)}]}>
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
          <View style={[styles.row, {marginTop: moderateScale(5, 0.6)}]}>
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
          {/* <View style={[styles.row, {marginTop: moderateScale(10, 0.6)}]}>
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
          <View style={[styles.row, {marginTop: moderateScale(10, 0.6)}]}>
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
          <View style={[styles.row, {marginTop: moderateScale(10, 0.6)}]}>
            <View style={styles.icon_view}>
              <Icon
                name="chat"
                as={MaterialIcons}
                size={moderateScale(12, 0.6)}
                color={Color.white}
              />
            </View>
            <CustomText style={styles.text}>
              {item?.communication_mode}
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
                name="attach-money"
                as={MaterialIcons}
                size={moderateScale(12, 0.6)}
                color={Color.white}
              />
            </View>
            <CustomText
              style={styles.text}>{`${item?.total_rate} (total)`}</CustomText>
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
          <View style={[styles.row, {marginTop: moderateScale(10, 0.6)}]}>
            <View style={styles.icon_view}>
              <Icon
                name="clockcircle"
                as={AntDesign}
                size={moderateScale(12, 0.6)}
                color={Color.white}
              />
            </View>
            <CustomText style={styles.text}>{item?.fuel_price}</CustomText>
          </View>
          <View style={[styles.row, {marginTop: moderateScale(10, 0.6)}]}>
            <View style={styles.icon_view}>
              <Icon
                name="toll"
                as={MaterialIcons}
                size={moderateScale(12, 0.6)}
                color={Color.white}
              />
            </View>
            <CustomText style={styles.text}>{item?.toll_price}</CustomText>
          </View>
        </View>
        <CustomButton
          text={'create route'}
          textColor={Color.white}
          width={windowWidth * 0.8}
          height={windowHeight * 0.05}
          marginTop={moderateScale(15, 0.3)}
          onPress={() => {}}
          bgColor={Color.secondary}
          borderRadius={moderateScale(30, 0.3)}
          fontSize={moderateScale(15, 0.3)}
        />
      </View>
    </RBSheet>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
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
});
