import React, { useState, createContext, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const DisplayContext = createContext();

export const DisplayProvider = ({ children }) => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  async function darkThemeFunction () {
    let isDark = await AsyncStorage.getItem("isDark")
    if (JSON.parse(isDark) === true) {
      setDarkMode(true)
      setIsDarkModeEnabled(true)
    } else {
      const theme = Appearance.getColorScheme();
      setDarkMode(theme === 'light' ? false : true);
      setIsDarkModeEnabled(theme === 'light' ? false : true);
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setDarkMode(colorScheme === 'light' ? false : true);
        setIsDarkModeEnabled(theme === 'light' ? false : true);
      });
      return () => subscription && subscription.remove();
    }
  }

  useEffect(() => {
    darkThemeFunction()
  }, []);

  return (
    <DisplayContext.Provider
      value={{
        darkMode,
        setDarkMode,
        setIsDarkModeEnabled,
        isDarkModeEnabled,
      }}>
      {children}
    </DisplayContext.Provider>
  );
};
