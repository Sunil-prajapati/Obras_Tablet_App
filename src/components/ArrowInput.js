import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scaleWidth, scaleHeight } from '../utils/scaling';
import Fonts from '../constants/Fonts';

export default ArrowInput = ({ }) => {
    const insets = useSafeAreaInsets()
    const style = styles(insets)
    const arrow = require('../assets/icons/Disclosure_Indicators.png');

    return (
        <View style={[style.container]}>
            <View style={style.textsContainer}>
                <Text style={style.inputHeading}>Invite</Text>
                <Text style={[style.input]}>Team member</Text>
            </View>
            <View style={style.arrowContainer}>
                <Image source={arrow} style={style.arrow} />
            </View>
        </View>
    )
}

const styles = (insets) => StyleSheet.create({
    container: {
        width: scaleWidth * 452,
        height: scaleHeight * 50,
        backgroundColor: Colors.primary.white,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.primary.line,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        fontSize: scaleHeight * 17,
        color: Colors.primary.lightGray,
        letterSpacing: 0.5,
        lineHeight: scaleHeight * 22,
        paddingBottom: scaleHeight * 6,
        fontFamily: Fonts.primary.regular
    },
    inputHeading: {
        fontSize: scaleHeight * 15,
        color: Colors.primary.heading,
        lineHeight: scaleHeight * 20,
        letterSpacing: 0.24,
        fontFamily: Fonts.primary.regular
    },
    textsContainer: {
        flexDirection: 'column',
    },
    arrowContainer: {
        paddingHorizontal: scaleWidth * 20,
        paddingVertical: scaleHeight * 12,
    },
    arrow: {
        width: scaleWidth * 8,
        height: scaleHeight * 13,
    }
});
