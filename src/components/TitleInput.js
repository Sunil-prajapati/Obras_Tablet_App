import React from 'react';
import { View, Text,Image, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scaleWidth, scaleHeight } from '../utils/scaling';
import Fonts from '../constants/Fonts';

export default TitleInput = ({}) => {
    const insets = useSafeAreaInsets()
    const style = styles(insets)
    const arrow = require('../assets/icons/Disclosure_Indicators.png');

    return (
        <View style={[style.container]}>
            <Text style={style.inputHeading}>Title</Text>
            <View style={style.arrowContainer}>
                <View style={style.round}></View>
                <Image source={arrow} style={style.arrow}/>
            </View>
        </View>
    )
}

const styles = (insets) => StyleSheet.create({
    container:{
        width: scaleWidth * 400,
        height: scaleHeight * 44,
        backgroundColor: Colors.primary.white,
        borderBottomWidth:0.5,
        borderColor:Colors.primary.line,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center'
    },
    inputHeading:{
        fontSize: scaleHeight * 17,
        color:Colors.primary.heading,
        lineHeight: scaleHeight * 22,
        letterSpacing:0.24,
        fontFamily:Fonts.primary.regular,
    },
    arrowContainer:{
        paddingHorizontal: scaleWidth * 20,
        paddingVertical: scaleHeight * 12,
        flexDirection:'row',
        alignItems: 'center'
    },
    arrow:{
        width: scaleWidth * 8,
        height: scaleHeight * 13,
    },
    round:{
        backgroundColor:Colors.primary.lightGray,
        width: scaleWidth * 15,
        height: scaleWidth * 15,
        borderRadius: (scaleWidth * 15)/2,
        marginHorizontal: scaleWidth * 20
    }
});
