import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Colors from '../constants/Colors';
import {scaleHeight, scaleWidth} from '../utils/scaling';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DisableBtn from './DisableBtn';
import {DisplayContext} from '../context/DisplayContext';

export default CustomDropDown = ({data, pickerSelection, onPress, text}) => {
  const insets = useSafeAreaInsets();
  const [isFocused, setIsFocused] = useState(false);
  const [pickerDisplayed, setPickerDisplayed] = useState(false);
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  const style = styles(insets, darkMode);

  const togglePicker = () => {
    setPickerDisplayed(!pickerDisplayed);
    _focused();
  };
  const _onPress = (value) => {
    onPress(value.title);
    togglePicker();
  };

  const _focused = () => {
    setIsFocused(true);
  };

  return (
    <>
      <View style={style.container}>
        <TouchableOpacity
          disabled={pickerDisplayed}
          style={style.pickerContainer}
          onPress={() => togglePicker()}
          title={'Select a value!'}>
          <View style={style.titleContainer}>
            <Text style={style.title}>
              {pickerSelection ? pickerSelection : text}
            </Text>
          </View>
          <Modal
            visible={pickerDisplayed}
            animationType={'slide'}
            transparent={true}>
            <View style={style.modal}>
              <Text style={style.description}>-{text}-</Text>
              {data &&
                data.map((value, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => _onPress(value)}>
                      <View style={style.dropDownItemsContainer}>
                        <Text style={style.pickerText}>{value.title}</Text>
                        <View
                          style={[
                            {
                              width: scaleWidth * 20,
                              height: scaleHeight * 20,
                              backgroundColor: value.color,
                              borderRadius: 50,
                            },
                          ]}></View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              <TouchableHighlight onPress={() => togglePicker()}>
                <DisableBtn
                  text={'Close'}
                  customStyle={{
                    backgroundColor: Colors.primary.blue,
                    width: scaleWidth * 200,
                    height: scaleHeight * 30,
                  }}
                />
              </TouchableHighlight>
            </View>
          </Modal>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = (isFocused, darkMode) =>
  StyleSheet.create({
    container: {
      height: '17%',
      borderRadius: 10,
      justifyContent: 'center',
      marginTop: '1%',
      padding: 1,
    },
    pickerContainer: {
      height: '100%',
      width: '100%',
      backgroundColor: darkMode ? Colors.primary.darkBg : Colors.primary.white,
      borderRadius: 10,
      justifyContent: 'center',
      flexDirection: 'row',
    },
    titleContainer: {
      flex: 1,
      height: scaleHeight * 40,
      justifyContent: 'center',
      alignItems: 'flex-start',
      borderWidth: 1,
      borderColor: Colors.primary.lightGray,
      padding: scaleWidth * 10,
      borderRadius: 20,
    },
    title: {
      color: Colors.primary.lightGray,
      fontSize: scaleHeight * 14,
      lineHeight: scaleHeight * 16,
      letterSpacing: 0.5,
      fontFamily: Fonts.primary.regular,
    },
    description: {
      fontSize: 20,
      color: darkMode ? Colors.primary.white : Colors.primary.darkGray,
    },
    modal: {
      height: '40%',
      width: '100%',
      borderRadius: 20,
      padding: 20,
      backgroundColor: darkMode
        ? Colors.primary.darkHeadingBackground
        : Colors.primary.white,
      bottom: 1,
      borderColor: Colors.primary.gray,
      borderWidth: 4,
      justifyContent: 'space-around',
      alignItems: 'center',
      position: 'absolute',
    },
    pickerText: {
      fontSize: 20,
      fontWeight: '700',
      color: darkMode ? Colors.primary.white : Colors.primary.skyBlue,
    },
    // btnStyle: {
    //     marginTop: '1.5%',
    //     height: '5.5%',
    //     width: '19%',
    //     borderRadius: 10,
    //     backgroundColor: Colors.primary.blue,
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    btnText: {
      color: Colors.primary.white,
      fontWeight: '800',
      fontSize: 15,
    },
    dropDownItemsContainer: {
      flexDirection: 'row',
      width: scaleWidth * 200,
      justifyContent: 'space-between',
    },
  });
