import {Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {moderateScale} from 'react-native-size-matters';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Zocial from 'react-native-vector-icons/Zocial';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import navigationService from '../navigationService';
import {useSelector} from 'react-redux';
import CountryStatePicker from '../Components/CountryStatePicker';
import {Get} from '../Axios/AxiosInterceptorFunction';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import CustomButton from '../Components/CustomButton';
import {background} from 'native-base/lib/typescript/theme/styled-system';

const CarDirectory = () => {
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const [serviceSate, setServiceState] = useState('');
  const [escortPosition, setEscortPosition] = useState('');
  const [services, setServices] = useState(['A', 'B']);
  const [selectedState, setSelectedState] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pilotData, setPilotData] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(
    userData?.selected_area == 'Sign Up For Canada' ? 'Canada' : 'USA',
  );
  const countryOptions = ['Canada', 'USA'];
  const [escortPositions, setEscortPositions] = useState(false);
  const [selectedPositionModal, setSelectedPositionModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState([]);
  const dummyData = [
    {
      id: 1,
      name: 'Tyree Hanson',
      phone: '( 123 ) 281-6350',
      email: 'Jmadsen25@Gmail.Com',
    },
    {
      id: 2,
      name: 'Tyree Hanson',
      phone: '( 123 ) 281-6350',
      email: 'Jmadsen25@Gmail.Com',
    },
    {
      id: 3,
      name: 'Tyree Hanson',
      phone: '( 123 ) 281-6350',
      email: 'Jmadsen25@Gmail.Com',
    },
    {
      id: 4,
      name: 'Tyree Hanson',
      phone: '( 123 ) 281-6350',
      email: 'Jmadsen25@Gmail.Com',
    },
    {
      id: 5,
      name: 'Tyree Hanson',
      phone: '( 123 ) 281-6350',
      email: 'Jmadsen25@Gmail.Com',
    },
    {
      id: 6,
      name: 'Tyree Hanson',
      phone: '( 123 ) 281-6350',
      email: 'Jmadsen25@Gmail.Com',
    },
    {
      id: 7,
      name: 'Tyree Hanson',
      phone: '( 123 ) 281-6350',
      email: 'Jmadsen25@Gmail.Com',
    },
  ];

  const getPilot = async () => {
    const url = `auth/pilot_list?state=${selectedState?.label}&role=${
      userRole.toLowerCase() == 'pilot' ? 'company' : 'pilot'
    }&escorte_positions=${selectedPosition}`;
    setIsLoading(true);
    const response = await Get(url, token);
    console.log("🚀 ~ getPilot ~ response:", response?.data)
    setIsLoading(false);
    if (response != undefined) {
      setPilotData(response?.data?.user_info);
    }
  };

  useEffect(() => {
    if (userRole.toLowerCase() == 'pilot') {
      getPilot();
    }
  }, [selectedPosition, selectedState]);

  const handelSaveButton = async () => {
    if (selectedPosition.length > 0 && selectedState) {
      setSelectedPositionModal(false);
      getPilot();
    } else {
      setSelectedPositionModal(false);
      Platform.OS == 'android'
        ? ToastAndroid.show(
            'Please Select Country and State First',
            ToastAndroid.SHORT,
          )
        : Alert.alert('Please Select Country and State First');
    }
  };

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

  return (
    <SafeAreaView
      style={[
        styles.main_view,
        {
          backgroundColor:
            userRole.toLowerCase() == 'pilot' ? Color.primary : Color.secondary,
        },
      ]}>
      <Header
        title="Pilot Car Directory"
        headerColor={
          userRole.toLowerCase() == 'pilot' ? Color.primary : Color.secondary
        }
        textstyle={{color: Color.white}}
        // showBack
        menu
      />
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'light-content'}
      />
      <View
        style={[
          styles.mainScreen,
          {
            backgroundColor:
              userRole.toLowerCase() == 'pilot' ? Color.primary : Color.white,
          },
        ]}>
        <View
          style={[
            styles.dropDownsContainer,
            {
              height:
                userRole.toLowerCase() == 'pilot'
                  ? windowHeight * 0.21
                  : windowHeight * 0.3,
            },
          ]}>
          <CustomText
            style={{
              fontSize: moderateScale(11, 0.6),
              color:
                userRole.toLowerCase() == 'pilot' ? Color.white : Color.black,
              width: '90%',

              marginBottom: moderateScale(-18, 0.6),
              // alignself :'flex-start' ,
              // backgroundColor: 'red',
            }}>
            select country *
          </CustomText>
          <DropDownSingleSelect
            array={countryOptions}
            item={selectedCountry}
            setItem={setSelectedCountry}
            width={windowWidth * 0.85}
            // placeHolderColor={Color.darkGray}
            // placeholder={'Ápproval for Admittance'}
            placeholder={'Country'}
            dropdownStyle={{
              borderBottomWidth: 0,
              width: windowWidth * 0.85,
              marginTop: 10,
            }}
            btnStyle={{
              backgroundColor: '#fff',
              height: windowHeight * 0.055,
            }}
          />
          <CustomText
            style={{
              fontSize: moderateScale(11, 0.6),
              color:
                userRole.toLowerCase() == 'pilot' ? Color.white : Color.black,
              width: '90%',
              marginBottom: moderateScale(-18, 0.6),
            }}>
            select state *
          </CustomText>
          <CountryStatePicker
            style_dropDown={{
              height: windowHeight * 0.06,
              backgroundColor: 'white',
              width: windowWidth * 0.85,
              borderWidth: 0.5,
              justifyContent: 'center',
              paddingHorizontal: moderateScale(15, 0.6),
              borderColor: Color.mediumGray,
              borderRadius: moderateScale(30, 0.6),
              // marginBottom : moderateScale(10,.6)
            }}
            country={selectedCountry}
            setSelectedState={setSelectedState}
            selectedState={selectedState}
          />
          {userRole.toLowerCase() != 'pilot' && (
            <>
              <CustomText
                style={{
                  fontSize: moderateScale(11, 0.6),
                  color:
                    userRole.toLowerCase() == 'pilot'
                      ? Color.white
                      : Color.black,
                  width: '90%',
                  marginTop: moderateScale(-10, 0.6),
                }}>
                select escort positions *
              </CustomText>
              <TouchableOpacity
                onPress={() => setSelectedPositionModal(!selectedPositionModal)}
                style={styles.dropdownButtonStyle}>
                <CustomText style={styles.dropdownButtonTxtStyle}>
                  Select Escort Position
                </CustomText>
              </TouchableOpacity>
            </>
          )}
        </View>
        {/* <View style={styles.dropDownsContainer}> */}
        {/* <CustomDropDown
            data={services}
            setItem={setServiceState}
            item={serviceSate}
            placeHolder={'Service State'}
          />
          <CustomDropDown
            data={escortPositions}
            item={escortPosition}
            setItem={setEscortPosition}
            placeHolder={'Escort Position'}
          /> */}
        {isLoading ? (
          <ActivityIndicator
            style={{
              // backgroundColor :'black',
              height: windowHeight * 0.5,
              width: windowWidth,
            }}
            size={'large'}
            color={Color.secondary}
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={pilotData}
            keyExtractor={item => item.id}
            contentContainerStyle={[
              styles.flatListContainer,
              {
                backgroundColor:
                  userRole.toLowerCase() == 'pilot'
                    ? Color.primary
                    : Color.white,
              },
            ]}
            renderItem={({item, index}) => <DirectoryItem item={item} />}
            ListFooterComponent={() => (
              <View style={{height: windowHeight * 0.1}} />
            )}
            ListEmptyComponent={
              <CustomText
                style={{
                  fontSize: moderateScale(14, 0.6),
                  color:
                    userRole.toLowerCase() == 'pilot'
                      ? Color.white
                      : Color.black,
                  paddingTop: windowHeight * 0.1,
                }}>
                {userRole.toLowerCase() == 'pilot'
                  ? 'No companies found!'
                  : 'No pilot cars found!'}
              </CustomText>
            }
          />
        )}
      </View>
      <Modal
        hasBackdrop={true}
        onBackdropPress={() => {
          setSelectedPositionModal(false);
        }}
        isVisible={selectedPositionModal}
        swipeDirection="up"
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.modal_box}>
          <CustomText
            style={{
              fontSize: moderateScale(15, 0.6),
              color: Color.secondary,
              textAlign: 'left',
              width: '90%',
              marginBottom: moderateScale(10, 0.6),
            }}>
            Select Escort Position
          </CustomText>
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
                    width: windowWidth * 0.8,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginBottom: moderateScale(7, 0.6),
                    marginLeft: moderateScale(10, 0.6),
                  },
                ]}>
                <View
                  style={[
                    styles.box,
                    {
                      borderWidth: 1,
                      borderColor: isActive ? Color.secondary : 'black',
                      backgroundColor: isActive ? Color.secondary : Color.white,
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

          <CustomButton
            text={'Save'}
            textColor={Color.white}
            width={windowWidth * 0.8}
            height={windowHeight * 0.06}
            marginTop={moderateScale(15, 0.3)}
            onPress={() => {
              handelSaveButton();
            }}
            bgColor={Color.secondary}
            borderRadius={moderateScale(30, 0.3)}
            fontSize={moderateScale(15, 0.3)}
            borderColor={Color.secondary}
            borderWidth={1}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CarDirectory;

const DirectoryItem = ({item}) => {
  const emailVerified = useSelector(state => state.authReducer.emailVerified);
  const numberVerified = useSelector(state => state.authReducer.numberVerified);
  return (
    <TouchableOpacity
      // onPress={() => {
      //   console.log('00000000000000');
      //   navigationService.navigate('ServicesScreen');
      // }}
      style={styles.itemContainer}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <CustomText numberOfLines={1} isBold style={styles.txt1}>
          {item?.first_name}
        </CustomText>

        <Icon
          style={{
            marginTop: moderateScale(5, 0.6),
            marginHorizontal: moderateScale(5, 0.6),
          }}
          as={MaterialIcons}
          name="verified"
          color={Color.blue}
          size={moderateScale(10, 0.6)}
        />
      </View>
      <View style={styles.row}>
        <Icon
          name={'phone-alt'}
          as={FontAwesome5}
          size={moderateScale(20, 0.3)}
          color={Color.mediumGray}
          opacity={0.5}
        />
        <CustomText style={styles.txt2}>{item?.contact}</CustomText>
      </View>
      <View style={styles.row}>
        {emailVerified == true && numberVerified == true && (
          <Icon
            name={'email'}
            as={Zocial}
            size={moderateScale(20, 0.3)}
            color={Color.mediumGray}
            opacity={0.5}
          />
        )}
        <CustomText style={styles.txt2}>{item?.email}</CustomText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainScreen: {
    width: windowWidth,
    height: windowHeight * 0.9,
    backgroundColor: Color.white,
    alignItems: 'center',
  },
  flatListContainer: {
    width: windowWidth * 0.9,
    alignItems: 'center',
    borderRadius: moderateScale(20, 0.3),
  },
  box: {
    height: moderateScale(20, 0.6),
    width: moderateScale(20, 0.6),
    marginRight: moderateScale(6, 0.6),
    borderRadius: moderateScale(4, 0.6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    width: windowWidth * 0.9,
    backgroundColor: Color.lightGrey,
    borderRadius: moderateScale(10, 0.3),
    marginTop: moderateScale(10, 0.3),
    gap: moderateScale(10, 0.2),
    paddingVertical: moderateScale(20, 0.2),
    paddingHorizontal: moderateScale(20, 0.2),
  },
  modal_box: {
    height: windowHeight * 0.45,
    width: windowWidth * 0.9,
    borderRadius: moderateScale(10, 6),
    borderWidth: 1,
    borderColor: Color.themeBlack,
    backgroundColor: '#e8e8e8',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(20, 0.6),
  },
  row_view: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: moderateScale(20, 0.2),
    alignItems: 'center',
  },
  txt1: {
    fontSize: moderateScale(14, 0.3),
    color: Color.secondary,
    paddingHorizontal: moderateScale(5, 0.6),
    // backgroundColor: 'red',
  },
  txt2: {
    fontSize: moderateScale(14, 0.3),
    color: Color.mediumGray,
    opacity: 0.7,
  },
  dropDownsContainer: {
    gap: moderateScale(10, 0.2),
    marginTop: moderateScale(20, 0.2),
    marginBottom: moderateScale(10, 0.2),
    // backgroundColor :'red',

    width: windowWidth * 0.9,
    marginVertical: moderateScale(10, 0.6),
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: moderateScale(10, 0.6),
    borderColor: '#C32C2745',
    paddingVertical: moderateScale(10, 0.6),
  },
  text: {
    fontSize: moderateScale(14, 0.6),
  },
  main_view: {
    height: windowHeight,
    width: windowWidth,
    paddingTop: moderateScale(20, 0.6),
  },
  dropdownButtonStyle: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.055,
    paddingVertical: moderateScale(11, 0.3),
    alignItems: 'center',
    marginTop: moderateScale(-5, 0.6),
    paddingHorizontal: moderateScale(5, 0.2),
    borderWidth: 0.5,
    // padding: moderateScale(10, 0.3),
    backgroundColor: Color.white,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: Color.mediumGray,
    borderRadius: moderateScale(25, 0.3),
  },
  dropdownButtonTxtStyle: {
    color: Color.mediumGray,
    paddingHorizontal: moderateScale(11, 0.2),
  },
});
