import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import CustomText from './CustomText';
import TextInputWithTitle from './TextInputWithTitle';
import {CardField} from '@stripe/stripe-react-native';

const PostCoveredModal = ({setIsModalVisible, isModalVisible}) => {
  const [pilotName, setPilotName] = useState('');
  const [pilotPayment, setPilotPayment] = useState('');
  const [platformFee, setPlatformFee] = useState('');
  const [pilotContact, setPilotContact] = useState('');
  const [insuranceNumber, setInsuranceNumber] = useState('');
  const [userStripeToken, setuserStripeToken] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

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
        <CustomText
          style={{
            color: Color.secondary,
            marginBottom: moderateScale(20, 0.3),
            fontSize: moderateScale(22, 0.6),
          }}
          isBold>
          {'add details'}
        </CustomText>
        <ScrollView>
          <TextInputWithTitle
            title={'pilot name :'}
            placeholder={'Pilot Name'}
            setText={setPilotName}
            value={pilotName}
            viewHeight={0.053}
            viewWidth={0.8}
            inputWidth={0.77}
            border={1}
            fontSize={moderateScale(10, 0.6)}
            borderRadius={10}
            backgroundColor={'transparent'}
            borderColor={'#333333'}
            placeholderColor={Color.mediumGray}
            titleStlye={{right: 14}}
          />
          <TextInputWithTitle
            title={'contact :'}
            placeholder={'Contact'}
            setText={setPilotContact}
            value={pilotContact}
            viewHeight={0.053}
            viewWidth={0.8}
            inputWidth={0.77}
            border={1}
            fontSize={moderateScale(10, 0.6)}
            borderRadius={10}
            backgroundColor={'transparent'}
            borderColor={'#333333'}
            keyboardType={'numeric'}
            placeholderColor={Color.mediumGray}
            titleStlye={{right: 15}}
          />
          <TextInputWithTitle
            title={'car insurance number :'}
            placeholder={'Insurance Number'}
            setText={setInsuranceNumber}
            value={insuranceNumber}
            viewHeight={0.053}
            viewWidth={0.8}
            inputWidth={0.77}
            border={1}
            fontSize={moderateScale(10, 0.6)}
            borderRadius={10}
            backgroundColor={'transparent'}
            borderColor={'#333333'}
            placeholderColor={Color.mediumGray}
            titleStlye={{right: 15}}
          />

          {/* <TextInputWithTitle
            title={'pilot account number : '}
            placeholder={'account Number'}
            setText={setAccountNumber}
            value={accountNumber}
            viewHeight={0.053}
            viewWidth={0.8}
            inputWidth={0.77}
            border={1}
            fontSize={moderateScale(10, 0.6)}
            borderRadius={10}
            backgroundColor={'transparent'}
            borderColor={'#333333'}
            // color={Color.darkGray}
            // marginTop={moderateScale(5, 0.3)}
            // keyboardType={'numeric'}
            placeholderColor={Color.mediumGray}
            titleStlye={{right: 15}}
          /> */}


          <CustomText
            style={{
              fontSize: moderateScale(12, 0.6),
              paddingHorizontal: moderateScale(5, 0.6),
              paddingVertical: moderateScale(5, 0.6),
            }}>
            add your card :
          </CustomText>
          <CardField
            postalCodeEnabled={false}
            placeholders={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{
              backgroundColor: Color.lightGrey,
              borderRadius: moderateScale(15, 0.6),
              width: windowWidth * 0.8,
              textColor: 'black',
              placeholderColor: Color.darkGray,
            }}
            style={{
              width: '100%',
              height: windowHeight * 0.07,
              // marginVertical: moderateScale(10, 0.3),
            }}
            onCardChange={cardDetails => {}}
            onFocus={focusedField => {}}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default PostCoveredModal;

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: Color.white,
    width: windowWidth * 0.9,
    height: windowHeight * 0.8,
    alignItems: 'center',
    borderRadius: moderateScale(20, 0.3),
    paddingVertical: moderateScale(15, 0.3),
    borderWidth: 1,
    borderColor: Color.secondary,
  },
});
