import React,{useContext} from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, StatusBar, Platform } from 'react-native';
import Colors from '../../constants/Colors';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { scaleWidth, scaleHeight } from '../../utils/scaling';
import Fonts from '../../constants/Fonts';
import {DisplayContext} from '../../context/DisplayContext'

export default Landing = ({ navigation }) => {

  const insets = useSafeAreaInsets()
  const landingBg = require('../../assets/images/landing/landing.png');
  const combined_shape = require('../../assets/images/landing/combined_shape.png');
  const displayContext = useContext(DisplayContext)
  const {darkMode} = displayContext
  const style = styles(insets,darkMode)

  const goToSubscriptionScreen = () => {
    navigation.navigate('SignUp')
  }

  const goToLoginScreen = () => {
    navigation.navigate('SignIn')
  }

  return (
    <SafeAreaView style={style.container} >
      <StatusBar hidden />
      <View style={style.imageContainer} >
        <ImageBackground source={landingBg} style={style.topImage} imageStyle={{ resizeMode: 'stretch' }} />
        <View style={style.imageContentContainer}>
          <Image source={combined_shape} style={style.imageCombinedShape}></Image>

          <Text style={style.textObras}>OBRAS</Text>
          <Text style={style.textOther}>Track projects.</Text>
          <Text style={style.textOther}>Manage teams.</Text>
          <Text style={style.textOther}>Get work done.</Text>
        </View>
      </View>
      <View style={style.bottomContainer} >
        <View style={style.buttonContainer} >
          <TouchableOpacity style={style.getStartedButton} onPress={() => goToSubscriptionScreen()} >
            <Text style={style.buttonText} >Let's get started</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.signIn} onPress={() => goToLoginScreen()}>
            <Text style={style.signInText} >Sign In</Text>
          </TouchableOpacity>
          <View style={style.privacyContainer} >
            <TouchableOpacity onPress={() => navigation.navigate('TermsAndPrivacy', { TermOrPrivacy: 0 })}>
              <Text style={style.termsText}>{'Terms & Conditions'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('TermsAndPrivacy', { TermOrPrivacy: 1 })}>
              <Text style={style.termsText}>{'Privacy Policy'}</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

// Styles
const styles = (insets,darkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkMode ?Colors.primary.darkBg: Colors.primary.blue,
  },
  imageContainer: {
    alignItems: 'center',
    width: '100%',
    height: scaleHeight * 580,
  },
  topImage: {
    width: '100%',
    height: scaleHeight * 580,
    position: 'absolute',
  },
  imageContentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  imageCombinedShape: {
    width: scaleWidth * 132,
    height: scaleHeight * 132,
    marginTop: scaleHeight * 175,
    resizeMode: 'contain',
  },
  textObras: {
    fontSize: scaleHeight * 40,
    color: Colors.primary.white,
    marginBottom: Platform.OS==='android' ? scaleHeight * 15 : scaleHeight * 45,
    fontFamily: Fonts.primary.bold
  },
  textOther: {
    fontSize: scaleHeight * 16,
    color: Colors.primary.white,
    textTransform: 'uppercase',
    lineHeight: scaleHeight * 30,
    fontFamily: Fonts.primary.semiBold
  },
  bottomContainer: {
    height: scaleHeight * 232,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkMode ?Colors.primary.darkBg:Colors.primary.white,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  getStartedButton: {
    backgroundColor: Colors.primary.orange,
    width: scaleWidth * 329,
    height: scaleHeight * 45,
    marginTop: scaleHeight * 33,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },
  buttonText: {
    fontSize: scaleHeight * 15,
    color: Colors.primary.white,
    fontFamily: Fonts.primary.semiBold
  },
  signIn: {
    width: scaleWidth * 329,
    height: scaleHeight * 45,
    marginTop: scaleHeight * 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.primary.blue,
    borderWidth: 1,
    borderRadius: 4,
  },
  signInText: {
    color: Colors.primary.blue,
    fontSize: scaleHeight * 15,
    fontFamily: Fonts.primary.semiBold
  },
  privacyContainer: {
    flex: 1,
    width: scaleWidth * 329,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  termsText: {
    color: darkMode ?Colors.primary.white: Colors.primary.darkGray,
    fontSize: scaleHeight * 14,
    marginTop: scaleHeight * 17,
    fontFamily: Fonts.primary.semiBold
  }
});