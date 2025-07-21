import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import {Icon} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Header from '../Components/Header';
import navigationService from '../navigationService';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';
import BottomSheet from '../Components/BottomSheet';
import LeadBoardCard from '../Components/LeadBoardCard';
import CountryStatePicker from '../Components/CountryStatePicker';
import StatesCodeModal from '../Components/StatesCodeModal';

const ViewLeadBoard = () => {
  const IsFocused = useIsFocused();
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  const [isLoading, setIsLoading] = useState(false);
  const [leaderData, setLeaderData] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [selectedDestination, setselectedDestination] = useState('');
  const [isModalVisible, setIsModalVisible] = useState('');

  const [selectedCountry, setSelectedCountry] = useState(
    userData?.selected_area == 'Sign Up For Canada' ? 'Canada' : 'USA',
  );
  const rbref = useRef();

  const getLoadList = async () => {
    const url = `auth/load_list?origin=${selectedOrigin?.label}&destination=${selectedDestination?.label}`;
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      setLeaderData(response?.data?.load_detail);
    }
  };

  useEffect(() => {
    getLoadList();
  }, [selectedOrigin, selectedDestination]);

  return (
    <SafeAreaView
      // scrollEnabled={false}
      style={styles.mainScreen}
      //   conltentContainerStyle={{
      //     aignItems: 'center',
      //   }}
    >
      <View style={styles.main_view}>
        <Header
          title="View Leader Board"
          headerColor={'transparent'}
          textstyle={{color: Color.white}}
          // showBack
          menu
        />
        <View style={styles.sec_row}>
          <View>
            <CustomText
              style={{
                fontSize: moderateScale(10, 0.6),
                color: Color.white,
              }}>
              Origin
            </CustomText>
            <CountryStatePicker
              style_dropDown={{
                height: windowHeight * 0.06,
                backgroundColor: 'transparent',
                width: windowWidth * 0.43,
                borderWidth: 0.5,
                justifyContent: 'center',

                paddingHorizontal: moderateScale(15, 0.6),
                borderColor: Color.mediumGray,
                borderRadius: moderateScale(10, 0.6),
              }}
              country={
                userData?.selected_area == 'Sign Up For Canada'
                  ? 'Canada'
                  : 'USA'
              }
              setSelectedState={setSelectedOrigin}
              selectedState={selectedOrigin}
              placeHolder={''}
            />
          </View>
          <View>
            <CustomText
              style={{
                fontSize: moderateScale(10, 0.6),
                color: Color.white,
              }}>
              destination
            </CustomText>
            <CountryStatePicker
              style_dropDown={{
                height: windowHeight * 0.06,
                backgroundColor: 'transparent',
                width: windowWidth * 0.43,
                borderWidth: 0.5,
                justifyContent: 'center',

                paddingHorizontal: moderateScale(15, 0.6),
                borderColor: Color.mediumGray,
                borderRadius: moderateScale(10, 0.6),
              }}
              country={
                userData?.selected_area == 'Sign Up For Canada'
                  ? 'Canada'
                  : 'USA'
              }
              setSelectedState={setselectedDestination}
              selectedState={selectedDestination}
              placeHolder={''}
            />
          </View>
        </View>

        {isLoading ? (
          <ActivityIndicator
            style={{
              height: '80%',
              // alignSelf :'center'
            }}
            size={'large'}
            color={Color.white}
          />
        ) : (
          <FlatList
            contentContainerStyle={{
              alignItems: 'center',
              paddingBottom: moderateScale(70, 0.6),
            }}
            data={leaderData}
            renderItem={({item, index}) => {
              return <LeadBoardCard item={item} />;
            }}
            ListEmptyComponent={
              <View
                style={{
                  width: windowWidth,
                  height: windowHeight * 0.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomText
                  style={{
                    color: 'white',
                    width: windowWidth * 0.5,
                    textAlign: 'center',
                  }}>
                  No Leads founds in your selected origin
                </CustomText>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ViewLeadBoard;

const styles = StyleSheet.create({
  mainScreen: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.primary,
    aignItems: 'center',
  },
  main_view: {
    paddingHorizontal: moderateScale(10, 0.6),
    // paddingVertical: moderateScale(30, 0.6),
  },
  heading: {
    fontSize: moderateScale(20, 0.6),
    color: Color.white,
    textAlign: 'center',
  },
  card: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.25,
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
    color: Color.white,
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
  sec_row: {
    flexDirection: 'row',
    width: windowWidth,
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20, 0.6),
  },
  btn: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.04,
    borderWidth: 1,
    borderColor: Color.white,
    borderRadius: moderateScale(5, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
    justifyContent: 'center',
  },
  btn_txt: {
    fontSize: moderateScale(9, 0.6),
    color: Color.white,
  },
});
