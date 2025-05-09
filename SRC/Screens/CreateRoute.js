import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';

const CreateRoute = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create A Route</Text>
            <View style={styles.scanBoxContainer}>
                <Text style={styles.label}>Ending Point</Text>
                <View style={styles.scanBox}>
                    <View style={styles.corner} />
                    <View style={[styles.corner, styles.topRight]} />
                    <View style={[styles.corner, styles.bottomLeft]} />
                    <View style={[styles.corner, styles.bottomRight]} />
                </View>
                <CustomButton
                    text={'Create A Route'}
                    textColor={Color.white}
                    height={windowHeight * 0.06}
                    borderColor={Color.secondary}
                    borderWidth={1}
                    borderRadius={moderateScale(30, 0.6)}
                    width={windowWidth * 0.72}
                    bgColor={Color.secondary}
                    marginTop={moderateScale(20, 0.6)}
                    onPress={() => {
                        navigationService.navigate('LoginScreen')
                    }}
                />
            </View>

            <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque turpis iaculis
            </Text>
        </View>
    );
};

export default CreateRoute;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        paddingTop: moderateScale(50, 0.6),
    },
    title: {
        fontSize: moderateScale(22, 0.6),
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: moderateScale(20, 0.6),
    },
    scanBoxContainer: {
        backgroundColor: '#6e6e6e',
        borderRadius: moderateScale(10, 0.6),
        padding: moderateScale(10, 0.6),
        alignItems: 'center',
        width: windowWidth * 0.8,
        height: windowHeight * 0.5,
        borderWidth: moderateScale(1, 0.6),
        borderColor: Color.secondary,
    },
    label: {
        color: '#fff',
        fontWeight: '600',
        marginBottom: moderateScale(10, 0.6),
        fontSize: moderateScale(18, 0.6),
    },
    scanBox: {
        borderWidth: moderateScale(2.5, 0.6),
        borderColor: '#fff',
        width: windowWidth * 0.75,
        height: windowWidth * 0.8,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: moderateScale(10, 0.6),
        backgroundColor: Color.black,
        borderRadius: moderateScale(7, 0.6)
    },
    corner: {
        position: 'absolute',
        width: moderateScale(20, 0.6),
        height: moderateScale(20, 0.6),
        borderColor: '#fff',
        borderLeftWidth: moderateScale(2, 0.6),
        borderTopWidth: moderateScale(2, 0.6),
    },
    topRight: {
        top: 0,
        right: 0,
        transform: [{ rotate: '90deg' }],
    },
    bottomLeft: {
        bottom: 0,
        left: 0,
        transform: [{ rotate: '-90deg' }],
    },
    bottomRight: {
        bottom: 0,
        right: 0,
        transform: [{ rotate: '180deg' }],
    },
    button: {
        backgroundColor: '#B91C1C',
        paddingVertical: moderateScale(10, 0.6),
        paddingHorizontal: moderateScale(40, 0.6),
        borderRadius: moderateScale(30, 0.6),
        marginTop: moderateScale(5, 0.6),
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: moderateScale(14, 0.6),
    },
    description: {
        color: '#b0b0b0',
        textAlign: 'center',
        marginTop: moderateScale(50, 0.6),
        fontSize: moderateScale(12, 0.6),
        width: '80%',
    },
});
