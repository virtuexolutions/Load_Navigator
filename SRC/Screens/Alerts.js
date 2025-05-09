import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import { Checkbox, Icon, IconButton } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { moderateScale } from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import CustomDropDown from '../Components/CustomDropDown';
import CustomImage from '../Components/CustomImage';

const Alerts = () => {
  const [escortPosition, setEscortPosition] = useState('');
  const [escortPositions, setEscortPositions] = useState([]);
  const [isSetupAlert, setIsSetupAlert] = useState(false);
  const [origins, setOrigins] = useState([]);
  const [origin, setOrigin] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [destination, setDestination] = useState('');

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
    <ScrollView style={styles.mainScreen} contentContainerStyle={{
      alignItems: 'center',
    }}>
      <AlertCard
        color={'#42460B'}
        children={
          <CustomText style={styles.txt}>
            Thanks For Joining Pilot Car Loads! Your Free Trial Will End In 29
            Days
          </CustomText>
        }
      />
      <AlertCard
        color={Color.secondary}
        children={
          <CustomText style={styles.txt}>
            To Begin Receiving Load Notifications Via Text Or Email You Need To
            Set Up An Alert.
            {''}{' '}
            <CustomText
              onPress={() => {
                setIsSetupAlert(!isSetupAlert);
              }}
              isBold
              style={[styles.txt, styles.underline]}>
              Set Up An Alert →
            </CustomText>
          </CustomText>
        }
      />
      {isSetupAlert ? <SetupAlerts />
        :
        <>
          <View style={styles.loadBoard}>
            <View style={styles.loadBoardHead}>
              <CustomText style={styles.txt2}>Load Board</CustomText>
              <IconButton
                title="Refresh"
                icon={
                  <View style={styles.refreshContainer}>
                    <Icon as={EvilIcons} name="refresh" color={Color.mediumGray} />
                    <CustomText style={styles.txt3}>Refresh</CustomText>
                  </View>
                }
              />
            </View>
            <CustomText style={styles.txt4}>
              Updated Less Than A Minute Ago
            </CustomText>
            <View style={styles.row}>
              <CustomDropDown
                width={windowWidth * 0.35}
                data={escortPositions}
                item={escortPosition}
                setItem={setEscortPosition}
                placeHolder={'Origin'}
              />
              <CustomDropDown
                width={windowWidth * 0.35}
                data={destinations}
                item={destination}
                setItem={setDestination}
                placeHolder={'Destination'}
              />
            </View>
            <View style={styles.row}>
              <CustomDropDown
                width={windowWidth * 0.35}
                data={escortPositions}
                item={escortPosition}
                setItem={setEscortPosition}
                placeHolder={'Escort Position'}
              />
              <View style={styles.checkboxGroup}>
                <Checkbox
                  value="Quick Pay Only"
                  //  colorScheme={"dred"}
                  // defaultIsChecked
                  color={Color.secondary}
                  borderColor={Color.mediumGray}
                  children={
                    <CustomText style={styles.txt3}>Quick Pay Only</CustomText>
                  }
                  onChange={e => { }}
                />
                <Checkbox
                  value="Text Only"
                  //  defaultIsChecked
                  //  backgroundColor={Color.secondary}
                  //  bg={Color.secondary}
                  borderColor={Color.mediumGray}
                  children={
                    <CustomText style={styles.txt3}>Quick Pay Only</CustomText>
                  }
                  onChange={e => { }}
                />
              </View>
            </View>
            <View style={{ width: windowWidth, paddingVertical: moderateScale(20, 0.2), paddingHorizontal: moderateScale(20, 0.3) }}>

              <Checkbox
                value="Hide"
                //   style={{left: 10}}
                //  colorScheme={"dred"}
                defaultIsChecked
                color={Color.secondary}
                children={
                  <CustomText style={styles.txt3}>Hide Covered Loads</CustomText>
                }
                onChange={e => { }}
              />
            </View>
          </View>
          <View style={styles.recentLoadBoards}>
            <View style={styles.row_view}>
              <CustomText isBold style={styles.heading_text}>
                JLS Pilot Car Services
              </CustomText>
              <View style={styles.row_view}>
                <CustomText style={styles.text}>Recent</CustomText>
                <TouchableOpacity style={styles.btn}>
                  <CustomText style={[styles.text, { color: Color.white }]}>
                    Open
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>
            {truckDetails.map(item => {
              return (
                <View
                  style={[
                    styles.row_view,
                    {
                      justifyContent: 'flex-start',
                      marginTop: moderateScale(10, 0.6),
                    },
                  ]}>
                  <View style={styles.icon_box}>
                    <Icon
                      name={item?.iconName}
                      as={item?.iconType}
                      color={Color.white}
                      size={moderateScale(13, 0.6)}
                      style={{ alignSelf: 'center' }}
                    />
                  </View>
                  <CustomText style={styles.details_text}>{item?.text}</CustomText>
                </View>
              );
            })}
          </View>
        </>

      }
    </ScrollView>
  );
};

export default Alerts;

const AlertCard = ({ children, color }) => {
  return (
    <View style={[styles.alertCard, color && { backgroundColor: color }]}>
      <Icon
        name="checkcircle"
        as={AntDesign}
        size={moderateScale(15, 0.3)}
        color={Color.white}
      />
      {children}
      <Icon
        name="cross"
        as={Entypo}
        color={Color.white}
        size={moderateScale(15, 0.3)}
      />
    </View>
  );
};

const SetupAlerts = () => {
  return (
    <View style={styles.alertView}>
      <CustomText style={styles.title}>Alerts</CustomText>
      <View style={styles.setupContainer}>
        <CustomText style={styles.text5} >Let's Create Your First Alert!</CustomText>
        <CustomText style={styles.txt4}>select your preferred regions to get alerts for any loads originating from there.</CustomText>
        <View style={styles.imageContainer}>
          <CustomImage
            style={styles.image}
            source={require('../Assets/Images/mapWithTruck.png')} />
        </View>
        <View style={styles.imageContainer}>
          <CustomImage
            style={styles.image}
            source={require('../Assets/Images/map1.png')} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainScreen: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.primary,
    // paddingHorizontal:moderateScale(20,0.3),
  },
  alertCard: {
    borderRadius: moderateScale(10, 0.3),
    width: windowWidth * 0.9,
    flexDirection: 'row',
    marginTop: moderateScale(20, 0.3),
    alignItems: 'flex-start',
    gap: moderateScale(10, 0.3),
    paddingVertical: moderateScale(20, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
  }, title: {
    fontSize: moderateScale(30, 0.2),
    color: Color.white,
    alignSelf: "center",
  },
  txt: {
    width: '85%',
    // textAlign:"center",
    top: moderateScale(-4, 0.3),
    // backgroundColor:Color.black,
    fontSize: moderateScale(16, 0.3),
    color: Color.white,
  },
  txt2: {
    color: Color.white,
    fontSize: moderateScale(24, 0.3),
    alignSelf: 'center',
  },
  txt3: {
    color: Color.mediumGray,
    fontSize: moderateScale(12, 0.3),
  },
  txt4: {
    color: Color.mediumGray,
    fontSize: moderateScale(14, 0.3),
    textAlign: "center"
  },
  text5: {
    fontWeight: "bold",
    fontSize: moderateScale(24, 0.2),

  },
  refreshContainer: {
    flexDirection: 'row',
    gap: moderateScale(5, 0.3),
  },
  underline: {
    textDecorationLine: 'underline',
    color: Color.white,
  },
  loadBoard: {
    alignItems: 'center',
  },
  checkboxGroup: {
    gap: moderateScale(10, 0.2),
    width: windowWidth * 0.34,
  },
  loadBoardHead: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // alignSelf:'flex-end',
    width: '100%',
    gap: moderateScale(55, 0.3),
    // alignItems:"flex-end"
  },
  row: {
    flexDirection: 'row',
    gap: moderateScale(20, 0.3),
    alignItems: 'center',
    marginTop: moderateScale(10, 0.3),
  },
  recentLoadBoards: {
    backgroundColor: Color.white,
    width: windowWidth * 0.9,
    // alignItems:"center",
    paddingHorizontal: moderateScale(20, 0.2),
    paddingVertical: moderateScale(20, 0.2),
    marginTop: moderateScale(20, 0.2),
    borderRadius: moderateScale(20, 0.3),
    // marginBottom:moderateScale(20,0.2),
  },
  row_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // gap:moderateScale(10, 0.6),
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
  setupContainer: {
    backgroundColor: Color.white,
    width: windowWidth * 0.9,
    // alignItems:"center",
    paddingHorizontal: moderateScale(20, 0.2),
    paddingVertical: moderateScale(20, 0.2),
    marginTop: moderateScale(20, 0.2),
    borderRadius: moderateScale(20, 0.3),
  },
  imageContainer: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.3,
    borderRadius: moderateScale(30, 0.3),
    overflow: "hidden",
    marginTop: moderateScale(20, 0.2),
  },

  image: {
    width: "100%",
    height: "100%",
  }
});
