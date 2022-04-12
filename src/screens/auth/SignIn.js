import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Input from '../../components/Input';
import DisableBtn from '../../components/DisableBtn';
import {scaleWidth, scaleHeight} from '../../utils/scaling';
import Fonts from '../../constants/Fonts';
import {AuthContext} from '../../context/AuthContext';
import {ProjectContext} from '../../context/ProjectContext';
import {loginWithEmail} from '../../utils/auth/';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {DisplayContext} from '../../context/DisplayContext'

export default SignIn = ({navigation}) => {
  const authContext = useContext(AuthContext);
  const projectContext = useContext(ProjectContext);
  const {getProjects} = projectContext;
  const {setCurrentUser} = authContext;
  const insets = useSafeAreaInsets();
  
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [loginDisabled, setLoginDisabled] = useState(true);
  const displayContext = useContext(DisplayContext)
  const {darkMode} = displayContext
  const style = styles(insets,darkMode);

  useEffect(() => {
    email && password ? setLoginDisabled(false) : setLoginDisabled(true);
    setEmailError(null);
    setPasswordError(null);
  }, [email, password]);

  const onSuccess = (userData) => {
    console.log(userData);
    setCurrentUser(userData);
    getProjects();
  };
  const signInClicked = () => {
    loginWithEmail(email, password, setEmailError, setPasswordError, onSuccess);
  };

  return (
    <SafeAreaView style={style.container}>
      <KeyboardAwareScrollView>
        <View style={style.sheetContainer}>
          <Text style={style.heading}>Sign in to Obras</Text>
          <View style={style.subContainer}>
            <View style={style.inputContainer}>
              <Input
                placeHolder={'myEmail.com'}
                inputHeading={'Email address'}
                value={email}
                onChange={(email) => {
                  setEmail(email);
                }}
                error={emailError}
              />
            </View>
            <View style={style.inputContainer}>
              <Input
                placeHolder={'***********'}
                inputHeading={'Password'}
                value={password}
                onChange={(password) => {
                  setPassword(password);
                }}
                secureTextEntryValue
                error={passwordError}
              />
              <View style={style.forgotPasswordContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={style.forgotPasswordText}>Forgot password?</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={style.btnContainer}
              onPress={() => signInClicked()}
              disabled={loginDisabled}>
              <DisableBtn
                text={'SignIn'}
                customStyle={{
                  backgroundColor: loginDisabled
                    ? Colors.primary.lightGray
                    : Colors.primary.blue,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.bottomContainer}
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={style.bottomText}>
                Don’t have an account? SignUp
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = (insets,darkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:darkMode ?Colors.primary.darkHeadingBackground: Colors.primary.blue,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: scaleHeight * 150,
    },
    sheetContainer: {
      width: scaleWidth * 472,
      height: scaleHeight * 475,
      backgroundColor:darkMode ?Colors.primary.darkBg: Colors.primary.white,
      borderRadius: 20,
      paddingHorizontal: scaleWidth * 70,
    },
    heading: {
      fontSize: scaleWidth * 24,
      alignSelf: 'center',
      marginTop: scaleHeight * 70,
      fontFamily: Fonts.primary.regular,
      color:darkMode ?Colors.primary.white: Colors.primary.headingTextColor,
    },
    inputContainer: {
      marginTop: scaleHeight * 15,
      flexDirection: 'row',
    },
    btnContainer: {
      marginTop: scaleHeight * 30,
    },
    subContainer: {
      marginTop: scaleHeight * 8,
    },
    bottomContainer: {
      marginTop: scaleHeight * 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bottomText: {
      fontSize: scaleWidth * 14,
      fontFamily: Fonts.primary.regular,
      color: darkMode ?Colors.primary.white: Colors.primary.headingTextColor,
      alignSelf: 'center',
    },
    forgotPasswordContainer: {
      width: scaleWidth * 326,
      position: 'absolute',
    },
    forgotPasswordText: {
      fontSize: scaleWidth * 14,
      letterSpacing: 0.5,
      fontFamily: Fonts.primary.regular,
      color: Colors.primary.lightGray,
      alignSelf: 'flex-end',
    },
  });
