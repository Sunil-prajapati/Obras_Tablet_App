import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import {scaleWidth, scaleHeight} from '../../utils/scaling';

export const styleUser = (insets, darkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: darkMode
        ? Colors.primary.darkBg
        : Colors.primary.inputBackground,
    },
    leftContainer: {
      width: '35%',
      height: '100%',
      borderRightWidth: 1,
      borderRightColor: Colors.primary.secondGray,
      backgroundColor: darkMode
        ? Colors.primary.darkbg
        : Colors.primary.inputBackground,
    },
    rightContainer: {
      width: '65%',
      height: '100%',
      flexDirection: 'column',
      paddingLeft: scaleWidth * 40,
      paddingTop: scaleHeight * 40,
      paddingRight: scaleWidth * 64,
      backgroundColor: darkMode ? Colors.primary.darkbg : Colors.primary.white,
    },
    chatPersonContainer: {
      height: scaleHeight * 75,
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.white,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: scaleWidth * 15,
      borderColor: Colors.primary.secondGray,
      borderTopWidth: 0.5,
    },
    activeChatPersonContainer: {
      height: scaleHeight * 75,
      backgroundColor: darkMode
        ? Colors.primary.darkInputBackground
        : Colors.primary.background,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: scaleWidth * 15,
      borderColor: Colors.primary.secondGray,
      borderTopWidth: 0.5,
    },
    nameContainer: {
      flexDirection: 'column',
      paddingLeft: scaleWidth * 8,
    },
    belowNameContainer: {
      width: scaleWidth * 300,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    name: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      fontFamily: Fonts.primary.semiBold,
      color: darkMode ? Colors.primary.white : Colors.primary.heading,
    },
    occupation: {
      fontSize: scaleWidth * 13,
      lineHeight: scaleWidth * 15,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      fontFamily: Fonts.primary.semiBold,
      color: Colors.primary.gray,
    },
    avatarImage: {
      width: scaleWidth * 44,
      height: scaleWidth * 44,
      borderRadius: (scaleWidth * 44) / 2,
      borderWidth: 2,
    },
    rowView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rowView1: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    columnView: {
      flexDirection: 'column',
      marginTop: scaleHeight * 26,
      marginRight: scaleWidth * 20,
    },
    avatarDetailImage: {
      width: scaleWidth * 72,
      height: scaleWidth * 72,
      borderRadius: (scaleWidth * 72) / 2,
      borderColor: Colors.primary.green,
      borderWidth: 2,
      marginRight: scaleWidth * 10,
    },
    textValue: {
      width: scaleWidth * 281,
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      marginTop: scaleHeight * 10,
      paddingBottom: scaleHeight * 10,
      fontFamily: Fonts.primary.regular,
      color: darkMode ? Colors.primary.white : Colors.primary.heading,
      borderBottomWidth: 0.5,
      borderBottomColor: darkMode
        ? Colors.primary.white
        : Colors.primary.secondGray,
    },
    rowCertification: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    textDate: {
      width: scaleWidth * 281,
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      marginTop: scaleHeight * 10,
      fontFamily: Fonts.primary.regular,
      color: darkMode ? Colors.primary.gray : Colors.primary.heading,
      position: 'absolute',
      textAlign: 'right',
    },
    buttonView: {
      width: scaleWidth * 102,
      height: scaleHeight * 37,
      marginTop: scaleHeight * 46,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1.5,
      borderRadius: 4,
      borderColor: Colors.primary.blue,
    },
    deleteButtonView: {
      width: scaleWidth * 102,
      height: scaleHeight * 37,
      marginTop: scaleHeight * 46,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1.5,
      borderRadius: 4,
      borderColor: Colors.primary.red,
    },
    messageIcon: {
      width: scaleWidth * 18,
      height: scaleHeight * 18,
      marginRight: scaleWidth * 5,
    },
    textMessage: {
      fontSize: scaleWidth * 14,
      lineHeight: scaleWidth * 21,
      color: Colors.primary.blue,
      fontFamily: Fonts.primary.regular,
    },
    DeleteTextMessage: {
      fontSize: scaleWidth * 14,
      lineHeight: scaleWidth * 21,
      color: Colors.primary.red,
      fontFamily: Fonts.primary.regular,
    },
    buttonText: {
      fontSize: scaleWidth * 14,
      lineHeight: scaleWidth * 21,
      color: Colors.primary.blue,
      fontFamily: Fonts.primary.regular,
    },
    editBtn: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: scaleWidth * 16,
      lineHeight: scaleWidth * 21,
      color: Colors.primary.black3,
      fontFamily: Fonts.primary.regular,
    },
  });
