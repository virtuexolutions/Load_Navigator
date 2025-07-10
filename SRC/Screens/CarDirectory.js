import {Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Zocial from 'react-native-vector-icons/Zocial';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';

import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import navigationService from '../navigationService';
import {useSelector} from 'react-redux';
import CountryStatePicker from '../Components/CountryStatePicker';
import {Get} from '../Axios/AxiosInterceptorFunction';

const CarDirectory = () => {
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);

  const [serviceSate, setServiceState] = useState('');
  const [escortPosition, setEscortPosition] = useState('');
  const [services, setServices] = useState(['A', 'B']);
  const [selectedState, setSelectedState] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pilotData, setPilotData] = useState(false);

  const [escortPositions, setEscortPositions] = useState([]);

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
    const url = `auth/pilot_list?state=${selectedState?.label}&role=pilot`;
    setIsLoading(true);
    console.log('🚀 ~ getPilot ~ url:', url);
    const response = await Get(url, token);
    console.log('🚀 ~ getPilot ~ response:', response?.data?.pilots);
    setIsLoading(false);
    if (response != undefined) {
      setPilotData(response?.data?.pilots);
    }
  };

  useEffect(() => {
    getPilot();
  }, [selectedState]);

  return (
    <SafeAreaView style={styles.main_view}>
      <Header
        title="Pilot Car Directory"
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
        <View style={styles.dropDownsContainer}>
          <CountryStatePicker
            style_dropDown={{
              height: windowHeight * 0.06,
              backgroundColor: 'transparent',
              width: windowWidth * 0.85,
              borderWidth: 0.5,
              justifyContent: 'center',
              paddingHorizontal: moderateScale(15, 0.6),
              borderColor: Color.mediumGray,
              borderRadius: moderateScale(30, 0.6),
            }}
            country={
              userData?.selected_area == 'Sign Up For Canada' ? 'USA' : 'Canada'
            }
            setSelectedState={setSelectedState}
            selectedState={selectedState}
          />
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
        </View>
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
            contentContainerStyle={styles.flatListContainer}
            renderItem={({item, index}) => <DirectoryItem item={item} />}
            ListFooterComponent={() => (
              <View style={{height: windowHeight * 0.1}} />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CarDirectory;

const DirectoryItem = ({item}) => {
  console.log(
    '🚀 ~ DirectoryItem ~ item ---------------->>>>>>>:',
    item?.email,
  );
  return (
    <TouchableOpacity
      // onPress={() => {
      //   console.log('00000000000000');
      //   navigationService.navigate('ServicesScreen');
      // }}
      style={styles.itemContainer}>
      <CustomText isBold style={styles.txt1}>
        {item?.first_name}
      </CustomText>
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
        <Icon
          name={'email'}
          as={Zocial}
          size={moderateScale(20, 0.3)}
          color={Color.mediumGray}
          opacity={0.5}
        />
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
    backgroundColor: Color.white,
    width: windowWidth * 0.9,
    alignItems: 'center',
    borderRadius: moderateScale(20, 0.3),
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
  row: {
    flexDirection: 'row',
    gap: moderateScale(20, 0.2),
    alignItems: 'center',
  },
  txt1: {
    fontSize: moderateScale(14, 0.3),
    color: Color.secondary,
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
    height: windowHeight * 0.1,
    width: windowWidth * 0.9,
    marginVertical: moderateScale(10, 0.6),
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: moderateScale(10, 0.6),
    borderColor: '#C32C2745',
  },
  main_view: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.secondary,
    paddingTop: moderateScale(20, 0.6),
  },
});
