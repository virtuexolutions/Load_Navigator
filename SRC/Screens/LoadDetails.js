import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {Checkbox, Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import Header from '../Components/Header';
import SearchLocationModal from '../Components/SearchLocationModal';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';

const LoadDetails = props => {
  const navigationN = useNavigation();
  const isPostDetails = props?.route?.params?.isPostDetails;
  const item = props?.route?.params?.item;
  const repost = props?.route?.params?.repost;
  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ LoadDetails ~ token:', token);
  const userData = useSelector(state => state.commonReducer.userData);
  const [isMiles, setIsMiles] = useState(false);
  const repostrate = item?.rate;
  const perMilesOnly = repostrate?.split('/')[1]; //
  const [selectedRate, setSelectedRate] = useState('/per miles');
  const [selectedSize, setSelectedSize] = useState('select type');
  const [isSize, setIsSize] = useState(false);
  const [weight, setWeight] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [originState, setOriginState] = useState('');
  const [destinationState, setdestinationState] = useState('');

  const HEIGHT_OPTIONS = [
    "Under 8'",
    "8' – 8'6\" (Standard)",
    "9'",
    "10'",
    "11'",
    "12'",
    '13\'6" (Max Legal)',
    'Custom',
    'Over 13\'6" (Oversize)',
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [locationType, setLocationType] = useState('');
  const [origin, setOrigin] = useState(repost ? item?.origin : {});
  const [destination, setDestination] = useState(
    repost ? item?.destination : {},
  );
  console.log('🚀 ~ LoadDetails ~ destination:', JSON.parse(destination));
  const repostDestination = JSON.parse(destination);
  const repostOrigin = JSON.parse(origin);

  const rate1 = item?.rate;
  const numberOnly = rate1?.split('/')[0];
  const [Rate, setRate] = useState(repost ? numberOnly : 0);
  const [selectedPosition, setSelectedPosition] = useState(
    repost ? item?.escort_positions : [],
  );
  const [selectedRequirement, setSelectedRequirement] = useState(
    repost ? item?.additional_requirements : [],
  );
  const [distance, setDistance] = useState('');
  const [title, setTitle] = useState(userData?.company_name);
  const [customHeight, setCustomHeight] = useState();
  const [height, setHeight] = useState(repost ? item?.height : '');
  const [date, setDate] = useState(
    repost ? moment(item?.start_date).format('l') : '',
  );
  const [endDate, setEndDate] = useState('');
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [contact, setContact] = useState(userData?.contact);
  const [dateType, setDateType] = useState('');

  const [commnuicationMode, setCommunicationMode] = useState(
    repost && item?.communication_mode == 'text-only' ? true : false,
  );
  const [totalRate, setTotalRate] = useState(0);
  const [fuelPrice, setFuelPrice] = useState(0);
  const [tollPrice, setTollPrice] = useState(0);
  const [description, setDescription] = useState(
    repost ? item?.description : '',
  );

  const handleChangeText = input => {
    const words = input.trim().split(/\s+/);
    if (words.length <= 50) {
      setDescription(input);
    }
  };

  const wordCount =
    description?.trim() === '' ? 0 : description?.trim().split(/\s+/).length;
  const [positions, setPositions] = useState([
    'lead',
    'chase',
    'pole',
    'steer',
    'survey',
    'thirdCar',
    'fourthCar',
    'witpac',
    'cevo',
    'cse',
  ]);

  const positionOptions = [
    {
      id: 1,
      text: 'Lead',
    },
    {
      id: 2,
      text: 'Chase',
      key: 'chase',
    },
    {
      id: 3,
      text: 'High Pole',
      key: 'pole',
    },
    {
      id: 4,
      text: 'Steer',
      key: 'steer',
    },
    {
      id: 5,
      text: 'Route Survey',
      key: 'survey',
    },
    {
      id: 6,
      text: 'Third Car',
      key: 'thirdCar',
    },
    {
      id: 7,
      text: 'Fourth Car',
      key: 'fourthCar',
    },
  ];

  const requirements = [
    {
      id: 1,
      text: 'WITPAC Needed',
      key: 'witpac',
    },
    {
      id: 2,
      text: 'CEVO Needed',
      key: 'cevo',
    },
    {
      id: 3,
      text: 'CSE Needed',
      key: 'cse',
    },
  ];
  function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const toRad = angle => (angle * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.asin(Math.sqrt(a));
    return R * c;
  }
  useEffect(() => {
    const oLat = parseFloat(origin?.lat);
    const oLng = parseFloat(origin?.lng);
    const dLat = parseFloat(destination?.lat);
    const dLng = parseFloat(destination?.lng);

    if (!isNaN(oLat) && !isNaN(oLng) && !isNaN(dLat) && !isNaN(dLng)) {
      const distanceKm = haversine(oLat, oLng, dLat, dLng);
      setDistance(distanceKm.toFixed(2));
    } else {
      console.log(
        '❌ One or more coordinates are invalid!',
        oLat,
        oLng,
        dLat,
        dLng,
      );
    }
  }, [origin, destination]);

  const postALoad = async () => {
    const body = {
      origin: origin,
      destination: destination,
      escort_positions: selectedPosition,
      additional_requirements: selectedRequirement,
      rate: Rate + selectedRate,
      status: 'pending',
      miles: distance,
      contact: contact.slice(0, 2) == '+1' ? contact : `+1${contact}`,
      company: title,
      height: height === 'Custom' ? customHeight : height,
      communication_mode: commnuicationMode == true ? 'text-only' : 'call',
      total_rate: totalRate.toFixed(2),
      start_date: date,
      description: description,
      origin_state: originState,
      destination_state: destinationState,
      end_date: endDate,
    };
    if (description == '') {
      return Platform.OS == 'android'
        ? ToastAndroid.show(` description field is empty`, ToastAndroid.SHORT)
        : Alert.alert(` description field is empty`);
    }

    if (wordCount > 50) {
      Platform.OS == 'android'
        ? ToastAndroid.SHORT(
            'Description must be 50 words or less.',
            ToastAndroid.show,
          )
        : Alert.alert('Description must be 50 words or less.');
    }
    const url = 'auth/load_detail';
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);

    if (response != undefined) {
      setSelectedRequirement([]);
      setSelectedPosition([]);
      setOrigin({});
      setDestination({});
      setRate(0);
      setDistance('');
      setSelectedRate('');
      setTitle('');
      setWeight('');
      setDimensions('');
      setSelectedSize('');
      setSelectedRate('');

      navigationN.goBack();
    }
  };

  useEffect(() => {
    setTotalRate(
      selectedRate?.toLowerCase() == '/ per km'
        ? parseFloat(Rate) * distance
        : selectedRate?.toLowerCase() == '/ per miles'
        ? parseFloat(Rate) * (distance * 0.621371)
        : parseFloat(Rate),
    );
  }, [Rate, selectedRate]);

  const updatePost = async () => {
    const body = {
      start_date: date,
      end_date: endDate,
      status: item?.status,
    };
    // return   console.log("🚀 ~ updatePost ~ body :", body )
    const url = `auth/load_detail/${item?.id}?_method=put`;
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);

    if (response != undefined) {
      setSelectedRequirement([]);
      setSelectedPosition([]);
      setOrigin({});
      setDestination({});
      setRate(0);
      setDistance('');
      setSelectedRate('');
      setTitle('');
      setWeight('');
      setDimensions('');
      setSelectedSize('');
      setSelectedRate('');

      navigationN.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.main_Container}>
      <View style={styles.modal_main_view}>
        <Header
          title="load details"
          headerColor={Color.secondary}
          textstyle={{color: Color.white}}
          showBack
          // menu
        />
        <CustomStatusBar
          backgroundColor={Color.white}
          barStyle={'light-content'}
        />

        <ScrollView
          contentContainerStyle={{
            paddingBottom: moderateScale(70, 0.6),
          }}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              paddingHorizontal: moderateScale(20, 0.6),
            }}>
            <View
              style={[
                styles.row_view,
                {
                  width: windowWidth * 0.2,
                },
              ]}>
              <View style={styles.box} />
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#C32C2745',
                width: windowWidth * 0.9,
                paddingHorizontal: moderateScale(10, 0.6),
                borderRadius: moderateScale(10, 0.6),
                height: windowHeight * 0.22,
              }}>
              <CustomText isBold style={styles.heading_text}>
                Origin
              </CustomText>
              <TouchableOpacity
                disabled={repost}
                onPress={() => {
                  setIsModalVisible(true);
                  setLocationType('origin');
                }}
                style={styles.btn}>
                <CustomText
                  numberOfLines={1}
                  style={{
                    fontSize: moderateScale(12, 0.6),
                    color: Color.darkGray,
                  }}>
                  {repostOrigin?.name ? repostOrigin?.name : 'city,state'}
                </CustomText>
              </TouchableOpacity>

              <CustomText isBold style={styles.heading_text}>
                Destination
              </CustomText>
              <TouchableOpacity
                disabled={repost}
                onPress={() => {
                  setIsModalVisible(true);
                  setLocationType('destination');
                }}
                style={styles.btn}>
                <CustomText
                  numberOfLines={1}
                  style={{
                    fontSize: moderateScale(12, 0.6),
                    color: Color.darkGray,
                  }}>
                  {repostDestination?.name
                    ? repostDestination?.name
                    : 'city,state'}
                </CustomText>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.row_view,
                {
                  alignSelf: 'flex-start',
                  // marginBottom: moderateScale(15, 0.6),
                  marginTop: moderateScale(15, 0.6),
                },
              ]}>
              <CustomText isBold style={styles.heading_text}>
                Escort positions
              </CustomText>
              <CustomText
                style={[
                  styles.text,
                  {
                    marginTop: moderateScale(5, 0.6),
                    fontSize: moderateScale(11, 0.6),
                  },
                ]}>
                (can Select Multiple)
              </CustomText>
            </View>
            {positionOptions?.map(item => {
              const isActive = selectedPosition?.includes(item?.text);
              // console.log('///////////////////////////', isActive);
              return (
                <TouchableOpacity
                  disabled={repost}
                  key={item.id}
                  onPress={() => {
                    if (selectedPosition?.includes(item?.text)) {
                      setSelectedPosition(prev =>
                        prev.filter(pos => pos !== item?.text),
                      );
                    } else {
                      setSelectedPosition(prev => [...prev, item?.text]);
                    }
                  }}
                  style={[
                    styles.row_view,
                    {
                      width: windowWidth * 0.3,
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      marginBottom: moderateScale(7, 0.6),
                    },
                  ]}>
                  <View
                    style={[
                      styles.box,
                      {
                        borderWidth: 1,
                        borderColor: isActive ? Color.secondary : 'black',
                        backgroundColor: isActive
                          ? Color.secondary
                          : Color.white,
                      },
                    ]}>
                    <Icon
                      name="check"
                      as={AntDesign}
                      size={moderateScale(14, 0.6)}
                      color={Color.white}
                    />
                  </View>
                  <CustomText style={styles.text}>{item.text}</CustomText>
                </TouchableOpacity>
              );
            })}
            <CustomText
              isBold
              style={[
                styles.heading_text,
                {marginBottom: moderateScale(10, 0.6)},
              ]}>
              Additional requirements
            </CustomText>
            {requirements?.map(item => {
              const isActive = selectedRequirement.includes(item?.text);
              return (
                <TouchableOpacity
                  disabled={repost}
                  key={item.id}
                  onPress={() => {
                    if (selectedRequirement?.includes(item?.text)) {
                      setSelectedRequirement(prev =>
                        prev.filter(pos => pos !== item?.text),
                      );
                    } else {
                      setSelectedRequirement(prev => [...prev, item?.text]);
                    }
                  }}
                  style={[
                    styles.row_view,
                    {
                      width: windowWidth * 0.3,
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      marginBottom: moderateScale(7, 0.6),
                    },
                  ]}>
                  <View
                    style={[
                      styles.box,
                      {
                        borderWidth: 1,
                        borderColor: isActive ? Color.secondary : 'black',
                        backgroundColor: isActive
                          ? Color.secondary
                          : Color.white,
                      },
                    ]}>
                    <Icon
                      name="check"
                      as={AntDesign}
                      size={moderateScale(14, 0.6)}
                      color={Color.white}
                    />
                  </View>
                  <CustomText style={styles.text}>{item.text}</CustomText>
                </TouchableOpacity>
              );
            })}
            <CustomText isBold style={styles.heading_text}>
              Phone Number
            </CustomText>
            <TextInputWithTitle
              disable={repost}
              placeholder={'Phone Number'}
              setText={setContact}
              value={contact}
              viewHeight={0.06}
              viewWidth={0.9}
              inputWidth={0.82}
              border={1}
              fontSize={moderateScale(10, 0.6)}
              borderRadius={10}
              backgroundColor={'transparent'}
              borderColor={'#333333'}
              // color={Color.darkGray}
              marginTop={moderateScale(10, 0.3)}
              keyboardType={'numeric'}
              placeholderColor={Color.mediumGray}
              titleStlye={{right: 10}}
            />
            <TouchableOpacity
              disabled={repost}
              onPress={() => {
                setCommunicationMode(!commnuicationMode);
              }}
              style={styles.btn_row}>
              <TouchableOpacity
                disabled={repost}
                onPress={() => {
                  setCommunicationMode(!commnuicationMode);
                }}
                style={[
                  styles.check_btn,
                  {
                    borderColor: commnuicationMode
                      ? Color.white
                      : Color.darkGray,
                    backgroundColor: commnuicationMode
                      ? Color.secondary
                      : Color.white,
                  },
                ]}>
                {commnuicationMode && (
                  <Icon
                    as={Feather}
                    size={moderateScale(15, 0.6)}
                    color={Color.white}
                    name="check"
                  />
                )}
              </TouchableOpacity>
              <CustomText
                // onPress={() => {
                //   setCommunicationMode(!commnuicationMode);
                // }}
                style={{
                  fontSize: moderateScale(11, 0.6),
                  color: Color.black,
                }}>
                text-only
              </CustomText>
            </TouchableOpacity>
            {/* <Checkbox
              colorScheme={'red'}
              value={ repost ? item?.communication_mode === 'text-only' : commnuicationMode}
              onChange={isSelected => {
                if (repost) {
                  setCommunicationMode(
                    item?.communication_mode === 'text-only'
                      ? 'text-only'
                      : 'call',
                  );
                } else {
                  setCommunicationMode(isSelected ? 'text-only' : 'call');
                }
              }}
              _text={{
                fontSize: moderateScale(12, 0.6),
              }}
              my={2}>
              Text-Only
            </Checkbox> */}
            <CustomText isBold style={styles.heading_text}>
              Company Name
            </CustomText>
            <TextInputWithTitle
              disable={repost}
              placeholder={'Company Name'}
              setText={setTitle}
              value={title}
              viewHeight={0.06}
              viewWidth={0.9}
              inputWidth={0.82}
              border={1}
              fontSize={moderateScale(10, 0.6)}
              borderRadius={10}
              backgroundColor={'transparent'}
              borderColor={Color.darkGray}
              marginTop={moderateScale(10, 0.3)}
              placeholderColor={Color.mediumGray}
              titleStlye={{right: 10}}
            />
            <CustomText isBold style={styles.heading_text}>
              Height
            </CustomText>
            <DropDownSingleSelect
              disabled={repost}
              array={HEIGHT_OPTIONS}
              item={height}
              setItem={setHeight}
              width={windowWidth * 0.9}
              placeholder={'Height'}
              dropdownStyle={{
                borderBottomWidth: 0,
                width: windowWidth * 0.9,
                marginTop: 10,
                borderRadius: 10,
              }}
              menuStyle={{
                backgroundColor: Color.white,
                borderColor: Color.mediumGray,
                width: '79.5%',
                left: 42,
                borderWidth: 1,
                overflow: 'hidden',
              }}
              menuTextColor={Color.mediumGray}
              changeColorOnSelect={true}
              btnStyle={{
                backgroundColor: 'transparent',
                height: windowHeight * 0.057,
                borderWidth: 1,
                bordderColor: Color.white,
                borderRadius: 10,
              }}
            />
            {height === 'Custom' && (
              <TextInputWithTitle
                placeholder={'Enter Height'}
                setText={setCustomHeight}
                value={customHeight}
                viewHeight={0.06}
                viewWidth={0.9}
                inputWidth={0.82}
                border={1}
                fontSize={moderateScale(10, 0.6)}
                borderRadius={10}
                backgroundColor={'transparent'}
                borderColor={Color.darkGray}
                marginTop={moderateScale(10, 0.3)}
                placeholderColor={Color.mediumGray}
                titleStlye={{right: 10}}
                keyboardType={'numeric'}
                disable={repost}
              />
            )}
            <CustomText isBold style={styles.heading_text}>
              Start Date
            </CustomText>
            <View
              // onPress={() => {
              //   setShowCalendarModal(true);
              // }}
              style={styles.drop}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <CustomText
                  style={[
                    styles.drop_text,
                    {
                      width: '70%',
                    },
                  ]}>
                  {date ? date : 'select a date '}
                </CustomText>
                {/* <Icon
                  name="keyboard-arrow-down"
                  as={MaterialIcons}
                  size={moderateScale(20, 0.6)}
                  color={Color.black}
                /> */}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: moderateScale(20, 0.6),
                paddingTop: moderateScale(15, 0.6),
                width: windowWidth * 0.9,
                flexWrap: 'wrap',
              }}>
              <CustomButton
                text={'today'}
                onPress={() => {
                  const toDate = new Date();
                  toDate.toISOString().split('T')[0];
                  setDate(toDate.toISOString().split('T')[0]);
                }}
                fontSize={moderateScale(12, 0.3)}
                textColor={Color.white}
                borderRadius={moderateScale(10, 0.3)}
                marginTop={moderateScale(10, 0.3)}
                height={windowHeight * 0.04}
                bgColor={Color.secondary}
                style={{
                  alignSelf: 'flex-start',
                }}
                textTransform={'capitalize'}
              />
              <CustomButton
                text={'tomorrow'}
                onPress={() => {
                  const tomorrow = new Date();
                  tomorrow.setDate(tomorrow.getDate() + 1); // now it's a real Date object
                  const formatted = tomorrow.toISOString().split('T')[0];
                  setDate(formatted);
                }}
                fontSize={moderateScale(12, 0.3)}
                textColor={Color.white}
                borderRadius={moderateScale(10, 0.3)}
                // width={windowWidth * 0.28}
                marginTop={moderateScale(10, 0.3)}
                height={windowHeight * 0.04}
                bgColor={Color.secondary}
                style={{
                  alignSelf: 'flex-start',
                }}
                textTransform={'capitalize'}
              />
              <CustomButton
                text={'custom'}
                onPress={() => {
                  setDateType('startdate');
                  setShowCalendarModal(true);
                }}
                fontSize={moderateScale(12, 0.3)}
                textColor={Color.white}
                borderRadius={moderateScale(10, 0.3)}
                marginTop={moderateScale(10, 0.3)}
                height={windowHeight * 0.04}
                bgColor={Color.secondary}
                style={{
                  alignSelf: 'flex-start',
                }}
                textTransform={'capitalize'}
              />
            </View>

            <CustomText isBold style={styles.heading_text}>
              end Date
            </CustomText>

            <View style={styles.drop}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <CustomText
                  style={[
                    styles.drop_text,
                    {
                      width: '70%',
                    },
                  ]}>
                  {endDate ? endDate : 'select a date '}
                </CustomText>
              </View>
            </View>
            <CustomButton
              text={'custom'}
              onPress={() => {
                setDateType('enddate');
                setShowCalendarModal(true);
              }}
              fontSize={moderateScale(12, 0.3)}
              textColor={Color.white}
              borderRadius={moderateScale(10, 0.3)}
              marginTop={moderateScale(10, 0.3)}
              height={windowHeight * 0.04}
              bgColor={Color.secondary}
              style={{
                alignSelf: 'flex-start',
              }}
              textTransform={'capitalize'}
            />
            <CustomText isBold style={styles.heading_text}>
              Rate
              <CustomText
                style={{
                  fontSize: moderateScale(10, 0.6),
                  color: Color.darkGray,
                }}>
                (Optional)
              </CustomText>
            </CustomText>
            <TouchableOpacity
              disabled={repost}
              onPress={() => {
                setIsMiles(!isMiles);
              }}
              style={styles.drop}>
              <CustomText
                style={{
                  color: Color.mediumGray,

                  position: 'absolute',
                  left: 30,
                  paddingTop: moderateScale(3, 0.6),
                }}>
                $
              </CustomText>
              <TextInputWithTitle
                placeholder={'0'}
                setText={setRate}
                value={Rate}
                keyboardType={'numeric'}
                viewHeight={0.07}
                viewWidth={0.5}
                inputWidth={0.45}
                borderRadius={30}
                backgroundColor={'transparent'}
                borderColor={Color.white}
                placeholderColor={Color.mediumGray}
                disable={repost}
              />

              <View
                style={{
                  flexDirection: 'row',
                  width: windowWidth * 0.24,
                }}>
                <CustomText style={styles.drop_text}>
                  {repost ? perMilesOnly : selectedRate}
                </CustomText>
                <Icon
                  style={{
                    position: 'absolute',
                    right: 0,
                  }}
                  name="keyboard-arrow-down"
                  as={MaterialIcons}
                  size={moderateScale(20, 0.6)}
                  color={Color.black}
                />
              </View>
            </TouchableOpacity>

            {isMiles && (
              <View
                style={{
                  borderWidth: 0.5,
                  borderColor: Color.secondary,
                  marginVertical: moderateScale(5, 0.6),
                  borderRadius: moderateScale(10, 0.6),
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedRate('/Hourly');
                  }}
                  style={styles.drop_modal}>
                  <CustomText>Hourly</CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedRate('/flate rate');
                  }}
                  style={styles.drop_modal}>
                  <CustomText>flat rate</CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedRate('/per miles');
                  }}
                  style={styles.drop_modal}>
                  <CustomText>per miles</CustomText>
                </TouchableOpacity>
              </View>
            )}
            <View
              style={{
                flexDirection: 'row',
                paddingTop: moderateScale(10, 0.6),
                justifyContent: 'space-between',
              }}>
              <CustomText isBold style={styles.heading_text}>
                description
              </CustomText>
              <CustomText
                style={{
                  fontSize: moderateScale(10, 0.6),
                  color: wordCount > 50 ? 'red' : 'gray',
                  paddingTop: moderateScale(5, 0.6),
                }}>
                {wordCount}/50 words
              </CustomText>
            </View>
            <TextInputWithTitle
              disable={repost}
              multiline={true}
              secureText={false}
              placeholder={'Description'}
              setText={handleChangeText}
              value={description}
              viewHeight={0.15}
              viewWidth={0.9}
              inputWidth={0.82}
              border={1}
              fontSize={moderateScale(10, 0.6)}
              backgroundColor={'transparent'}
              borderColor={Color.darkGray}
              marginTop={moderateScale(10, 0.3)}
              placeholderColor={Color.mediumGray}
              titleStlye={{right: 10}}
              color={Color.btn_Color}
              borderRadius={moderateScale(25, 0.3)}
              // maxLength={50}
            />
            <CustomButton
              text={
                isLoading ? (
                  <ActivityIndicator size={'small'} color={'white'} />
                ) : repost ? (
                  'repost'
                ) : (
                  'Post '
                )
              }
              onPress={() => {
                repost ? updatePost() : postALoad();
              }}
              fontSize={moderateScale(14, 0.3)}
              textColor={Color.white}
              borderRadius={moderateScale(30, 0.3)}
              width={windowWidth * 0.9}
              marginTop={moderateScale(15, 0.3)}
              height={windowHeight * 0.055}
              bgColor={Color.secondary}
              style={{
                alignSelf: 'flex-start',
              }}
              textTransform={'capitalize'}
            />
            <CustomButton
              text={'Cancel'}
              fontSize={moderateScale(14, 0.3)}
              textColor={Color.black}
              borderRadius={moderateScale(30, 0.3)}
              width={windowWidth * 0.9}
              height={windowHeight * 0.055}
              bgColor={Color.white}
              marginTop={moderateScale(10, 0.3)}
              borderColor={Color.black}
              borderWidth={1}
              style={{
                alignSelf: 'flex-start',
              }}
              textTransform={'capitalize'}
            />
          </View>

          <View style={{height: windowHeight * 0.12}} />
        </ScrollView>
        <Modal
          onBackdropPress={() => {
            setShowCalendarModal(false);
          }}
          style={{
            alignItems: 'center',
          }}
          isVisible={showCalendarModal}>
          <Calendar
            style={{
              width: windowWidth * 0.8,
              marginBottom: moderateScale(40, 0.3),
            }}
            minDate={moment().format()}
            onDayPress={day => {
              dateType == 'enddate'
                ? setEndDate(day?.dateString)
                : setDate(day?.dateString);
              setShowCalendarModal(false);
            }}
            theme={{
              textSectionTitleColor: Color.secondary,
              selectedDayBackgroundColor: Color.secondary,
              selectedDayTextColor: Color.white,
              todayTextColor: Color.secondary,
              dayTextColor: Color.black,
              dayTextColor: Color.black,
              textDisabledColor: '#d9e1e8',
              arrowColor: Color.secondary,
              monthTextColor: Color.veryLightGray,
              indicatorColor: Color.secondary,
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: 'bold',
              textDayFontSize: moderateScale(12, 0.3),
              textMonthFontSize: moderateScale(16, 0.3),
              textDayHeaderFontSize: moderateScale(14, 0.3),
            }}
            markedDates={{
              ...{
                [date]: {
                  selected: true,
                  color: Color.secondary,
                  textColor: '#000000',
                  marked: true,
                },
              },
            }}
          />
        </Modal>
        <SearchLocationModal
          locationType={locationType}
          setLocationType={setLocationType}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          setPickupLocation={setOrigin}
          setdropOffLocation={setDestination}
          // setState={}
          setOriginState={setOriginState}
          setdestinationState={setdestinationState}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoadDetails;

const styles = StyleSheet.create({
  main_Container: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.secondary,
  },
  modal_main_view: {
    height: windowHeight,
    backgroundColor: Color.white,
  },
  box: {
    height: moderateScale(16, 0.6),
    width: moderateScale(16, 0.6),
    marginRight: moderateScale(6, 0.6),
    borderRadius: moderateScale(4, 0.6),
  },
  row_view: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: moderateScale(12, 0.6),
  },
  heading_text: {
    fontSize: moderateScale(15, 0.6),
    // marginTop: moderateScale(10, 0.6),
  },
  header: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.12,
    backgroundColor: Color.secondary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(20, 0.6),
  },
  drop: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.05,
    borderWidth: 0.9,
    borderRadius: moderateScale(10, 0.6),
    borderColor: Color.darkGray,
    marginTop: moderateScale(10, 0.6),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(15, 0.6),
    justifyContent: 'space-between',
  },
  drop_text: {
    fontSize: moderateScale(13, 0.6),
    color: Color.darkGray,
  },
  drop_modal: {
    width: windowWidth * 0.9,
    padding: moderateScale(5, 0.6),
    paddingHorizontal: moderateScale(19, 0.6),
    borderRadius: moderateScale(20, 0.6),
    borderColor: Color.darkGray,
    // borderWidth: 0.5,
    // marginVertical: moderateScale(5, 0.6),
    alignItems: 'flex-end',
    shadowColor: '#000',
  },
  btn: {
    borderWidth: 0.3,
    borderRadius: moderateScale(10, 0.6),
    width: windowWidth * 0.84,
    height: windowHeight * 0.055,
    marginVertical: moderateScale(5, 0.6),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(10, 0.6),
  },
  btn_row: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(5, 0.6),
    width: windowWidth * 0.8,
    paddingVertical: moderateScale(5, 0.6),
  },
  check_btn: {
    borderWidth: 1,
    borderRadius: 5,
    marginRight: moderateScale(5, 0.6),
    height: windowHeight * 0.021,
    width: windowWidth * 0.045,
  },
});
