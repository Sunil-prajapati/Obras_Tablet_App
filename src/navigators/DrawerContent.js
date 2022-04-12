import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {scaleWidth, scaleHeight} from '../utils/scaling';
import {AuthContext} from '../context/AuthContext';
import {UserContext} from '../context/UserContext';
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {logout} from '../utils/auth';
import {getProfilePicture} from '../utils/api';
import profileDemo from '../assets/images/profile/user.png';
import {DisplayContext} from '../context/DisplayContext';

export default DrawerContent = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const {setCurrentUser, currentUser, currentAuth} = authContext;
  const {getUser} = userContext;
  const [profilePic, setProfilePic] = useState('');
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  const style = styles(insets, darkMode);

  let firstName = currentUser.firstName;
  let lastName = currentUser.lastName;
  var fullName = firstName?.concat(' ', lastName);

  const logoutClicked = () => {
    setCurrentUser(null);
    logout();
  };

  useEffect(() => {
    getProfilePicture(currentAuth.uid, setProfilePic);
  }, [currentAuth]);

  return (
    <SafeAreaView style={style.drawerContent}>
      <StatusBar hidden />
      <View style={style.drawerContent}>
        <View style={style.userInfoSection}>
          <View style={style.userInfoRow}>
            {profilePic == '' ? (
              <Image style={style.avatarImage} source={profileDemo} />
            ) : (
              <Image
                style={style.avatarImage}
                source={{
                  uri: profilePic,
                }}
              />
            )}
            <View style={style.userInfo}>
              <Text style={style.name}>{fullName}</Text>
              <Text style={style.role}>Administrator</Text>
            </View>
          </View>
        </View>
        <View style={style.drawerSection}>
          <TouchableOpacity onPress={() => navigation.navigate('Projects')}>
            <Text style={style.textItems}>Projects</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Users'), getUser();
            }}>
            <Text style={style.textItems}>Users</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() =>
            //   navigation.reset({
            //     index:0,
            //     routes: [{name: 'Messages', params: {query: null}}],
            //   })
            // }
            onPress={() => navigation.navigate('Messages',{query: null})}
            >
            <Text style={style.textItems}>Messages</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}>
            <Text style={style.textItems}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Account')}>
            <Text style={style.textAccount}>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => logoutClicked()}>
            <Text style={style.textItems}>Log out</Text>
          </TouchableOpacity>
        </View>
        <View style={style.bottomDrawerSection}>
          <Image
            style={style.bottomImage}
            source={require('../assets/icons/drawer_bottom_image.png')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = (insets, darkMode) =>
  StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      width: '100%',
      height: scaleHeight * 142,
    },
    userInfoRow: {
      flexDirection: 'row',
      marginTop: scaleHeight * 75,
      alignItems: 'center',
      paddingLeft: scaleWidth * 10,
    },
    userInfo: {
      marginLeft: scaleWidth * 11,
      flexDirection: 'column',
    },
    avatarImage: {
      width: scaleWidth * 60,
      height: scaleWidth * 60,
      borderRadius: (scaleWidth * 60) / 2,
    },
    name: {
      fontSize: scaleWidth * 16,
      color: darkMode
        ? Colors.primary.darkInActive
        : Colors.primary.headingTextColor,
      fontFamily: Fonts.primary.bold,
      lineHeight: scaleHeight * 22,
    },
    role: {
      fontSize: scaleWidth * 13,
      color: Colors.primary.subHeading,
      fontFamily: Fonts.primary.regular,
      textTransform: 'uppercase',
      lineHeight: scaleHeight * 22,
      letterSpacing: 0.5,
    },
    drawerSection: {
      marginTop: scaleHeight * 17,
      flexDirection: 'column',
    },
    textItems: {
      fontSize: scaleWidth * 15,
      lineHeight: 22,
      color: darkMode
        ? Colors.primary.secondGray
        : Colors.primary.headingTextColor,
      fontFamily: Fonts.primary.regular,
      borderWidth: 0.5,
      paddingVertical: scaleHeight * 10,
      paddingLeft: scaleWidth * 15,
      borderColor: darkMode
        ? Colors.primary.darkHeadingBackground
        : Colors.primary.profilePicCircle,
    },
    textAccount: {
      fontSize: scaleWidth * 15,
      lineHeight: 22,
      color: darkMode
        ? Colors.primary.secondGray
        : Colors.primary.headingTextColor,
      fontFamily: Fonts.primary.regular,
      paddingTop: scaleHeight * 35,
      paddingLeft: scaleWidth * 15,
      paddingBottom: scaleHeight * 5,
      borderWidth: 0.5,
      borderColor: darkMode
        ? Colors.primary.darkHeadingBackground
        : Colors.primary.profilePicCircle,
    },
    bottomDrawerSection: {
      paddingTop: scaleHeight * 47,
      paddingLeft: scaleWidth * 60,
    },
    bottomImage: {
      width: scaleWidth * 200,
      height: scaleHeight * 290,
      resizeMode: 'contain',
    },
  });
