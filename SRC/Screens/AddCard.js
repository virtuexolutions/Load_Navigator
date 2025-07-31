import React, {useState} from 'react';
import {Dimensions, Image, Platform, ToastAndroid, View} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';

import {useDispatch, useSelector} from 'react-redux';

import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import TextInputWithTitle from '../Components/TextInputWithTitle';

import {
  CardField,
  createToken,
  BillingDetails,
} from '@stripe/stripe-react-native';
import {ScrollView} from 'native-base';
import {ActivityIndicator} from 'react-native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CardContainer from '../Components/CardContainer';
import CustomButton from '../Components/CustomButton';
import ScreenBoiler from '../Components/ScreenBoiler';
// import {
//   setPm_Type,
//   setUserLogout
// } from '../Store/slices/auth';
import {setPaymentCard, setUserData} from '../Store/slices/common';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {setPm_Type, setUserLogoutAuth} from '../Store/slices/auth-slice';
import Header from '../Components/Header';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const AddCard = () => {
  const token = useSelector(state => state.authReducer.token);
  // const userData = useSelector(state => state.commonReducer.userData);

  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.commonReducer);

  const [isLoading, setIsLoading] = useState(false);
  const [cardData, setCardData] = useState({
    name: userData?.name ? userData?.name : '',
    phone: userData?.contact ? userData?.contact : '',
    email: userData?.email ? userData?.email : '',
    // city: '',
  });
  // const [cardDataForBackend , setCardDataForBackend] = useState({})

  const addCard = async () => {
    const url = 'auth/addcard';
    setIsLoading(true);
    const responseData = await createToken({
      type: 'Card',
    });

    if (responseData.error) {
      setIsLoading(false);
      alert(responseData?.error?.message);
      console.log(responseData.error);
    }
    if (responseData?.error?.code != 'Failed') {
      const responseApi = await Post(url, responseData, apiHeader(token));
      setIsLoading(false);
      if (responseApi != undefined) {
        dispatch(
          setPaymentCard(
            (data = {
              exp_month: responseApi?.data?.data?.exp_month,
              exp_year: responseApi?.data?.data?.exp_year,
              pm_type: responseApi?.data?.data?.pm_type,
              pm_last_four: responseApi?.data?.data?.pm_last_four,
            }),
          ),
        ),
          dispatch(setUserData(responseApi?.data?.data));
        dispatch(setPm_Type(responseApi?.data?.data?.pm_type));
        Platform.OS == 'android'
          ? ToastAndroid.show('Card Saved', ToastAndroid.SHORT)
          : alert('Card Saved');
      }
    }
  };
  return (
    <ScreenBoiler
      showHeader={false}
      // showBack={true}sign
      statusBarBackgroundColor={'transparent'}
      statusBarContentStyle={'light-content'}
      headerType={2}
      title={'Connect cash account'}
      showList={true}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.sectionContainer}
        contentContainerStyle={{paddingBottom: moderateScale(20, 0.3)}}>
        <Header
          textstyle={{
            color: Color.white,
            fontSize: moderateScale(20, 0.6),
          }}
          headerColor={Color.primary}
          showLeft={true}
          // leftName={'left'}
          title={'add card'}
          // leftPress={leftPress}
        />
        <View style={styles.card_Con}>
          <Image
            source={require('../Assets/Images/otherCards.png')}
            resizeMode={'contain'}
            style={{
              // alignSelf: 'center',
              // backgroundColor: 'green',
              height: windowHeight * 0.3,
              width: windowWidth * 0.84,
              // marginTop: moderateScale(10, 0.3),
            }}
          />
          <CustomText
            style={{
              fontSize: moderateScale(15, 0.6),
              color: Color.white,
              // paddingHorizontal: moderateScale(40, 0.6),
              textAlign: 'left',
              width: '80%',
              marginTop: moderateScale(-35, 0.6),
            }}>
            add card details
          </CustomText>
          {/* <CardContainer
          style={{
            // height: windowHeight * 0.5,
            // paddingTop: moderateScale(30, 0.3),
            backgroundColor: Color.red,
          }}> */}
          <CardField
            postalCodeEnabled={false}
            placeholders={{
              number: '4242 4242 4242 4242',
            }}
            // placeholderColor
            // placeholders={{
            //   number: '4242 4242 4242 4242',
            // }}
            cardStyle={{
              placeholderColor: Color.darkGray,
              backgroundColor: '#EAEAEA',
              textColor: '#000000',
              borderRadius: moderateScale(10, 0.3),
            }}
            style={{
              width: windowWidth * 0.8,
              height: windowHeight * 0.05,
              marginVertical: moderateScale(12, 0.3),
              borderColor: Color.lightGrey,
            }}
            onCardChange={cardDetails => {
              console.log('cardDetails', cardDetails);
            }}
            onFocus={focusedField => {
              console.log('focusField', focusedField);
            }}
          />

          <CustomButton
            // textTransform={"capitalize"}
            text={
              isLoading ? (
                <ActivityIndicator color={'#ffffff'} size={'small'} />
              ) : (
                'Submit'
              )
            }
            isBold
            textColor={Color.white}
            width={windowWidth * 0.8}
            height={windowHeight * 0.06}
            marginTop={moderateScale(10, 0.3)}
            onPress={addCard}
            bgColor={Color.secondary}
            borderColor={Color.secondary}
            borderWidth={2}
            borderRadius={moderateScale(30, 0.3)}
          />
          <CustomText
            onPress={() => {
              dispatch(setUserLogoutAuth());
            }}
            style={{
              marginTop: moderateScale(10, 0.3),
              color: Color.white,
              fontSize: moderateScale(12, 0.3),
              textDecorationLine: 'underline',
              fontWeight: 'bold',
            }}>
            Logout
          </CustomText>
          {/* </CardContainer> */}
        </View>
      </ScrollView>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  sectionContainer: {
    // flex: 1,
    height: windowHeight,
    paddingTop: windowHeight * 0.07,
    backgroundColor: Color.primary,
  },
  card_Con: {
    width: windowWidth * 0.9,
    backgroundColor: 'red',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: moderateScale(10, 0.6),
    justifyContent: 'center',
    backgroundColor: 'rgba(71, 66, 62, 0.81)',
    borderRadius: moderateScale(10, 0.6),
    marginTop: moderateScale(30, 0.6),
  },
  Txt: {
    marginTop: moderateScale(10, 0.3),
    color: Color.themeBlack,
    fontSize: moderateScale(22, 0.6),
    textAlign: 'center',
  },
  tou: {
    marginTop: height * 0.03,
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: windowWidth * 0.75,
    paddingVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15, 0.3),
    marginTop: moderateScale(10, 0.3),
    backgroundColor: 'orange',
  },
  cont: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.23,
    borderRadius: moderateScale(20, 0.3),
    // opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'orange',
  },
  imageContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    backgroundColor: Color.white,
    borderRadius: moderateScale(30, 0.3),
    paddingHorizontal: moderateScale(25, 0.3),
    paddingVertical: moderateScale(15, 0.3),
    marginVertical: moderateScale(40, 0.3),
  },
  img: {height: windowHeight * 0.26},
  Tou: {
    width: width * 0.9,
    height: height * 0.055,
    marginTop: height * 0.03,
  },
  txt2: {
    color: Color.black,
    fontSize: moderateScale(20, 0.6),
    fontWeight: 'bold',
  },
  txt3: {
    color: Color.themeLightGray,
    fontSize: moderateScale(12, 0.6),
    textAlign: 'center',
    width: '60%',
    marginTop: moderateScale(5, 0.3),
    lineHeight: moderateScale(17, 0.3),
  },
  txt4: {
    color: Color.white,
    fontSize: moderateScale(14, 0.6),
    fontWeight: 'bold',
    // borderBottomWidth: 1,
    // borderColor: Color.white,
  },
  txt5: {
    color: Color.black,

    fontSize: moderateScale(12, 0.6),
  },

  phoneView: {
    width: windowWidth * 0.75,
    paddingVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: moderateScale(20, 0.3),
    // backgroundColor: 'red',
  },
  countryCode: {
    borderRadius: moderateScale(17, 0.3),
    color: Color.themeLightGray,
    height: height * 0.047,
    paddingHorizontal: moderateScale(10, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(10, 0.3),
    backgroundColor: '#EAEAEA',
  },
});

export default AddCard;
