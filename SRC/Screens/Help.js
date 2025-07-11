import {Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Zocial from 'react-native-vector-icons/Zocial';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';

import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import navigationService from '../navigationService';
import {useSelector} from 'react-redux';
import Faq from 'react-faq-component';
import CountryStatePicker from '../Components/CountryStatePicker';
import {Get} from '../Axios/AxiosInterceptorFunction';

const Help = () => {
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const [serviceSate, setServiceState] = useState('');
  const [escortPosition, setEscortPosition] = useState('');
  const [services, setServices] = useState(['A', 'B']);

  const [isSelected, setIsSelected] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [pilotData, setPilotData] = useState(false);
  const [escortPositions, setEscortPositions] = useState([]);

  const dummyFaqs = [
    {
      id: 1,
      question: 'What is Lorem Ipsum?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac neque nec leo ultrices consequat.',
    },
    {
      id: 2,
      question: 'Why do we use it?',
      answer:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    },
    {
      id: 3,
      question: 'Where can I get some?',
      answer:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
      id: 4,
      question: 'Is Lorem Ipsum safe to use?',
      answer:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      id: 5,
      question: 'Can I customize Lorem Ipsum text?',
      answer:
        'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.',
    },
  ];
  const data = {
    title: 'FAQ',
    rows: [
      {
        title: 'Can I Customize Lorem Ipsum Text?',
        content: `Nam Libero Tempore, Cum Soluta Nobis Est Eligendi Optio Cumque Nihil Impedit Quo Minus Id Quod Maxime Placeat.`,
      },
      // Add more items as needed
    ],
  };
  return (
    <SafeAreaView
      style={[
        styles.main_view,
        {
          backgroundColor:
            userRole.toLowerCase() == 'pilot' ? Color.primary : Color.secondary,
        },
      ]}>
      <Header
        title="fAQS"
        headerColor={userRole.toLowerCase() == 'pilot' ? Color.primary : Color.secondary}
        textstyle={{color: Color.white}}
        showBack
        menu
      />
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'light-content'}
      />

      <View
        style={[
          styles.mainScreen,
          {
            backgroundColor:
              userRole.toLowerCase() == 'pilot' ? Color.primary : Color.white,
          },
        ]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dummyFaqs}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({item, index}) => (
            <View style={styles.container}>
              <FaqItem
                key={index}
                question={item?.question}
                answer={item?.answer}
              />
            </View>
            // <View style={{padding: '20px'}}>
            //   <Faq data={dummyFaqs} styles={styles.faq} />
            // </View>
            // <DirectoryItem
            //   item={item}
            //   isSelected={isSelected}
            //   setIsSelected={setIsSelected}
            // />
          )}
          ListFooterComponent={() => (
            <View style={{height: windowHeight * 0.1}} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Help;

const FaqItem = ({question, answer}) => {
  const [open, setOpen] = useState(false);

  return (
    <TouchableOpacity onPress={() => setOpen(!open)} style={styles.item}>
      <CustomText style={styles.question}>{question}</CustomText>
      {open && <CustomText style={styles.answer}>{answer}</CustomText>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainScreen: {
    width: windowWidth,
    height: windowHeight * 0.9,
    // backgroundColor: Color.white,
    alignItems: 'center',
  },
  flatListContainer: {
    // backgroundColor: Color.white,
    paddingTop : windowHeight*0.04,
    width: windowWidth * 0.9,
    alignItems: 'center',
    borderRadius: moderateScale(20, 0.3),
  },
  itemContainer: {
    width: windowWidth * 0.9,
    backgroundColor: Color.lightGrey,
    borderRadius: moderateScale(10, 0.3),
    marginTop: moderateScale(15, 0.3),
    gap: moderateScale(10, 0.2),
    paddingVertical: moderateScale(10, 0.2),
    paddingHorizontal: moderateScale(10, 0.2),
  },
  row: {
    flexDirection: 'row',
    gap: moderateScale(20, 0.2),
    alignItems: 'center',
  },
  txt1: {
    fontSize: moderateScale(14, 0.3),
    color: Color.secondary,
  },
  txt2: {
    fontSize: moderateScale(14, 0.3),
    color: Color.mediumGray,
    opacity: 0.7,
  },
  dropDownsContainer: {
    gap: moderateScale(10, 0.2),
    marginTop: moderateScale(20, 0.2),
    marginBottom: moderateScale(10, 0.2),
    // backgroundColor :'red',
    height: windowHeight * 0.1,
    width: windowWidth * 0.9,
    marginVertical: moderateScale(10, 0.6),
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: moderateScale(10, 0.6),
    borderColor: '#C32C2745',
  },
  main_view: {
    height: windowHeight,
    width: windowWidth,

    paddingTop: moderateScale(20, 0.6),
  },
  faq: {
    bgColor: '#f1f1f1',
    titleTextColor: '#b71c1c',
    rowTitleColor: '#b71c1c',
    rowContentColor: '#757575',
    arrowColor: '#9e9e9e',
    rowContentPaddingTop: '10px',
    rowContentPaddingBottom: '10px',
    rowContentPaddingLeft: '20px',
    rowContentPaddingRight: '20px',
    rowTitleTextSize: moderateScale(16, 0.6),
    rowContentTextSize: '14px',
    transitionDuration: '0.3s',
    timingFunc: 'ease',
  },
  //   container: {padding: moderateScale(20, 0.6)},
  item: {
    marginVertical: moderateScale(10, 0.6),
    backgroundColor: '#f1f1f1',
    borderRadius: moderateScale(10, 0.6),
    padding: moderateScale(10, 0.6),
    width: windowWidth * 0.9,

    // marginBottom: moderateScale(10, 0.6),
  },
  question: {
    color: Color.secondary,

    fontSize: moderateScale(13, 0.6),
  },
  answer: {
    // marginTop: moderateScale(10, 0.6),
    color: '#757575',
    fontSize: moderateScale(14, 0.6),
  },
});
