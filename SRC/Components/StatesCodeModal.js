import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import 'react-native-get-random-values';
import Modal from 'react-native-modal';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';

const StatesCodeModal = ({isModalVisible, setIsModalVisible}) => {
  const usStateCodes = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
  ];
  const canadaProvinceCodes = [
    'AB',
    'BC',
    'MB',
    'NB',
    'NL',
    'NS',
    'NT',
    'NU',
    'ON',
    'PE',
    'QC',
    'SK',
    'YT',
  ];

  return (
    <Modal
      avoidKeyboard={true}
      hasBackdrop={true}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      isVisible={isModalVisible}
      onBackdropPress={() => {
        setIsModalVisible(false);
      }}>
      <View style={styles.maincontainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={usStateCodes}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  width: '95%',
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                  // paddingHorizontal: moderateScale(20, 0.6),
                  borderBottomWidth: 1,
                  paddingVertical : moderateScale(5,.6)
                }}>
                <CustomText
                  style={{
                    fontSize: moderateScale(15, 0.6),
                    color: Color.black,
                  }}>
                  {item}
                </CustomText>
                <View
                  style={{
                    borderWidth: 1,
                    height: windowHeight * 0.015,
                    width: windowHeight * 0.015,
                    borderRadius: (windowHeight * 0.015) / 2,

                    borderColor: Color.darkGray,
                    marginTop : moderateScale(6,.6)
                  }}>
                  <View
                    style={{
                      backgroundColor: 'red',
                    }}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
    </Modal>
  );
};

export default StatesCodeModal;

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: Color.white,
    width: windowWidth * 0.8,
    height: windowHeight * 0.5,
    alignItems: 'center',
    borderRadius: moderateScale(20, 0.3),
    paddingVertical: moderateScale(15, 0.3),
    borderWidth: 1,
    borderColor: Color.mediumGray,
  },
});
