import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import {scaleWidth, scaleHeight} from '../utils/scaling';
import Fonts from '../constants/Fonts';

export default TextCustom = (props) => {
  const {showGreenTick, boxStyle, showCircle, keys} = props;
  const TreenTick = require('../assets/icons/green_tick.png');
  const style = styles(props);
  return (
    <View key={keys} style={[style.containerStyle, boxStyle]}>
      <Text style={style.textStyle}>{props.text}</Text>
      {showGreenTick ? (
        <Image style={style.greenTick} source={TreenTick} />
      ) : null}
      {showCircle ? <View style={style.circle} /> : null}
    </View>
  );
};

const styles = (props) =>
  StyleSheet.create({
    containerStyle: {
      height: scaleHeight * 47,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 6,
      marginBottom: scaleHeight * 15,
      paddingHorizontal: scaleWidth * 14,
      justifyContent: 'space-between',
      backgroundColor: props.dark
        ? Colors.primary.darkBg
        : Colors.primary.white,
    },
    textStyle: {
      color: props.dark ? Colors.primary.white : Colors.primary.heading,
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 18,
      fontFamily: Fonts.primary.primary,
      marginRight: scaleWidth * 50,
    },
    greenTick: {
      width: scaleWidth * 22,
      height: scaleHeight * 16,
    },
    circle: {
      width: scaleWidth * 15,
      height: scaleWidth * 15,
      borderRadius: (scaleWidth * 15) / 2,
      backgroundColor: props.circleColor,
    },
  });
