import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import {scaleWidth, scaleHeight} from '../utils/scaling';
import Fonts from '../constants/Fonts';
import SelectDropdown from 'react-native-select-dropdown';

export default DropDown = ({
  heading,
  dropDownData,
  placeHolder,
  selectedCall,
  isEditable,
  customStyle,
  customHeadingStyle,
  darkMode,
}) => {
  const style = styles(darkMode);
  return (
    <View style={[customStyle]}>
      <Text style={[style.heading, customHeadingStyle]}>{heading}</Text>
      <SelectDropdown
        data={dropDownData}
        onSelect={(selectedItem) => {
          selectedCall(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        buttonStyle={[style.buttonStyle, customStyle]}
        buttonTextStyle={style.buttonTextStyle}
        defaultButtonText={placeHolder}
        disabled={isEditable}
      />
    </View>
  );
};

const styles = (darkMode) =>
  StyleSheet.create({
    buttonStyle: {
      backgroundColor: darkMode ? Colors.primary.darkBg : Colors.primary.white,
      borderBottomWidth: 1,
      borderBottomColor: Colors.primary.secondGray,
    },
    buttonTextStyle: {
      color: darkMode ? Colors.primary.white : Colors.primary.heading,
      textAlign: 'center',
      fontSize: scaleHeight * 15,
      fontFamily: Fonts.primary.regular,
    },
    heading: {
      fontSize: scaleHeight * 13,
      color: darkMode ? Colors.primary.darkBg : Colors.primary.subHeading,
      textTransform: 'uppercase',
      fontFamily: Fonts.primary.regular,
    },
  });
