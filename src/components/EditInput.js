import React, {useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import Colors from '../constants/Colors';
import {scaleHeight} from '../utils/scaling';
import Fonts from '../constants/Fonts';
import crossImg from '../assets/icons/cross_black.png';
// import {DisplayContext} from '../context/DisplayContext';

export default EditInput = ({
  inpStyle,
  placeHolder,
  inputHeading,
  value,
  onChange,
  forView,
  isEditable,
  removeIcon,
  removeClicked,
}) => {
  const style = styles();

  return (
    <View style={[inpStyle]}>
      <Text style={[style.inputHeading, forView]}>{inputHeading}</Text>
      <View style={style.container}>
        <TextInput
          value={value}
          onChangeText={(text) => onChange(text)}
          placeholder={placeHolder}
          style={[style.input, inpStyle]}
          placeholderTextColor={Colors.primary.lightGray}
          autoCapitalize="none"
          editable={isEditable}
        />
        {removeIcon && (
          <TouchableOpacity onPress={() => removeClicked()}>
            <Image style={{alignSelf: 'center'}} source={crossImg} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = (darkMode) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    input: {
      fontSize: scaleHeight * 15,
      color: darkMode ? Colors.primary.white : Colors.primary.heading,
      borderBottomWidth: 1,
      borderBottomColor: Colors.primary.secondGray,
      fontFamily: Fonts.primary.regular,
      marginTop: scaleHeight * 5,
      paddingBottom: scaleHeight * 10,
    },
    inputHeading: {
      fontSize: scaleHeight * 13,
      color: Colors.primary.subHeading,
      textTransform: 'uppercase',
      fontFamily: Fonts.primary.regular,
      marginBottom: Platform.OS === 'android' ? 0 : scaleHeight * 8,
    },
  });
