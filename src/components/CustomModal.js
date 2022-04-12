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

export default CustomModal = ({
  setVisible,
  callBack,
  skip,
  line,
  buttonText,
  nextStepText,
}) => {
  const insets = useSafeAreaInsets();
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  const style = styles(insets, darkMode);
  const File = require('../assets/icons/file_blue.png');

  return (
    <Dialog
      visible={setVisible}
      onHardwareBackPress={() => callBack()}
      onTouchOutside={() => callBack()}
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
          <Text style={style.text}>{line}</Text>
        </View>
        <TouchableOpacity style={style.goBtn} onPress={() => callBack()}>
          <Text style={style.btnText}>{nextStepText}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.skipContainer} onPress={() => skip()}>
          <Text style={style.skipText}>{buttonText}</Text>
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
      marginTop: scaleHeight * 15,
      marginBottom: scaleHeight * 51,
      marginLeft: scaleHeight * 51,
      marginRight: scaleHeight * 51,
      alignItems: 'center',
    },
    text: {
      fontSize: scaleWidth * 18,
      lineHeight: scaleWidth * 28,
      color: darkMode
        ? Colors.primary.inputBackground
        : Colors.primary.calenderButtonTextColor,
      fontFamily: Fonts.primary.regular,
      textAlign: 'center',
    },
    goBtn: {
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
      fontFamily: Fonts.primary.regular,
    },
    skipContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    skipText: {
      color: darkMode ? Colors.primary.darkInActive : Colors.primary.heading,
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      textAlign: 'center',
    },
  });
