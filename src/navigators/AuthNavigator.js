import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Landing from '../screens/auth/LandingScreen';
import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';
import TermsAndPrivacy from '../screens/auth/TermsAndPrivacy';
import SubscriptionScreen from '../screens/auth/SubscriptionScreen';
import CompleteYourProfile from '../screens/auth/CompleteYourProfile';
import InviteFriends from '../screens/auth/InviteFriends';
import InviteContent from '../screens/auth/InviteContent';
import ForgotPassword from '../screens/auth/ForgotPassword'

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      name="Landing"
      initialRouteName="Landing"
      headerMode="none"
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="Landing" component={Landing} />
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="TermsAndPrivacy" component={TermsAndPrivacy} />
      <AuthStack.Screen name="SubscriptionScreen" component={SubscriptionScreen} />
      <AuthStack.Screen name="CompleteYourProfile" component={CompleteYourProfile} />
      <AuthStack.Screen name="InviteFriends" component={InviteFriends} />
      <AuthStack.Screen name="InviteContent" component={InviteContent} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
    </AuthStack.Navigator>
  );
};



export default AuthNavigator;
