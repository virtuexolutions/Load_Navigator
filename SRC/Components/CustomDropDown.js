import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';
import { moderateScale } from 'react-native-size-matters';
import { windowWidth } from '../Utillity/utils';
import SelectDropdown from 'react-native-select-dropdown';
import { Icon } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomDropDown = ({data, setItem, item, placeHolder, placeHolderColor, width}) => {
  return (

    <SelectDropdown
    data={data}
    onSelect={(selectedItem, index) => {
      console.log(selectedItem, index);
      setItem(selectedItem);
    }}

    renderButton={(selectedItem, isOpened) => {
      return (
        <View style={[styles.dropdownButtonStyle, width && { width: width}]}>
         
          <CustomText style={[styles.dropdownButtonTxtStyle, placeHolderColor && {
            color: placeHolderColor
          }]}>
            {(selectedItem  && typeof selectedItem == 'object'? selectedItem.title : selectedItem) || placeHolder}
          </CustomText>
          <Icon 
          as={MaterialCommunityIcons}
          name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
        </View>
      );
    }}
    renderItem={(item, index, isSelected) => {
      return (
        <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: Color.primary})}}>
          {/* <Icon name={item.icon} style={styles.dropdownItemIconStyle} /> */}
          <CustomText style={styles.dropdownItemTxtStyle}>{item.title}</CustomText>
        </View>
      );
    }}
    showsVerticalScrollIndicator={false}
    dropdownStyle={styles.dropdownMenuStyle}
  />
  )
}

export default CustomDropDown

const styles = StyleSheet.create({
    dropdownButtonStyle:{
        width: windowWidth * 0.8,
        // height:windowHeight * 0.045,
        paddingVertical:moderateScale(15,0.3),
        borderWidth:1,
        padding:moderateScale(10,0.3),
        // backgroundColor:"red",
        justifyContent:"space-between",
        flexDirection:"row",
        borderColor:Color.mediumGray,
        borderRadius: moderateScale(25,0.3),
    },
    dropdownButtonTxtStyle:{
        color: Color.mediumGray,
    },
    dropdownMenuStyle:{
        backgroundColor:Color.primary,
        borderColor:Color.mediumGray,
        borderWidth:1,
        borderBottomLeftRadius: moderateScale(25,0.3),
        borderBottomRightRadius: moderateScale(25,0.3),
    }
})