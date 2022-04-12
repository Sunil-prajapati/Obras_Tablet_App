import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  Platform,
} from 'react-native';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import {scaleWidth, scaleHeight} from '../../utils/scaling';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ActiveBtn from '../../components/ActiveBtn';
import {createProject} from '../../utils/project';
import moment from 'moment';
import {ProjectContext} from '../../context/ProjectContext';
import {AuthContext} from '../../context/AuthContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {showNotification} from '../../utils/localIosnotification';
import {showNotificationAndroid} from '../../utils/localAndroidNotification';
import {DisplayContext} from '../../context/DisplayContext';
import CustomModal from '../../components/CustomModal';
import {UserContext} from '../../context/UserContext';

export default CreateProject = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const userContext = useContext(UserContext);
  const {users} = userContext;
  const [isModalVisible, setModalVisible] = useState(false);
  const [projectTitle, setProjectTitle] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [secondaryFirstName, setSecondaryFirstName] = useState(null);
  const [secondaryLastName, setSecondaryLastName] = useState(null);
  const [secondaryPhone, setSecondaryPhone] = useState(null);
  const [resources, setResources] = useState(null);
  const [notes, setNotes] = useState(null);
  const [toolTipCalendarVisible, setToolTipCalendarVisible] = useState(false);
  const [endToolTipCalendarVisible, setEndToolTipCalendarVisible] =
    useState(false);
  const [projectStartDate, setProjectStartDate] = useState(
    new Date().toDateString(),
  );
  const [projectEndDate, setProjectEndDate] = useState(
    new Date().toDateString(),
  );
  const [showDailyStart, setShowDailyStart] = useState(false);
  const [showDailyEnd, setShowDailyEnd] = useState(false);
  const [dailyStartTime, setDailyStartTime] = useState(new Date());
  const [dailyEndTime, setDailyEndTime] = useState(new Date());
  const projectContext = useContext(ProjectContext);
  const {getProjects, projectData, idAddUser, setAddUser} = projectContext;
  const authContext = useContext(AuthContext);
  const {currentAuth} = authContext;
  const [titleError, setTitleError] = useState(null);
  const [projectIdError, setProjectIdError] = useState(null);
  const modifyProjectStartDate =
    moment(projectStartDate).format('MMMM D, YYYY');
  const modifyProjectEndDate = moment(projectEndDate).format('MMMM D, YYYY');
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  const style = styles(insets, darkMode);

  const onSuccess = (message) => {
    console.log(message);
    setModalVisible(true);
    // modalHandler();

    getProjects();
    if (Platform == 'ios') {
      showNotification('Project', 'Project created Successfully');
    } else {
      showNotificationAndroid('Project', 'Project created Successfully');
    }

    // navigation.navigate('Projects');
  };

  function titleExists(projectTitle) {
    return projectData.some(function (el) {
      return el.projectTitle == projectTitle;
    });
  }

  function projectIdExists(projectId) {
    return projectData.some(function (el) {
      return el.projectId == projectId;
    });
  }

  const createProjectClicked = () => {
    let projectDetails = {
      projectTitle,
      projectId,
      firstName,
      lastName,
      phone,
      address,
      city,
      state,
      zipCode,
      secondaryFirstName,
      secondaryLastName,
      secondaryPhone,
      projectStartDate: modifyProjectStartDate,
      projectEndDate: modifyProjectEndDate,
      vehicle,
      resources,
      dailyStartTime: moment(dailyStartTime).utcOffset('+05:30').format(),
      dailyEndTime: moment(dailyEndTime).utcOffset('+05:30').format(),
      notes,
      isActive: true,
      adminId: currentAuth.uid,
      assignedEmployees: [],
      PublishedDate: [],
    };

    // if (projectTitle === null || titleExists(projectTitle)) {
    //     setTitleError("error")
    // } else {

    // }
    createProject(projectDetails, onSuccess);
  };

  useEffect(() => {
    setTitleError(null);
    return () => {
      console.log('create project');
    };
  }, []);

  const StartHandleConfirm = (time) => {
    setDailyStartTime(time);
    setShowDailyStart(false);
  };

  const hideStartTime = () => {
    setShowDailyStart(false);
  };

  const projectStartConfirm = (date) => {
    setProjectStartDate(date);
    setToolTipCalendarVisible(false);
  };

  const projectStartCancel = () => {
    setToolTipCalendarVisible(false);
  };

  const projectEndConfirm = (date) => {
    setProjectEndDate(date);
    setEndToolTipCalendarVisible(false);
  };

  const projectEndCancel = () => {
    setEndToolTipCalendarVisible(false);
  };

  const EndHandleConfirm = (time) => {
    setDailyEndTime(time);
    setShowDailyEnd(false);
  };
  const hideEndTime = (time) => {
    setShowDailyEnd(false);
  };

  const modalHandler = () => {
    idAddUser;
    setAddUser(true);
    setModalVisible(false);
    if (users.length <= 0) {
      navigation.navigate('CreateUser', {
        projectDetails: null,
      });
    } else {
      navigation.navigate('Projects');
    }
  };
  const skipHandle = () => {
    setModalVisible(false);
  };
  // const projectStartTimeClicked = () => {
  //     setShowProjectStartTime(true)
  // }
  return (
    <View style={style.container}>
      <CustomModal
        setVisible={isModalVisible}
        callBack={modalHandler}
        nextStepText={'Next'}
        skip={skipHandle}
        line={
          users.lenght <= 0
            ? 'You have successfully created a project! This project won’t appear in active until a member is assigned, would you like to create a user?”'
            : 'You have successfully created a project! This project won’t appear in active until a member is assigned, would you like to assign a member?'
        }
        buttonText={'Close'}
      />
      <View style={style.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack(null)}>
          <Text style={style.textHeader}>Close</Text>
        </TouchableOpacity>
        <Text style={style.textHeader}>New Project</Text>
        <TouchableOpacity onPress={() => navigation.goBack(null)}>
          <Text style={style.textHeader}>Create</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView>
        <View style={style.bodyContainer}>
          <View style={style.leftBodyContainer}>
            <View style={style.titleId}>
              <View style={{flexDirection: 'column'}}>
                <Text style={style.textTitle}>Project title</Text>
                <TextInput
                  style={[
                    style.inputStyle,
                    style.titleIdWidth,
                    {
                      borderColor:
                        titleError && titleError !== null
                          ? Colors.primary.red
                          : null,
                      borderWidth: titleError && titleError !== null ? 1 : null,
                    },
                  ]}
                  placeholder={'Project title'}
                  value={projectTitle}
                  onChangeText={(title) => {
                    setProjectTitle(title), setTitleError(null);
                  }}
                />
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text style={style.textTitle}>Project ID</Text>
                <TextInput
                  style={[
                    style.inputStyle,
                    style.titleIdWidth,
                    {
                      borderColor:
                        projectIdError && projectIdError !== null
                          ? Colors.primary.red
                          : null,
                      borderWidth:
                        projectIdError && projectIdError !== null ? 1 : null,
                    },
                  ]}
                  placeholder={'Project ID'}
                  value={projectId}
                  onChangeText={(projectId) => {
                    setProjectId(projectId), setProjectIdError(null);
                  }}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={style.addressContainer}>
              <Text style={style.textTitle}>Address</Text>
              <TextInput
                style={[style.inputStyle, style.inputBoxWidthCommon]}
                placeholder={'Address'}
                value={address}
                onChangeText={(address) => setAddress(address)}
              />
            </View>

            <View
              style={[style.cityContainer, {marginBottom: scaleHeight * 25}]}>
              <View>
                <Text style={style.textTitle}>City</Text>
                <TextInput
                  style={[style.inputStyle, style.inputBoxWidthCity]}
                  placeholder={'City'}
                  value={city}
                  onChangeText={(city) => setCity(city)}
                />
              </View>
              <View style={style.stateContainer}>
                <Text style={style.textTitle}>State</Text>
                <TextInput
                  style={[style.inputStyle, style.inputBoxWidthState]}
                  placeholder={'ST'}
                  value={state}
                  onChangeText={(state) => setState(state)}
                />
              </View>
              <View>
                <Text style={style.textTitle}>ZIP Code</Text>
                <TextInput
                  style={[style.inputStyle, style.inputBoxWidthZipCode]}
                  placeholder={'ZIP Code'}
                  value={zipCode}
                  onChangeText={(zipCode) => setZipCode(zipCode)}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <Text style={[style.textTitle, style.textProjectStart]}>
              Project start
            </Text>
            <View style={style.projectStartContainer}>
              <Text style={style.textHeading}>Starts</Text>
              <View style={style.dateTimeContainer}>
                <TouchableOpacity
                  onPress={() => setToolTipCalendarVisible(true)}>
                  <Text style={style.timeText}>{modifyProjectStartDate}</Text>
                </TouchableOpacity>
                {toolTipCalendarVisible && (
                  <DateTimePickerModal
                    isVisible={toolTipCalendarVisible}
                    mode="date"
                    onConfirm={projectStartConfirm}
                    onCancel={projectStartCancel}
                  />
                )}
              </View>
            </View>

            <View style={style.projectStartContainer}>
              <Text style={style.textHeading}>Ends</Text>
              <View style={style.dateTimeContainer}>
                <TouchableOpacity
                  onPress={() => setEndToolTipCalendarVisible(true)}>
                  <Text style={style.timeText}>{modifyProjectEndDate}</Text>
                </TouchableOpacity>

                {endToolTipCalendarVisible && (
                  <DateTimePickerModal
                    isVisible={endToolTipCalendarVisible}
                    mode="date"
                    onConfirm={projectEndConfirm}
                    onCancel={projectEndCancel}
                  />
                )}
              </View>
            </View>
            <Text style={[style.textTitle, style.textDaily]}>Daily</Text>
            <View style={style.projectStartContainer}>
              <Text style={style.textHeading}>Starts</Text>
              <View style={style.dateTimeContainer}>
                <TouchableOpacity onPress={() => setShowDailyStart(true)}>
                  <Text style={style.textValue}>
                    {dailyStartTime &&
                      dailyStartTime.toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                  </Text>
                </TouchableOpacity>

                <DateTimePickerModal
                  isVisible={showDailyStart}
                  mode="time"
                  onConfirm={StartHandleConfirm}
                  onCancel={hideStartTime}
                  date={new Date()}
                />
              </View>
            </View>
            <View style={style.projectStartContainer}>
              <Text style={style.textHeading}>Ends</Text>
              <View style={style.dateTimeContainer}>
                <TouchableOpacity onPress={() => setShowDailyEnd(true)}>
                  <Text style={style.textValue}>
                    {dailyEndTime &&
                      dailyEndTime.toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                  </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={showDailyEnd}
                  mode="time"
                  onConfirm={EndHandleConfirm}
                  onCancel={hideEndTime}
                  date={new Date()}
                />
              </View>
            </View>
            <View style={style.cityContainer}>
              <View style={style.notesContainer}>
                <Text style={style.textTitle}>Notes</Text>
                <TextInput
                  style={[style.inputStyle, style.inputBoxNotes]}
                  placeholder={'Notes'}
                  multiline={true}
                  value={notes}
                  onChangeText={(notes) => setNotes(notes)}
                />
              </View>
            </View>
          </View>
          <View style={style.rightBodyContainer}>
            <Text style={style.textTitle}>Primary Contact</Text>
            <View style={style.contactContainer}>
              <View>
                <Text style={style.textTitle}>First name</Text>
                <TextInput
                  style={[style.inputStyle, style.inputBoxRightWidth]}
                  placeholder={'First Name'}
                  value={firstName}
                  onChangeText={(firstName) => setFirstName(firstName)}
                />
              </View>
              <View>
                <Text style={style.textTitle}>Last name</Text>
                <TextInput
                  style={[style.inputStyle, style.inputBoxRightWidth]}
                  placeholder={'Last Name'}
                  value={lastName}
                  onChangeText={(lastName) => setLastName(lastName)}
                />
              </View>
              <View>
                <Text style={[style.textTitle, {marginTop: scaleHeight * 15}]}>
                  Phone
                </Text>
                <TextInput
                  style={[style.inputStyle, style.inputBoxRightWidth]}
                  placeholder={'Phone'}
                  value={phone}
                  onChangeText={(phone) => setPhone(phone)}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <Text style={style.textTitle}>Secondary Contact</Text>
            <View style={style.contactContainer}>
              <View>
                <Text style={style.textTitle}>First name</Text>
                <TextInput
                  style={[style.inputStyle, style.inputBoxRightWidth]}
                  placeholder={'First name'}
                  value={secondaryFirstName}
                  onChangeText={(secondaryFirstName) =>
                    setSecondaryFirstName(secondaryFirstName)
                  }
                />
              </View>
              <View>
                <Text style={style.textTitle}>Last name</Text>
                <TextInput
                  style={[style.inputStyle, style.inputBoxRightWidth]}
                  placeholder={'Last name'}
                  value={secondaryLastName}
                  onChangeText={(secondaryLastName) =>
                    setSecondaryLastName(secondaryLastName)
                  }
                />
              </View>
              <View>
                <Text style={[style.textTitle, {marginTop: scaleHeight * 15}]}>
                  Phone
                </Text>
                <TextInput
                  style={[style.inputStyle, style.inputBoxRightWidth]}
                  placeholder={'Phone'}
                  value={secondaryPhone}
                  onChangeText={(secondaryPhone) =>
                    setSecondaryPhone(secondaryPhone)
                  }
                  keyboardType="numeric"
                />
              </View>
            </View>
            <Text style={[style.textTitle, style.textProjectStart]}>
              Vehicle
            </Text>
            <View style={style.vehicleContainer}>
              <TextInput
                style={style.inputVehicle}
                value={vehicle}
                onChangeText={(vehicle) => setVehicle(vehicle)}
                placeholder="Vehicle"
                placeholderTextColor={Colors.primary.lightGray}
                onSubmitEditing={Keyboard.dismiss}
              />
            </View>

            <Text
              style={[
                style.textTitle,
                style.textProjectStart,
                {marginTop: scaleHeight * 20},
              ]}>
              Resources/Equipment
            </Text>
            <View
              style={[
                style.vehicleContainer,
                {marginBottom: scaleHeight * 35},
              ]}>
              <TextInput
                style={style.inputVehicle}
                value={resources}
                onChangeText={(resources) => setResources(resources)}
                placeholder="Resources"
                placeholderTextColor={Colors.primary.lightGray}
              />
            </View>

            <View style={style.btnCreateContainer}>
              <TouchableOpacity onPress={() => createProjectClicked()}>
                <ActiveBtn text={'Create'} />
              </TouchableOpacity>
            </View>
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
      backgroundColor: darkMode ? Colors.primary.darkBg : Colors.primary.white,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    headerContainer: {
      width: '100%',
      height: scaleHeight * 74,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: scaleWidth * 20,
      backgroundColor: darkMode ? Colors.primary.darkBg : Colors.primary.blue,
    },
    textHeader: {
      fontSize: scaleWidth * 17,
      lineHeight: scaleWidth * 20,
      color: Colors.primary.white,
      fontFamily: Fonts.primary.regular,
    },
    bodyContainer: {
      // flex: 1,
      flexDirection: 'row',
      paddingHorizontal: scaleWidth * 40,
      paddingVertical: scaleHeight * 23,
    },
    leftBodyContainer: {
      flex: 1,
      paddingRight: scaleWidth * 20,
      flexDirection: 'column',
    },
    rightBodyContainer: {
      flex: 1,
      paddingRight: scaleWidth * 10,
      flexDirection: 'column',
    },
    textTitle: {
      fontSize: scaleWidth * 13,
      lineHeight: scaleWidth * 15,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      color: Colors.primary.subHeading,
      fontFamily: Fonts.primary.regular,
    },
    textProjectStart: {
      marginBottom: scaleHeight * 10,
    },
    textDaily: {
      marginBottom: scaleHeight * 12,
      marginTop: scaleHeight * 40,
    },
    inputStyle: {
      fontSize: scaleWidth * 15,
      height: scaleHeight * 40,
      marginTop: scaleHeight * 7,
      color: darkMode
        ? Colors.primary.darkInputHeading
        : Colors.primary.darkBlack,
      backgroundColor: darkMode
        ? Colors.primary.headingTextColor
        : Colors.primary.inputBackground,
      borderRadius: 5,
      padding: 5,
      margin: 0,

      fontFamily: Fonts.primary.regular,
    },
    inputBoxWidthCommon: {
      width: scaleWidth * 451,
    },
    inputBoxWidthCity: {
      width: scaleWidth * 187,
    },
    inputBoxWidthState: {
      width: scaleWidth * 78,
    },
    inputBoxWidthZipCode: {
      width: scaleWidth * 158,
    },
    addressContainer: {
      flexDirection: 'column',
      marginTop: scaleHeight * 20,
    },
    cityContainer: {
      width: '100%',
      flexDirection: 'row',
      marginTop: scaleHeight * 20,
      marginBottom: scaleHeight * 46,
    },
    stateContainer: {
      flexDirection: 'column',
      marginHorizontal: scaleWidth * 14,
    },
    projectStartContainer: {
      width: scaleHeight * 465,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingBottom: scaleHeight * 10,
      marginTop: scaleHeight * 11,
      borderBottomWidth: 0.5,
      borderBottomColor: Colors.primary.line,
    },
    dateTimeContainer: {
      width: scaleWidth * 300,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    textHeading: {
      fontSize: scaleWidth * 17,
      lineHeight: scaleWidth * 22,
      letterSpacing: -0.4,
      color: darkMode
        ? Colors.primary.darkInputHeading
        : Colors.primary.darkBlack,
      fontFamily: Fonts.primary.regular,
    },
    textValue: {
      fontSize: scaleWidth * 16,
      lineHeight: scaleWidth * 19,
      textAlign: 'right',
      marginHorizontal: scaleWidth * 20,
      color: darkMode
        ? Colors.primary.darkInputHeading
        : Colors.primary.calenderButtonTextColor,
      fontFamily: Fonts.primary.regular,
    },
    inputBoxRightWidth: {
      width: scaleWidth * 223,
    },
    inputBoxNotes: {
      width: scaleWidth * 480,
      height: scaleHeight * 89,
      paddingTop: 5,
      textAlignVertical: 'top',
    },
    notesContainer: {
      flexDirection: 'column',
    },
    vehicleContainer: {
      width: scaleHeight * 487,
      alignItems: 'center',
      flexDirection: 'row',
      paddingBottom: scaleHeight * 5,
      borderBottomWidth: 0.5,
      borderBottomColor: Colors.primary.line,
    },
    inputVehicle: {
      width: '100%',
      height: scaleHeight * 25,
      fontSize: scaleWidth * 17,
      color: darkMode
        ? Colors.primary.darkInputHeading
        : Colors.primary.darkBlack,
      padding: 0,
      margin: 0,
      borderWidth: 0,
      fontFamily: Fonts.primary.regular,
    },
    btnCreateContainer: {
      alignItems: 'flex-end',
    },
    contactContainer: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: scaleHeight * 20,
      marginBottom: scaleHeight * 26,
    },
    titleId: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '93%',
    },
    titleIdWidth: {
      width: scaleWidth * 210,
    },
    timeText: {
      color: darkMode ? Colors.primary.darkInputHeading : Colors.primary.black,
    },
  });
