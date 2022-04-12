import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from '../context/AuthContext';
import AuthNavigator from "./AuthNavigator";
import HomeNavigator from "./HomeNavigator";

const Stack = createStackNavigator();

export default function RootNavigator() {
  const authContext = useContext(AuthContext)
  const {
    currentUser
  } = authContext

  return (
    <>
      { !currentUser ? ( //change here for testing auth vs main stack
        <AuthNavigator />
      ) : (
        <HomeNavigator />
      )}
    </>
  );
}
