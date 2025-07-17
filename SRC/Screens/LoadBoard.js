import {Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import {windowHeight, windowWidth} from '../Utillity/utils';
import navigationService from '../navigationService';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Get} from '../Axios/AxiosInterceptorFunction';
import moment from 'moment';
import LoadBoardCard from '../Components/LoadBoardCard';

const LoadBoard = () => {
  const IsFocused = useIsFocused();
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);

  const [isLoading, setIsLoading] = useState(false);
  const [loadData, setloadData] = useState([]);

  const getLoad = async () => {
    const url = 'auth/load_detail';
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      setloadData(response?.data?.load_detail);
    }
  };

  useEffect(() => {
    getLoad();
  }, [IsFocused]);

  return (
    <SafeAreaView style={styles.main_view}>
      <Header
        title="Load Board Details"
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
        {isLoading ? (
          <ActivityIndicator
            style={{
              height: '100%',
              width: '100%',
            }}
            size={'large'}
            color={Color.secondary}
          />
        ) : (
          <FlatList
            contentContainerStyle={{
              paddingBottom: moderateScale(90, 0.6),
            }}
            data={loadData}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <LoadBoardCard item={item}/>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default LoadBoard;

const styles = StyleSheet.create({
  mainScreen: {
    width: windowWidth,
    height: windowHeight * 0.9,
    backgroundColor: Color.white,
    alignItems: 'center',
  },
  main_view: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.secondary,
  },
  recentLoadBoards: {
    backgroundColor: Color.white,
    width: windowWidth * 0.9,
    paddingHorizontal: moderateScale(20, 0.2),
    paddingVertical: moderateScale(20, 0.2),
    marginTop: moderateScale(20, 0.2),
    borderRadius: moderateScale(20, 0.3),
    borderColor: '#C32C2745',
    borderWidth: 1,
  },
  row_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading_text: {
    fontSize: moderateScale(18, 0.6),
    color: Color.secondary,
  },
  text: {
    fontSize: moderateScale(10, 0.6),
    color: Color.black,
  },
  btn: {
    width: moderateScale(50, 0.6),
    backgroundColor: Color.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(20, 0.6),
    marginLeft: moderateScale(10, 0.6),
  },
  icon_box: {
    width: moderateScale(20, 0.6),
    height: moderateScale(20, 0.6),
    backgroundColor: Color.secondary,
    borderRadius: moderateScale(100, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(7, 0.6),
  },
  details_text: {
    fontSize: moderateScale(11, 0.6),
    color: Color.black,
    flexShrink: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(10, 0.6),
  },
  load_more_btn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.22,
    backgroundColor: Color.secondary,
    height: windowHeight * 0.03,
    marginTop: moderateScale(8, 0.6),
    borderRadius: 10,
  },
});
