import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scaleWidth, scaleHeight } from '../utils/scaling';
import Fonts from '../constants/Fonts';

export default DisableBtn = ({ text,customStyle }) => {
    const insets = useSafeAreaInsets()
    const style = styles(insets)
    return (
        <View style={[style.container,customStyle]}>
            <Text style={style.btnText}>
                {text}
            </Text>
        </View>
    )
}

const styles = (insets) => StyleSheet.create({
    container: {
        width: scaleWidth * 326,
        height: scaleHeight * 45,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: Colors.primary.white,
        fontSize: scaleHeight * 15,
        lineHeight: scaleHeight * 21,
        fontFamily: Fonts.primary.regular,
    }
});