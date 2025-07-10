import {Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import navigationService from '../navigationService';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import SearchLocationModal from '../Components/SearchLocationModal';
import haversine from 'haversine-distance';

const LoadDetails = props => {
  const isPostDetails = props?.route?.params?.isPostDetails;
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  const [isMiles, setIsMiles] = useState(false);
  const [selectedRate, setSelectedRate] = useState('/miles');
  const [selectedSize, setSelectedSize] = useState('select type');
  const [isSize, setIsSize] = useState(false);
  const [weight, setWeight] = useState('');
  const [dimensions, setDimensions] = useState('');


  console.log('🚀 ~ selectedSize:', selectedSize);

  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [locationType, setLocationType] = useState('');
  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});
  const [Rate, setRate] = useState(0);
  const [selectedPosition, setSelectedPosition] = useState([]);
  const [selectedRequirement, setSelectedRequirement] = useState([]);
  const [distance, setDistance] = useState('');
  const [title, setTitle] = useState('');

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
      contact: userData?.contact,
      // title :title ,
      // weight:weight, 
      // dimension :dimensions,
      // type: selectedSize ,

    };

    const url = 'auth/load_detail';
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);

    if (response != undefined) {
      console.log('===================================> bhai hojaaaaaaaaaaaa');
      setSelectedRequirement([]);
      setSelectedPosition([]);
      setOrigin({});
      setDestination({});
      setRate(0);
      setDistance('');
      setSelectedRate('');
      navigationService.navigate('PostLoadScreen');
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
          menu
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
          {/* <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: moderateScale(20, 0.3),
              paddingVertical: moderateScale(15, 0.3),
              backgroundColor: Color.secondary,
              alignItems: 'center',
              justifyContent : 'space-between'
            }}>
            <CustomText style={{
                fontSize : moder
            }}>load details</CustomText>
            <Icon
              name="menu"
              as={Ionicons}
              size={moderateScale(20, 0.6)}
              color={Color.white}
            />
          </View> */}
          {/* {isPostDetails ? (
            <View>
              <View style={styles.header}>
                <CustomText
                  isBold
                  style={{
                    color: Color.white,
                    fontSize: moderateScale(18, 0.6),
                  }}>
                  Post A Load
                </CustomText>
                <Icon name="cross" as={Entypo} />
              </View>
              <View
                style={{
                  paddingTop: moderateScale(20, 0.6),
                  paddingHorizontal: moderateScale(20, 0.6),
                }}>
                <CustomText isBold style={styles.heading_text}>
                  Posted
                </CustomText>
                <CustomText style={styles.text}>
                  Less Than a minute ago
                </CustomText>
                <CustomText isBold style={styles.heading_text}>
                  status
                </CustomText>
                <CustomText style={styles.text}>Open</CustomText>
                <CustomText isBold style={styles.heading_text}>
                  Alert
                </CustomText>
                <CustomText style={styles.text}>
                  Calculating notifications sent to drivers
                </CustomText>
                <CustomText isBold style={styles.heading_text}>
                  Load Date
                </CustomText>
                <CustomText style={styles.text}>04/24/2025</CustomText>
                <CustomText isBold style={styles.heading_text}>
                  Phone
                </CustomText>
                <CustomText style={styles.text}>(123) 281-6351</CustomText>
                <CustomText isBold style={styles.heading_text}>
                  Origin
                </CustomText>
                <CustomText style={styles.text}>
                  Pennsylvania Furance, PA, USA
                </CustomText>
                <CustomText isBold style={styles.heading_text}>
                  Destination
                </CustomText>
                <CustomText style={styles.text}>Furance, SC, USA</CustomText>
                <CustomText isBold style={styles.heading_text}>
                  Est. Mileage
                </CustomText>
                <CustomText style={styles.text}>609 mi</CustomText>
                <CustomText isBold style={styles.heading_text}>
                  Rate
                </CustomText>
                <CustomText style={styles.text}>$5.00/mi</CustomText>
                <CustomButton
                  text={'Mark Covered '}
                  onPress={() => {
                    setIsPost(true);
                    setIsModalVisible(false);
                    navigationService.navigate('CarDirectory');
                  }}
                  fontSize={moderateScale(14, 0.3)}
                  textColor={Color.white}
                  borderRadius={moderateScale(30, 0.3)}
                  width={windowWidth * 0.58}
                  marginTop={moderateScale(15, 0.3)}
                  height={windowHeight * 0.055}
                  bgColor={Color.secondary}
                  style={{
                    alignSelf: 'flex-start',
                  }}
                  textTransform={'capitalize'}
                />
                <CustomButton
                  text={'Cancle'}
                  onPress={() => setIsModalVisible(false)}
                  fontSize={moderateScale(14, 0.3)}
                  textColor={Color.black}
                  borderRadius={moderateScale(30, 0.3)}
                  width={windowWidth * 0.58}
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
            </View>
          ) : ( */}
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
              {/* <CustomText style={styles.text}>Text only</CustomText> */}
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#C32C2745',
                width: windowWidth * 0.9,
                paddingHorizontal: moderateScale(10, 0.6),
                borderRadius: moderateScale(20, 0.6),
                height: windowHeight * 0.22,
              }}>
              <CustomText isBold style={styles.heading_text}>
                Origin
              </CustomText>
              <TouchableOpacity
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
                  {origin?.name ? origin?.name : 'city,state'}
                </CustomText>
              </TouchableOpacity>

              <CustomText isBold style={styles.heading_text}>
                Destination
              </CustomText>
              <TouchableOpacity
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
                  {destination?.name ? destination?.name : 'city,state'}
                </CustomText>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.row_view,
                {
                  alignSelf: 'flex-start',
                  marginBottom: moderateScale(15, 0.6),
                },
              ]}>
              <CustomText isBold style={styles.heading_text}>
                Escort positions
              </CustomText>
              <CustomText
                style={[
                  styles.text,
                  {
                    marginTop: moderateScale(15, 0.6),
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
              title
            </CustomText>

            <TextInputWithTitle
              placeholder={'Title '}
              setText={setTitle}
              value={title}
              viewHeight={0.06}
              viewWidth={0.9}
              inputWidth={0.82}
              border={1}
              fontSize={moderateScale(10, 0.6)}
              borderRadius={30}
              backgroundColor={'transparent'}
              borderColor={Color.darkGray}
              marginTop={moderateScale(10, 0.3)}
              placeholderColor={Color.mediumGray}
              titleStlye={{right: 10}}
            />
            <CustomText isBold style={styles.heading_text}>
              weight
            </CustomText>

            <TextInputWithTitle
              placeholder={'Weight '}
              setText={setWeight}
              value={weight}
              viewHeight={0.06}
              viewWidth={0.9}
              inputWidth={0.82}
              border={1}
              fontSize={moderateScale(10, 0.6)}
              borderRadius={30}
              backgroundColor={'transparent'}
              borderColor={Color.darkGray}
              marginTop={moderateScale(10, 0.3)}
              placeholderColor={Color.mediumGray}
              titleStlye={{right: 10}}
            />
            <CustomText isBold style={styles.heading_text}>
              dimensions
            </CustomText>

            <TextInputWithTitle
              placeholder={'Dimension'}
              setText={setDimensions}
              value={dimensions}
              viewHeight={0.06}
              viewWidth={0.9}
              inputWidth={0.82}
              border={1}
              fontSize={moderateScale(10, 0.6)}
              borderRadius={30}
              backgroundColor={'transparent'}
              borderColor={Color.darkGray}
              marginTop={moderateScale(10, 0.3)}
              placeholderColor={Color.mediumGray}
              titleStlye={{right: 10}}
            />
            <CustomText isBold style={styles.heading_text}>
              type
            </CustomText>
            <TouchableOpacity
              onPress={() => {
                setIsSize(!isSize);
              }}
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
                  {selectedSize}
                </CustomText>
                <Icon
                  name="keyboard-arrow-down"
                  as={MaterialIcons}
                  size={moderateScale(20, 0.6)}
                  color={Color.black}
                />
              </View>
            </TouchableOpacity>
            {isSize && (
              <View
                onPress={() => {}}
                style={[
                  styles.drop_modal,
                  {
                    alignItems: 'flex-start',
                  },
                ]}>
                <CustomText
                  onPress={() => {
                    setSelectedSize('overweight');
                    setIsSize(false);
                  }}
                  style={{
                    fontSize: moderateScale(14, 0.6),
                    width: '100%',
                  }}>
                  overweight
                </CustomText>
                <CustomText
                  onPress={() => {
                    setSelectedSize('oversize');
                    setIsSize(false);
                  }}
                  style={{
                    fontSize: moderateScale(14, 0.6),
                    width: '100%',
                  }}>
                  oversize
                </CustomText>
              </View>
            )}
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
              onPress={() => {
                setIsMiles(!isMiles);
              }}
              style={styles.drop}>
              <TextInputWithTitle
                placeholder={'$ 0'}
                setText={setRate}
                value={Rate}
                viewHeight={0.07}
                viewWidth={0.5}
                inputWidth={0.45}
                borderRadius={30}
                backgroundColor={'transparent'}
                borderColor={Color.white}
                placeholderColor={Color.mediumGray}
              />

              <View
                style={{
                  flexDirection: 'row',
                  width: windowWidth * 0.15,
                }}>
                <CustomText style={styles.drop_text}>{selectedRate}</CustomText>
                <Icon
                  name="keyboard-arrow-down"
                  as={MaterialIcons}
                  size={moderateScale(20, 0.6)}
                  color={Color.black}
                />
              </View>
            </TouchableOpacity>
            {isMiles && (
              <TouchableOpacity
                onPress={() => {
                  setSelectedRate(selectedRate == '/miles' ? '/km' : '/miles');
                }}
                style={styles.drop_modal}>
                <CustomText>
                  {selectedRate == '/miles' ? '/km' : '/miles'}
                </CustomText>
              </TouchableOpacity>
            )}

            <CustomButton
              text={
                isLoading ? (
                  <ActivityIndicator size={'small'} color={'white'} />
                ) : (
                  'Post '
                )
              }
              onPress={() => {
                postALoad();
                // navigationService.navigate('PostLoadScreen');
                // //   setIsPost(true);
                //   setIsModalVisible(false);
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
          {/* // )} */}
        </ScrollView>
        <SearchLocationModal
          locationType={locationType}
          setLocationType={setLocationType}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          setPickupLocation={setOrigin}
          setdropOffLocation={setDestination}
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
    marginTop: moderateScale(10, 0.6),
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
    borderRadius: moderateScale(20, 0.6),
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
    borderWidth: 0.5,
    marginVertical: moderateScale(5, 0.6),
    alignItems: 'flex-end',
    shadowColor: '#000',
  },
  btn: {
    borderWidth: 0.3,
    borderRadius: moderateScale(30, 0.6),
    width: windowWidth * 0.84,
    height: windowHeight * 0.055,
    marginVertical: moderateScale(5, 0.6),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(10, 0.6),
  },
});
