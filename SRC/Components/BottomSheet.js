import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from './CustomButton';
import {moderateScale} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {Icon} from 'native-base';
import moment from 'moment';
import {useSelector} from 'react-redux';
import navigationService from '../navigationService';
import PostCoveredModal from './PostCoveredModal';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useNavigation} from '@react-navigation/native';

const BottomSheet = ({Rbref, setRbRef, setLoadStatus, item ,loadStatus}) => {
  const navigation = useNavigation();
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const token = useSelector(state => state.authReducer.token);

  const origin =
    typeof item?.origin === 'string' ? JSON.parse(item?.origin) : item.origin;
  const destination =
    typeof item?.destination === 'string'
      ? JSON.parse(item?.destination)
      : item?.destination;

  const [isLoading, setIsLoading] = useState(false);
  const [isExpire, setIsExpire] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCompletionToday, setIsCompletionToday] = useState(false);

  const statusUpdate = async () => {
    const body = {
      origin: item?.origin,
      destination: item?.destination,
      escort_positions: item?.selecescort_positionstedPosition,
      additional_requirements: item?.additional_requirements,
      rate: item?.rate,
      status: 'cover',
      miles: item?.miles,
      contact: item?.contact,
    };
    const url = `auth/load_detail/${item?.id}?_method=put`;
    setIsLoading(true);
    const respose = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (respose != undefined) {
      setLoadStatus('cover');
      Rbref.current?.close();
      // navigationService.navigate('LoadBoard');
      // navigation.navigate('LoadBoard');
    }
  };

  useEffect(() => {
    checkExpiry(item?.start_date, item?.status);
    checkcompletionDate();
  }, []);

  const checkExpiry = (postDate, isCovered) => {
    const today = new Date();
    const postDateObj = new Date(postDate);
    const expire = isCovered.toLowerCase() == 'pending' && postDateObj < today;
    setIsExpire(expire);
  };

  const checkcompletionDate = () => {
    if (!item?.end_date) return false;
    const today = new Date();
    const itemDate = new Date(item?.end_date);
    const todayStr = today.toISOString().split('T')[0];
    const itemStr = itemDate.toISOString().split('T')[0];
    const isTodaycompletion = itemStr === todayStr;
    setIsCompletionToday(isTodaycompletion);
  };
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
          height:
            userRole.toLowerCase() == 'pilot'
              ? windowHeight * 0.6
              : windowHeight * 0.69,
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
            // backgroundColor :'red'
          }}></View>
        <View
          style={{
            flexDirection: 'row',
            width: windowWidth * 0.9,
            paddingHorizontal: moderateScale(10, 0.6),
            justifyContent: 'space-between',
            paddingTop: moderateScale(10, 0.6),
          }}>
          <CustomText
            numberOfLines={2}
            style={{
              fontSize: moderateScale(16, 0.6),
              color: Color.black,
              width: windowWidth * 0.7,
            }}>
            {item?.company}
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(11, 0.6),
              textAlign: 'center',
              marginTop: moderateScale(5, 0.6),
              paddingTop: moderateScale(2, 0.6),
              backgroundColor:
                loadStatus.toLowerCase() == 'cover' ? Color.green : 'yellow',
              width: moderateScale(50, 0.6),
              height: windowHeight * 0.025,
              // justifyContent: 'center',
              // alignItems: 'center',
              borderRadius: moderateScale(20, 0.6),
              marginLeft: moderateScale(10, 0.6),
            }}>
            {loadStatus.toLowerCase() == 'cover' ? 'Covered' : 'Open'}
          </CustomText>
        </View>
        <View
          style={{
            paddingHorizontal: moderateScale(35, 0.6),
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
                {origin?.name}
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
            <CustomText style={styles.text}>{destination?.name}</CustomText>
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
          <View style={[styles.row, {marginTop: moderateScale(10, 0.6)}]}>
            <View style={styles.icon_view}>
              <Icon
                name="paragraph"
                as={Fontisto}
                size={moderateScale(12, 0.6)}
                color={Color.white}
              />
            </View>

            <CustomText numberOfLines={2} style={styles.text}>
              {item?.description}
            </CustomText>
          </View>
          {item?.height != null && (
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
          )}
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
                name="map-marker-distance"
                as={MaterialCommunityIcons}
                size={moderateScale(12, 0.6)}
                color={Color.white}
              />
            </View>
            <CustomText
              style={styles.text}>{`${item?.miles} miles`}</CustomText>
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
        </View>
        {isExpire && (
          <CustomText
            style={[
              styles.text,
              {
                textAlign: 'flex-start',
                width: windowWidth * 0.8,
                paddingVertical: moderateScale(5, 0.6),
              },
            ]}>
            Did you find someone?
          </CustomText>
        )}

        {userRole.toLowerCase() == 'pilot' ? (
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
        ) : (
          <>
            <CustomButton
              text={
                isLoading ? (
                  <ActivityIndicator size={'small'} color={Color.white} />
                ) : (
                  'Mark Covered '
                )
              }
              textColor={Color.white}
              width={windowWidth * 0.8}
              height={windowHeight * 0.05}
              marginTop={!isExpire && moderateScale(15, 0.3)}
              onPress={() => {
                setIsModalVisible(true);
                // statusUpdate();
              }}
              bgColor={Color.secondary}
              borderRadius={moderateScale(30, 0.3)}
              fontSize={moderateScale(15, 0.3)}
              // disabled={item?.status.toLowerCase() == 'cover' ? true : false}
            />
            {isExpire && (
              <CustomButton
                text={'repost'}
                textColor={Color.white}
                width={windowWidth * 0.8}
                height={windowHeight * 0.05}
                marginTop={moderateScale(5, 0.3)}
                onPress={() => {
                  navigationService.navigate('LoadDetails', {
                    item: item,
                    repost: true,
                  });
                }}
                bgColor={Color.secondary}
                borderRadius={moderateScale(30, 0.3)}
                fontSize={moderateScale(15, 0.3)}
              />
            )}

            {userRole?.toLowerCase() != 'pilot' && isCompletionToday && (
              <CustomButton
                text={'complete'}
                textColor={Color.white}
                width={windowWidth * 0.8}
                height={windowHeight * 0.05}
                marginTop={moderateScale(15, 0.3)}
                onPress={() => {
                  Rbref?.current?.close();
                }}
                bgColor={Color.secondary}
                borderWidth={1}
                borderColor={Color.secondary}
                borderRadius={moderateScale(30, 0.3)}
                fontSize={moderateScale(15, 0.3)}
              />
            )}
          </>
        )}

        <PostCoveredModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      </View>
    </RBSheet>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
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
    // backgroundColor :'red'
  },
});
