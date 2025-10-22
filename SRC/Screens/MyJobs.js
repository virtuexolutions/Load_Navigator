import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {Get} from '../Axios/AxiosInterceptorFunction';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import JobCard from '../Components/JobCard';
import {windowHeight, windowWidth} from '../Utillity/utils';

const MyJobs = () => {
  const IsFocused = useIsFocused();
  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ ViewLeadBoard ~ token:', token);

  const [refreshing, setRefreshing] = useState(false);
  const userData = useSelector(state => state.commonReducer.userData);
  console.log('🚀 ~ ViewLeadBoard ~ userData:', userData?.selected_area);
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
    const url = `auth/cover_list`;
    console.log('🚀 ~ getLoadList ~ url:', url);
    setIsLoading(true);
    const response = await Get(url, token);
    console.log('🚀 ~ getLoadList ~ response:---------------------------', response?.data);
    setIsLoading(false);
    if (response != undefined) {
      setLeaderData(response?.data?.load_detail);
    }
  };

  useEffect(() => {
    getLoadList();
  }, []);

  const onRefresh = () => {
    console.log('oonnnnnnnnnnn refersh ========== >>>>>>>');
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getLoadList();
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.mainScreen}>
      <StatusBar barStyle="light-content" backgroundColor={Color.primary} />
      <View style={styles.main_view}>
        <Header
          title="my Jobs"
          headerColor={'transparent'}
          textstyle={{color: Color.white}}
          menu
        />
      
          {isLoading ? (
            <ActivityIndicator
              style={{
                height: '80%',
              }}
              size={'large'}
              color={Color.white}
            />
          ) : (
            <FlatList
            refreshControl={
               <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
              contentContainerStyle={{
                alignItems: 'center',
                paddingBottom: moderateScale(150, 0.6),
              }}
              data={leaderData}
              renderItem={({item, index}) => {
                return <JobCard item={item} />;
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
                    No jobs found!
                  </CustomText>
                </View>
              }
            />
          )}
      </View>
    </SafeAreaView>
  );
};

export default MyJobs;

const styles = StyleSheet.create({
  mainScreen: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.primary,
    aignItems: 'center',
  },
  main_view: {
    paddingHorizontal: moderateScale(10, 0.6),
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
