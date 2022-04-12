import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import {scaleWidth, scaleHeight, width} from '../../utils/scaling';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import ToggleSwitch from 'toggle-switch-react-native';
import {AuthContext} from '../../context/AuthContext';
import {getProfilePicture} from '../../utils/api';
import {
  updateUserEmail,
  updateUser,
  updateUserPassword,
} from '../../utils/auth';
import moment from 'moment';
import profileDemo from '../../assets/images/profile/user.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {DisplayContext} from '../../context/DisplayContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Account = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);
  const [viewType, setViewType] = useState('Lighthouse');
  const authContext = useContext(AuthContext);
  const {currentUser, currentAuth} = authContext;
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState(null);
  const [profileImg, setProfileImg] = useState('');
  const [inputDisabled, setInputDisabled] = useState(false);
  const [companyEdit, setCompanyEdit] = useState(currentUser.company);
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [address, setAddress] = useState(currentUser.address);
  const [industry, setIndustry] = useState(currentUser.industry);
  const [ein, setEin] = useState(currentUser.EIN);
  const [currentPassword, setCurrentPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const userCreatedTime = moment(currentUser.createdAt).format('MMMM Do YYYY');
  const MenuBurger = require('../../assets/icons/MenuBurger.png');
  const RightArrow = require('../../assets/icons/Disclosure_Indicators.png');
  const displayContext = useContext(DisplayContext);
  const {darkMode, setDarkMode, isDarkModeEnabled, setIsDarkModeEnabled} =
    displayContext;
  const style = styles(insets, darkMode);
  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  useEffect(() => {
    getProfilePicture(currentAuth.uid, setProfileImg);
  }, [currentAuth]);

  const toggleSwitchPush = (status) => setIsPushEnabled(status);
  const toggleSwitchEmail = (status) => setIsEmailEnabled(status);
  const toggleSwitchDarkMode = async (status) => {
    setIsDarkModeEnabled(status),
      setDarkMode(status),
      await AsyncStorage.setItem('isDark', JSON.stringify(status));
  };

  const setError = () => {
    return null;
  };
  const onSuccess = () => {
    alert('Email updated!');
  };
  const changeDetails = () => {
    updateUserEmail(password, email, setError, onSuccess);
  };

  const onUpdateUserSuccess = (msg) => {
    alert(msg);
  };
  const saveChanges = () => {
    let newDetails = {
      company: companyEdit,
      firstName,
      lastName,
      industry,
      address,
      EIN: ein,
    };
    updateUser(newDetails, onUpdateUserSuccess);
  };

  const companyClicked = () => {
    setViewType('Lighthouse');
    setCompanyEdit(currentUser.company);
    setFirstName(currentUser.firstName);
    setLastName(currentUser.lastName);
    setAddress(currentUser.address);
    setEin(currentUser.EIN);
  };

  const accountClicked = () => {
    {
      setViewType('AccountDetails'), setInputDisabled(false);
    }
    setEmail(currentUser.email);
    setCurrentPassword(null);
    setNewPassword(null);
    setConfirmPassword(null);
  };

  const onSuccessPassword = () => {
    console.log('password successfully changed');
  };
  const changePassword = () => {
    if (newPassword === confirmPassword) {
      updateUserPassword(
        currentPassword,
        newPassword,
        setError,
        onSuccessPassword,
      );
    } else {
      alert("Confirm password doesn't match");
    }
  };

  const company = () => {
    return (
      <View style={style.rightContentHolder}>
        <View style={style.rowView}>
          <View>
            {profileImg == '' ? (
              <Image style={style.avatarDetailImage} source={profileDemo} />
            ) : (
              <Image
                style={style.avatarDetailImage}
                source={{uri: profileImg}}
              />
            )}
          </View>
          <Text style={style.role}>Administrator</Text>
        </View>
        <View style={style.rowView}>
          <View style={style.columnView}>
            <Text style={style.occupation}>First Name</Text>
            <TextInput
              style={style.textValue}
              value={firstName}
              onChangeText={(firstName) => {
                setFirstName(firstName);
              }}
              editable={inputDisabled}
            />
          </View>
          <View style={style.columnView}>
            <Text style={style.occupation}>Last Name</Text>
            <TextInput
              style={style.textValue}
              value={lastName}
              onChangeText={(lastName) => {
                setLastName(lastName);
              }}
              editable={inputDisabled}
            />
          </View>
        </View>
        <View style={style.rowView}>
          <View style={style.columnView}>
            <Text style={style.occupation}>Address</Text>
            <TextInput
              style={style.textValue}
              value={`${address}, ${currentUser.state} ${currentUser.city} ${currentUser.zipCode} `}
              onChangeText={(address) => {
                setAddress(address);
              }}
              editable={inputDisabled}
            />
          </View>

          <View style={style.columnView}>
            <Text style={style.occupation}>Company</Text>
            <TextInput
              style={style.textValue}
              value={companyEdit}
              onChangeText={(companyEdit) => {
                setCompanyEdit(companyEdit);
              }}
              editable={inputDisabled}
            />
          </View>
        </View>
        <View style={style.rowView}>
          <View style={style.columnView}>
            <Text style={style.occupation}>EIN</Text>
            <View style={style.rowView}>
              <TextInput
                style={style.textValue}
                value={ein}
                onChangeText={(ein) => {
                  setEin(ein);
                }}
                editable={inputDisabled}
              />
              <Text style={style.textDate}>{userCreatedTime}</Text>
            </View>
          </View>
          <View style={style.columnView}>
            <Text style={style.occupation}>Industry</Text>
            <TextInput
              style={style.textValue}
              value={industry}
              onChangeText={(industry) => {
                setIndustry(industry);
              }}
              editable={inputDisabled}
            />
          </View>
        </View>
        <View style={style.rowView}>
          <View style={style.columnView}>
            <Text style={style.occupation}>Vehicle</Text>
            <Text style={style.textValue}>{}</Text>
          </View>
        </View>
        <View style={style.rowView}>
          <View style={style.columnView}>
            <Text style={style.occupation}>Resources/Equipment</Text>
            <Text style={style.textValue}>{}</Text>
          </View>
        </View>
      </View>
    );
  };

  const accountDetails = () => {
    return (
      <View style={style.rightContentHolder}>
        <View style={style.contactContainer}>
          <View>
            <Text style={style.textTitle}>Email address</Text>
            <TextInput
              style={style.inputStyle}
              placeholder={'Email address'}
              placeholderTextColor={Colors.primary.lightGray}
              value={email}
              onChangeText={(email) => {
                setEmail(email);
              }}
              editable={inputDisabled}
            />
          </View>

          <View>
            <Text style={style.textTitle}>Password</Text>
            <TextInput
              style={style.inputStyle}
              placeholder={'Password'}
              placeholderTextColor={Colors.primary.lightGray}
              secureTextEntry={true}
              value={password}
              onChangeText={(password) => {
                setPassword(password);
              }}
              editable={inputDisabled}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => changeDetails()}>
          <View style={style.changeEmailBox}>
            <Text style={style.textChangePassword}>Change Email</Text>
          </View>
        </TouchableOpacity>

        <View style={style.passwordContainer}>
          <View>
            <Text style={style.textTitle}>Current Password</Text>
            <TextInput
              style={style.inputStyle}
              placeholder={'Current Password'}
              placeholderTextColor={Colors.primary.lightGray}
              value={currentPassword}
              secureTextEntry={true}
              onChangeText={(currentPassword) => {
                setCurrentPassword(currentPassword);
              }}
              editable={inputDisabled}
            />
          </View>

          <View>
            <Text style={style.textTitle}>New Password</Text>
            <TextInput
              style={style.inputStyle}
              placeholder={'New Password'}
              placeholderTextColor={Colors.primary.lightGray}
              secureTextEntry={true}
              value={newPassword}
              onChangeText={(newPassword) => {
                setNewPassword(newPassword);
              }}
              editable={inputDisabled}
            />
          </View>
          <View style={{marginTop: '5%'}}>
            <Text style={style.textTitle}>Confirm Password</Text>
            <TextInput
              style={style.inputStyle}
              placeholder={'Confirm Password'}
              placeholderTextColor={Colors.primary.lightGray}
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(confirmPassword) => {
                setConfirmPassword(confirmPassword);
              }}
              editable={inputDisabled}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => changePassword()}
          style={{marginTop: '2%'}}>
          <View style={style.changePasswordBox}>
            <Text style={style.textChangePassword}>Change Password</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSelectedView = () => {
    switch (viewType) {
      case 'AccountDetails':
        return accountDetails();
      case 'Subscription':
        break;
      default:
        return company();
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <KeyboardAwareScrollView>
        <View>
          <View style={style.headerContainer}>
            <TouchableOpacity
              style={style.menuBurger}
              onPress={() => toggleDrawer()}>
              <Image source={MenuBurger} />
            </TouchableOpacity>
            <View style={style.headerRow}>
              <Text style={style.account}>Account</Text>
              <View style={style.viewEdit}>
                <TouchableOpacity onPress={() => setInputDisabled(true)}>
                  <Text style={style.textEdit}>Edit</Text>
                </TouchableOpacity>
                {viewType == 'Lighthouse' ? (
                  <TouchableOpacity onPress={() => saveChanges()}>
                    <Text style={style.textEdit}>Save</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </View>
          <View style={style.contentContainer}>
            <View style={style.leftContainer}>
              <Text style={style.textHeading}>Company</Text>
              <TouchableOpacity onPress={() => companyClicked()}>
                <View style={style.optionContainer}>
                  <Text style={style.textOptions}>{currentUser.company}</Text>
                  <Image style={style.rightArrow} source={RightArrow} />
                </View>
              </TouchableOpacity>
              <Text style={style.textHeading}>Account</Text>
              <TouchableOpacity onPress={() => accountClicked()}>
                <View style={style.optionContainer}>
                  <Text style={style.textOptions}>Account details</Text>
                  <Image style={style.rightArrow} source={RightArrow} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setViewType('Subscription')}>
                <View style={style.optionContainer}>
                  <Text style={style.textOptions}>Subscription</Text>
                  <Image style={style.rightArrow} source={RightArrow} />
                </View>
              </TouchableOpacity>
              <Text style={style.textHeading}>Notifications</Text>
              <View style={style.optionContainer}>
                <Text style={style.textOptions}>Push notifications</Text>
                <ToggleSwitch
                  isOn={isPushEnabled}
                  onColor={Colors.primary.blue}
                  offColor={Colors.primary.secondGray}
                  size="small"
                  onToggle={(isOn) => toggleSwitchPush(isOn)}
                />
              </View>
              <View style={style.optionContainer}>
                <Text style={style.textOptions}>Email</Text>
                <ToggleSwitch
                  isOn={isEmailEnabled}
                  onColor={Colors.primary.blue}
                  offColor={Colors.primary.secondGray}
                  size="small"
                  onToggle={(isOn) => toggleSwitchEmail(isOn)}
                />
              </View>
              <Text style={style.textHeading}>Display</Text>
              <View style={style.optionContainer}>
                <Text style={style.textOptions}>Dark mode</Text>
                <ToggleSwitch
                  isOn={isDarkModeEnabled}
                  onColor={Colors.primary.blue}
                  offColor={Colors.primary.secondGray}
                  size="small"
                  onToggle={(isOn) => toggleSwitchDarkMode(isOn)}
                />
              </View>
            </View>
            <View style={style.rightContainer}>{renderSelectedView()}</View>
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
      backgroundColor: Colors.primary.white,
    },
    headerContainer: {
      width: '100%',
      height: scaleHeight * 126,
      flexDirection: 'column',
      paddingLeft: scaleWidth * 20,
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.blue,
    },
    menuBurger: {
      width: scaleWidth * 70,
      height: scaleHeight * 40,
      marginTop: scaleHeight * 20,
      justifyContent: 'center',
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    account: {
      fontSize: scaleWidth * 28,
      lineHeight: scaleHeight * 32,
      color: Colors.primary.white,
      fontFamily: Fonts.primary.bold,
    },
    viewEdit: {
      flex: 1,
      justifyContent: 'flex-end',
      flexDirection: 'row',
    },
    textEdit: {
      fontSize: scaleWidth * 17,
      lineHeight: scaleHeight * 20,
      marginRight: scaleWidth * 30,
      color: Colors.primary.white,
      fontFamily: Fonts.primary.semiBold,
    },
    contentContainer: {
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.white,
    },
    leftContainer: {
      width: scaleWidth * 375,
      height: '100%',
      borderRightWidth: 1,
      borderRightColor: Colors.primary.dividerLine,
    },
    rightContainer: {
      width: scaleWidth * 705,
      height: '100%',
      flexDirection: 'column',
      paddingLeft: scaleWidth * 20,
      paddingTop: scaleHeight * 30,
      paddingRight: scaleWidth * 20,
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.white,
    },
    rightContentHolder: {
      flex: 1,
    },
    textHeading: {
      width: '100%',
      height: scaleHeight * 40,
      fontSize: scaleWidth * 12,
      lineHeight: scaleHeight * 22,
      paddingLeft: scaleWidth * 17,
      paddingTop: scaleHeight * 15,
      color: darkMode
        ? Colors.primary.profilePicCircle
        : Colors.primary.messageColor,
      fontFamily: Fonts.primary.bold,
      textTransform: 'uppercase',
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.inputBackground,
    },
    optionContainer: {
      width: scaleWidth * 358,
      height: scaleHeight * 44,
      marginLeft: scaleWidth * 16,
      paddingRight: scaleWidth * 11,
      flexDirection: 'row',
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.white,
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderBottomColor: Colors.primary.line,
    },
    textOptions: {
      fontSize: scaleWidth * 17,
      lineHeight: scaleHeight * 22,
      color: darkMode
        ? Colors.primary.profilePicCircle
        : Colors.primary.calenderButtonTextColor,
      fontFamily: Fonts.primary.regular,
    },
    rightArrow: {
      width: scaleWidth * 8,
      height: scaleHeight * 13,
    },
    rowView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    columnView: {
      flexDirection: 'column',
      marginTop: scaleHeight * 30,
      marginRight: scaleWidth * 30,
    },
    avatarDetailImage: {
      width: scaleWidth * 72,
      height: scaleWidth * 72,
      borderRadius: (scaleWidth * 72) / 2,
      marginRight: scaleWidth * 15,
    },
    role: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      fontFamily: Fonts.primary.regular,
      color: Colors.primary.heading,
    },
    occupation: {
      fontSize: scaleWidth * 13,
      lineHeight: scaleWidth * 15,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      fontFamily: Fonts.primary.semiBold,
      color: Colors.primary.gray,
    },
    textValue: {
      width: scaleWidth * 300,
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      marginTop: scaleHeight * 10,
      paddingBottom: scaleHeight * 10,
      fontFamily: Fonts.primary.regular,
      color: Colors.primary.heading,
      borderBottomWidth: 0.5,
      borderBottomColor: Colors.primary.secondGray,
    },
    rowCertification: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    textDate: {
      width: scaleWidth * 281,
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      marginTop: scaleHeight * 10,
      fontFamily: Fonts.primary.regular,
      color: Colors.primary.heading,
      position: 'absolute',
      textAlign: 'right',
    },
    contactContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: scaleHeight * 20,
      marginRight: scaleWidth * 12,
      marginBottom: scaleHeight * 20,
    },
    textTitle: {
      fontSize: scaleWidth * 13,
      lineHeight: scaleWidth * 15,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      color: Colors.primary.subHeading,
      fontFamily: Fonts.primary.regular,
    },
    inputStyle: {
      width: scaleWidth * 325,
      height: scaleHeight * 40,
      marginTop: scaleHeight * 7,
      fontSize: scaleWidth * 15,
      color: darkMode ? Colors.primary.subHeading : Colors.primary.textColor,
      backgroundColor: darkMode
        ? Colors.primary.darkModeInputBg
        : Colors.primary.inputBackground,
      borderRadius: 5,
      padding: 5,
      margin: 0,
      borderWidth: 0,
      fontFamily: Fonts.primary.regular,
    },
    changeEmailBox: {
      width: scaleWidth * 155,
      height: scaleHeight * 45,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1.5,
      borderColor: Colors.primary.blue,
      borderRadius: 4,
    },
    changePasswordBox: {
      width: scaleWidth * 155,
      height: scaleHeight * 45,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1.5,
      borderColor: Colors.primary.blue,
      borderRadius: 4,
    },
    textChangePassword: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleHeight * 20,
      color: Colors.primary.blue,
      fontFamily: Fonts.primary.semiBold,
    },
    passwordContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: scaleHeight * 20,
      marginRight: scaleWidth * 12,
      marginBottom: scaleHeight * 20,
      flexWrap: 'wrap',
      marginTop: '5%',
    },
  });
