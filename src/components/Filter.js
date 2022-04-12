import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Colors from '../constants/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Dialog, {DialogContent, SlideAnimation} from 'react-native-popup-dialog';
import {scaleWidth, scaleHeight} from '../utils/scaling';
import Fonts from '../constants/Fonts';
import TextCustom from './TextCustom';
import {UserContext} from '../context/UserContext';
import {DisplayContext} from '../context/DisplayContext';

export default Filter = ({
  setVisible,
  callBack,
  usersType,
  saveButton,
  selectTitle,
  ResetFilter,
}) => {
  const insets = useSafeAreaInsets();
  const userContext = useContext(UserContext);
  const {allProfessions, setShowListUsers, showListUsers} = userContext;
  const activateView = (id) => {
    setShowListUsers(id);
    usersType(id);
  };
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  const style = styles(insets, darkMode);

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
            <View>
              <Text style={style.textHeader}>Filters</Text>
            </View>
            <TouchableOpacity onPress={() => ResetFilter()}>
              <Text style={style.textHeader}>Reset</Text>
            </TouchableOpacity>
          </View>
          <View style={style.bodyContainer}>
            <TouchableOpacity onPress={() => activateView(0)}>
              <TextCustom
                text={'All'}
                showGreenTick={showListUsers == 0 ? true : false}
                dark={darkMode}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => activateView(1)}>
                <TextCustom text={'Inactive'} showGreenTick={whichActive == 1?true:false} boxStyle={style.boxInactive} />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => activateView(2)}>
              <TextCustom
                text={'Not assigned'}
                showGreenTick={showListUsers == 2 ? true : false}
                boxStyle={style.boxNotAssigned}
                dark={darkMode}
              />
            </TouchableOpacity>
            <Text style={style.textUserTitles}>User titles</Text>
            <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
              {allProfessions?.map((item, index) => {
                return (
                  <TouchableOpacity onPress={() => selectTitle(item.title)}>
                    <TextCustom
                      keys={index}
                      text={item.title}
                      showCircle={true}
                      boxStyle={style.boxLabourer}
                      circleColor={item.color}
                      dark={darkMode}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <View style={style.bottomContainer}>
              <TouchableOpacity
                style={style.buttonView}
                onPress={() => callBack()}>
                <Text style={style.textBtn}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => saveButton(showListUsers)}>
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

const styles = (insets, darkMode) =>
  StyleSheet.create({
    dialogContent: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    container: {
      width: scaleWidth * 427,
      height: scaleHeight * 523,
      backgroundColor: Colors.primary.white,
    },
    headerContainer: {
      width: '100%',
      height: scaleHeight * 47,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: scaleWidth * 20,
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.blue,
    },
    textHeader: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 18,
      color: Colors.primary.white,
      fontFamily: Fonts.primary.semiBold,
    },
    bodyContainer: {
      width: '100%',
      height: '100%',
      paddingHorizontal: scaleWidth * 20,
      paddingTop: scaleHeight * 15,
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.inputBackground,
    },
    bottomContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      bottom: scaleHeight * 10,
    },
    buttonView: {
      width: scaleWidth * 180,
      height: scaleHeight * 45,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
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
    boxInactive: {
      marginBottom: 0,
      borderBottomWidth: 1,
      borderBottomColor: Colors.primary.border,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    boxNotAssigned: {
      marginBottom: scaleHeight * 15,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
    textUserTitles: {
      color: darkMode ? Colors.primary.white : Colors.primary.heading,
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 18,
      fontFamily: Fonts.primary.primary,
      marginBottom: scaleHeight * 5,
    },
    boxLabourer: {
      marginBottom: 0,
      borderRadius: 0,
      borderBottomWidth: 1,
      borderBottomColor: Colors.primary.border,
    },
  });
