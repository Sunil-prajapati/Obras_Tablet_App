import React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import {Colors} from '../constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import JAdd from '../assets/icons/JAdd.png';
import { scaleWidth, scaleHeight } from '../utils/scaling';

export default AddIcon = ({line}) => {
    const insets = useSafeAreaInsets()
    const style = styles(insets)
    return (
        <View style={style.addTeamContainer}>
            <Image source={JAdd} style={{resizeMode:"cover",width:23,height:25}}/>
            <Text style={[style.textAdd,{fontSize:15,}]}>{line}</Text>
        </View>
    )
}

const styles = (insets) => StyleSheet.create({
    addTeamContainer:{
        flexDirection:'row',
        marginTop:25,
        justifyContent:'center',
        alignItems:'center',
        height:scaleHeight * 30,
    },
    textAdd:{
        paddingHorizontal:10,
        lineHeight:22,
        fontWeight:'bold',
        letterSpacing:0.5
    },
})