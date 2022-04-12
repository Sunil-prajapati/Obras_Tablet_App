import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import {scaleWidth, scaleHeight, height, width} from '../../utils/scaling';

export const stylesAssign = (insets, darkMode) =>
  StyleSheet.create({
    assignViewContainer: {
      width: width,
      height: height,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: scaleHeight * 74,
      position: 'absolute',
      left: 0,
      top: 0,
      backgroundColor: Colors.primary.transparent,
    },
    leftBodyContainerAssign: {
      width: scaleWidth * 266,
      height: height,
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.white,
      borderRightWidth: 1,
      borderRightColor: Colors.primary.secondGray,
    },
    rightBodyContainerAssign: {
      width: scaleWidth * 340,
      height: height,
      backgroundColor: Colors.primary.white,
    },
    searchSection: {
      width: scaleWidth * 266,
      height: scaleHeight * 69,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.secondGray,
    },
    searchView: {
      width: scaleWidth * 207,
      height: scaleHeight * 37,
      borderRadius: 18,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: darkMode
        ? Colors.primary.darkModeInputBg
        : Colors.primary.white,
    },
    searchIcon: {
      width: scaleWidth * 16,
      height: scaleHeight * 16,
      marginHorizontal: scaleWidth * 8,
    },
    filterIcon: {
      width: scaleWidth * 33,
      height: scaleHeight * 33,
      marginLeft: scaleWidth * 8,
    },
    input: {
      flex: 1,
      padding: 1,
      margin: 0,
      borderWidth: 0,
      fontSize: scaleWidth * 16,
      lineHeight: scaleHeight * 22,
      fontFamily: Fonts.primary.regular,
      color: darkMode
        ? Colors.primary.darkInputHeading
        : Colors.primary.lightGray,
      borderTopRightRadius: 18,
      borderBottomRightRadius: 18,
    },
    profileWithCrossView: {
      flex: 1,
      marginTop: scaleHeight * 20,
      flexDirection: 'row',
      marginRight: scaleWidth * 18,
    },
    profileImage: {
      width: scaleWidth * 56,
      height: scaleWidth * 56,
      resizeMode: 'cover',
    },
    imageBackground: {
      borderRadius: (scaleWidth * 56) / 2,
      borderWidth: 3,
    },
    crossIcon: {
      width: scaleWidth * 20,
      height: scaleHeight * 20,
    },
    crossTouchable: {
      width: scaleWidth * 20,
      height: scaleHeight * 20,
      alignSelf: 'flex-end',
    },
    listSelectedMembers: {
      paddingLeft: scaleWidth * 22,
      paddingRight: scaleWidth * 4,
    },
  });

export const styles = (insets, darkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? Colors.primary.darkBg : Colors.primary.white,
    },
    headerContainer: {
      width: '100%',
      height: scaleHeight * 74,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: scaleWidth * 20,
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.blue,
    },
    textHeader: {
      fontSize: scaleWidth * 17,
      lineHeight: scaleWidth * 20,
      color: Colors.primary.white,
      fontFamily: Fonts.primary.regular,
    },
    addUserIcon: {
      marginRight: scaleWidth * 15,
    },
    icons: {
      width: scaleWidth * 35,
      height: scaleWidth * 35,
    },
    bodyContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    leftBodyContainer: {
      width: scaleWidth * 740,
      height: height,
      borderRightWidth: 1,
      borderRightColor: Colors.primary.secondGray,
    },
    rightBodyContainer: {
      width: scaleWidth * 340,
      height: height,
      backgroundColor: Colors.primary.inputBackground,
    },
    labourHrsContainer: {
      width: scaleWidth * 740,
      height: scaleHeight * 56,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: scaleWidth * 30,
      borderBottomWidth: 1,
      borderBottomColor: Colors.primary.profilePicCircle,
    },
    textLabourHrs: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      color: darkMode
        ? Colors.primary.profilePicCircle
        : Colors.primary.heading,
      fontFamily: Fonts.primary.bold,
    },
    hrsContainer: {
      width: scaleWidth * 92,
      height: scaleHeight * 54,
      alignItems: 'center',
      justifyContent: 'center',
      borderRightWidth: 1,
      borderRightColor: Colors.primary.profilePicCircle,
    },
    textHrs: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 18,
      color: darkMode
        ? Colors.primary.profilePicCircle
        : Colors.primary.heading,
      fontFamily: Fonts.primary.regular,
      marginRight: scaleWidth * 8,
    },
    address: {
      width: scaleWidth * 157,
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 18,
      marginTop: scaleHeight * 9,
      paddingBottom: scaleHeight * 10,
      fontFamily: Fonts.primary.regular,
      color: darkMode
        ? Colors.primary.profilePicCircle
        : Colors.primary.heading,
      borderBottomWidth: 1,
      borderBottomColor: Colors.primary.profilePicCircle,
    },
    textTitle: {
      fontSize: scaleWidth * 12,
      lineHeight: scaleWidth * 22,
      color: darkMode
        ? Colors.primary.profilePicCircle
        : Colors.primary.lightGray,
      fontFamily: Fonts.primary.regular,
    },
    marker: {
      width: scaleWidth * 12,
      height: scaleWidth * 15,
      marginRight: 5,
    },
    textTemperature: {
      fontSize: scaleWidth * 24,
      lineHeight: scaleWidth * 32,
      color: darkMode
        ? Colors.primary.profilePicCircle
        : Colors.primary.calenderButtonTextColor,
      fontFamily: Fonts.primary.regular,
    },

    temperature: {
      width: scaleWidth * 22,
      height: scaleWidth * 22,
      marginLeft: scaleWidth * 8,
    },
    rowTwoContainer: {
      width: scaleWidth * 670,
      height: scaleHeight * 100,
      marginLeft: scaleWidth * 35,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: Colors.primary.profilePicCircle,
    },
    viewRowTwoLeft: {
      alignSelf: 'center',
      marginTop: scaleHeight * 35,
    },
    viewAddress: {
      flexDirection: 'row',
      marginTop: scaleHeight * 10,
      alignItems: 'center',
    },
    viewRowTwoRight: {
      flexDirection: 'row',
      paddingTop: scaleHeight * 18,
    },
    viewTemp: {
      flexDirection: 'row',
      marginRight: scaleHeight * 35,
      marginTop: scaleHeight * 12,
    },
    title: {
      fontSize: scaleWidth * 13,
      lineHeight: scaleWidth * 15,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      fontFamily: Fonts.primary.semiBold,
      color: darkMode ? Colors.primary.profilePicCircle : Colors.primary.gray,
    },
    rowView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: scaleWidth * 40,
    },
    columnView: {
      flexDirection: 'column',
      marginTop: scaleHeight * 18,
      marginRight: scaleWidth * 40,
      borderBottomWidth: 1,
      borderBottomColor: Colors.primary.profilePicCircle,
    },
    textValue: {
      width: scaleWidth * 314,
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 18,
      marginTop: scaleHeight * 9,
      paddingBottom: scaleHeight * 10,
      fontFamily: Fonts.primary.regular,
      color: darkMode
        ? Colors.primary.profilePicCircle
        : Colors.primary.heading,
      borderBottomWidth: 1,
      borderBottomColor: Colors.primary.profilePicCircle,
    },
    textValueTime: {
      width: scaleWidth * 157,
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 18,
      marginTop: scaleHeight * 9,
      paddingBottom: scaleHeight * 10,
      fontFamily: Fonts.primary.regular,
      color: darkMode
        ? Colors.primary.profilePicCircle
        : Colors.primary.heading,
      borderBottomWidth: 1,
      borderBottomColor: Colors.primary.profilePicCircle,
    },
    textValue2: {
      borderBottomWidth: 0,
      width: scaleWidth * 314,
    },
    textValue3: {
      borderBottomWidth: 0,
      width: scaleWidth * 670,
    },
    rowView2: {
      width: scaleWidth * 670,
      borderBottomWidth: 1,
      borderBottomColor: Colors.primary.profilePicCircle,
    },
    buttonView: {
      width: scaleWidth * 112,
      height: scaleHeight * 40,
      marginLeft: scaleWidth * 160,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1.5,
      borderRadius: 4,
      position: 'absolute',
      borderColor: Colors.primary.blue,
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
    viewTeamMembers: {
      height: scaleHeight * 30,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.lightGray,
    },
    textTeamMembers: {
      fontSize: scaleWidth * 17,
      lineHeight: scaleWidth * 19,
      color: darkMode ? Colors.primary.white : Colors.primary.profilePicCircle,
      fontFamily: Fonts.primary.regular,
    },
    addTeamView: {
      height: scaleHeight * 75,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: scaleHeight * 23,
      marginBottom: scaleHeight * 10,
      marginHorizontal: scaleWidth * 20,
      backgroundColor: darkMode ? Colors.primary.darkBg : Colors.primary.white,
    },
    addButtonView: {
      width: scaleWidth * 30,
      height: scaleWidth * 30,
      borderRadius: (scaleWidth * 30) / 2,
      backgroundColor: Colors.primary.blue,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: scaleWidth * 5,
    },
    textPlus: {
      fontSize: scaleWidth * 25,
      lineHeight: scaleWidth * 34,
      color: Colors.primary.white,
      fontFamily: Fonts.primary.regular,
    },
    textAddTeam: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      fontFamily: Fonts.primary.bold,
      color: Colors.primary.blue,
    },

    chatPersonContainer: {
      height: scaleHeight * 75,
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.white,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: scaleWidth * 15,
      borderBottomColor: Colors.primary.secondGray,
      borderBottomWidth: 0.5,
    },
    nameContainer: {
      width: scaleWidth * 200,
      flexDirection: 'column',
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
      color: Colors.primary.heading,
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
    chatBox: {
      width: scaleWidth * 45,
      height: scaleHeight * 37,
      marginRight: scaleWidth * 13,
    },
    deactivate: {
      width: scaleWidth * 155,
      height: scaleHeight * 45,
      marginTop: scaleHeight * 26,
      marginLeft: scaleWidth * 32,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1.5,
      borderRadius: 4,
      borderColor: Colors.primary.blue,
    },
    calendarView: {
      height: scaleHeight * 120,
      paddingVertical: scaleHeight * 20,
      paddingHorizontal: scaleHeight * 10,
    },
    editBtn: {
      fontSize: scaleWidth * 17,
      lineHeight: scaleWidth * 20,
      color: darkMode ? Colors.primary.white : Colors.primary.darkBlack,
      fontFamily: Fonts.primary.regular,
    },
  });
