import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import OutlineBtn from './OutlineBtn';
import {scaleWidth, scaleHeight} from '../utils/scaling';
import {useNavigation} from '@react-navigation/core';
import moment from 'moment';
import {ProjectContext} from '../context/ProjectContext';
import {DisplayContext} from '../context/DisplayContext';
import {API_KEY} from '../utils/WeatherApiKey';

export default ActiveWeek = ({
  item,
  temp,
  callBack,
  newProject,
  isGrid,
  week,
}) => {
  const insets = useSafeAreaInsets();
  const projectContext = useContext(ProjectContext);
  const {projectData} = projectContext;
  const FileIcon = require('../assets/icons/file.png');
  const Temperature = require('../assets/icons/temperature.png');
  const MoreIcon = require('../assets/icons/more_icon.png');
  const LocationMarker = require('../assets/icons/location_marker.png');
  const navigation = useNavigation();
  const dailyStartTime = moment(item.dailyStartTime).format('h:mm a');
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  const style = styles(insets, isGrid, darkMode);
  const [temperature, setTemperature] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);

  let teamMembers = [];
  projectData?.forEach((data) => {
    data?.assignedEmployees?.map((empData) => {
      var hasUser = empData.projectId.includes(item.id);
      if (hasUser == true && empData.userRestDetails.isActive === true) {
        teamMembers.push(empData);
      }
    });
  });

  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${item.city}&appid=${API_KEY}`,
    )
      .then((resp) => resp.json())
      .then((json) => {
        setWeatherIcon(json.weather[0].icon);
        let tempCelsius = json.main.temp - 273;
        let Fahrenheit = (tempCelsius * 9) / 5 + 32;
        setTemperature(Fahrenheit.toString().substr(0, 2));
      })
      .catch((err) => console.log(err));
    return () => {
      console.log('active week js');
    };
  }, []);

  const CardEmpty = () => {
    return (
      <View style={style.boxContainer}>
        <View style={style.headerContainer}></View>
        <View style={style.contentContainer}>
          <View>
            <View style={style.fileContainer}>
              <Image style={style.fileIcon} source={FileIcon} />
            </View>
            <View style={style.createProject}>
              <Text style={style.createProjectText}>{'Create a project'}</Text>
            </View>
            <TouchableOpacity
              style={style.button}
              onPress={() => callBack({type: 'createProject'})}>
              <OutlineBtn text={'New project'} isGrid={false} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const CardFilled = () => {
    return item.PublishedDate.includes(week) ? (
      <View style={style.boxContainer}>
        <View style={style.headerContainer}>
          {true ? (
            <View style={style.tempView}>
              <Text style={style.temperature}>{temperature}ºF</Text>
              <Image style={style.tempIcon} source={Temperature} />
            </View>
          ) : null}
          <View style={style.moreView}>
            <TouchableOpacity
              style={style.moreTouch}
              onPress={() => callBack({type: 'activeMore', body: item})}>
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
              {/* {isGrid ? <Image style={style.markerIcon} source={LocationMarker} /> : null} */}
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
              <Text style={style.team}>{teamMembers.length}</Text>
            </Text>
          </View>
          {/* <View style={style.addTeamView}>
                        <View style={style.addButtonView}>
                            <Text style={style.textPlus}>+</Text>
                        </View>
                        <Text style={style.textAddTeam}> Add team member </Text>
                    </View> */}
        </View>
      </View>
    ) : null;
  };

  return (
    <View style={style.container}>
      {newProject ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProjectDetail', {
              projectDetails: item,
              temp: {temperature, weatherIcon},
            })
          }>
          <CardFilled />
        </TouchableOpacity>
      ) : (
        <CardEmpty />
      )}
    </View>
  );
};

const styles = (insets, isGrid, darkMode) =>
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
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.profilePicCircle,
    },
    boxContainer: {
      borderRadius: 10,
    },
    tempView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    temperature: {
      fontSize: scaleWidth * 12,
      color: Colors.primary.calenderButtonTextColor,
      backgroundColor: 'transparent',
      lineHeight: scaleWidth * 32,
      paddingLeft: scaleWidth * 12,
      fontFamily: Fonts.primary.regular,
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
      color: darkMode ? Colors.primary.white : Colors.primary.lightGray,
    },
    cityText: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 18,
      marginRight: scaleWidth * 10,
      color: darkMode ? Colors.primary.white : Colors.primary.heading,
      fontFamily: Fonts.primary.bold,
    },
    addressText: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      marginRight: scaleWidth * 10,
      color: darkMode ? Colors.primary.white : Colors.primary.lightGray,
    },
    contentContainer: {
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.white,
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
      color: darkMode ? Colors.primary.white : Colors.primary.heading,
      fontFamily: Fonts.primary.regular,
    },
    time: {
      fontSize: scaleWidth * 12,
      lineHeight: scaleWidth * 22,
      color: darkMode ? Colors.primary.white : Colors.primary.heading,
      fontFamily: Fonts.primary.bold,
    },
    teamText: {
      fontSize: scaleWidth * 12,
      lineHeight: scaleWidth * 22,
      color: darkMode ? Colors.primary.white : Colors.primary.heading,
      marginTop: scaleHeight * 5,
      fontFamily: Fonts.primary.regular,
    },
    team: {
      fontSize: scaleWidth * 12,
      lineHeight: scaleWidth * 22,
      color: darkMode ? Colors.primary.white : Colors.primary.heading,
      fontFamily: Fonts.primary.bold,
    },
    fileContainer: {
      width: '100%',
      alignItems: 'center',
      marginTop: scaleHeight * 18,
    },
    fileIcon: {
      width: scaleHeight * 33,
      height: scaleHeight * 24,
    },
    tempIcon: {
      width: scaleWidth * 11,
      height: scaleHeight * 11,
      marginLeft: scaleWidth * 10,
    },
    moreIcon: {
      width: scaleWidth * 16,
      height: scaleHeight * 4,
    },
    markerIcon: {
      width: scaleWidth * 6,
      height: scaleHeight * 8,
      marginRight: scaleWidth * 5,
    },
    createProject: {
      alignItems: 'center',
      marginTop: scaleHeight * 16,
    },
    createProjectText: {
      fontSize: scaleWidth * 14,
      lineHeight: scaleWidth * 18,
      color: darkMode ? Colors.primary.white : Colors.primary.heading,
      fontFamily: Fonts.primary.regular,
    },
    button: {
      alignItems: 'center',
      marginTop: scaleHeight * 18,
    },
    addTeamView: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: scaleHeight * 15,
    },
    addButtonView: {
      width: scaleWidth * 14,
      height: scaleWidth * 14,
      borderRadius: (scaleWidth * 14) / 2,
      backgroundColor: Colors.primary.blue,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: scaleWidth * 3,
    },
    textPlus: {
      fontSize: scaleWidth * 14,
      lineHeight: scaleWidth * 18,
      color: darkMode ? Colors.primary.white : Colors.primary.white,
      fontFamily: Fonts.primary.regular,
    },
    textAddTeam: {
      fontSize: scaleWidth * 10,
      lineHeight: scaleWidth * 16,
      fontFamily: Fonts.primary.bold,
    },
  });
