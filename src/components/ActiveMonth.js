import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scaleWidth, scaleHeight} from '../utils/scaling';
import {useNavigation} from '@react-navigation/core';
import {ProjectContext} from '../context/ProjectContext';
import {DisplayContext} from '../context/DisplayContext';

export default ActiveMonth = ({item, callBack, newProject, isGrid, index}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const projectContext = useContext(ProjectContext);
  const {selectedMonthNumeric, displayDay} = projectContext;
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  const style = styles(insets, isGrid, darkMode);
  return (
    <View style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={style.textDate}>{index}</Text>
        {Array.isArray(item)
          ? item.map((data, i) => {
              return selectedMonthNumeric == data.month &&
                data.isActive === true &&
                data.projectStartDateForSchedule.includes(displayDay) ? (
                <TouchableOpacity
                  key={i}
                  style={style.grayRectangle}
                  onPress={() =>
                    navigation.navigate('ProjectDetail', {
                      projectDetails: item[0],
                    })
                  }>
                  <Text style={style.textPlace}>{data.city}</Text>
                </TouchableOpacity>
              ) : null;
            })
          : null}
      </ScrollView>
    </View>
  );
};

const styles = (insets, isGrid, darkMode) =>
  StyleSheet.create({
    container: {
      width: scaleWidth * 155,
      height: scaleHeight * 147,
      paddingHorizontal: scaleWidth * 10,
      paddingVertical: scaleHeight * 8,
      borderRightWidth: 2,
      borderBottomWidth: 2,
      borderRightColor: Colors.primary.secondGray,
      borderBottomColor: Colors.primary.secondGray,
      backgroundColor: darkMode ? Colors.primary.darkBg : Colors.primary.white,
    },
    grayRectangle: {
      width: scaleWidth * 134,
      height: scaleHeight * 28,
      marginBottom: scaleHeight * 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      backgroundColor: Colors.primary.lightGray,
    },
    textDate: {
      fontSize: scaleWidth * 17,
      lineHeight: scaleWidth * 20,
      marginBottom: scaleHeight * 5,
      color: darkMode
        ? Colors.primary.darkInputHeading
        : Colors.primary.heading,
      fontFamily: Fonts.primary.regular,
      alignSelf: 'flex-end',
    },
    textPlace: {
      fontSize: scaleWidth * 13,
      lineHeight: scaleWidth * 15,
      color: darkMode ? Colors.primary.darkInputHeading : Colors.primary.white,
      fontFamily: Fonts.primary.regular,
    },
  });
