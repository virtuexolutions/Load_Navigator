import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { windowHeight, windowWidth } from '../Utillity/utils';
import Header from '../Components/Header';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import { moderateScale } from 'react-native-size-matters';
import { Checkbox } from 'native-base';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomButton from '../Components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const Menu = () => {
  const [regionsArray, setRegionsArray] = useState([
    {
      category: 'United States Regions',
      items: [
        { name: 'Midwest', checked: false },
        { name: 'Northeast', checked: false },
        { name: 'South', checked: false },
        { name: 'West', checked: false },
      ],
    },
    {
      category: 'Canadian Regions',
      items: [
        { name: 'Alberta', checked: false },
        { name: 'British Columbia', checked: false },
        { name: 'Manitoba', checked: false },
        { name: 'New Brunswick', checked: false },
        { name: 'Newfoundland And Labrador', checked: false },
        { name: 'Nova Scotia', checked: false },
        { name: 'Northwest Territories', checked: false },
        { name: 'Nunavut', checked: false },
        { name: 'Ontario', checked: false },
        { name: 'Prince Edward Island', checked: false },
        { name: 'Quebec', checked: false },
        { name: 'Saskatchewan', checked: false },
        { name: 'Yukon', checked: false },
      ],
    },
  ]);
  const [regionsForLoad, setregionsForLoad] = useState([
    {
      id: 1,
      label: 'Nova Scotia',
      value: 'Nova Scotia',
    },
    { id: 2, label: 'Northwest Territories', value: 'Northwest Territories' },
    { id: 3, label: 'Nunavut', value: 'Nunavut' },
    { id: 4, label: 'Ontario', value: 'Ontario' },
    { id: 5, label: 'Prince Edward Island', value: 'Prince Edward Island' },
    { id: 6, label: 'Quebec', value: 'Quebec' },
    { id: 7, label: 'Saskatchewan', value: 'Saskatchewan' },
    { id: 8, label: 'Yukon', value: 'Yukon' },
  ]);
  const [alertData, setAlertData] = useState('');
  const [newAlert, setNewAlert] = useState(false);

  return (
    <SafeAreaView style={styles.safe_area}>
      <Header
        title="Menu"
        headerColor={Color.primary}
        textstyle={{ color: Color.white }}
        // showBack
      />
      <ScrollView
        style={styles.mainScreen}
        contentContainerStyle={{ alignItems: 'center' }}>
        {
          newAlert ?
            <CreateNewAlert
              regionsArray={regionsArray}
              alertData={alertData}
              setAlertData={setAlertData}
              setNewALert={setNewAlert} /> : <>
              <View style={styles.createNewAlertContainer}>
                {regionsForLoad.map((item, itemIndex) => (
                  <View key={itemIndex} style={styles.option}>
                    <Checkbox value={item} bgColor={Color.secondary} />
                    <CustomText style={styles.txt2}>{item.label}</CustomText>
                  </View>
                ))}
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}>
                  <CustomButton
                    textstyle={{
                      fontSize: moderateScale(10, 0.3),
                      // textTransform: 'lowercase',
                    }}
                    // onPress={() => navigationService.navigate('Signup')}
                    text={'Load Post'}
                    fontSize={moderateScale(10, 0.3)}
                    textColor={Color.white}
                    borderRadius={moderateScale(30, 0.3)}
                    width={windowWidth * 0.35}
                    height={windowHeight * 0.056}
                    marginTop={moderateScale(20, 0.3)}
                    bgColor={Color.primary}
                    isBold
                  // isGradient
                  />
                </View>
              </View>
              <View style={styles.notifications}>
                <View style={styles.alertInfo}>
                  <CustomText style={styles.title} isBold>
                    Notifications
                  </CustomText>
                  <CustomText style={styles.txt3}>
                    Decide How You'd Like To Receive Notifications.
                  </CustomText>
                </View>
                <CustomText style={styles.title} isBold>
                  Notifications
                </CustomText>
                <View style={styles.row}>
                  <View style={[styles.option, { marginTop: moderateScale(0, 0.2) }]}>
                    <Checkbox value={'Email'} />
                    <CustomText style={styles.txt2}>{'Email'}</CustomText>
                  </View>
                  <CustomText style={styles.txt3}>Jmadsen25@Gmail.Com</CustomText>
                </View>
                <View style={styles.row}>
                  <View style={[styles.option, { marginTop: moderateScale(0, 0.2) }]}>
                    <Checkbox value={'text'} />
                    <CustomText style={styles.txt2}>{'text'}</CustomText>
                  </View>
                  <CustomText style={styles.txt3}>( 123 ) 281-6350</CustomText>
                </View>
                <CustomText
                  style={{ fontSize: moderateScale(14, 0.2), color: Color.secondary }}>
                  Needs Verification
                </CustomText>
              </View>
              <View style={styles.alerts}>
                <View style={styles.alertInfo}>
                  <CustomText style={styles.title} isBold>
                    Your Alerts
                  </CustomText>
                  <CustomText style={styles.txt3}>Por Edit Your Alerts</CustomText>
                </View>
                <CustomButton
                  onPress={() => {
                    setNewAlert(true);
                  }}
                  text={'New Alert'}
                  fontSize={moderateScale(10, 0.3)}
                  textColor={Color.white}
                  borderRadius={moderateScale(30, 0.3)}
                  width={windowWidth * 0.35}
                  height={windowHeight * 0.045}
                  marginTop={moderateScale(20, 0.3)}
                  bgColor={Color.secondary}
                  isBold
                // isGradient
                />
              </View>
            </>
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default Menu;
const CreateNewAlert = ({ regionsArray, alertData, setAlertData, setNewALert }) => {
  return (
    <View style={styles.createNewAlertContainer}>
      <CustomText style={styles.title} isBold>
        Alert Name
      </CustomText>
      <TextInputWithTitle
        titleText={'Email'}
        placeholder={'Enter alert name'}
        setText={setAlertData}
        value={alertData}
        viewHeight={0.06}
        viewWidth={0.75}
        inputWidth={0.55}
        border={1}
        borderRadius={moderateScale(30, 0.3)}
        backgroundColor={Color.white}
        borderColor={Color.black}
        marginTop={moderateScale(10, 0.3)}
        color={Color.black}
        placeholderColor={Color.veryLightGray}
      />
      <CustomText isBold style={styles.title}>
        Regions
      </CustomText>
      {regionsArray.map((region, index) => (
        <View key={index}>
          <CustomText style={styles.title1}>{region.category}</CustomText>
          {region.items.map((item, itemIndex) => (
            <View key={itemIndex} style={styles.option}>
              <Checkbox value={item} />
              <CustomText style={styles.txt2}>{item.name}</CustomText>
            </View>
          ))}
        </View>
      ))}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <CustomButton
          onPress={() => setNewALert(false)}
          text={'Create New'}
          fontSize={moderateScale(10, 0.3)}
          textColor={Color.white}
          borderRadius={moderateScale(30, 0.3)}
          width={windowWidth * 0.3}
          height={windowHeight * 0.04}
          marginTop={moderateScale(20, 0.3)}
          bgColor={Color.primary}
          isBold
        // isGradient
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safe_area: {
    width: windowWidth,
    paddingBottom: moderateScale(20, 0.6)
  },
  mainScreen: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.primary,
  },
  createNewAlertContainer: {
    marginTop: moderateScale(20, 0.2),
    width: windowWidth * 0.9,
    // height: windowHeight,
    borderRadius: moderateScale(20, 0.2),
    paddingHorizontal: moderateScale(20, 0.2),
    paddingVertical: moderateScale(20, 0.2),
    backgroundColor: Color.secondary,
  },
  title: {
    color: Color.white,
    fontSize: moderateScale(24, 0.2),
  },
  title1: {
    color: Color.white,
    fontSize: moderateScale(16, 0.3),

    textDecorationColor: Color.white,
    textDecorationLine: 'underline',
    // width:"50%",
  },
  txt2: {
    fontSize: moderateScale(16, 0.3),
    color: Color.white,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10, 0.2),
    marginTop: moderateScale(10, 0.2),
  },
  alerts: {
    borderRadius: moderateScale(20, 0.2),
    borderColor: Color.mediumGray,
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: moderateScale(20, 0.2),
    paddingVertical: moderateScale(20, 0.2),
    paddingHorizontal: moderateScale(20, 0.2),
    alignItems: 'center',
    width: windowWidth * 0.9,
    justifyContent: 'space-between',
    gap: moderateScale(10, 0.2),
  },
  alertInfo: {
    //   alignItems:"center",
    //   justifyContent:"center",
  },

  notifications: {
    borderRadius: moderateScale(20, 0.2),
    borderColor: Color.mediumGray,
    borderWidth: 1,
    // flexDirection:"row",
    width: windowWidth * 0.9,
    marginTop: moderateScale(20, 0.2),
    paddingVertical: moderateScale(20, 0.2),
    paddingHorizontal: moderateScale(20, 0.2),
    //  alignItems:"center",
    justifyContent: 'space-between',
    gap: moderateScale(10, 0.2),
  },
  txt3: {
    fontSize: moderateScale(14, 0.3),
    color: Color.veryLightGray,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
