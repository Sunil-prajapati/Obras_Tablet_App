import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Dialog, {DialogContent, SlideAnimation} from 'react-native-popup-dialog';
import {scaleWidth, scaleHeight} from '../utils/scaling';
import Fonts from '../constants/Fonts';
import {DisplayContext} from '../context/DisplayContext';

export default ProjectActiveInactiveConfirm = ({
  setVisible,
  message,
  projectName,
  confirm,
  cancel,
}) => {
  const insets = useSafeAreaInsets();
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  const style = styles(insets, darkMode);
  const File = require('../assets/icons/file_blue.png');

  return (
    <Dialog
      visible={setVisible}
      onHardwareBackPress={() => cancel()}
      onTouchOutside={() => cancel()}
      dialogAnimation={
        new SlideAnimation({
          slideFrom: 'bottom',
        })
      }>
      <View style={style.contentContainer}>
        <ImageBackground style={style.imgContainer}>
          <Image style={style.fileIcon} source={File} />
        </ImageBackground>
        <View style={style.textContainer}>
          <Text style={style.text}>{message}</Text>
        </View>
        <View style={style.textContainer2}>
          <Text style={[style.text, style.text2]}>{projectName}</Text>
        </View>
        <TouchableOpacity style={style.confirmBtn} onPress={() => confirm()}>
          <Text style={style.btnText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.cancelContainer}
          onPress={() => cancel()}>
          <Text style={style.cancelText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Dialog>
  );
};

const styles = (insets, darkMode) =>
  StyleSheet.create({
    contentContainer: {
      width: scaleWidth * 450,
      height: scaleHeight * 450,
      alignItems: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.white,
    },
    imgContainer: {
      width: scaleWidth * 80,
      height: scaleWidth * 80,
      borderRadius: (scaleWidth * 80) / 2,
      backgroundColor: Colors.primary.profilePicCircle,
      alignItems: 'center',
      justifyContent: 'center',
    },
    fileIcon: {
      width: scaleWidth * 43,
      height: scaleHeight * 34,
    },
    textContainer: {
      alignItems: 'center',
      marginTop: scaleHeight * 16,
    },
    text: {
      fontSize: scaleWidth * 18,
      lineHeight: scaleWidth * 25,
      color: darkMode
        ? Colors.primary.white
        : Colors.primary.calenderButtonTextColor,
      fontFamily: Fonts.primary.semiBold,
      textAlign: 'center',
    },
    textContainer2: {
      marginTop: scaleHeight * 16,
      marginBottom: scaleHeight * 34,
      alignItems: 'center',
    },
    text2: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      fontFamily: Fonts.primary.regular,
    },
    confirmBtn: {
      width: scaleWidth * 272,
      height: scaleHeight * 45,
      backgroundColor: Colors.primary.blue,
      marginBottom: scaleHeight * 16,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnText: {
      color: Colors.primary.white,
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 21,
      textAlign: 'center',
      fontFamily: Fonts.primary.semiBold,
    },
    cancelContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    cancelText: {
      color: darkMode ? Colors.primary.white : Colors.primary.heading,
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      textAlign: 'center',
      fontFamily: Fonts.primary.primary,
    },
  });
