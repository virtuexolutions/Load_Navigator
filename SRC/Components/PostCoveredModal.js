import debounce from 'lodash/debounce';
import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {moderateScale} from 'react-native-size-matters';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from './CustomButton';
import CustomText from './CustomText';
import SearchbarComponent from './SearchbarComponent';
import TextInputWithTitle from './TextInputWithTitle';

const PostCoveredModal = ({
  setIsModalVisible,
  isModalVisible,
  item,
  setLoadStatus,
}) => {
  const token = useSelector(state => state.authReducer.token);
  const [selectedPilot, setSelectedPilot] = useState({});
  console.log(
    '🚀 ~ PostCoveredModal ~ ========================= selectedPilot:',
    selectedPilot?.email,
    selectedPilot?.contact,
  );

  const [pilotName, setPilotName] = useState(
    selectedPilot?.first_name != '' ? selectedPilot?.first_name : '',
  );
  const [lastName, setLastName] = useState(
    selectedPilot?.last_name ? selectedPilot?.last_name : '',
  );

  const [pilotPayment, setPilotPayment] = useState('');
  const [pilotContact, setPilotContact] = useState(
    selectedPilot?.contact ? selectedPilot?.contact : '',
  );
  console.log('🚀 ~ PostCoveredModal ~ pilotContact:', pilotContact);
  const [insuranceNumber, setInsuranceNumber] = useState(
    selectedPilot?.insurance_number != null
      ? selectedPilot?.insurance_number
      : '',
  );
  const [amount, setamount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [stripeData, setStripeData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(
    selectedPilot?.email ? selectedPilot?.email : '',
  );

  useEffect(() => {
    console.log('isme to a raha ha');
    setPilotName(selectedPilot?.first_name);
    setLastName(selectedPilot?.last_name);
    setEmail(selectedPilot?.email);
    setPilotContact(selectedPilot?.contact);
    setInsuranceNumber(
      selectedPilot?.insurance_number != null
        ? selectedPilot?.insurance_number
        : '',
    );
  }, [
    selectedPilot?.email,
    selectedPilot?.contact,
    selectedPilot?.first_name,
    selectedPilot?.last_name,
    selectedPilot?.insurance_number,
  ]);

  console.log('🚀 ~ PostCoveredModal ~ ================email:', email);

  const totalAmount = amount;
  const platformFee = totalAmount * 0.2;
  const pilotFee = totalAmount - platformFee;

  const payment = async () => {
    const body = {
      pilot_name: pilotName,
      // pilot_last_name: lastName,
      pilot_contact: pilotContact,
      insurance_number: insuranceNumber,
      amount: amount,
      status: 'cover',
      email: email,
      platform_Fee: platformFee,
      pilot_fee: pilotFee,
      total_amount: amount,
    };
    // return console.log('🚀 ~ payment ~ body:', body);

    const url = `auth/load_detail/${item?.id}?_method=put`;
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    console.log('🚀 ~ payment ~ response:', response?.data);
    setIsLoading(false);
    if (response != undefined) {
      setLoadStatus('cover');
      setIsModalVisible(false);
    }
  };

  const handleSearch = text => {
    const url = `/auth/pilots/search=${'ln-004'}`;
    const response = Post(url, null, apiHeader(token));
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 500), []);

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
        <ScrollView
          style={{
            // backgroundColor :'red',
            paddingHorizontal: moderateScale(15, 0.6),

            // paddingBottom: moderateScale(10, 0.6),
          }}
          showsVerticalScrollIndicator={false}>
          <CustomText
            style={{
              color: Color.black,
              fontSize: moderateScale(12, 0.3),
              width: windowWidth,
              paddingHorizontal: moderateScale(7, 0.6),
              marginTop: moderateScale(10, 0.3),
            }}>
            search pilot :
          </CustomText>
          <SearchbarComponent
            isRightIcon={true}
            name={'search'}
            as={EvilIcons}
            size={moderateScale(20, 0.3)}
            color={Color.darkGray}
            selectedItem={selectedPilot}
            setSelectedPilot={setSelectedPilot}
            onSearch={debouncedSearch}
            SearchStyle={{
              width: windowWidth * 0.8,
              height: windowHeight * 0.05,

              alignSelf: 'flex-start',
              backgroundColor: Color.white,
              borderRadius: moderateScale(10, 0.3),
            }}
          />
          <TextInputWithTitle
            title={'pilot first name :'}
            placeholder={'Pilot First Name'}
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
            placeholder={'Pilot Last Name'}
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
            // keyboardType={'numeric'}
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
            marginBottom={moderateScale(10, 0.3)}
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
    // alignItems: 'center',
    borderRadius: moderateScale(20, 0.3),
    // paddingHorizontal: moderateScale(15, 0.6),
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
