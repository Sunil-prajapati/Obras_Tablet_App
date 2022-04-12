import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scaleWidth, scaleHeight} from '../utils/scaling';
import {useNavigation} from '@react-navigation/core';
import moment from 'moment';
import {ProjectContext} from '../context/ProjectContext';
import {DisplayContext} from '../context/DisplayContext';

export default Inactive = ({item, isGrid, callBack}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  const style = styles(insets, isGrid, darkMode);
  const projectContext = useContext(ProjectContext);
  const {displayDay} = projectContext;
  const MoreIcon = require('../assets/icons/more_icon.png');
  const LocationMarker = require('../assets/icons/location_marker.png');

  const dailyStartTime = moment(item.dailyStartTime).format('h:mm a');

  const CardFilled = () => {
    return item.PublishedDate.includes(displayDay) ? (
      <View style={style.boxContainer} key={Math.floor(Math.random() * 10) + 1}>
        <View style={style.headerContainer}>
          <Text style={style.textInactive}>Inactive</Text>
          <View style={style.moreView}>
            <TouchableOpacity
              style={style.moreTouch}
              onPress={() => callBack({type: 'inactiveMore', body: item})}>
              <Image style={style.moreIcon} source={MoreIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.contentContainer}>
          <View style={style.upperContainer}>
            <Text style={style.distanceText}>{item.distance}</Text>
            <Text style={style.cityText}>{item.projectTitle}</Text>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {isGrid ? (
                <Image style={style.markerIcon} source={LocationMarker} />
              ) : null}
              <Text style={style.addressText} numberOfLines={1}>
                {item.city + ','} {item.address + ','} {item.state + ','}{' '}
                {item.zipCode}
              </Text>
            </View>
          </View>

          <View style={style.lowerContainer}>
            <Text style={style.textTime}>
              {'Daily Start: '}
              <Text style={style.time}>{dailyStartTime}</Text>
            </Text>
            <Text style={style.teamText}>
              {'Team members '}
              <Text style={style.team}>{0}</Text>
            </Text>
          </View>
        </View>
      </View>
    ) : null;
  };

  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProjectDetail', {projectDetails: item})
        }>
        <CardFilled />
      </TouchableOpacity>
    </View>
  );
};

const styles = (insets, isGrid, darkMode) =>
  StyleSheet.create({
    container: {
      width: isGrid ? scaleWidth * 335 : scaleWidth * 170,
      marginRight: isGrid ? 8 : 4,
      marginLeft: isGrid ? 8 : 4,
      borderRadius: isGrid ? 10 : 5,
      marginBottom: scaleHeight * 20,
    },
    headerContainer: {
      height: isGrid ? scaleHeight * 45 : scaleHeight * 22,
      borderTopLeftRadius: isGrid ? 10 : 5,
      borderTopRightRadius: isGrid ? 10 : 5,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: darkMode
        ? Colors.primary.darkHeadingBackground
        : Colors.primary.profilePicCircle,
    },
    textInactive: {
      fontSize: isGrid ? scaleWidth * 14 : scaleWidth * 12,
      lineHeight: isGrid ? scaleWidth * 40 : scaleWidth * 30,
      marginLeft: scaleWidth * 12,
      fontFamily: Fonts.primary.regular,
      color: darkMode ? Colors.primary.white : Colors.primary.headingTextColor,
    },
    boxContainer: {
      borderRadius: isGrid ? 10 : 5,
    },
    moreView: {
      flex: 1,
      alignItems: 'flex-end',
      borderTopRightRadius: isGrid ? 10 : 5,
    },
    moreTouch: {
      width: isGrid ? scaleWidth * 40 : scaleWidth * 20,
      height: isGrid ? scaleHeight * 40 : scaleHeight * 20,
      marginRight: isGrid ? scaleWidth * 10 : scaleWidth * 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderTopRightRadius: isGrid ? 10 : 5,
    },
    distanceText: {
      fontSize: scaleWidth * 14,
      lineHeight: scaleWidth * 22,
      color: darkMode ? Colors.primary.darkInActive : Colors.primary.lightGray,
    },
    cityText: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      color: darkMode
        ? Colors.primary.profilePicCircle
        : Colors.primary.heading,
      fontFamily: Fonts.primary.bold,
    },
    addressText: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      marginRight: scaleWidth * 20,
      color: darkMode ? Colors.primary.darkInActive : Colors.primary.lightGray,
    },
    contentContainer: {
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.white,
      borderBottomLeftRadius: isGrid ? 10 : 5,
      borderBottomRightRadius: isGrid ? 10 : 5,
      paddingBottom: scaleHeight * 20,
    },
    upperContainer: {
      borderBottomWidth: 1,
      borderColor: Colors.primary.border,
      marginTop: scaleHeight * 10,
      marginLeft: scaleWidth * 12,
      paddingBottom: scaleHeight * 12,
    },
    lowerContainer: {
      paddingLeft: scaleWidth * 10,
      marginTop: scaleHeight * 10,
    },
    textTime: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      color: darkMode ? Colors.primary.white : Colors.primary.heading,
      fontFamily: Fonts.primary.regular,
    },
    time: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      color: darkMode ? Colors.primary.white : Colors.primary.heading,
      fontFamily: Fonts.primary.bold,
    },
    teamText: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      color: darkMode ? Colors.primary.white : Colors.primary.heading,
      marginTop: scaleHeight * 5,
      fontFamily: Fonts.primary.regular,
    },
    team: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      color: darkMode ? Colors.primary.white : Colors.primary.heading,
      fontFamily: Fonts.primary.bold,
    },
    moreIcon: {
      width: scaleWidth * 16,
      height: scaleHeight * 4,
    },
    markerIcon: {
      width: scaleWidth * 12,
      height: scaleHeight * 15,
      marginRight: scaleWidth * 5,
    },
  });
