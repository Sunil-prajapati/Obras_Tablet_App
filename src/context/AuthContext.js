import React, {useState, createContext, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {getProfilePicture} from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [initializing, setInitializing] = useState(true);
  const [currentAuth, setCurrentAuth] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [onboarding, setOnboarding] = useState(false);

  function onAuthStateChanged(auth) {
    setCurrentAuth(auth);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (currentAuth) {
      const subscriber = firestore()
        .collection('admins')
        .doc(currentAuth.uid)
        .onSnapshot((documentSnapshot) => {
          if (documentSnapshot.exists) {
            let user = {
              id: currentAuth.uid,
              ...documentSnapshot.data(),
            };
            setCurrentUser(user);
          } else {
            setCurrentUser(null);
            setOnboarding(true);
          }
        });
      //unsubscribe
      return () => subscriber();
    } else {
      setCurrentUser(null);
    }
  }, [currentAuth]);

  useEffect(() => {
    if (currentUser) {
      // getProfilePicture(currentAuth.uid, setHeadshot)
    }
  }, [currentUser]);

  if (initializing) return null;

  return (
    <AuthContext.Provider
      value={{
        currentAuth,
        setCurrentAuth,
        currentUser,
        setCurrentUser,
        onboarding,
        setOnboarding,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
