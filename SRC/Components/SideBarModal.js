import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';
import { windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import { moderateScale } from 'react-native-size-matters';
import TextInputWithTitle from './TextInputWithTitle';
import CustomButton from './CustomButton';
import { Icon } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo'

const SideBarModal = ({ isModalVisible, isPost, setIsPost, requirements, setIsModalVisible, isPostDetails, positionOptions }) => {
    return (
        <Modal
            hasBackdrop={true}
            style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
            }}
            
            isVisible={isModalVisible}
            onBackdropPress={() => {
                setIsModalVisible(false);
            }}>
            <View style={styles.modal_main_view}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {isPostDetails ? (
                        <View>
                            <View style={styles.header}>
                                <CustomText isBold style={{ color: Color.white, fontSize: moderateScale(18, 0.6) }}>Post A Load</CustomText>
                                <Icon name='cross' as={Entypo} />
                            </View>
                            <View style={{
                                paddingTop: moderateScale(20, 0.6),
                                paddingHorizontal: moderateScale(20, 0.6)
                            }}>
                                <CustomText isBold style={styles.heading_text}>Posted</CustomText>
                                <CustomText style={styles.text}>Less Than a minute ago</CustomText>
                                <CustomText isBold style={styles.heading_text}>status</CustomText>
                                <CustomText style={styles.text}>Open</CustomText>
                                <CustomText isBold style={styles.heading_text}>Alert</CustomText>
                                <CustomText style={styles.text}>Calculating notifications sent to drivers</CustomText>
                                <CustomText isBold style={styles.heading_text}>Load Date</CustomText>
                                <CustomText style={styles.text}>04/24/2025</CustomText>
                                <CustomText isBold style={styles.heading_text}>Phone</CustomText>
                                <CustomText style={styles.text}>(123) 281-6351</CustomText>
                                <CustomText isBold style={styles.heading_text}>Origin</CustomText>
                                <CustomText style={styles.text}>Pennsylvania Furance, PA, USA</CustomText>
                                <CustomText isBold style={styles.heading_text}>Destination</CustomText>
                                <CustomText style={styles.text}>Furance, SC, USA</CustomText>
                                <CustomText isBold style={styles.heading_text}>Est. Mileage</CustomText>
                                <CustomText style={styles.text}>609 mi</CustomText>
                                <CustomText isBold style={styles.heading_text}>Rate</CustomText>
                                <CustomText style={styles.text}>$5.00/mi</CustomText>
                                <CustomButton text={
                                    'Mark Covered '
                                }
                                    onPress={() => {
                                        setIsPost(true)
                                        setIsModalVisible(false)
                                    }}
                                    fontSize={moderateScale(14, 0.3)}
                                    textColor={Color.white}
                                    borderRadius={moderateScale(30, 0.3)}
                                    width={windowWidth * 0.58}
                                    marginTop={moderateScale(15, 0.3)}
                                    height={windowHeight * 0.055}
                                    bgColor={
                                        Color.secondary
                                    }
                                    style={{
                                        alignSelf: 'flex-start'
                                    }}
                                    textTransform={'capitalize'}
                                />
                                <CustomButton text={
                                    'Cancle'
                                }
                                    onPress={() => setIsModalVisible(false)}
                                    fontSize={moderateScale(14, 0.3)}
                                    textColor={Color.black}
                                    borderRadius={moderateScale(30, 0.3)}
                                    width={windowWidth * 0.58}
                                    height={windowHeight * 0.055}
                                    bgColor={
                                        Color.white
                                    }
                                    marginTop={moderateScale(10, 0.3)}
                                    borderColor={Color.black}
                                    borderWidth={1}
                                    style={{
                                        alignSelf: 'flex-start'
                                    }}
                                    textTransform={'capitalize'}
                                />
                            </View>
                        </View>
                    ) : (
                        <View style={{
                            paddingTop: moderateScale(60, 0.6),
                            paddingHorizontal: moderateScale(20, 0.6)
                        }}>
                            <View style={[styles.row_view, {
                                width: windowWidth * 0.2
                            }]}>
                                <View style={styles.box} />
                                <CustomText style={styles.text}>Text only</CustomText>
                            </View>
                            <CustomText isBold style={styles.heading_text}>Origin</CustomText>
                            <TextInputWithTitle
                                placeholder={'City, State'}
                                // setText={handleChange('email')}
                                // value={values.email}
                                viewHeight={0.055}
                                viewWidth={0.6}
                                inputWidth={0.6}
                                border={2}
                                fontSize={moderateScale(10, 0.6)}
                                borderRadius={30}
                                backgroundColor={'transparent'}
                                borderColor={Color.black}
                                marginTop={moderateScale(10, 0.3)}
                                placeholderColor={Color.veryLightGray}
                                titleStlye={{ right: 10 }}
                            />
                            <CustomText isBold style={styles.heading_text}>Destination</CustomText>
                            <TextInputWithTitle
                                placeholder={'City, State'}
                                // setText={handleChange('email')}
                                // value={values.email}
                                viewHeight={0.055}
                                viewWidth={0.6}
                                inputWidth={0.6}
                                border={2}
                                fontSize={moderateScale(10, 0.6)}
                                borderRadius={30}
                                backgroundColor={'transparent'}
                                borderColor={Color.black}
                                marginTop={moderateScale(10, 0.3)}
                                placeholderColor={Color.veryLightGray}
                                titleStlye={{ right: 10 }}
                            />
                            <View style={[styles.row_view, {
                                marginBottom: moderateScale(15, 0.6)
                            }]}>
                                <CustomText isBold style={styles.heading_text}>Escort positions</CustomText>
                                <CustomText style={[styles.text, {
                                    marginTop: moderateScale(15, 0.6),
                                    fontSize: moderateScale(11, 0.6),
                                }]}>(can Select Multiple)</CustomText>
                            </View>
                            {positionOptions?.map((item) => {
                                return (
                                    <View style={[styles.row_view, {
                                        width: windowWidth * 0.3,
                                        alignItems: 'flex-start',
                                        justifyContent: "flex-start",
                                        marginBottom: moderateScale(7, 0.6)
                                    }]}>
                                        <View style={styles.box} />
                                        <CustomText style={styles.text}>{item?.text}</CustomText>
                                    </View>
                                )
                            })}
                            <CustomText isBold style={[styles.heading_text, { marginBottom: moderateScale(10, 0.6) }]}>Additional requirements</CustomText>
                            {requirements?.map((item) => {
                                return (
                                    <View style={[styles.row_view, {
                                        width: windowWidth * 0.3,
                                        alignItems: 'flex-start',
                                        justifyContent: "flex-start",
                                        marginBottom: moderateScale(7, 0.6)
                                    }]}>
                                        <View style={styles.box} />
                                        <CustomText style={styles.text}>{item?.text}</CustomText>
                                    </View>
                                )
                            })}
                            <CustomText isBold style={styles.heading_text}>Rate</CustomText>
                            <TextInputWithTitle
                                placeholder={'City, State'}
                                // setText={handleChange('email')}
                                // value={values.email}
                                viewHeight={0.055}
                                viewWidth={0.6}
                                inputWidth={0.6}
                                border={2}
                                fontSize={moderateScale(10, 0.6)}
                                borderRadius={30}
                                backgroundColor={'transparent'}
                                borderColor={Color.black}
                                marginTop={moderateScale(10, 0.3)}
                                placeholderColor={Color.veryLightGray}
                                titleStlye={{ right: 10 }}
                            />
                            <CustomButton text={
                                'Post '
                            }
                                onPress={() => {
                                    setIsPost(true)
                                    setIsModalVisible(false)
                                }}
                                fontSize={moderateScale(14, 0.3)}
                                textColor={Color.white}
                                borderRadius={moderateScale(30, 0.3)}
                                width={windowWidth * 0.58}
                                marginTop={moderateScale(15, 0.3)}
                                height={windowHeight * 0.055}
                                bgColor={
                                    Color.secondary
                                }
                                style={{
                                    alignSelf: 'flex-start'
                                }}
                                textTransform={'capitalize'}
                            />
                            <CustomButton text={
                                'Cancle'
                            }
                                fontSize={moderateScale(14, 0.3)}
                                textColor={Color.black}
                                borderRadius={moderateScale(30, 0.3)}
                                width={windowWidth * 0.58}
                                height={windowHeight * 0.055}
                                bgColor={
                                    Color.white
                                }
                                marginTop={moderateScale(10, 0.3)}
                                borderColor={Color.black}
                                borderWidth={1}
                                style={{
                                    alignSelf: 'flex-start'
                                }}
                                textTransform={'capitalize'}
                            />
                        </View>
                    )}
                </ScrollView>
            </View>
        </Modal>
    )
}

export default SideBarModal

const styles = StyleSheet.create({
    modal_main_view: {
        height: windowHeight,
        width: windowWidth * 0.7,
        backgroundColor: Color.white,
        alignItems: 'flex-start',
        position: 'absolute',
        right: 0,

    },
    box: {
        height: moderateScale(16, 0.6),
        width: moderateScale(16, 0.6),
        marginRight: moderateScale(6, 0.6),
        borderRadius: moderateScale(4, 0.6),
        borderWidth: 1,
        borderColor: Color.black
    },
    row_view: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: moderateScale(12, 0.6),
    },
    heading_text: {
        fontSize: moderateScale(15, 0.6),
        marginTop: moderateScale(15, 0.6)
    },
    header: {
        width: windowWidth * 0.7,
        height: windowHeight * 0.12,
        backgroundColor: Color.secondary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        padding: moderateScale(20, 0.6),
    }
})