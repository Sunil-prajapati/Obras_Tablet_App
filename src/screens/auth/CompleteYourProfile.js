import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Colors from '../../constants/Colors';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Input from '../../components/Input';
import DisableBtn from '../../components/DisableBtn';
import {scaleWidth, scaleHeight} from '../../utils/scaling';
import Fonts from '../../constants/Fonts';
import {launchImageLibrary} from 'react-native-image-picker';
import Camera from '../../assets/icons/camera.png';
import {uploadProfilePicture, getProfilePicture} from '../../utils/api';
import {AuthContext} from '../../context/AuthContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {DisplayContext} from '../../context/DisplayContext';

export default CompleteYourProfile = (props) => {
  const insets = useSafeAreaInsets();
  const authContext = useContext(AuthContext);
  const {currentAuth} = authContext;
  const {userDetails} = props.route.params;
  const [industry, setIndustry] = useState(null);
  const [address, setAddress] = useState(null);
  const [EIN, setEIN] = useState(null);
  const [signUpDisabled, setSignUpDisabled] = useState(true);
  const [profilePic, setProfilePic] = useState(null);
  const [officeNumber, setOfficeNumber] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  const style = styles(insets, darkMode);

  useEffect(() => {
    address && EIN && officeNumber && city && state && zipCode
      ? setSignUpDisabled(false)
      : setSignUpDisabled(true);
  }, [industry, address, EIN, profilePic, officeNumber]);

  const onSuccess = (result) => {
    if (result == 'success') {
      console.log('Profile picture uploaded successfully');
      getProfilePicture(currentAuth.uid, setProfilePic);
    } else {
      alert('something went wrong');
    }
  };

  function setError() {}

  const options = {
    title: 'Select Avatar',
    noData: true,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const openPicker = () => {
    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setProfilePic(response.assets[0].uri);
        uploadProfilePicture(response.assets[0].uri, setError, onSuccess);
      }
    });
  };

  const saveUser = () => {
    let newUser = {
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      company: userDetails.company,
      email: userDetails.email,
      industry,
      officeNumber,
      address,
      city,
      state,
      zipCode,
      EIN,
    };
    props.navigation.navigate('SubscriptionScreen', {newUserDetails: newUser});
  };

  return (
    <View style={style.container}>
      <KeyboardAwareScrollView>
        <View style={style.sheetContainer}>
          <View style={style.contentContainer}>
            <Text style={style.heading}>Complete your Company profile</Text>
            <TouchableOpacity
              style={style.profileImg}
              onPress={() => openPicker()}>
              <View style={style.imgContainer}>
                {profilePic == null ? (
                  <Image style={style.cameraIcon} source={Camera} />
                ) : (
                  <Image style={style.proImg} source={{uri: profilePic}} />
                )}
              </View>
            </TouchableOpacity>
            <View style={style.inputContainer}>
              <Input
                placeHolder={'Type'}
                inputHeading={'industry'}
                value={industry}
                onChange={setIndustry}
              />
            </View>
            <View style={style.inputContainer}>
              <Input
                placeHolder={'Location'}
                inputHeading={'address'}
                value={address}
                onChange={setAddress}
              />
            </View>
            <View style={style.cityContainer}>
              <View>
                <Text style={style.textTitle}>City</Text>
                <TextInput
                  placeholderTextColor={Colors.primary.gray}
                  style={[style.inputStyle, style.inputBoxWidthCity]}
                  placeholder={'City'}
                  value={city}
                  onChangeText={(city) => setCity(city)}
                />
              </View>
              <View style={style.stateContainer}>
                <Text style={style.textTitle}>State</Text>
                <TextInput
                  placeholderTextColor={Colors.primary.gray}
                  style={[style.inputStyle, style.inputBoxWidthState]}
                  placeholder={'ST'}
                  value={state}
                  onChangeText={(state) => setState(state)}
                />
              </View>
              <View>
                <Text style={style.textTitle}>ZIP Code</Text>
                <TextInput
                  placeholderTextColor={Colors.primary.gray}
                  style={[style.inputStyle, style.inputBoxWidthZipCode]}
                  placeholder={'ZIP Code'}
                  value={zipCode}
                  onChangeText={(zipCode) => setZipCode(zipCode)}
                />
              </View>
            </View>
            <View style={style.inputContainer}>
              <Input
                placeHolder={'Office phone number'}
                inputHeading={'office phone number'}
                value={officeNumber}
                onChange={setOfficeNumber}
              />
            </View>
            <View style={style.inputContainer}>
              <Input
                placeHolder={'00000'}
                inputHeading={'EIN'}
                value={EIN}
                onChange={setEIN}
              />
            </View>
            <TouchableOpacity
              style={style.btnContainer}
              onPress={() => saveUser()}
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
    </View>
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
      paddingTop: scaleHeight * 40,
    },
    sheetContainer: {
      width: scaleWidth * 472,
      backgroundColor: darkMode ? Colors.primary.darkBg : Colors.primary.white,
      borderRadius: 20,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: scaleWidth * 53,
      paddingBottom: scaleHeight * 20,
    },
    heading: {
      fontSize: scaleWidth * 23,
      alignSelf: 'center',
      marginTop: scaleHeight * 45,
      color: darkMode ? Colors.primary.white : Colors.primary.headingTextColor,
      fontFamily: Fonts.primary.regular,
    },
    inputContainer: {
      marginBottom: scaleHeight * 26,
    },
    btnContainer: {},
    profileImg: {
      marginTop: scaleHeight * 25,
      alignItems: 'center',
    },
    imgContainer: {
      width: scaleHeight * 109,
      height: scaleHeight * 109,
      borderRadius: (scaleHeight * 109) / 2,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.primary.profilePicCircle,
    },
    cameraIcon: {
      width: scaleWidth * 32,
      height: scaleHeight * 27,
      resizeMode: 'contain',
    },
    proImg: {
      width: scaleHeight * 109,
      height: scaleHeight * 109,
      borderRadius: (scaleHeight * 109) / 2,
      resizeMode: 'cover',
    },
    cityContainer: {
      width: '100%',
      flexDirection: 'row',
      marginBottom: scaleHeight * 20,
    },
    textTitle: {
      fontSize: scaleWidth * 13,
      lineHeight: scaleWidth * 15,
      textTransform: 'uppercase',
      color: Colors.primary.subHeading,
      fontFamily: Fonts.primary.regular,
    },
    inputStyle: {
      fontSize: scaleWidth * 15,
      height: scaleHeight * 40,
      marginTop: scaleHeight * 7,
      color: darkMode ? Colors.primary.white : Colors.primary.heading,
      backgroundColor: darkMode
        ? Colors.primary.darkInputBackground
        : Colors.primary.white,
      borderRadius: 5,
      padding: 5,
      margin: 0,
      borderWidth: 0,
      fontFamily: Fonts.primary.regular,
    },
    inputBoxWidthCity: {
      width: scaleWidth * 140,
    },
    inputBoxWidthState: {
      width: scaleWidth * 78,
    },
    stateContainer: {
      flexDirection: 'column',
      marginHorizontal: scaleWidth * 14,
    },
  });
