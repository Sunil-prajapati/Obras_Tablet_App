import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import {scaleWidth, scaleHeight} from '../../utils/scaling';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ActiveBtn from '../../components/ActiveBtn';
import OvalBtn from '../../components/OvalBtn';
import Input from '../../components/Input';
import {UserContext} from '../../context/UserContext';
import {createProfession, createUser} from '../../utils/user';
import {AuthContext} from '../../context/AuthContext';
import {useNavigation} from '@react-navigation/core';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {type, permission} from '../../constants/UsersData';
import CustomDropDown from '../../components/CustomDropDown';
import {ProjectContext} from '../../context/ProjectContext';
import {updateProject} from '../../utils/project';
// import {sendEmail} from './SendEmail';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {ColorPicker} from 'react-native-color-picker';
import {DisplayContext} from '../../context/DisplayContext';
import {dynamicEventLink} from '../../utils/dynamicLinkApi';
import sendMailgunEmail from './MailgunEmail';

export default CreateUser = (props) => {
  const {oneProjectDetail} = props.route.params;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const userContext = useContext(UserContext);
  const {getProfession, allProfessions, getUser, users, setShowListUsers} =
    userContext;
  const [userType, setUserType] = useState(2);
  const [title, setTitle] = useState('');
  const [selectedColorCode, setSelectedColorCode] = useState('');
  const [selectedProfession, setSelectedProfession] = useState(null);
  const authContext = useContext(AuthContext);
  const {currentAuth, currentUser} = authContext;
  const [titleError, setTitleError] = useState(null);
  const [projectPermission, setProjectPermission] = useState(0);
  const [employeeId, setEmployeeId] = useState('');
  const [employeeIdError, setEmployeeIdError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [userEmail, setEmail] = useState(null);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [Phone, setPhone] = useState(null);
  const [Certification, setCertification] = useState('');
  const [colorOfSelectedProfession, setColorOfSelectedProfession] =
    useState(null);
  const projectContext = useContext(ProjectContext);
  const {displayDay, getProjects} = projectContext;
  const [dateModal, setDateModal] = useState(false);
  const [certificateDate, setCertificateDate] = useState(
    new Date().toDateString(),
  );
  const [prof, setProf] = useState(null);
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  const style = styles(insets, darkMode);

  let forProfessionDropDown = [];
  allProfessions?.forEach((item) => {
    let objProfession = {};
    (objProfession['title'] = item.title),
      (objProfession['color'] = item.color),
      forProfessionDropDown.push(objProfession);
  });

  useEffect(() => {
    getProfession();
    setEmployeeIdError(null);
    setLastNameError(null);
    setTitleError(null);
    setTitle(null);
    setEmailError(null);
    return () => {
      console.log('cleanup');
    };
  }, []);

  const modifyCertificateDate = moment(certificateDate).format('MMMM D, YYYY');

  const selectProfessionFun = (itemValue) => {
    setProf(itemValue);
    setSelectedProfession(itemValue);
    checkColorOfProfession(itemValue);
  };

  const checkColorOfProfession = (values) => {
    allProfessions?.forEach((item) => {
      if (values == item.title) setColorOfSelectedProfession(item.color);
    });
  };

  const colourPicker = (colorCode) => {
    setSelectedColorCode(colorCode);
  };

  const onProfessionSuccess = (msg) => {
    getProfession();
    console.log(msg);
  };

  const checkColorExist = () => {
    return forProfessionDropDown.some(function (el) {
      return el.value == selectedColorCode;
    });
  };

  const checkProfessionExist = () => {
    return forProfessionDropDown.some(function (el) {
      return el.label === title;
    });
  };

  const createUserType = () => {
    let professionDetails = {
      title,
      color: selectedColorCode,
      adminId: currentAuth.uid,
    };
    if (checkProfessionExist()) {
      alert('This Profession is already created');
    } else {
      if (checkColorExist()) {
        alert('This colour is already selected');
      } else {
        if (title === null || title === undefined) {
          setTitleError('error');
        } else if (selectedColorCode === '') {
          alert('Please click at the centered of the circle');
        } else {
          setTitle('');
          createProfession(professionDetails, onProfessionSuccess);
        }
      }
    }
  };
  const onAddUserSuccess = () => {
    console.log('user added for particular project');
  };
  let selected_item = {};
  selected_item['email'] = userEmail;
  selected_item['employeeId'] = employeeId;
  selected_item['isActive'] = true;
  selected_item['lastName'] = lastName;
  selected_item['name'] = name;
  selected_item['Phone'] = Phone;
  selected_item['professionColor'] = colorOfSelectedProfession;
  selected_item['projectPermission'] = projectPermission;
  selected_item['selectedProfession'] = selectedProfession;
  selected_item['adminId'] = currentAuth.uid;
  selected_item['userType'] = userType;

  const onSuccess = () => {
    setShowListUsers(0);
    setUserType(2);
    setProjectPermission(0);
    setEmployeeId('');
    setEmail(null);
    setName('');
    setLastName('');
    setPhone(null);
    setCertification('');
    setTitle(null);
    getUser();
    getProjects();
    let employeeIdAndSelectedDay = {};
    if (oneProjectDetail !== null) {
      if (oneProjectDetail.assignedEmployees.length < 1) {
        employeeIdAndSelectedDay['date'] = displayDay;
        delete oneProjectDetail.updatedAt;
        employeeIdAndSelectedDay['employeeId'] = employeeId;
        employeeIdAndSelectedDay['userRestDetails'] = selected_item;
        employeeIdAndSelectedDay['projectId'] = oneProjectDetail.id;
        oneProjectDetail.assignedEmployees.push(employeeIdAndSelectedDay);
        updateProject(oneProjectDetail, oneProjectDetail.id, onAddUserSuccess);
      }
    }
  };

  function employeeIdExists(employeeId) {
    return users.some(function (el) {
      return el.employeeId === employeeId;
    });
  }

  function emailExists(userEmail) {
    return users.some(function (el) {
      return el.email == userEmail;
    });
  }

  function validateEmail(userEmail) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(userEmail).toLowerCase());
  }

  const inviteUser = async () => {
    try {
      let userDetails = {
        userType,
        projectPermission,
        selectedProfession,
        professionColor: colorOfSelectedProfession,
        employeeId,
        email: userEmail,
        name,
        lastName,
        Phone,
        adminId: currentAuth.uid,
        isActive: true,
        isAssigned: oneProjectDetail === null ? false : true,
        Certification,
        certificateDate,
      };
      if (employeeId === '' || employeeIdExists(employeeId)) {
        setEmployeeIdError('error');
      }
      // else if (
      //   userEmail === '' ||
      //   emailExists(userEmail) ||
      //   !validateEmail(userEmail)
      // ) {
      //   setEmailError('error');
      // }
      else if (name === '') {
        setNameError('error');
      } else if (lastName === '') {
        setLastNameError('error');
      } else if (selectedProfession === null) {
        alert('Please choose Profession');
      } else {
        let dynamicEvent = await dynamicEventLink(
          currentAuth.uid,
          userEmail,
          currentUser.company.replace(/ /g, '-'),
        );
        if (dynamicEvent) {
          await sendMailgunEmail(
            userEmail,
            `${currentUser.firstName} via Obras`,
            `${currentUser.firstName} invited you to join
              ${currentUser.company} Team.
          Click on the link: ${dynamicEvent} `,
          )
            .then(() => {
              createUser(userDetails, onSuccess);
            })
            .catch((err) => alert(err));
          // sendEmail(
          //   userEmail,
          //   `${currentUser.firstName} via Obras`,
          //   `${currentUser.firstName} invited you to join
          //     ${currentUser.company} Team.
          // Click on the link: ${dynamicEvent} `,
          // )
        }
      }
    } catch {
      (err) => console.error(err);
    }
  };

  const onSelectDate = (date) => {
    setCertificateDate(date);
    setDateModal(false);
  };

  const cancelDate = () => {
    setDateModal(false);
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.container}>
        <View style={style.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack(null)}>
            <Text style={style.textHeader}>Close</Text>
          </TouchableOpacity>
          <Text style={[style.textHeader]}>Create New User</Text>
          <View></View>
        </View>
        <KeyboardAwareScrollView>
          <View style={style.bodyContainer}>
            <View style={style.leftBodyContainer}>
              <Text style={style.type}>Type</Text>
              <View style={style.ovalBtnContainer}>
                {type?.map((name, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setUserType(index)}>
                      <OvalBtn
                        text={name.text}
                        customStyle={{
                          borderColor:
                            index === userType
                              ? Colors.primary.blue
                              : Colors.primary.gray,
                        }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View
                style={{
                  marginTop: scaleHeight * 20,
                  width: scaleWidth * 310,
                  height: scaleHeight * 60,
                }}>
                <CustomDropDown
                  data={forProfessionDropDown}
                  pickerSelection={prof}
                  onPress={(v) => selectProfessionFun(v)}
                  text={'--Choose profession--'}
                />
              </View>
              <View>
                <Text style={style.or}>{'OR'}</Text>
              </View>
              <View>
                <Input
                  placeHolder={'Ex. Mason, Laborer, Electrician'}
                  inputHeading={'Title'}
                  value={title}
                  onChange={(title) => {
                    setTitle(title), setTitleError(null);
                  }}
                  error={titleError}
                />
              </View>

              <ColorPicker
                hideSliders={true}
                onColorSelected={(color) => colourPicker(color)}
                style={{flex: 1}}
              />
              <TouchableOpacity
                style={style.createBtn}
                onPress={() => createUserType()}>
                <Text style={style.textCreate}>Create Title</Text>
              </TouchableOpacity>
              <Text style={style.type}>Project permissions</Text>
              <View style={style.ovalBtnContainer}>
                {permission.map((name, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setProjectPermission(index)}>
                      <OvalBtn
                        text={name.name}
                        customStyle={{
                          borderColor:
                            index === projectPermission
                              ? Colors.primary.blue
                              : Colors.primary.gray,
                        }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <View style={style.rightBodyContainer}>
              <Input
                placeHolder={'0000000'}
                inputHeading={'Employee ID'}
                value={employeeId}
                onChange={(employeeId) => {
                  setEmployeeId(employeeId), setEmployeeIdError(null);
                }}
                error={employeeIdError}
                customStyle={{width: scaleWidth * 450}}
                forView={{marginTop: scaleHeight * 25}}
              />
              <Input
                placeHolder={'myemail@somewhere.com'}
                inputHeading={'Email address'}
                value={userEmail}
                onChange={(email) => {
                  setEmail(email), setEmailError(null);
                }}
                customStyle={{width: scaleWidth * 450}}
                forView={{marginTop: scaleHeight * 25}}
                error={emailError}
              />
              <Input
                placeHolder={'First name'}
                inputHeading={'First name'}
                value={name}
                onChange={(name) => {
                  setName(name), setNameError(null);
                }}
                customStyle={{width: scaleWidth * 450}}
                forView={{marginTop: scaleHeight * 25}}
                error={nameError}
              />
              <Input
                placeHolder={'Last name'}
                inputHeading={'Last name'}
                value={lastName}
                onChange={(lastName) => {
                  setLastName(lastName), setLastNameError(null);
                }}
                customStyle={{width: scaleWidth * 450}}
                forView={{marginTop: scaleHeight * 25}}
                error={lastNameError}
              />
              <Input
                placeHolder={'Phone'}
                inputHeading={'Phone'}
                value={Phone}
                onChange={(Phone) => {
                  setPhone(Phone);
                }}
                customStyle={{width: scaleWidth * 450}}
                forView={{marginTop: scaleHeight * 25}}
              />

              <View style={style.certificateContainer}>
                <Input
                  placeHolder={'Certification'}
                  inputHeading={'Certification'}
                  value={Certification}
                  onChange={(text) => {
                    setCertification(text);
                  }}
                  customStyle={{width: scaleWidth * 280}}
                  forView={{marginTop: scaleHeight * 25}}
                />
                <TouchableOpacity
                  onPress={() => setDateModal(true)}
                  style={style.certificateDate}>
                  <Text style={style.dateText}>{modifyCertificateDate}</Text>
                </TouchableOpacity>
                {dateModal && (
                  <DateTimePickerModal
                    isVisible={dateModal}
                    mode="date"
                    onConfirm={onSelectDate}
                    onCancel={cancelDate}
                  />
                )}
              </View>
              <View style={style.bottomRightContainer}>
                <TouchableOpacity onPress={() => inviteUser()}>
                  <ActiveBtn text={'Invite'} />
                </TouchableOpacity>
                <Text style={style.textBelowInvite}>
                  An email will be sent for user to set up account
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};
const pickerStyle = {
  inputIOS: {
    color: Colors.primary.gray,
    backgroundColor: Colors.primary.inputBackground,
    height: scaleHeight * 40,
    paddingLeft: 10,
    borderRadius: 5,
  },
  placeholder: {
    color: Colors.primary.gray,
  },
  inputAndroid: {
    color: Colors.primary.gray,
    backgroundColor: Colors.primary.inputBackground,
    height: scaleHeight * 40,
  },
};

const styles = (insets, darkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? Colors.primary.darkBg : Colors.primary.white,
    },
    headerContainer: {
      width: '100%',
      height: scaleHeight * 74,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: scaleWidth * 20,
      backgroundColor: darkMode ? Colors.primary.darkBg : Colors.primary.blue,
      justifyContent: 'space-between',
    },
    textHeader: {
      fontSize: scaleWidth * 17,
      lineHeight: scaleWidth * 20,
      color: Colors.primary.white,
      fontFamily: Fonts.primary.regular,
    },
    bodyContainer: {
      flex: 1,
      flexDirection: 'row',
      paddingVertical: scaleHeight * 20,
      paddingHorizontal: scaleWidth * 40,
    },
    leftBodyContainer: {
      flex: 1,
      paddingRight: scaleWidth * 20,
      flexDirection: 'column',
    },
    rightBodyContainer: {
      flex: 1,
      paddingLeft: scaleWidth * 80,
      flexDirection: 'column',
    },
    type: {
      fontSize: scaleWidth * 13,
      textTransform: 'uppercase',
      marginTop: scaleHeight * 15,
      letterSpacing: 0.5,
      color: Colors.primary.subHeading,
      fontFamily: Fonts.primary.regular,
    },
    circleViewContainer: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      marginTop: scaleHeight * 20,
      paddingRight: scaleWidth * 40,
    },
    textTitle: {
      fontSize: scaleWidth * 13,
      lineHeight: scaleWidth * 15,
      marginTop: scaleHeight * 25,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      color: Colors.primary.subHeading,
      fontFamily: Fonts.primary.regular,
    },
    inputStyle: {
      fontSize: scaleWidth * 15,
      height: scaleHeight * 40,
      marginTop: scaleHeight * 7,
      color: Colors.primary.lightGray,
      backgroundColor: Colors.primary.inputBackground,
      borderRadius: 5,
      padding: 5,
      paddingLeft: scaleWidth * 15,
      margin: 0,
      borderWidth: 0,
      fontFamily: Fonts.primary.regular,
    },
    inputBox: {
      width: scaleWidth * 450,
    },
    ovalBtnContainer: {
      flexDirection: 'row',
      marginTop: scaleHeight * 10,
    },
    colorCircleView: {
      width: scaleWidth * 40,
      height: scaleWidth * 40,
      borderRadius: (scaleWidth * 40) / 2,
      marginRight: scaleWidth * 30,
      marginBottom: scaleHeight * 25,
      backgroundColor: Colors.primary.green,
    },
    createBtn: {
      width: scaleWidth * 155,
      height: scaleHeight * 45,
      borderWidth: 1,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: scaleHeight * 30,
      marginBottom: scaleHeight * 40,
      borderColor: Colors.primary.blue,
    },
    textCreate: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 21,
      color: Colors.primary.blue,
      fontFamily: Fonts.primary.regular,
    },
    bottomRightContainer: {
      alignItems: 'flex-end',
      marginTop: scaleHeight * 40,
    },
    textBelowInvite: {
      fontSize: scaleWidth * 14,
      lineHeight: scaleWidth * 16,
      marginTop: scaleHeight * 17,
      marginRight: scaleWidth * 10,
      color: darkMode ? Colors.primary.heading : Colors.primary.subHeading,
      fontFamily: Fonts.primary.regular,
    },
    or: {
      fontSize: scaleWidth * 17,
      color: Colors.primary.gray,
      textAlign: 'center',
      width: scaleWidth * 320,
    },
    certificateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    certificateDate: {
      marginTop: '40%',
      backgroundColor: darkMode
        ? Colors.primary.darkBg
        : Colors.primary.inputBackground,
      width: '100%',
    },
    dateText: {
      fontSize: scaleWidth * 12,
      fontFamily: Fonts.primary.regular,
      color: darkMode ? Colors.primary.inputBackground : Colors.primary.heading,
    },
  });
