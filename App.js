/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { ProjectProvider } from './src/context/ProjectContext';
import { UserProvider } from './src/context/UserContext';
import {DisplayProvider} from './src/context/DisplayContext';
import RootNavigator from './src/navigators/RootNavigator';
import SplashScreen from "react-native-splash-screen";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {requestUserPermission,notificationListener} from './src/utils/notificationServices'

LogBox.ignoreAllLogs();

const App = () => {

  //Hide Splash screen on app load.
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
    requestUserPermission()
    notificationListener()
  });


  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default () => {
  return (
    <AuthProvider>
      <ProjectProvider>
        <UserProvider>
          <DisplayProvider>
            <App />
          </DisplayProvider>
        </UserProvider>
      </ProjectProvider>
    </AuthProvider>
  );
};
