import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Dialog, {DialogContent, SlideAnimation} from 'react-native-popup-dialog';
import {width, scaleWidth, scaleHeight} from '../utils/scaling';
import Fonts from '../constants/Fonts';
import {DisplayContext} from '../context/DisplayContext';
import {color} from 'react-native-reanimated';

export default CustomMenu = ({setVisible, menuOptions, callBack, close}) => {
  const insets = useSafeAreaInsets();
  const Cross = require('../assets/icons/cross.png');
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  const style = styles(insets, darkMode);

  return (
    <Dialog
      visible={setVisible}
      onHardwareBackPress={() => close()}
      onTouchOutside={() => close()}
      dialogAnimation={
        new SlideAnimation({
          slideFrom: 'bottom',
        })
      }>
      <DialogContent style={style.darkModeDialog}>
        <View style={style.contentContainer}>
          <TouchableOpacity
            style={style.crossContainer}
            onPress={() => close()}>
            <Image style={style.crossIcon} source={Cross} />
          </TouchableOpacity>
          {menuOptions.map((name, index) => {
            return (
              <TouchableOpacity
                key={index.toString()}
                onPress={() => callBack(index)}>
                <View style={style.projectStartContainer}>
                  <Text style={style.textHeading}>{name.title}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </DialogContent>
    </Dialog>
  );
};

const styles = (insets, darkMode) =>
  StyleSheet.create({
    darkModeDialog: {
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.white,
    },
    contentContainer: {
      width: width - scaleWidth * 160,
      height: scaleHeight * 192,
    },
    crossContainer: {
      width: scaleWidth * 30,
      height: scaleHeight * 30,
      alignSelf: 'flex-end',
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginVertical: scaleHeight * 21,
    },
    crossIcon: {
      width: scaleWidth * 20,
      height: scaleHeight * 20,
    },
    textHeading: {
      fontSize: scaleWidth * 17,
      lineHeight: scaleWidth * 22,
      letterSpacing: -0.4,
      color: darkMode ? Colors.primary.white : Colors.primary.darkBlack,
      fontFamily: Fonts.primary.regular,
    },
    projectStartContainer: {
      width: width,
      height: scaleHeight * 60,
      justifyContent: 'center',
      borderBottomWidth: 0.5,
      borderBottomColor: darkMode
        ? Colors.primary.line
        : Colors.primary.darkInputBackground,
    },
  });
