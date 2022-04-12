import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scaleWidth, scaleHeight} from '../utils/scaling';
import {useNavigation} from '@react-navigation/core';
import moment from 'moment';

export default InactiveWeek = ({item, isGrid, callBack, week}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const style = styles(insets, isGrid);
  const MoreIcon = require('../assets/icons/more_icon.png');
  const LocationMarker = require('../assets/icons/location_marker.png');

  const dailyStartTime = moment(item.dailyStartTime).format('h:mm a');

  const CardFilled = () => {
    return item.PublishedDate.includes(week) ? (
      <View style={style.boxContainer}>
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
            {/* <Text style={style.distanceText}>
                                {item.distance}
                            </Text> */}
            <Text style={style.cityText} numberOfLines={1}>
              {item.city}
            </Text>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {/* { isGrid ? <Image style={style.markerIcon} source={LocationMarker} /> : null } */}
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

const styles = (insets, isGrid) =>
  StyleSheet.create({
    container: {
      width: scaleWidth * 155,
      paddingHorizontal: scaleWidth * 8,
      paddingTop: scaleHeight * 16,
      borderRightWidth: 1,
      borderRightColor: Colors.primary.border,
    },
    headerContainer: {
      height: scaleHeight * 22,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: Colors.primary.profilePicCircle,
    },
    textInactive: {
      fontSize: scaleWidth * 12,
      lineHeight: scaleWidth * 30,
      marginLeft: scaleWidth * 12,
      fontFamily: Fonts.primary.regular,
      color: Colors.primary.headingTextColor,
    },
    boxContainer: {
      borderRadius: 10,
    },
    moreView: {
      flex: 1,
      alignItems: 'flex-end',
      borderTopRightRadius: 10,
    },
    moreTouch: {
      width: scaleWidth * 20,
      height: scaleHeight * 20,
      marginRight: scaleWidth * 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderTopRightRadius: 10,
    },
    distanceText: {
      fontSize: scaleWidth * 14,
      lineHeight: scaleWidth * 18,
      color: Colors.primary.lightGray,
    },
    cityText: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 18,
      marginRight: scaleWidth * 10,
      color: Colors.primary.heading,
      fontFamily: Fonts.primary.bold,
    },
    addressText: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      marginRight: scaleWidth * 10,
      color: Colors.primary.lightGray,
    },
    contentContainer: {
      backgroundColor: Colors.primary.white,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      paddingBottom: scaleHeight * 12,
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
      fontSize: scaleWidth * 12,
      lineHeight: scaleWidth * 22,
      color: Colors.primary.heading,
      fontFamily: Fonts.primary.regular,
    },
    time: {
      fontSize: scaleWidth * 12,
      lineHeight: scaleWidth * 22,
      color: Colors.primary.heading,
      fontFamily: Fonts.primary.bold,
    },
    teamText: {
      fontSize: scaleWidth * 12,
      lineHeight: scaleWidth * 22,
      color: Colors.primary.heading,
      marginTop: scaleHeight * 5,
      fontFamily: Fonts.primary.regular,
    },
    team: {
      fontSize: scaleWidth * 12,
      lineHeight: scaleWidth * 22,
      color: Colors.primary.heading,
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
