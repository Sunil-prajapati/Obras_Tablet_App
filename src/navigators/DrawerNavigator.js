import React, {useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {scaleWidth} from '../utils/scaling';
import Projects from '../screens/drawer/Projects';
import Users from '../screens/drawer/Users';
import Notifications from '../screens/drawer/Notifications';
import DrawerContent from '../navigators/DrawerContent';
import Messages from '../screens/drawer/Messages';
import Account from '../screens/drawer/Account';
import CreateProject from '../screens/projects/CreateProject';
import CreateUser from '../screens/users/CreateUser';
import ProjectDetail from '../screens/projects/ProjectDetail';
import AssignProject from '../screens/projects/AssignProject';
import Colors from '../constants/Colors';
import {DisplayContext} from '../context/DisplayContext';

const Drawer = createDrawerNavigator();
const ProjectStack = createStackNavigator();

const ProjectNavigator = () => {
  return (
    <ProjectStack.Navigator
      initialRouteName="Projects"
      headerMode="none"
      screenOptions={{
        headerShown: false,
      }}>
      <ProjectStack.Screen name="Projects" component={Projects} />
      <ProjectStack.Screen name="CreateProject" component={CreateProject} />
      <ProjectStack.Screen name="ProjectDetail" component={ProjectDetail} />
      <ProjectStack.Screen name="AssignProject" component={AssignProject} />
    </ProjectStack.Navigator>
  );
};

const DrawerNavigator = () => {
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  return (
    <Drawer.Navigator
      initialRouteName="ProjectNavigator"
      headerMode="none"
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerStyle={{
        width: scaleWidth * 255,
        backgroundColor: darkMode
          ? Colors.primary.darkModalBackground
          : Colors.primary.white,
      }}>
      <Drawer.Screen name="ProjectNavigator" component={ProjectNavigator} />
      <Drawer.Screen name="Users" component={Users} />
      <Drawer.Screen name="CreateUser" component={CreateUser} />
      <Drawer.Screen name="Messages" component={Messages} />
      <Drawer.Screen name="Notifications" component={Notifications} />
      <Drawer.Screen name="Account" component={Account} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
