import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../Components/Header';
import CustomStatusBar from '../Components/CustomStatusBar';
import {moderateScale} from 'react-native-size-matters';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {Post, Put} from '../Axios/AxiosInterceptorFunction';
import navigationService from '../navigationService';

const PostScreen = props => {
  const data = props?.route?.params?.item;
  const token = useSelector(state => state.authReducer.token);

  const [isLoading, setIsLoading] = useState(false);

  const statusUpdate = async () => {
    const body = {
      origin: data?.origin,
      destination: data?.destination,
      escort_positions: data?.selecescort_positionstedPosition,
      additional_requirements: data?.additional_requirements,
      rate: data?.rate,
      status: 'cover',
      miles: data?.miles,
      contact: data?.contact,
    };
    const url = `auth/load_detail/${data?.id}?_method=put`;
    const respose = await Put(url, body, apiHeader(token));
    if (respose != undefined) {
      navigationService.navigate('PostLoadScreen');
    }
  };

  return (
    <SafeAreaView style={styles.main_Container}>
      <View style={styles.mainScreen}>
        <Header
          title="Post"
          headerColor={Color.secondary}
          textstyle={{color: Color.white}}
          showBack
        />
        <CustomStatusBar
          backgroundColor={Color.white}
          barStyle={'light-content'}
        />

        <ScrollView
          style={{
            width: windowWidth,
            height: windowHeight,
          }}
          contentContainerStyle={{
            justifyContent: 'center',
            paddingBottom: moderateScale(50, 0.6),
          }}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              paddingHorizontal: moderateScale(20, 0.6),
              paddingVertical: moderateScale(25, 0.6),
            }}>
            <CustomText
              style={{
                fontSize: moderateScale(15, 0.6),
                color: Color.black,
              }}>
              Posted
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(13, 0.6),
                color: Color.black,
              }}>
              {moment(data?.created_at).startOf('hour').fromNow()}
            </CustomText>
            <CustomText style={styles.heading}>status</CustomText>
            <CustomText
              style={[
                styles.value,
                {
                  width: moderateScale(60, 0.6),
                  backgroundColor:
                    data?.status.toLowerCase() == 'cover'
                      ? Color.green
                      : 'rgba(243, 10, 10, 1)',
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  textAlign: 'center',
                  borderRadius: moderateScale(20, 0.6),
                  Color: Color.white,
                  // marginLeft: moderateScale(10, 0.6),
                },
              ]}>
              {data?.status}
            </CustomText>
            <CustomText style={styles.heading}>Load Date</CustomText>
            <CustomText style={styles.value}>
              {moment(data?.created_at).format('L')}
            </CustomText>
            <CustomText style={styles.heading}>Phone</CustomText>
            <CustomText
              style={[
                styles.value,
                {
                  color: Color.secondary,
                },
              ]}>
              {data?.contact}
              <CustomText
                style={[
                  styles.value,
                  {
                    marginleft: moderateScale(10, 6),
                  },
                ]}>{`(${data?.communication_mode})`}</CustomText>
            </CustomText>
            <CustomText style={styles.heading}>Origin</CustomText>
            <CustomText style={styles.value}>{data?.origin?.name}</CustomText>
            <CustomText style={styles.heading}>Destination</CustomText>
            <CustomText style={styles.value}>
              {data?.destination?.name}
            </CustomText>

            <CustomText style={styles.heading}>Est. Mileage</CustomText>
            <CustomText
              style={styles.value}>{`${data?.miles} miles`}</CustomText>
            <CustomText style={styles.heading}>start date</CustomText>
            <CustomText style={styles.value}>
              {moment(data?.start_date).format('L')}
            </CustomText>
            <CustomText style={styles.heading}>Rate</CustomText>
            <CustomText style={styles.value}>{`$${data?.rate}`}</CustomText>
            <CustomText style={styles.heading}>height</CustomText>
            <CustomText style={styles.value}>{`$${data?.height}`}</CustomText>
            {/* <CustomText style={styles.heading}>fuel price</CustomText>
            <CustomText style={styles.value}>
              {`$${data?.fuel_price}`}
            </CustomText>
            <CustomText style={styles.heading}>toll price</CustomText>
            <CustomText style={styles.value}>
              {`$${data?.toll_price}`}
            </CustomText> */}
          </View>
          <View
            style={{
              alignItems: 'center',
              width: windowWidth,
            }}>
            <CustomButton
              text={
                isLoading ? (
                  <ActivityIndicator size={'small'} color={Color.white} />
                ) : (
                  'Mark Covered '
                )
              }
              onPress={() => {
                statusUpdate();
              }}
              fontSize={moderateScale(14, 0.3)}
              textColor={Color.white}
              borderRadius={moderateScale(30, 0.3)}
              width={windowWidth * 0.9}
              marginTop={moderateScale(15, 0.3)}
              height={windowHeight * 0.055}
              bgColor={Color.secondary}
              textTransform={'capitalize'}
              disabled={data?.status.toLowerCase() == 'cover'}
            />
            <CustomButton
              text={'Cancel'}
              fontSize={moderateScale(14, 0.3)}
              textColor={Color.black}
              borderRadius={moderateScale(30, 0.3)}
              width={windowWidth * 0.9}
              height={windowHeight * 0.055}
              bgColor={Color.white}
              marginTop={moderateScale(10, 0.3)}
              borderColor={Color.black}
              borderWidth={1}
              textTransform={'capitalize'}
              onPress={() => {
                navigationService.navigate('PostLoadScreen');
              }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  main_Container: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.secondary,
    // paddingTop: moderateScale(20, 0.6),
  },

  mainScreen: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.white,
    // alignItems: 'center',
    // paddingHorizontal : moderateScale(10,.6)
  },
  heading: {
    fontSize: moderateScale(16, 0.6),
    color: Color.black,
    paddingTop: moderateScale(12, 0.6),
  },
  value: {
    fontSize: moderateScale(13, 0.6),
    color: Color.black,
  },
});
