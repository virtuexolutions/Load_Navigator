import React, {useState} from 'react';
import {Platform, StyleSheet, ToastAndroid, View} from 'react-native';
import {moderateScale, s} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {CardField, createToken} from '@stripe/stripe-react-native';
import {ActivityIndicator} from 'react-native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import CustomImage from './CustomImage';
import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import TextInputWithTitle from './TextInputWithTitle';

const AddCard = ({setIsModalVisible, isModalVisible, item, setLoadStatus}) => {
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const token = useSelector(state => state.authReducer.token);
  const [isLoading, setIsLoading] = useState(false);
  const [isTip, setIsTip] = useState(false);
  const [amount, setamount] = useState(item?.amount);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const addCard = async () => {
    const url = 'auth/add_load_card';
    setIsLoading(true);
    const responseData = await createToken({
      type: 'Card',
    });

    //  return console.log('🚀 ~ addCard ~ responseData:', responseData);
    if (responseData.error) {
      setIsLoading(false);
      console.log(responseData.error);
      setErrorMessage(responseData.error.message);
      // alert(responseData.error.message);
    }
    if (responseData?.error?.code != 'Failed') {
      console.log('hereeeeeeeeeeeeeeeeeee from if ');
      const responseApi = await Post(
        url,
        {...responseData, load_id: item?.id},
        apiHeader(token),
      );
      setIsLoading(false);
      if (responseApi != undefined) {
        setIsModalVisible(false);
        // setIsC  1rt('Card Saved');
      }
    }
  };
  const payNow = async () => {
    const url = 'auth/addcard';
    setIsLoading(true);
    const responseData = await createToken({
      type: 'Card',
    });

    //  return console.log('🚀 ~ addCard ~ responseData:', responseData);
    if (responseData.error) {
      setIsLoading(false);
      console.log(responseData.error);
      // setModalVisible(true);
      setErrorMessage(responseData.error.message);
      // alert(responseData.error.message);
    }
    if (responseData?.error?.code != 'Failed') {
      console.log('hereeeeeeeeeeeeeeeeeee from if ');
      const responseApi = await Post(url, responseData, apiHeader(token));
      setIsLoading(false);
      if (responseApi != undefined) {
        // setIsModalVisible(false);
        statusUpdate();
        // setIsC  1rt('Card Saved');
      }
    }
  };

  const statusUpdate = async () => {
    const body = {
      origin: item?.origin,
      destination: item?.destination,
      escort_positions: item?.selecescort_positionstedPosition,
      additional_requirements: item?.additional_requirements,
      rate: item?.rate,
      status: 'complete',
      miles: item?.miles,
      contact: item?.contact,
    };
    const url = `auth/load_detail/${item?.id}?_method=put`;
    setIsLoading(true);
    const respose = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (respose != undefined) {
      setLoadStatus('complete');
      setIsModalVisible(false);

      // navigationService.navigate('LoadBoard');
      // navigation.navigate('LoadBoard');
    }
  };
  return (
    <Modal
      hasBackdrop={true}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      isVisible={isModalVisible}
      onBackdropPress={() => {
        setIsModalVisible(false);
      }}>
      <View
        style={{
          overflow: 'hidden',
          borderRadius: moderateScale(5, 0.3),
          width: windowWidth * 0.9,
          paddingBottom: moderateScale(10, 0.6),
          backgroundColor: 'white',
          alignItems: 'center',
        }}>
        <>
          <View style={styles.header}>
            <CustomText style={styles.headerText}>Add Card</CustomText>
            <Icon
              // style={}
              style={{position: 'absolute', right: 10}}
              onPress={() => {
                setIsTip(!isTip);
              }}
              as={Ionicons}
              name={'information-circle'}
              size={moderateScale(25, 0.6)}
              color={Color.white}
            />
          </View>
        </>
        <View style={styles.image_con}>
          <CustomImage
            style={{height: '100%', width: '100%'}}
            source={require('../Assets/Images/addcard.png')}
          />
        </View>
        {userRole.toLowerCase() != 'pilot' && (
          <TextInputWithTitle
            title={'Hiring Cost :'}
            placeholder={'Hiring Cost'}
            setText={setamount}
            value={item?.amount?.toString()}
            viewHeight={0.05}
            viewWidth={0.75}
            inputWidth={0.77}
            border={1}
            fontSize={moderateScale(10, 0.6)}
            borderRadius={30}
            backgroundColor={'transparent'}
            borderColor={'#333333'}
            placeholderColor={Color.mediumGray}
            titleStlye={{right: 14}}
            disable={true}
          />
        )}
        {isTip && (
          <View
            style={{
              position: 'absolute',
              top: 35,
              backgroundColor: '#e7f5ff',
              padding: moderateScale(10, 0.6),
              borderRadius: 10,
            }}>
            <CustomText
              style={{fontSize: moderateScale(13, 0.6), color: Color.black}}>
              {userRole.toLowerCase() == 'pilot'
                ? ' To receive your earnings securely, please add your card details.This will ensure smooth and timely payments directly to your account'
                : ` You hired this pilot for Amount ${item?.amount}. To complete the payment, please add your card details.`}
            </CustomText>
          </View>
        )}

        <CardField
          postalCodeEnabled={false}
          placeholders={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#f7f7f7ff',
            textColor: '#000000',
            borderRadius: moderateScale(25, 0.3),
            placeholderColor: Color.darkGray,
          }}
          style={{
            width: windowWidth * 0.75,
            height: windowHeight * 0.05,
            marginVertical: moderateScale(12, 0.3),
            marginTop: moderateScale(20, 0.3),
            borderColor: Color.lightGrey,
          }}
          onCardChange={cardDetails => {}}
          onFocus={focusedField => {}}
        />
        {errorMessage != '' && (
          <View style={styles.error_con}>
            <Icon
              as={Feather}
              name="alert-octagon"
              size={moderateScale(20, 0.6)}
              color={Color.secondary}
            />
            <View
              style={{
                paddingHorizontal: moderateScale(10, 0.6),
              }}>
              <CustomText style={styles.alerttext}>
                something went wrong :
              </CustomText>

              <CustomText style={styles.error_text}>{errorMessage}</CustomText>
            </View>
            <Icon
            onPress={() =>{
              setErrorMessage('')
            }}
              style={{
                position: 'absolute',
                right: 10,
              }}
              as={EvilIcons}
              name="close"
              size={moderateScale(20, 0.6)}
              color={Color.secondary}
            />
          </View>
        )}

        <CustomButton
          text={
            isLoading ? (
              <ActivityIndicator color={'#FFFFFF'} size={'small'} />
            ) : userRole.toLowerCase() == 'pilot' ? (
              'Submit'
            ) : (
              'pay now '
            )
          }
          isBold
          textColor={Color.white}
          width={windowWidth * 0.75}
          height={windowHeight * 0.06}
          onPress={userRole.toLowerCase() != 'pilot' ? payNow : addCard}
          bgColor={Color.secondary}
          borderColor={Color.white}
          borderWidth={2}
          borderRadius={moderateScale(30, 0.3)}
        />
      </View>
    </Modal>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  addBtnShadow: {
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 9.27,

    elevation: 10,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: windowHeight * 0.05,
    backgroundColor: Color.secondary,
    borderBottomLeftRadius: moderateScale(10, 0.3),
    borderBottomRightRadius: moderateScale(10, 0.3),
    flexDirection: 'row',
  },
  alerttext: {
    fontSize: moderateScale(12, 0.6),
    color: Color.secondary,

    marginTop: moderateScale(6, 0.6),
  },
  headerText: {
    color: Color.white,
    fontSize: moderateScale(17, 0.3),
    fontWeight: 'bold',
    // marginRight : moderateScale(15,.6)
  },
  image_con: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.25,
    marginTop: moderateScale(20, 0.3),
  },
  error_text: {
    fontSize: moderateScale(11, 0.6),
    marginTop: moderateScale(-5, 0.6),
  },
  error_con: {
    backgroundColor: 'rgba(252, 216, 210, 1)',
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth * 0.76,
    borderRadius: 10,
    marginBottom : moderateScale(10,.6),
    // paddingVertical : moderateScale(10,.6) ,
    paddingHorizontal: moderateScale(10, 0.6),
  },
});
