import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { windowHeight, windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { moderateScale } from 'react-native-size-matters'
import CustomText from '../Components/CustomText'
import CustomButton from '../Components/CustomButton'
import SideBarModal from '../Components/SideBarModal'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Icon } from 'native-base'
import navigationService from '../navigationService'
import { useNavigation } from '@react-navigation/native'

const PostLoadScreen = () => {
    const navigation = useNavigation()
    const [isVisible, setIsVisible] = useState(false)
    const [lead, setLead] = useState(false)
    const [chase, setChase] = useState(false)
    const [pole, setPole] = useState(false)
    const [steer, setSteer] = useState(false)
    const [route, setRoute] = useState(false)
    const [Survey, setSurvey] = useState(false)
    const [thirdCar, setThirdCar] = useState(false)
    const [fourthCar, setFourthCar] = useState(false)
    const [isDetails, setIsDetails] = useState(false)
    const positionOptions = [
        {
            id: 1,
            text: 'Lead',
            value: lead,
            setValue: setLead,
        },
        {
            id: 2,
            text: 'Chase',
            value: chase,
            setValue: setChase,
        },
        {
            id: 3,
            text: 'High Pole',
            value: pole,
            setValue: setPole,
        },
        {
            id: 4,
            text: 'Steer',
            value: steer,
            setValue: setSteer,
        },
        {
            id: 5,
            text: 'Route Survey',
            value: Survey,
            setValue: setSurvey,
        },
        {
            id: 6,
            text: 'Third Car',
            value: thirdCar,
            setValue: setThirdCar,
        },
        {
            id: 7,
            text: 'Fourth Car',
            value: fourthCar,
            setValue: setFourthCar,
        },
    ]

    const requirements = [
        {
            id: 1,
            text: 'WITPAC Needed',
            value: lead,
            setValue: setLead,
        },
        {
            id: 2,
            text: 'CEVO Needed',
            value: chase,
            setValue: setChase,
        },
        {
            id: 3,
            text: 'CSE Needed',
            value: pole,
            setValue: setPole,
        },
    ]

    const truckDetails = [
        {
            id: 1,
            text: 'Calculating notifications Sent to Drive',
            iconName: 'message-reply-text',
            iconType: MaterialCommunityIcons
        },
        {
            id: 2,
            text: 'Pennsylvania Furnace, PA, USA',
            iconName: 'location-pin',
            iconType: Entypo
        },
        {
            id: 3,
            text: 'Est. 609 Mi',
            iconName: 'message-reply-text',
            iconType: MaterialCommunityIcons
        },
        {
            id: 4,
            text: '$ 5.00/Mi',
            iconName: 'dollar',
            iconType: FontAwesome
        },
        {
            id: 5,
            text: '(123) 281- 6325',
            iconName: 'call',
            iconType: Ionicons
        },
        {
            id: 6,
            text: '02/24/2025',
            iconName: 'storefront',
            iconType: Ionicons
        },
        {
            id: 7,
            text: 'Less Than a minute ago',
            iconName: 'clock',
            iconType: Entypo
        },

    ]
    return (
        <SafeAreaView style={styles.safe_area_view}>
            <ScrollView style={styles.scroll_view}>
                <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{
                    marginTop: moderateScale(50, 0.6), paddingHorizontal: moderateScale(15, 0.6),
                }}>
                    <Icon as={Entypo} name='menu' size={moderateScale(26, 0.6)} color={Color.white} />
                </TouchableOpacity>
                <View style={styles.main_view}>
                    <View style={[styles.post_card, {
                        height: isDetails ? windowHeight * 0.55 : windowHeight * 0.35,
                    }]}>
                        <CustomText isBold style={styles.card_heading}>Loads</CustomText>
                        <CustomText style={styles.card_text}>View Past Load Or Post a new One.</CustomText>
                        <CustomButton text={
                            'Post Load '
                        }
                            onPress={() => setIsVisible(true)}
                            fontSize={moderateScale(14, 0.3)}
                            textColor={Color.white}
                            borderRadius={moderateScale(30, 0.3)}
                            width={windowWidth * 0.45}
                            marginTop={moderateScale(15, 0.3)}
                            height={windowHeight * 0.065}
                            bgColor={
                                Color.secondary
                            }
                            style={{
                                alignSelf: 'flex-start'
                            }}
                            textTransform={'capitalize'}
                        />
                        <View style={styles.lines} />
                        {isDetails ? (<View style={{
                            marginTop: moderateScale(10, 0.6)
                        }}>
                            <View style={styles.row_view}>
                                <CustomText isBold style={styles.heading_text}>Truck</CustomText>
                                <View style={styles.row_view}>
                                    <CustomText style={styles.text}>Recent</CustomText>
                                    <TouchableOpacity style={styles.btn}>
                                        <CustomText style={[styles.text, { color: Color.white }]}>Open</CustomText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {truckDetails.map((item) => {
                                return (
                                    <View style={[styles.row_view, {
                                        justifyContent: 'flex-start',
                                        marginTop: moderateScale(7, 0.6)
                                    }]}>
                                        <View style={styles.icon_box}>
                                            <Icon name={item?.iconName} as={item?.iconType} color={Color.white} size={moderateScale(13, 0.6)} style={{ alignSelf: 'center' }} />
                                        </View>
                                        <CustomText style={styles.details_text}>{item?.text}</CustomText>
                                    </View>
                                )
                            })}
                            <CustomText style={{ fontSize: moderateScale(12, 0.6), marginTop: moderateScale(10, 0.6) }}>Lead</CustomText>
                            <View style={[styles.lines, {
                                marginTop: moderateScale(10, 0.6)
                            }]} />
                        </View>) : (
                            <>
                                <CustomText isBold style={[styles.card_heading, { marginTop: moderateScale(10, 0.6) }]}>Welcome! Let's Get Started</CustomText>
                                <CustomText style={styles.card_text}>Click 'Post Load' to start posting</CustomText>
                                <View style={styles.lines} />
                            </>
                        )
                        }
                    </View>
                </View>
                <SideBarModal isPostDetails={isDetails} setIsPost={setIsDetails} isPost={isDetails} requirements={requirements} isModalVisible={isVisible} positionOptions={positionOptions} setIsModalVisible={setIsVisible} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default PostLoadScreen

const styles = StyleSheet.create({
    safe_area_view: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: Color.primary
    },
    scroll_view: {
        width: windowWidth,
        height: windowHeight
    },
    main_view: {
        paddingHorizontal: moderateScale(20, 0.6),
        paddingVertical: moderateScale(40, 0.6),
        alignItems: 'center',
        justifyContent: 'center'
    },
    post_card: {
        backgroundColor: Color.white,
        width: windowWidth * 0.92,
        borderRadius: moderateScale(20, 0.6),
        paddingVertical: moderateScale(20, 0.6),
        paddingHorizontal: moderateScale(20, 0.6)
    },
    card_heading: {
        fontSize: moderateScale(18, 0.6),
    },
    card_text: {
        fontSize: moderateScale(14, 0.6),
        color: Color.veryLightGray,
        textTransform: 'capitalize',
        marginTop: moderateScale(10, 0.6)
    },
    lines: {
        width: windowWidth * 0.8,
        height: 1,
        backgroundColor: Color.veryLightGray,
        marginTop: moderateScale(10, 0.6)
    },
    row_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    heading_text: {
        fontSize: moderateScale(16, 0.6),
        color: Color.secondary
    },
    text: {
        fontSize: moderateScale(10, 0.6),
        color: Color.black
    },
    btn: {
        width: moderateScale(50, 0.6),
        backgroundColor: Color.black,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(20, 0.6),
        marginLeft: moderateScale(10, 0.6)
    },
    icon_box: {
        width: moderateScale(20, 0.6),
        height: moderateScale(20, 0.6),
        backgroundColor: Color.secondary,
        borderRadius: moderateScale(100, 0.6),
        justifyContent: 'center',
        alignItems: "center",
        marginRight: moderateScale(7, 0.6)
    },
})