import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scaleWidth, scaleHeight } from '../utils/scaling';
import Fonts from '../constants/Fonts';

export default DisableBtn = ({text, isGrid}) => {
    const insets = useSafeAreaInsets()
    const style = styles(insets, isGrid)
    return (
        <View style={[style.container]}>
            <Text style={style.btnText}>
                {text}
            </Text>
        </View>
    )
}

const styles = (insets, isGrid) => StyleSheet.create({
    container:{
        width: isGrid ? scaleWidth * 155 : scaleWidth * 100,
        height: isGrid ? scaleHeight * 45 : scaleHeight * 30,
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center',
        borderWidth: isGrid ? 1.5 : 1,
        borderColor:Colors.primary.blue,
    },
    btnText:{
        color: Colors.primary.blue,
        fontSize: isGrid ? scaleWidth * 15 : scaleWidth * 12,
        lineHeight: isGrid ? scaleWidth * 21 : scaleWidth * 16,
        fontFamily: Fonts.primary.regular
    }
});