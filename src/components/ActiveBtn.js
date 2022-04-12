import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { width, scaleWidth, scaleHeight } from '../utils/scaling';
import Fonts from '../constants/Fonts';

export default ActiveBtn = ({ text }) => {
    const insets = useSafeAreaInsets()
    const style = styles(insets)
    return (
        <View style={[style.container]}>
            <Text style={style.btnText}>
                {text}
            </Text>
        </View>
    )
}

const styles = (insets) => StyleSheet.create({
    container: {
        width: scaleWidth * 329,
        height: scaleHeight * 45,
        backgroundColor: Colors.primary.blue,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: Colors.primary.white,
        fontSize: scaleWidth * 15,
        lineHeight: scaleHeight * 21,
        fontFamily: Fonts.primary.bold
    }
});