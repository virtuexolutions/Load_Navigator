import {useNavigation} from '@react-navigation/native';
import React, {useRef} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {setWalkThrough} from '../Store/slices/auth-slice';
import {windowHeight, windowWidth} from '../Utillity/utils';

const WalkThroughScreen = props => {
  // console.log('fdsfds')
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const slidesref = useRef(null);
  const slides = [
    {
      key: '1',
      image: require('../Assets/Images/walk1.png'),
      title: 'Safe & Reliable Load Truck Service',
      text: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nullam La Oreet Urna Vel Hendrerit Commodo. Etiam Ullamcorper Non Arcu Et Interdum. Morbi Tincidunt Vulputate.',
    },
    {
      key: '2',
      image: require('../Assets/Images/walk2.png'),
      title: 'Find Your Next Load Fast',
      text: `Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nullam La Oreet Urna Vel Hendrerit Commodo. Etiam Ullamcorper Non Arcu Et Interdum. Morbi Tincidunt Vulputate.`,
    },
    {
      key: '3',
      image: require('../Assets/Images/walk3.png'),
      title: 'Less Waiting, More Hauling',
      text: `Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nullam La Oreet Urna Vel Hendrerit Commodo. Etiam Ullamcorper Non Arcu Et Interdum. Morbi Tincidunt Vulputate.`,
    },
  ];

  const RenderSlider = ({item}) => {
    return (
      <ImageBackground
        imageStyle={{
          height: '100%',
          width: '100%',
        }}
        resizeMode="stretch"
        style={{
          width: windowWidth,
          height: windowHeight,
          // backgroundColor: 'white',
        }}
        source={item.image}>
         
        <View style={[styles.text_con ,{
           bottom: item?.key == 3 ? 150: 90,
          // bottom : 90 
        }]}>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(22, 0.6),
              color: '#FFFFFF',
              width: windowWidth * 0.6,
              paddingVertical: moderateScale(5, 0.6),
              letterSpacing: 0.6,
            }}>
            {item?.title}
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(10, 0.6),
              color: '#FFFFFF',
            }}>
            {item?.text}
          </CustomText>
           <View
              style={{
                width: windowWidth*0.9,
                height : windowHeight *0.05,
                // flexDirection: 'row',
                // alignItems:'center' ,
                // justifyContent: 'center',
                // paddingHorizontal: moderateScale(17, 0.6),
                // zIndex: 1,
                // position: 'absolute',
                // bottom: 30,
                // bottom: 20,
                alignSelf :'center',
                // right: 0,
                // backgroundColor: 'green',
              }}>
              {/* <RenderSkipBtn /> */}
              {/* <RenderNextBtn
                onPress={() => {
                  if (slidesref.current) {
                    if (activeindex < slides.length - 1) {
                      slidesref.current.goToSlide(activeindex + 1, true);
                    } else {
                      dispatch(setWalkThrough(true));
                    }
                  }
                }}
              /> */}
              {item?.key == 3 && (
                <RenderDoneBtn style={[styles.generalBtn, styles.btnRight]} />
              )}
            </View>
        </View>
      </ImageBackground>
    );
  };

  const RenderNextBtn = () => {
    return (
      <TouchableOpacity style={styles.next_btn}>
        <CustomText
          style={{
            fontSize: moderateScale(14, 0.6),
            color: Color.white,
          }}>
          NEXT
        </CustomText>
      </TouchableOpacity>
    );
  };
  const RenderDoneBtn = () => {
    return (
      <CustomText
        onPress={() => {
          dispatch(setWalkThrough(true));
        }}
        style={[styles.generalBtn, styles.btnRight]}>
        Done
      </CustomText>
    );
  };
  const RenderSkipBtn = () => {
    return (
      <CustomText
        onPress={() => {
          dispatch(setWalkThrough(true));
        }}
        style={[styles.generalBtn, styles.btnLeft]}>
        Skip
      </CustomText>
    );
  };
  // const RenderBackBtn = () => {
  //   return (
  //     <CustomText style={[styles.generalBtn, styles.btnLeft]}>Back</CustomText>
  //   );
  // };
  return (
    <View style={styles.container1}>
      <AppIntroSlider
        renderItem={RenderSlider}
        data={slides}
        ref={slidesref}
        // renderPagination={activeindex => {
        //   return (
        //     <View
        //       style={{
        //         width: windowWidth,
        //         flexDirection: 'row',
        //         justifyContent: 'space-between',
        //         paddingHorizontal: moderateScale(17, 0.6),
        //         zIndex: 1,
        //         position: 'absolute',
        //         // bottom: 30,
        //         bottom: 150,
        //         // right: 0,
        //         backgroundColor: 'red',
        //       }}>
        //       {/* <RenderSkipBtn /> */}
        //       {/* <RenderNextBtn
        //         onPress={() => {
        //           if (slidesref.current) {
        //             if (activeindex < slides.length - 1) {
        //               slidesref.current.goToSlide(activeindex + 1, true);
        //             } else {
        //               dispatch(setWalkThrough(true));
        //             }
        //           }
        //         }}
        //       /> */}
        //       {activeindex == 2 && (
        //         <RenderDoneBtn style={[styles.generalBtn, styles.btnRight]} />
        //       )}
        //     </View>
        //   );
        // }}
        // onPress={() => slidesref.current.goToSlide(1, true)}
        // showDoneButton={false}
        // showSkipButton={true}
        showPrevButton={false}
        showNextButton={false}
        showDoneButton={false}
        activeDotStyle={{backgroundColor: Color.themeBlack}}
        dotStyle={{
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: Color.themeBlack,
        }}
        renderDoneButton={RenderDoneBtn}
        onDone={() => {
          // console.log('fdsfds')
          dispatch(setWalkThrough(true));
        }}
        // renderNextButton={RenderNextBtn}
        // renderSkipButton={RenderSkipBtn}
        // renderPrevButton={RenderBackBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
    // alignItems: 'center',
  },
  container1: {
    height: windowHeight,
    width: windowWidth,

    backgroundColor: 'white',
  },
  bgImage: {
    // flex: 1,
  },
  title: {
    color: Color.themeColor2,
    fontWeight: '700',
    fontSize: 30,
    textAlign: 'center',
    width: windowWidth * 0.8,
    marginTop: windowHeight * 0.065,
  },

  generalBtn: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: moderateScale(15, 0.3),
    // position :'absolute',
    // top : 60,
  },
  btnLeft: {
    color: Color.themeBlack,
    color: Color.white,
  },
  text_con: {
    alignItems: 'flex-start',
    backgroundColor: Color.secondry,
    width: windowWidth * 0.9,
    alignSelf: 'center',
    // paddingVertical : 
    // height: windowHeight * 0.17,
    borderRadius: 15,
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(2, 0.6),
    position: 'absolute',
   
  },
  next_btn: {
    borderColor: Color.black,
  },
  btnRight: {
    // textAlign :'center',
    // position: 'absolute',
    // right: 10,
    color: Color.white,
    fontSize: moderateScale(15, 0.6),
    backgroundColor: Color.secondary,
    width:windowWidth * 0.15,
    height: windowWidth * 0.15,
    borderRadius:  windowWidth * 0.15/2,
    paddingTop: moderateScale(16, 0.6),
    borderWidth : 2,
    borderColor  : Color.white ,
    alignSelf:'center',

    // alignItems :'center' ,
    // justifyContent :'center'
  },
});

export default WalkThroughScreen;
const BoldText = ({children}) => {
  return <Text style={{fontWeight: 'bold'}}>{children}</Text>;
};
