import React, {useContext} from 'react';
import {View, Text, TextInput, StyleSheet, Platform} from 'react-native';
import Colors from '../constants/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scaleWidth, scaleHeight} from '../utils/scaling';
import Fonts from '../constants/Fonts';
import {DisplayContext} from '../context/DisplayContext';

export default Input = ({
  inpStyle,
  placeHolder,
  inputHeading,
  secureTextEntryValue,
  value,
  onChange,
  customStyle,
  forView,
  error,
}) => {
  const insets = useSafeAreaInsets();
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  const style = styles(error, darkMode);
  return (
    <View style={[style.container]}>
      <Text style={[style.inputHeading, forView]}>{inputHeading}</Text>
      <TextInput
        value={value}
        onChangeText={(text) => onChange(text)}
        placeholder={placeHolder}
        style={[style.input, inpStyle, customStyle]}
        secureTextEntry={secureTextEntryValue}
        placeholderTextColor={Colors.primary.lightGray}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = (error, darkMode) =>
  StyleSheet.create({
    container: {
      // width: width,
    },
    input: {
      fontSize: scaleHeight * 15,
      height: scaleHeight * 40,
      width: scaleWidth * 326,
      color: darkMode ? Colors.primary.white : Colors.primary.heading,
      backgroundColor: darkMode
        ? Colors.primary.darkInputBackground
        : Colors.primary.inputBackground,
      borderRadius: 5,
      paddingLeft: scaleWidth * 8,
      paddingTop: 0,
      paddingBottom: 0,
      borderColor: Colors.primary.inputBorderColor,
      fontFamily: Fonts.primary.regular,
      borderColor: error && error !== null ? Colors.primary.red : null,
      borderWidth: error && error !== null ? 1 : null,
    },
    inputHeading: {
      fontSize: scaleHeight * 13,
      color: darkMode
        ? Colors.primary.darkInputHeading
        : Colors.primary.subHeading,
      textTransform: 'uppercase',
      fontFamily: Fonts.primary.regular,
      marginBottom: Platform.OS === 'android' ? 0 : scaleHeight * 8,
    },
  });
