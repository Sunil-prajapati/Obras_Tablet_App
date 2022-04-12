import React, {useContext, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import OutlineBtn from './OutlineBtn';
import {scaleWidth, scaleHeight} from '../utils/scaling';
import {useNavigation} from '@react-navigation/core';
import moment from 'moment';
import AddIcon from './AddIcon';
import {ProjectContext} from '../context/ProjectContext';
import profileDemo from '../assets/images/profile/user.png';
import {API_KEY} from '../utils/WeatherApiKey';
import uuid from 'react-native-uuid';
import {DisplayContext} from '../context/DisplayContext';

export default Active = ({item, callBack, newProject, isGrid}) => {
  const insets = useSafeAreaInsets();
  const projectContext = useContext(ProjectContext);
  const {displayDay, projectData} = projectContext;
  const FileIcon = require('../assets/icons/file.png');
  const MoreIcon = require('../assets/icons/more_icon.png');
  const LocationMarker = require('../assets/icons/location_marker.png');
  const navigation = useNavigation();

  const [isCustomMenuVisible, setIsCustomMenuVisible] = useState(false);

  const [temperature, setTemperature] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  const style = styles(insets, isGrid, darkMode);

  const dailyStartTime = moment(item.dailyStartTime || new Date()).format(
    'h:mm a',
  );

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
      console.log('active js');
    };
  }, []);

  let teamMembers = [];
  projectData?.forEach((data) => {
    data?.assignedEmployees?.map((empData) => {
      var hasUser = empData.projectId.includes(item.id);
      if (hasUser == true && empData.userRestDetails.isActive === true) {
        teamMembers.push(empData);
      }
    });
  });

  const menuOptions = [
    {
      title: 'Create new user',
    },
    {
      title: 'Import users',
    },
  ];

  const selectItem = () => {
    setIsCustomMenuVisible(false);
    // navigation.navigate('CreateUser',{projectId:projectDetails.id});
  };
  const closeModel = () => {
    setIsCustomMenuVisible(false);
  };

  const addTeamMember = () => {
    // setIsCustomMenuVisible(true)
  };

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
              <OutlineBtn text={'New project'} isGrid={isGrid} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const CardFilled = () => {
    return item.PublishedDate.includes(displayDay) ? (
      <View key={uuid.v4()}>
        <CustomMenu
          setVisible={isCustomMenuVisible}
          menuOptions={menuOptions}
          callBack={selectItem}
          close={closeModel}
        />
        <View style={style.boxContainer}>
          <View style={style.headerContainer}>
            {true ? (
              <View style={style.tempView}>
                <Text style={style.temperature}>{temperature}ºF</Text>
                <Image
                  style={style.tempIcon}
                  source={{
                    uri: `http://openweathermap.org/img/w/${weatherIcon}.png`,
                  }}
                />
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
              <Text style={style.distanceText}>{'10 mi away'}</Text>
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
                {'Team members'}
                <Text style={style.team}>{teamMembers.length}</Text>
              </Text>
            </View>
            {teamMembers.length > 0 ? (
              <View style={style.teamMembersContainer}>
                {teamMembers &&
                  teamMembers.map((data, index) => {
                    return (
                      <>
                        {data && data.userRestDetails?.isActive === true ? (
                          <View key={index}>
                            <Image
                              style={[
                                style.profileImage,
                                {
                                  borderColor:
                                    data.userRestDetails?.professionColor !== ''
                                      ? data.userRestDetails?.professionColor
                                      : '#fff',
                                },
                              ]}
                              source={profileDemo}
                            />
                          </View>
                        ) : null}
                      </>
                    );
                  })}
              </View>
            ) : (
              <TouchableOpacity onPress={() => addTeamMember()}>
                <AddIcon line={'Add team member'} />
              </TouchableOpacity>
            )}
          </View>
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
    boxContainer: {
      borderRadius: isGrid ? 10 : 5,
    },
    tempView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    temperature: {
      fontSize: isGrid ? scaleWidth * 24 : scaleWidth * 12,
      color: darkMode
        ? Colors.primary.profilePicCircle
        : Colors.primary.calenderButtonTextColor,
      backgroundColor: 'transparent',
      lineHeight: scaleWidth * 32,
      paddingLeft: scaleWidth * 12,
      fontFamily: Fonts.primary.regular,
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
      color: darkMode ? Colors.primary.darkInActive : Colors.primary.heading,
      fontFamily: Fonts.primary.regular,
    },
    time: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      color: darkMode ? Colors.primary.darkInActive : Colors.primary.heading,
      fontFamily: Fonts.primary.bold,
    },
    teamText: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      color: darkMode ? Colors.primary.darkInActive : Colors.primary.heading,
      marginTop: scaleHeight * 5,
      fontFamily: Fonts.primary.regular,
    },
    team: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      color: darkMode
        ? Colors.primary.profilePicCircle
        : Colors.primary.heading,
      fontFamily: Fonts.primary.bold,
    },
    fileContainer: {
      width: '100%',
      alignItems: 'center',
      marginTop: isGrid ? scaleHeight * 24 : scaleHeight * 18,
    },
    fileIcon: {
      width: isGrid ? scaleWidth * 43 : scaleHeight * 33,
      height: isGrid ? scaleHeight * 34 : scaleHeight * 24,
    },
    tempIcon: {
      width: isGrid ? scaleWidth * 22 : scaleWidth * 11,
      height: isGrid ? scaleHeight * 22 : scaleHeight * 11,
      marginLeft: isGrid ? scaleWidth * 10 : scaleWidth * 5,
    },
    moreIcon: {
      width: scaleWidth * 16,
      height: scaleHeight * 4,
    },
    markerIcon: {
      width: isGrid ? scaleWidth * 12 : scaleWidth * 6,
      height: isGrid ? scaleHeight * 15 : scaleHeight * 8,
      marginRight: isGrid ? scaleWidth * 5 : scaleWidth * 3,
    },
    createProject: {
      alignItems: 'center',
      marginTop: scaleHeight * 16,
    },
    createProjectText: {
      fontSize: isGrid ? scaleWidth * 24 : scaleWidth * 18,
      lineHeight: isGrid ? scaleWidth * 28 : scaleWidth * 20,
      color: Colors.primary.heading,
      fontFamily: Fonts.primary.regular,
    },
    button: {
      alignItems: 'center',
      marginTop: isGrid ? scaleHeight * 24 : scaleHeight * 18,
    },
    addTeamView: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: isGrid ? scaleHeight * 20 : scaleHeight * 15,
    },
    addButtonView: {
      width: isGrid ? scaleWidth * 30 : scaleWidth * 20,
      height: isGrid ? scaleWidth * 30 : scaleWidth * 20,
      borderRadius: isGrid ? (scaleWidth * 30) / 2 : (scaleWidth * 20) / 2,
      backgroundColor: Colors.primary.blue,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: isGrid ? scaleWidth * 5 : scaleWidth * 3,
    },
    textPlus: {
      fontSize: isGrid ? scaleWidth * 25 : scaleWidth * 18,
      lineHeight: isGrid ? scaleWidth * 34 : scaleWidth * 22,
      color: Colors.primary.white,
      fontFamily: Fonts.primary.regular,
    },
    textAddTeam: {
      fontSize: isGrid ? scaleWidth * 15 : scaleWidth * 12,
      lineHeight: isGrid ? scaleWidth * 22 : scaleWidth * 16,
      fontFamily: Fonts.primary.bold,
    },
    teamMembersContainer: {
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
      marginLeft: scaleWidth * 12,
      marginTop: scaleHeight * 10,
    },
    profileImage: {
      width: isGrid ? scaleWidth * 44 : scaleWidth * 31,
      height: isGrid ? scaleWidth * 44 : scaleWidth * 31,
      borderRadius: isGrid ? (scaleWidth * 44) / 2 : (scaleWidth * 31) / 2,
      borderWidth: isGrid ? scaleWidth * 3 : scaleWidth * 2,
      resizeMode: 'cover',
      marginRight: isGrid ? scaleWidth * 8 : scaleWidth * 6,
      marginBottom: scaleHeight * 12,
    },
  });
