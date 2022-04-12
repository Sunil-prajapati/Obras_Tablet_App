import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Dialog, {DialogContent, SlideAnimation} from 'react-native-popup-dialog';
import {scaleWidth, scaleHeight, width} from '../utils/scaling';
import Fonts from '../constants/Fonts';
import {useNavigation} from '@react-navigation/core';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DatePicker from 'react-native-date-picker';

export default SchedulePublish = ({setVisible, callBack}) => {
  const insets = useSafeAreaInsets();
  const style = styles(insets);
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

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
      <DialogContent style={style.dialogContent}>
        <View style={style.container}>
          <View style={style.headerContainer}>
            <TouchableOpacity onPress={() => callBack()}>
              <Text style={style.textHeader}>Cancel</Text>
            </TouchableOpacity>
            <Text style={[style.textHeader, style.textSettings]}>
              Schedule Settings
            </Text>
          </View>
          <View style={style.bodyContainer}>
            <Text style={style.textSelectTime}>Select a time</Text>
            <TouchableOpacity onPress={() => showDatePicker()}>
              <View style={style.dateTimeContainer}>
                <Text style={style.textDateTime}>June 18, 2020</Text>
                <Text style={[style.textDateTime, style.textTime]}>4:30pm</Text>
              </View>
            </TouchableOpacity>
            {/* <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="datetime"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        /> */}
            <View style={style.datePickerContainer}>
              <DatePicker
                date={date}
                onDateChange={setDate}
                androidVariant="iosClone"
              />
            </View>
            <View style={style.bottomContainer}>
              <TouchableOpacity onPress={() => null}>
                <View style={style.buttonView}>
                  <Text style={style.textBtn}>Cancel</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => null}>
                <View style={[style.buttonView, style.buttonBlue]}>
                  <Text style={style.textBtn}>Save</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </DialogContent>
    </Dialog>
  );
};

const styles = (insets) =>
  StyleSheet.create({
    dialogContent: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    container: {
      width: scaleWidth * 550,
      height: scaleHeight * 550,
      backgroundColor: Colors.primary.white,
    },
    headerContainer: {
      width: '100%',
      height: scaleHeight * 44,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: scaleWidth * 20,
      backgroundColor: Colors.primary.blue,
    },
    textHeader: {
      fontSize: scaleWidth * 17,
      lineHeight: scaleWidth * 20,
      color: Colors.primary.white,
      fontFamily: Fonts.primary.semiBold,
    },
    textSettings: {
      marginLeft: scaleWidth * 125,
    },
    bodyContainer: {
      width: '100%',
      height: '100%',
      paddingHorizontal: scaleWidth * 42,
      backgroundColor: Colors.primary.inputBackground,
    },
    textSelectTime: {
      fontSize: scaleWidth * 14,
      lineHeight: scaleWidth * 16,
      marginTop: scaleHeight * 50,
      marginBottom: scaleHeight * 6,
      textTransform: 'uppercase',
      color: Colors.primary.selectTime,
      fontFamily: Fonts.primary.regular,
    },
    dateTimeContainer: {
      height: scaleHeight * 44,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: Colors.primary.white,
    },
    textDateTime: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 18,
      paddingLeft: scaleWidth * 22,
      color: Colors.primary.heading,
      fontFamily: Fonts.primary.regular,
    },
    textTime: {
      marginLeft: scaleWidth * 30,
    },
    bottomContainer: {
      flexDirection: 'row',
      marginTop: scaleHeight * 23,
      justifyContent: 'flex-end',
      position: 'absolute',
      right: scaleWidth * 17,
      bottom: scaleHeight * 90,
    },
    buttonView: {
      width: scaleWidth * 180,
      height: scaleHeight * 45,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      marginRight: scaleWidth * 25,
      backgroundColor: Colors.primary.lightGray,
    },
    buttonBlue: {
      backgroundColor: Colors.primary.blue,
    },
    textBtn: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 21,
      color: Colors.primary.white,
      fontFamily: Fonts.primary.semiBold,
    },
    datePickerContainer: {
      marginTop: scaleHeight * 10,
    },
  });
