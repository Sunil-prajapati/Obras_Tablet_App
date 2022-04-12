import React, {useState, useContext} from 'react';
import {View, StyleSheet, useWindowDimensions} from 'react-native';
import Colors from '../constants/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import TeamMembers from '../screens/users/TeamMembers';
import Moderators from '../screens/users/Moderators';
import Admins from '../screens/users/Admins';
import Inactive from '../screens/users/InActive';
import Fonts from '../constants/Fonts';
import {scaleWidth, scaleHeight} from '../utils/scaling';
import {DisplayContext} from '../context/DisplayContext';

const FirstRoute = (searchedData) => (
  <TeamMembers searchedData={searchedData} />
);

const SecondRoute = (searchedData) => (
  <Moderators searchedData={searchedData} />
);

const ThirdRoute = (searchedData) => <Admins searchedData={searchedData} />;
const FourthRoute = (searchedData) => <Inactive searchedData={searchedData} />;

export default TabViewUsers = (props) => {
  let searchedData = props.searchedData;
  const insets = useSafeAreaInsets();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'team', title: 'Team Members'},
    {key: 'moderators', title: 'Moderators'},
    {key: 'admins', title: 'Admins'},
    {key: 'inactive', title: 'Inactive'},
  ]);
  const renderScene = SceneMap({
    team: () => FirstRoute(searchedData),
    moderators: () => SecondRoute(searchedData),
    admins: () => ThirdRoute(searchedData),
    inactive: () => FourthRoute(searchedData),
  });
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  const style = styles(insets, darkMode);

  const renderTabBar = (props) => {
    return (
      <TabBar
        activeColor={Colors.primary.heading}
        inactiveColor={Colors.primary.secondGray}
        style={style.tabBarStyle}
        labelStyle={style.label}
        {...props}
        indicatorStyle={style.indicator}
      />
    );
  };
  return (
    <View style={style.container}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};
const styles = (insets, darkMode) =>
  StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: darkMode
        ? Colors.primary.darkBg
        : Colors.primary.inputBackground,
    },
    tabBarStyle: {
      height: scaleHeight * 44,
      backgroundColor: darkMode
        ? Colors.primary.darkHeadingBackground
        : Colors.primary.white,
    },
    label: {
      height: '100%',
      color: Colors.primary.heading,
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 17,
      letterSpacing: 0.3,
      fontFamily: Fonts.primary.bold,
    },
    indicator: {
      backgroundColor: Colors.primary.blue,
      height: 1.5,
    },
  });
