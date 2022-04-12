import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import {scaleWidth, scaleHeight} from '../../utils/scaling';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {DisplayContext} from '../../context/DisplayContext';

const notificationData = [
  {
    id: 100,
    message: 'Lorem ipsum dolor sit amet',
    time: '20 min ago',
  },
  {
    id: 101,
    message: 'Lorem ipsum dolor sit amet',
    time: '20 min ago',
  },
  {
    id: 102,
    message: 'Lorem ipsum dolor sit amet',
    time: '20 min ago',
  },
];

export default Notifications = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const MenuBurger = require('../../assets/icons/MenuBurger.png');
  const FileNotif = require('../../assets/icons/file_notif.png');
  const NotifBell = require('../../assets/icons/notif_bell.png');
  const [notification, setNotification] = useState(true);
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  const style = styles(insets, darkMode);

  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const updateNotification = () => {
    setNotification(false);
  };

  const notificationBody = ({item}) => {
    return (
      <TouchableOpacity onPress={() => null}>
        <View style={style.viewNotificationRow}>
          <View style={style.viewBellCircle}>
            <Image style={style.bellIcon} source={NotifBell} />
          </View>

          <View style={style.viewNotificationContent}>
            <Text style={style.textTitle}>Message</Text>
            <Text style={style.textMessage}>{item.message}</Text>
            <Text style={style.textTime}>{item.time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <View>
        <View style={style.headerContainer}>
          <TouchableOpacity
            style={style.menuBurger}
            onPress={() => toggleDrawer()}>
            <Image source={MenuBurger} />
          </TouchableOpacity>
          <View style={style.headerRow}>
            <Text style={style.projects}>Notifications</Text>
          </View>
        </View>
        <View style={style.contentContainer}>
          <View>
            {notification ? (
              <View style={style.noNotificationContainer}>
                <TouchableOpacity onPress={() => updateNotification()}>
                  <Image style={style.fileIcon} source={FileNotif} />
                </TouchableOpacity>
                <Text style={style.textNoNotification}>No notifications</Text>
              </View>
            ) : (
              <View style={style.notificationsContainer}>
                <FlatList
                  data={notificationData}
                  renderItem={notificationBody}
                  keyExtractor={(item, id) => id.toString()}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = (insets, darkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.primary.white,
    },
    headerContainer: {
      width: '100%',
      height: scaleHeight * 126,
      flexDirection: 'column',
      paddingLeft: scaleWidth * 20,
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.blue,
    },
    menuBurger: {
      width: scaleWidth * 70,
      height: scaleHeight * 40,
      marginTop: scaleHeight * 20,
      justifyContent: 'center',
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    projects: {
      fontSize: scaleWidth * 28,
      lineHeight: scaleHeight * 32,
      color: Colors.primary.white,
      fontFamily: Fonts.primary.bold,
    },
    contentContainer: {
      width: '100%',
      height: '100%',
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.inputBackground,
    },
    noNotificationContainer: {
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: scaleHeight * 193,
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.inputBackground,
    },
    fileIcon: {
      width: scaleWidth * 53,
      height: scaleWidth * 42,
      marginBottom: scaleHeight * 15,
    },
    bellIcon: {
      width: scaleWidth * 14,
      height: scaleWidth * 17,
    },
    textNoNotification: {
      fontSize: scaleWidth * 24,
      lineHeight: scaleWidth * 28,
      color: Colors.primary.headingTextColor,
      fontFamily: Fonts.primary.regular,
    },
    notificationsContainer: {
      flex: 1,
    },
    viewNotificationRow: {
      width: '100%',
      height: scaleHeight * 100,
      alignItems: 'center',
      paddingLeft: scaleWidth * 20,
      borderBottomWidth: 1,
      flexDirection: 'row',
      borderBottomColor: Colors.primary.border,
      backgroundColor: Colors.primary.white,
    },
    viewBellCircle: {
      width: scaleWidth * 38,
      height: scaleWidth * 38,
      borderRadius: (scaleWidth * 38) / 2,
      backgroundColor: Colors.primary.profilePicCircle,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: scaleWidth * 10,
    },
    viewNotificationContent: {
      width: '100%',
      height: scaleHeight * 100,
      justifyContent: 'center',
      flexDirection: 'column',
    },
    textTitle: {
      fontSize: scaleWidth * 12,
      lineHeight: scaleWidth * 14,
      letterSpacing: 1.125,
      textTransform: 'uppercase',
      color: Colors.primary.lightGray,
      fontFamily: Fonts.primary.regular,
    },
    textMessage: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      marginVertical: scaleHeight * 8,
      color: Colors.primary.messageColor,
      fontFamily: Fonts.primary.regular,
    },
    textTime: {
      fontSize: scaleWidth * 14,
      lineHeight: scaleWidth * 22,
      color: Colors.primary.lightGray,
      fontFamily: Fonts.primary.regular,
    },
  });
