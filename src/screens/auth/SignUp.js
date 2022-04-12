import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Input from '../../components/Input';
import DisableBtn from '../../components/DisableBtn';
import {scaleWidth, scaleHeight} from '../../utils/scaling';
import Fonts from '../../constants/Fonts';
import {signUpWithEmail} from '../../utils/auth/';
import {AuthContext} from '../../context/AuthContext';
import {DisplayContext} from '../../context/DisplayContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default Signup = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const authContext = useContext(AuthContext);
  const {setCurrentAuth} = authContext;
  const [company, setCompany] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [signUpDisabled, setSignUpDisabled] = useState(true);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  const style = styles(insets, darkMode);

  useEffect(() => {
    company && firstName && lastName && email && password
      ? setSignUpDisabled(false)
      : setSignUpDisabled(true);
    setEmailError(null);
    setPasswordError(null);
  }, [email, password, firstName, lastName, company]);

  const onSuccess = (userData) => {
    console.log(userData);
    let details = {
      firstName: firstName,
      lastName,
      company: company,
      email: email,
    };
    navigation.navigate('CompleteYourProfile', {userDetails: details});
  };

  const pressContinue = () => {
    signUpWithEmail(
      email,
      password,
      setCurrentAuth,
      setEmailError,
      setPasswordError,
      onSuccess,
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <KeyboardAwareScrollView>
        <View style={style.sheetContainer}>
          <View style={style.contentContainer}>
            <Text style={style.heading}>Let’s set up your account</Text>
            <View style={style.inputContainer}>
              <Input
                value={company}
                onChange={setCompany}
                placeHolder={'Company'}
                inputHeading={'company'}
              />
            </View>
            <View style={style.inputContainer}>
              <Input
                value={firstName}
                onChange={setFirstName}
                placeHolder={'First Name'}
                inputHeading={'first name'}
              />
            </View>
            <View style={style.inputContainer}>
              <Input
                value={lastName}
                onChange={setLastName}
                placeHolder={'Last Name'}
                inputHeading={'last name'}
              />
            </View>
            <View style={style.inputContainer}>
              <Input
                value={email}
                onChange={setEmail}
                placeHolder={'Email'}
                inputHeading={'work email address'}
                inpStyle={'email-address'}
                error={emailError}
              />
            </View>
            <View style={style.inputContainer}>
              <Input
                value={password}
                onChange={setPassword}
                placeHolder={'***********'}
                inputHeading={'password'}
                secureTextEntryValue={true}
                error={passwordError}
              />
            </View>
            <TouchableOpacity
              onPress={() => pressContinue()}
              disabled={signUpDisabled}>
              <DisableBtn
                text={'Continue'}
                customStyle={{
                  backgroundColor: signUpDisabled
                    ? Colors.primary.lightGray
                    : Colors.primary.blue,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = (insets, darkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode
        ? Colors.primary.darkHeadingBackground
        : Colors.primary.blue,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: scaleHeight * 70,
    },
    sheetContainer: {
      width: scaleWidth * 472,
      height: scaleHeight * 640,
      backgroundColor: darkMode ? Colors.primary.darkBg : Colors.primary.white,
      borderRadius: 20,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: scaleWidth * 73,
    },
    heading: {
      fontSize: scaleHeight * 24,
      lineHeight: scaleHeight * 28,
      alignSelf: 'center',
      marginTop: scaleHeight * 50,
      marginBottom: scaleHeight * 35,
      textAlign: 'center',
      color: darkMode ? Colors.primary.white : Colors.primary.headingTextColor,
      fontFamily: Fonts.primary.regular,
    },
    inputContainer: {
      marginBottom: scaleHeight * 26,
    },
  });
