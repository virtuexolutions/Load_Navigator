import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import { Icon } from 'native-base';
import { moderateScale } from 'react-native-size-matters';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Zocial from "react-native-vector-icons/Zocial";

import Header from '../Components/Header';
import Color from '../Assets/Utilities/Color';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import SelectDropdown from 'react-native-select-dropdown';
import CustomDropDown from '../Components/CustomDropDown';

const CarDirectory = () => {
    const [serviceSate, setServiceState] = useState('');
    const [escortPosition, setEscortPosition] = useState('');
    const [services, setServices] = useState(["A", "B"]);
    const [escortPositions, setEscortPositions] = useState([]);
    const dummyData = [
        { id: 1, name: "Tyree Hanson", phone: "( 123 ) 281-6350", email: "Jmadsen25@Gmail.Com" },
        { id: 2, name: "Tyree Hanson", phone: "( 123 ) 281-6350", email: "Jmadsen25@Gmail.Com" },
        { id: 3, name: "Tyree Hanson", phone: "( 123 ) 281-6350", email: "Jmadsen25@Gmail.Com" },
        { id: 4, name: "Tyree Hanson", phone: "( 123 ) 281-6350", email: "Jmadsen25@Gmail.Com" },
        { id: 5, name: "Tyree Hanson", phone: "( 123 ) 281-6350", email: "Jmadsen25@Gmail.Com" },
        { id: 6, name: "Tyree Hanson", phone: "( 123 ) 281-6350", email: "Jmadsen25@Gmail.Com" },
        { id: 7, name: "Tyree Hanson", phone: "( 123 ) 281-6350", email: "Jmadsen25@Gmail.Com" },
    ];

    return (
        <SafeAreaView style={styles.main_view}>
            <Header
                title="Pilot Car Directory"
                headerColor={Color.primary}
                textstyle={{ color: Color.white }}
                showBack
            />
            <View style={styles.mainScreen}>
                <View style={styles.dropDownsContainer}>
                    <CustomDropDown
                        data={services}
                        setItem={setServiceState}
                        item={serviceSate}
                        placeHolder={"Service State"}
                    />
                    <CustomDropDown
                        data={escortPositions}
                        item={escortPosition}
                        setItem={setEscortPosition}
                        placeHolder={"Escort Position"}
                    />
                </View>
                <FlatList
                    data={dummyData}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.flatListContainer}
                    renderItem={({ item, index }) => (
                        <DirectoryItem item={item} />
                    )}
                    ListFooterComponent={() => (
                        <View style={{ height: windowHeight * 0.1 }} />
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

export default CarDirectory

const DirectoryItem = ({ item }) => {
    return (
        <TouchableOpacity style={styles.itemContainer}>
            <CustomText isBold style={styles.txt1}>{item?.name}</CustomText>
            <View style={styles.row}>
                <Icon
                    name={"phone-alt"}
                    as={FontAwesome5}
                    size={moderateScale(20, 0.3)}
                    color={Color.mediumGray}
                    opacity={0.5}
                />
                <CustomText style={styles.txt2}>{item?.phone}</CustomText>
            </View>
            <View style={styles.row}>
                <Icon
                    name={"email"}
                    as={Zocial}
                    size={moderateScale(20, 0.3)}
                    color={Color.mediumGray}
                    opacity={0.5}
                />
                <CustomText style={styles.txt2}>{item?.email}</CustomText>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainScreen: {
        width: windowWidth,
        height: windowHeight * 0.9,
        backgroundColor: Color.primary,
        alignItems: 'center',
    },
    flatListContainer: {
        backgroundColor: Color.white,
        width: windowWidth * 0.9,
        alignItems: "center",
        marginTop: moderateScale(20, 0.2),
        borderRadius: moderateScale(20, 0.3),
        // marginBottom:moderateScale(20,0.2),
    },
    itemContainer: {
        width: windowWidth * 0.8,
        backgroundColor: Color.lightGrey,
        borderRadius: moderateScale(10, 0.3),
        marginTop: moderateScale(10, 0.3),
        gap: moderateScale(10, 0.2),
        paddingVertical: moderateScale(20, 0.2),
        paddingHorizontal: moderateScale(20, 0.2),
    },
    row: {
        flexDirection: "row",
        gap: moderateScale(20, 0.2),
        alignItems: "center"
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
        paddingTop: moderateScale(20, 0.2),
        marginBottom: moderateScale(10, 0.2),
    },
    main_view: {
        height: windowHeight,
        width: windowWidth,
        backgroundColor: Color.primary,
        paddingTop: moderateScale(20, 0.6)
    }
})
