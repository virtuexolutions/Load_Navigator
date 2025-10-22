import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import navigationService from '../navigationService';
import {windowHeight, windowWidth} from '../Utillity/utils';

const PostLoadScreen = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  console.log('🚀 ~ PostLoadScreen ~ userData:', userData?.contact);

  const [isVisible, setIsVisible] = useState(false);
  const [isDetails, setIsDetails] = useState(false);
  const [positions, setPositions] = useState({
    lead: false,
    chase: false,
    pole: false,
    steer: false,
    survey: false,
    thirdCar: false,
    fourthCar: false,
    witpac: false,
    cevo: false,
    cse: false,
  });

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

  const truckDetails = [
    {
      id: 1,
      text: 'Calculating notifications Sent to Drive',
      iconName: 'message-reply-text',
      iconType: MaterialCommunityIcons,
    },
    {
      id: 2,
      text: 'Pennsylvania Furnace, PA, USA',
      iconName: 'location-pin',
      iconType: Entypo,
    },
    {
      id: 3,
      text: 'Est. 609 Mi',
      iconName: 'message-reply-text',
      iconType: MaterialCommunityIcons,
    },
    {
      id: 4,
      text: '$ 5.00/Mi',
      iconName: 'dollar',
      iconType: FontAwesome,
    },
    {
      id: 5,
      text: '(123) 281- 6325',
      iconName: 'call',
      iconType: Ionicons,
    },
    {
      id: 6,
      text: '02/24/2025',
      iconName: 'storefront',
      iconType: Ionicons,
    },
    {
      id: 7,
      text: 'Less Than a minute ago',
      iconName: 'clock',
      iconType: Entypo,
    },
  ];
  return (
    <SafeAreaView style={styles.safe_area_view}>
      <Header
        textstyle={{
          color: Color.white,
        }}
        showBack
        title={'Post A Load'}
        headerColor={Color.secondary}
        // Ismenu
        menu
      />
        <CustomStatusBar
          // backgroundColor={Color.white}
          barStyle={'light-content'}
        />
      <ScrollView
        showsVerticalScrollIndicator={false}
        tyle={styles.scroll_view}>

        <View style={styles.main_view}>
          <View
            style={[
              styles.post_card,
              {
                height: windowHeight * 0.45,
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <CustomText
                isBold
                style={[
                  styles.card_heading,
                  {
                    fontSize: moderateScale(17, 0.6),
                    color: Color.secondary,
                  },
                ]}>
                {userData?.company_name}
              </CustomText>
            </View>
            <CustomText
              isBold
              style={[
                styles.card_heading,
                {
                  fontSize: moderateScale(13, 0.6),
                },
              ]}>
              {userData?.contact}
            </CustomText>
            <View style={styles.lines} />
            <CustomText
              isBold
              style={[
                styles.card_heading,
                {
                  paddingTop: moderateScale(5, 0.6),
                },
              ]}>
              Loads
            </CustomText>
            <CustomText style={styles.card_text}>
              View Past Load Or Post a new One.
            </CustomText>
            {/* <CustomButton
              text={'Post Load '}
              onPress={() => navigationService.navigate('LoadDetails')}
              fontSize={moderateScale(14, 0.3)}
              textColor={Color.white}
              borderRadius={moderateScale(30, 0.3)}
              width={windowWidth * 0.45}
              marginTop={moderateScale(15, 0.3)}
              height={windowHeight * 0.065}
              bgColor={Color.secondary}
              style={{
                alignSelf: 'flex-start',
              }}
              textTransform={'capitalize'}
            /> */}
            <View style={styles.lines} />
            <>
              <CustomText
                isBold
                style={[
                  styles.card_heading,
                  {marginTop: moderateScale(10, 0.6)},
                ]}>
                Welcome! Let's Get Started
              </CustomText>
              <CustomText style={styles.card_text}>
                Click 'Post Load' to start posting
              </CustomText>
              <View style={styles.lines} />
              <CustomButton
                text={'Post Load '}
                onPress={() => navigationService.navigate('LoadDetails')}
                fontSize={moderateScale(14, 0.3)}
                textColor={Color.white}
                borderRadius={moderateScale(30, 0.3)}
                width={windowWidth * 0.8}
                marginTop={moderateScale(15, 0.3)}
                height={windowHeight * 0.065}
                bgColor={Color.secondary}
                style={{
                  alignSelf: 'flex-start',
                }}
                textTransform={'capitalize'}
              />
              <CustomButton
                text={'View load board'}
                onPress={() => navigationService.navigate('LoadBoard')}
                fontSize={moderateScale(14, 0.3)}
                textColor={Color.white}
                borderRadius={moderateScale(30, 0.3)}
                width={windowWidth * 0.8}
                marginTop={moderateScale(8, 0.3)}
                height={windowHeight * 0.065}
                bgColor={Color.secondary}
                style={{
                  alignSelf: 'flex-start',
                }}
                textTransform={'capitalize'}
              />
            </>
          </View>
        </View>

        {/* <SideBarModal
          positions={positions}
          setPositions={setPositions}
          isPostDetails={isDetails}
          setIsPost={setIsDetails}
          isPost={isDetails}
          requirements={requirements}
          isModalVisible={isVisible}
          positionOptions={positionOptions}
          setIsModalVisible={setIsVisible}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostLoadScreen;

const styles = StyleSheet.create({
  safe_area_view: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.secondary,
    paddingTop: moderateScale(20, 0.6),
  },

  main_view: {
    paddingVertical: moderateScale(40, 0.6),
    alignItems: 'center',
    backgroundColor: Color.white,
    height: windowHeight,
    paddingHorizontal: moderateScale(10, 0.6),
  },
  post_card: {
    backgroundColor: Color.white,
    width: windowWidth * 0.92,
    borderRadius: moderateScale(20, 0.6),
    paddingVertical: moderateScale(20, 0.6),
    paddingHorizontal: moderateScale(20, 0.6),
    borderColor: '#C32C2745',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  card_heading: {
    fontSize: moderateScale(18, 0.6),
  },
  card_text: {
    fontSize: moderateScale(14, 0.6),
    color: Color.mediumGray,
    textTransform: 'capitalize',
    marginTop: moderateScale(10, 0.6),
  },
  lines: {
    width: windowWidth * 0.8,
    height: 1,
    backgroundColor: Color.veryLightGray,
    marginTop: moderateScale(10, 0.6),
  },
  row_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading_text: {
    fontSize: moderateScale(16, 0.6),
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
});
