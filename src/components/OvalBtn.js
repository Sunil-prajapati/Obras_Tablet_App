import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scaleWidth, scaleHeight } from '../utils/scaling';
import Fonts from '../constants/Fonts';

export default OvalBtn = ({ text,customStyle }) => {
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
        height: scaleHeight * 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.primary.lightGray,
        padding: scaleWidth * 10,
        borderRadius: 20,
        marginRight: scaleWidth * 16
    },
    btnText: {
        color: Colors.primary.lightGray,
        fontSize: scaleHeight * 14,
        lineHeight: scaleHeight * 16,
        letterSpacing: 0.5,
        fontFamily: Fonts.primary.regular,
    }
});