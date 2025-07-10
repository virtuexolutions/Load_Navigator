import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';

const USA_STATES = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

const CANADA_PROVINCES = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Northwest Territories',
  'Nova Scotia',
  'Nunavut',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
  'Yukon',
];

const CountryStatePicker = ({
  country,
  onStateChange,
  selectedState,
  setSelectedState,
  style_dropDown,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [stateList, setStateList] = useState([]);

  useEffect(() => {
    const data =
      country === 'USA'
        ? USA_STATES
        : country === 'Canada'
        ? CANADA_PROVINCES
        : [];

    const formatted = data.map(s => ({label: s, value: s}));
    setStateList(formatted);
    setSelectedState(null); // Reset selected value when country changes
  }, [country]);

  const handleSelect = item => {
    setSelectedState(item);
    setModalVisible(false);
    onStateChange?.(item.value);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>Select State / Province</Text> */}

      <TouchableOpacity
        style={style_dropDown ? style_dropDown : styles.dropdownButton}
        onPress={() => setModalVisible(true)}>
        <CustomText style={styles.dropdownButtonText}>
          {selectedState ? selectedState.label : 'Select State '}
        </CustomText>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}>
          <View style={styles.dropdownList}>
            <FlatList
              data={stateList}
              keyExtractor={(item, index) => index.toString()}
              style={{maxHeight: 200}}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleSelect(item)}>
                  <CustomText style={styles.itemText}>{item.label}</CustomText>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: moderateScale(10, 0.6),
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  dropdownButton: {
    borderWidth: 0.5,
    borderColor: Color.white,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(15, 0.6),
    // padding: moderateScale(12, 0.6),
    height: windowHeight * 0.065,
    borderRadius: moderateScale(30, 0.6),
    width: windowWidth * 0.93,

    backgroundColor: 'transparent',
  },
  dropdownButtonText: {
    fontSize: moderateScale(14, 0.6),
    color: Color.mediumGray,
  },
  overlay: {marginTop :windowHeight*0.28, 
  // height : windowHeight *0.,
    // flex: 1,
    // paddingtop  : windowHeight *0.3,
    // justifyContent: 'space-between',
    // backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 20,
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 5,
    elevation: 5,
  },
  item: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default CountryStatePicker;
