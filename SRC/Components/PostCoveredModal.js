import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import CustomText from './CustomText';
import TextInputWithTitle from './TextInputWithTitle';
import {CardField, createToken} from '@stripe/stripe-react-native';
import CustomButton from './CustomButton';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useConfirmPayment} from '@stripe/stripe-react-native';
import {useSelector} from 'react-redux';

const PostCoveredModal = ({
  setIsModalVisible,
  isModalVisible,
  item,
  setLoadStatus,
}) => {
  console.log("🚀 ~ PostCoveredModal ~ item:", item?.id)
  const token = useSelector(state => state.authReducer.token);
  console.log("🚀 ~ PostCoveredModal ~ token:", token)
  const [pilotName, setPilotName] = useState('');
  const [lastName, setLastName] = useState('');

  const [pilotPayment, setPilotPayment] = useState('');
  // const [platformFee, setPlatformFee] = useState('');
  const [pilotContact, setPilotContact] = useState('');
  const [insuranceNumber, setInsuranceNumber] = useState('');
  const [amount, setamount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [stripeData, setStripeData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const totalAmount = amount;
  const platformFee = totalAmount * 0.2;
  const pilotFee = totalAmount - platformFee;

  const payment = async () => {
    // const responseData = await createToken({
    //   type: 'Card',
    // });
    // setStripeData(responseData?.token);

    const body = {
      pilot_name: pilotName,
      pilot_contact: pilotContact,
      insurance_number: insuranceNumber,
      amount: amount,
      status: 'cover',
      email: email,
      // card: responseData,
      platform_Fee: platformFee,
      pilot_fee: pilotFee,
      total_amount: amount,
      // origin: item?.origin,
      // destination: item?.destination,
      // escort_positions: item?.selecescort_positionstedPosition,
      // additional_requirements: item?.additional_requirements,
      // rate: item?.rate,
      // status: 'cover',
      // card: responseData,
      // miles: item?.miles,
      // contact: item?.contact,
      // // pilot_
    };
    // return console.log("🚀 ~ payment ~ body:", body)
    // if (responseData.error) {
    //   // setIsLoading(false);
    //   console.log(responseData.error);
    // }
    // if (responseData != undefined) {
    const url = `auth/load_detail/${item?.id}?_method=put`;
    setIsLoading(true);
    const respose = await Post(url, body, apiHeader(token));
    console.log('🚀 ~ payment ~ respose:', respose?.data);
    setIsLoading(false);
    if (respose != undefined) {
      setLoadStatus('cover');
      setIsModalVisible(false);
      // Rbref.current?.close();
      // navigationService.navigate('LoadBoard');
      // navigation.navigate('LoadBoard');
      // }
    }
  };

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
        <View style={styles.header}>
          <CustomText style={styles.heading} isBold>
            {'add details'}
          </CustomText>
        </View>
        <ScrollView>
          <TextInputWithTitle
            title={'pilot first name :'}
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
            title={'pilot last name :'}
            placeholder={'Pilot Name'}
            setText={setLastName}
            value={lastName}
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
            title={'pilot email :'}
            placeholder={'Email'}
            setText={setEmail}
            value={email}
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
            title={'pilot contact :'}
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
            maxLength={12}
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

          <TextInputWithTitle
            title={'amount :'}
            placeholder={'Amount'}
            setText={setamount}
            value={amount}
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

          {/* <CustomText style={styles.txt}>add pilot card :</CustomText>
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
            }}
            onCardChange={cardDetails => {
              setStripeData(cardDetails);
            }}
            onFocus={focusedField => {}}
          /> */}

          <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator size={'small'} color={Color.white} />
              ) : (
                'submit'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.8}
            height={windowHeight * 0.05}
            marginTop={moderateScale(15, 0.3)}
            onPress={() => {
              payment();
            }}
            bgColor={Color.secondary}
            borderRadius={moderateScale(30, 0.3)}
            fontSize={moderateScale(15, 0.3)}
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
    height: windowHeight * 0.7,
    alignItems: 'center',
    borderRadius: moderateScale(20, 0.3),
    borderWidth: 1,
    borderColor: Color.secondary,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: Color.secondary,
    width: '100%',
    alignItems: 'center',
    paddingVertical: moderateScale(10, 0.6),
    marginBottom: moderateScale(5, 0.6),
  },
  heading: {
    color: Color.white,
    fontSize: moderateScale(22, 0.6),
  },
  txt: {
    fontSize: moderateScale(12, 0.6),
    paddingHorizontal: moderateScale(5, 0.6),
    paddingVertical: moderateScale(5, 0.6),
  },
});
