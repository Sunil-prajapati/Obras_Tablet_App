import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  ImageBackground,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';
import TeamMemberProfile from '../../components/TeamMemberProfile';
import {styles, stylesAssign} from './styleProjectDetail';
import CalendarStrip from 'react-native-calendar-strip';
import Colors from '../../constants/Colors';
import moment from 'moment';
import {scaleWidth} from '../../utils/scaling';
import {updateProject} from '../../utils/project';
import ProjectActiveInactiveConfirm from '../../components/ProjectActiveInactiveConfirm';
import {ProjectContext} from '../../context/ProjectContext';
import {UserContext} from '../../context/UserContext';
import CustomMenu from '../../components/CustomMenu';
import profileDemo from '../../assets/images/profile/user.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as _ from 'lodash';
import {DisplayContext} from '../../context/DisplayContext';

const gestureRootViewStyle = {flex: 1};

export default ProjectDetail = (props) => {
  const {projectDetails} = props.route.params;
  const {temp} = props.route.params;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [showAssignView, setAssignView] = useState(false);
  const AddUser = require('../../assets/icons/add_user.png');
  const Marker = require('../../assets/icons/location_marker.png');
  const Message = require('../../assets/icons/message.png');
  const ChatBox = require('../../assets/icons/chat_box.png');
  const Search = require('../../assets/icons/search.png');
  const Filter = require('../../assets/icons/filter.png');
  const CrossBlack = require('../../assets/icons/cross_black.png');
  const [inputDisabled, setInputDisabled] = useState(false);
  const [address, setAddress] = useState(projectDetails.address);
  const [projectTitle, setProjectTitle] = useState(projectDetails.projectTitle);
  const [cityState, setcityState] = useState(projectDetails.state);
  const [city, setCity] = useState(projectDetails.city);
  const [zipCode, setZipCode] = useState(projectDetails.zipCode);
  const [primaryContact, setPrimaryContact] = useState(
    projectDetails.firstName,
  );
  const [phone, setPhone] = useState(projectDetails.phone);
  const [secondaryContact, setSecondaryContact] = useState(
    projectDetails.secondaryFirstName,
  );
  const [secondaryPhone, setSecondaryPhone] = useState(
    projectDetails.secondaryPhone,
  );
  const [vehicle, setVehicle] = useState(projectDetails.vehicle);
  const [resource, setResource] = useState(projectDetails.resources);
  const [notes, setNotes] = useState(projectDetails.notes);
  const [toolTipCalendarVisible, setToolTipCalendarVisible] = useState(false);
  const [endToolTipCalendarVisible, setEndToolTipCalendarVisible] =
    useState(false);
  const [showDailyStart, setShowDailyStart] = useState(false);
  const [showDailyEnd, setShowDailyEnd] = useState(false);
  const [showActiveConfirmDialog, setActiveConfirmDialog] = useState(false);
  const projectContext = useContext(ProjectContext);
  const {getProjects, projectData} = projectContext;
  const userContext = useContext(UserContext);
  const {getUser, users, setCount} = userContext;
  const [isCustomMenuVisible, setIsCustomMenuVisible] = useState(false);
  const [selectedTeamMemberDetails, setSelectedTeamMemberDetails] = useState({
    name: '',
    selectedProfession: '',
    email: '',
    lastName: '',
    professionColor: '',
    employeeId: '',
  });
  const [selectedProjectDetails, setSelectedProjectDetails] = useState({});
  const [searchedData, setSearchedData] = useState([]);
  const [query, setQuery] = useState('');

  const modifyProjectStartDate = moment(projectDetails.projectStartDate).format(
    'MMMM D, YYYY',
  );
  const modifyProjectEndDate = moment(projectDetails.projectEndDate).format(
    'MMMM D, YYYY',
  );

  const [projectStartDate, setProjectStartDate] = useState(
    modifyProjectStartDate,
  );

  const [dailyStartTimeState, setDailyStartTimeState] = useState(
    new Date(projectDetails.dailyStartTime),
  );
  const [editable, setEditable] = useState(false);

  const [dailyEndTimeState, setDailyEndTimeState] = useState(
    new Date(projectDetails.dailyEndTime),
  );
  const [projectEndDate, setProjectEndDate] = useState(modifyProjectEndDate);
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  const style = styles(insets, darkMode);
  const styleA = stylesAssign(insets, darkMode);
  var startTime = moment(dailyStartTimeState);
  var endTime = moment(dailyEndTimeState);
  var difference = endTime.diff(startTime, 'hours', true);
  var dailyTime = Math.abs(difference.toString().substr(0, 4));

  var message = `Are you sure you want to ${
    projectDetails.isActive === false ? 'Activate' : 'Deactivate'
  }`;

  var projectName = projectDetails.city;

  useEffect(() => {
    setSearchedData(users);
    getUser();
    return () => {
      console.log('cleanup');
    };
  }, []);

  let teamMembers = [];
  projectData?.forEach((item) => {
    item?.assignedEmployees?.map((employeeData) => {
      if (employeeData.userRestDetails.isActive === true) {
        var hasUser = employeeData.projectId.includes(projectDetails.id);
        if (hasUser == true) {
          teamMembers.push(employeeData);
        }
      }
    });
  });

  const edit = () => {
    setEditable(true);
    setInputDisabled(true);
  };

  const modalHandler = () => {
    setModalVisible(false);
  };

  const showProjectAssignView = () => {
    setAssignView(true);
  };

  const clickCancel = () => {
    showAssignView ? setAssignView(false) : navigation.goBack(null);
  };
  const StartHandleConfirm = (time) => {
    setDailyStartTimeState(time);
    setShowDailyStart(false);
  };

  const hideStartTime = () => {
    setShowDailyStart(false);
  };

  const onSuccess = (msg) => {
    console.log(msg);
    getProjects();
  };

  const activateOrDeactivate = () => {
    setActiveConfirmDialog(true);
  };

  const onActivateOrDeactivate = (msg) => {
    console.log(msg);
    getProjects();
  };

  const confirm = () => {
    setActiveConfirmDialog(false);
    if (projectDetails.isActive === true) {
      let details = {
        isActive: false,
      };
      updateProject(details, projectDetails.id, onActivateOrDeactivate);
    } else {
      let details = {
        isActive: true,
      };

      updateProject(details, projectDetails.id, onActivateOrDeactivate);
    }
  };

  const cancel = () => {
    setActiveConfirmDialog(false);
  };

  const saveDetails = () => {
    let projectDetail = {
      address,
      city,
      state: cityState,
      zipCode,
      projectTitle,
      projectStartDate: moment(projectStartDate).format(),
      projectEndDate: moment(projectEndDate).format(),
      dailyStartTime: moment(dailyStartTimeState).utcOffset('+05:30').format(),
      dailyEndTime: moment(dailyEndTimeState).utcOffset('+05:30').format(),
      fullName: primaryContact,
      phone,
      secondaryFullName: secondaryContact,
      secondaryPhone,
      vehicle,
      resources: resource,
      notes,
      isActive: projectDetails.isActive,
    };
    let documentId = {
      id: projectDetails.id,
    };
    updateProject(projectDetail, documentId.id, onSuccess);
    setEditable(!true);
  };

  const menuOptions = [
    {
      title: 'Create new user',
    },
    {
      title: 'Import users',
    },
  ];

  const selectItem = () => {
    setIsCustomMenuVisible(false);
    navigation.navigate('CreateUser', {oneProjectDetail: projectDetails});
  };
  const closeModel = () => {
    setIsCustomMenuVisible(false);
  };

  const addTeamMember = () => {
    setIsCustomMenuVisible(true);
  };

  const showTeamMemberDetails = (item, projectData) => {
    setSelectedTeamMemberDetails({
      name: item.name,
      selectedProfession: item.selectedProfession,
      email: item.email,
      lastName: item.lastName,
      professionColor: item.professionColor,
      projectPermission: item.projectPermission,
      projectId: item.projectId,
      userType: item.userType,
      employeeId: item.employeeId,
      userId: item.userId,
      createdAt: item.createdAt,
      isActive: item.isActive,
      certification: item.Certification,
      certificationDate: item.certificateDate,
    });
    setSelectedProjectDetails(projectData);
    setModalVisible(true);
  };

  const projectStartConfirm = (date) => {
    const mDate = moment(date).format('MMMM D, YYYY');
    setProjectStartDate(mDate);
    setToolTipCalendarVisible(false);
  };

  const projectStartCancel = () => {
    setToolTipCalendarVisible(false);
  };

  const projectEndConfirm = (date) => {
    const eDate = moment(date).format('MMMM D, YYYY');
    setProjectEndDate(eDate);
    setEndToolTipCalendarVisible(false);
  };

  const projectEndCancel = () => {
    setEndToolTipCalendarVisible(false);
  };

  const EndHandleConfirm = (time) => {
    setDailyEndTimeState(time);
    setShowDailyEnd(false);
  };

  const hideEndTime = (time) => {
    setShowDailyEnd(false);
  };

  const handleSearch = (text) => {
    if (text) {
      const newData = users.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return (
          itemData.indexOf(textData) > -1 ||
          item.email.toUpperCase().indexOf(textData) > -1 ||
          item.employeeId?.toUpperCase().indexOf(textData) > -1
        );
      });
      setSearchedData(newData);
      setQuery(text);
    } else {
      setSearchedData(users);
      setQuery(text);
    }
  };

  const renderTeamMembers = ({item}) => {
    return (
      <>
        {item.userRestDetails.isActive === true ? (
          <View style={style.chatPersonContainer}>
            <TouchableOpacity
              onPress={() => showTeamMemberDetails(item.userRestDetails, item)}>
              <Image
                style={[
                  style.avatarImage,
                  {
                    borderColor:
                      item.userRestDetails.professionColor !== ''
                        ? item.userRestDetails.professionColor
                        : '#fff',
                  },
                ]}
                source={profileDemo}
              />
            </TouchableOpacity>
            <View style={style.nameContainer}>
              <Text style={style.name}>{item.userRestDetails.name}</Text>
              <Text style={style.occupation}>
                {item.userRestDetails.selectedProfession}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  {name: 'Messages', params: {query: item}},
                  setCount(true),
                )
              }>
              <Image style={style.chatBox} source={ChatBox} />
            </TouchableOpacity>
          </View>
        ) : null}
      </>
    );
  };

  const renderTeamAssign = ({item}) => {
    return (
      <>
        {item.isActive === true ? (
          <View style={style.chatPersonContainer}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image
                style={[
                  style.avatarImage,
                  {
                    borderColor:
                      item.professionColor !== ''
                        ? item.professionColor
                        : '#fff',
                  },
                ]}
                source={profileDemo}
              />
            </TouchableOpacity>
            <View style={style.nameContainer}>
              <Text style={style.name}>{item.name}</Text>
              <Text style={style.occupation}>{item.selectedProfession}</Text>
            </View>
          </View>
        ) : null}
      </>
    );
  };

  const renderAssignedMemberView = ({item}) => {
    return (
      <>
        <View style={styleA.profileWithCrossView}>
          <ImageBackground
            style={styleA.profileImage}
            source={profileDemo}
            imageStyle={[
              styleA.imageBackground,
              {
                borderColor:
                  item.userRestDetails.professionColor !== ''
                    ? item.userRestDetails.professionColor
                    : '#fff',
              },
            ]}>
            <TouchableOpacity
              style={styleA.crossTouchable}
              onPress={() => null}>
              <Image style={[styleA.crossIcon]} source={CrossBlack} />
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </>
    );
  };

  return (
    <GestureHandlerRootView style={gestureRootViewStyle}>
      <SafeAreaView style={style.container}>
        <ProjectActiveInactiveConfirm
          setVisible={showActiveConfirmDialog}
          message={message}
          projectName={projectName}
          confirm={confirm}
          cancel={cancel}
        />
        <CustomMenu
          setVisible={isCustomMenuVisible}
          menuOptions={menuOptions}
          callBack={selectItem}
          close={closeModel}
        />
        <TeamMemberProfile
          setVisible={isModalVisible}
          callBack={modalHandler}
          teamMemberDetails={selectedTeamMemberDetails}
          projectMemberDetails={selectedProjectDetails}
        />
        <View style={style.container}>
          <View style={style.headerContainer}>
            <TouchableOpacity onPress={() => clickCancel()}>
              <Text style={style.textHeader}>Close</Text>
            </TouchableOpacity>
            <Text style={style.textHeader}>{projectTitle}</Text>
            <TouchableOpacity
              style={style.addUserIcon}
              onPress={() => showProjectAssignView()}>
              <Image style={style.icons} source={AddUser} />
            </TouchableOpacity>
          </View>
          <View style={style.bodyContainer}>
            <KeyboardAwareScrollView>
              <View style={style.leftBodyContainer}>
                <View style={style.labourHrsContainer}>
                  <Text style={style.textLabourHrs}>Labor hrs</Text>
                  <View style={style.hrsContainer}>
                    <Text style={style.textHrs}>
                      {dailyTime * teamMembers.length}
                    </Text>
                    <Text style={style.textTitle}>{'Total'}</Text>
                  </View>
                  {teamMembers.map((name, index) => {
                    return (
                      <View key={index} style={style.hrsContainer}>
                        <Text style={style.textHrs}>{dailyTime}</Text>
                        <Text style={style.textTitle}>
                          {name.userRestDetails?.selectedProfession}
                        </Text>
                      </View>
                    );
                  })}
                </View>
                <View style={style.rowTwoContainer}>
                  <View style={style.viewRowTwoLeft}>
                    <TextInput
                      style={[style.textHrs, style.textLabourHrs]}
                      value={projectTitle}
                      onChangeText={(title) => setProjectTitle(title)}
                      editable={inputDisabled}
                    />
                  </View>
                  <View style={style.viewRowTwoRight}>
                    <View style={style.viewTemp}>
                      <Text style={style.textTemperature}>
                        {temp === undefined ? null : temp.temperature}ºF
                      </Text>
                      <Image
                        style={style.temperature}
                        source={{
                          uri: `http://openweathermap.org/img/w/${
                            temp === undefined ? null : temp.weatherIcon
                          }.png`,
                        }}
                      />
                    </View>
                    {editable === false ? (
                      <TouchableOpacity onPress={() => edit()}>
                        <Text style={style.editBtn}>{'Edit'}</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => saveDetails()}>
                        <Text style={style.editBtn}>Save</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                <View style={style.rowView}>
                  <View style={[style.columnView, {width: scaleWidth * 310}]}>
                    <Text style={style.title}>address</Text>
                    <View style={style.viewAddress}>
                      <Image style={style.marker} source={Marker} />
                      <TextInput
                        style={style.textHrs}
                        value={address}
                        onChangeText={(address) => setAddress(address)}
                        editable={inputDisabled}
                      />
                    </View>
                  </View>
                  <View style={[style.columnView, {width: scaleWidth * 310}]}>
                    <Text style={style.title}>city</Text>
                    <TextInput
                      style={style.address}
                      value={city}
                      onChangeText={(city) => setCity(city)}
                      editable={inputDisabled}
                    />
                  </View>
                </View>
                <View style={style.rowView}>
                  <View style={[style.columnView, {width: scaleWidth * 310}]}>
                    <Text style={style.title}>State</Text>
                    <TextInput
                      style={style.address}
                      value={cityState}
                      onChangeText={(cityState) => setcityState(cityState)}
                      editable={inputDisabled}
                    />
                  </View>
                  <View style={[style.columnView, {width: scaleWidth * 310}]}>
                    <Text style={style.title}>ZipCode</Text>
                    <TextInput
                      style={style.address}
                      value={zipCode}
                      onChangeText={(zipCode) => setZipCode(zipCode)}
                      editable={inputDisabled}
                    />
                  </View>
                </View>
                <View style={style.rowView}>
                  <View style={[style.columnView, {width: scaleWidth * 310}]}>
                    <Text style={style.title}>Project Start</Text>
                    <TouchableOpacity
                      onPress={() =>
                        setToolTipCalendarVisible(inputDisabled ? true : false)
                      }>
                      <Text style={style.textValueTime}>
                        {projectStartDate}{' '}
                      </Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                      isVisible={toolTipCalendarVisible}
                      mode="date"
                      onConfirm={projectStartConfirm}
                      onCancel={projectStartCancel}
                    />
                  </View>
                  <View style={[style.columnView, {width: scaleWidth * 315}]}>
                    <Text style={style.title}>Project End</Text>
                    <TouchableOpacity
                      onPress={() =>
                        setEndToolTipCalendarVisible(
                          inputDisabled ? true : false,
                        )
                      }>
                      <Text style={style.textValueTime}>{projectEndDate}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                      isVisible={endToolTipCalendarVisible}
                      mode="date"
                      onConfirm={projectEndConfirm}
                      onCancel={projectEndCancel}
                    />
                  </View>
                </View>
                <View style={style.rowView}>
                  <View style={style.columnView}>
                    <Text style={style.title}>Daily Start</Text>
                    <TouchableOpacity
                      onPress={() =>
                        setShowDailyStart(inputDisabled ? true : false)
                      }>
                      <Text style={style.textValue}>
                        {dailyStartTimeState &&
                          dailyStartTimeState.toLocaleTimeString('fr-FR', {
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
                  <View style={style.columnView}>
                    <Text style={style.title}>Daily End</Text>
                    <TouchableOpacity
                      onPress={() =>
                        setShowDailyEnd(inputDisabled ? true : false)
                      }>
                      <Text style={style.textValue}>
                        {dailyEndTimeState &&
                          dailyEndTimeState.toLocaleTimeString('fr-FR', {
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

                <View style={[style.rowView, style.rowView2]}>
                  <View style={style.columnView}>
                    <Text style={style.title}>Primary Contact</Text>
                    <TextInput
                      style={[style.textValue, style.textValue2]}
                      value={primaryContact}
                      onChangeText={(cont) => setPrimaryContact(cont)}
                      editable={inputDisabled}
                    />
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={style.columnView}>
                      <Text style={style.title}>Phone</Text>
                      <TextInput
                        style={[style.textValue, style.textValue2]}
                        value={phone}
                        onChangeText={(phone) => setPhone(phone)}
                        editable={inputDisabled}
                      />
                    </View>
                    <View style={style.buttonView}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Messages')}>
                        <View style={{flexDirection: 'row'}}>
                          <Image style={style.messageIcon} source={Message} />
                          <Text style={style.textMessage}>Message</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View style={[style.rowView, style.rowView2]}>
                  <View style={style.columnView}>
                    <Text style={style.title}>Secondary Contact</Text>
                    <TextInput
                      style={[style.textValue, style.textValue2]}
                      value={secondaryContact}
                      onChangeText={(secondaryContact) =>
                        setSecondaryContact(secondaryContact)
                      }
                      editable={inputDisabled}
                    />
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={style.columnView}>
                      <Text style={style.title}>Phone</Text>
                      <TextInput
                        style={[style.textValue, style.textValue2]}
                        value={secondaryPhone}
                        onChangeText={(secondaryPhone) =>
                          setSecondaryPhone(secondaryPhone)
                        }
                        editable={inputDisabled}
                      />
                    </View>
                    <View style={style.buttonView}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Messages')}>
                        <View style={{flexDirection: 'row'}}>
                          <Image style={style.messageIcon} source={Message} />
                          <Text style={style.textMessage}>Message</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View style={[style.rowView, style.rowView2]}>
                  <View style={style.columnView}>
                    <Text style={style.title}>Vehicle</Text>
                    <TextInput
                      style={[style.textValue, style.textValue3]}
                      value={vehicle}
                      onChangeText={(vehicle) => setVehicle(vehicle)}
                      editable={inputDisabled}
                    />
                  </View>
                </View>

                <View style={[style.rowView, style.rowView2]}>
                  <View style={style.columnView}>
                    <Text style={style.title}>Resources/Equipment</Text>
                    <TextInput
                      style={[style.textValue, style.textValue3]}
                      value={resource}
                      onChangeText={(resource) => setResource(resource)}
                      editable={inputDisabled}
                    />
                  </View>
                </View>

                <View style={[style.rowView, style.rowView2]}>
                  <View style={style.columnView}>
                    <Text style={style.title}>Notes</Text>
                    <TextInput
                      style={[style.textValue, style.textValue3]}
                      value={notes}
                      multiline={true}
                      onChangeText={(notes) => setNotes(notes)}
                      editable={inputDisabled}
                    />
                  </View>
                </View>

                <TouchableOpacity onPress={() => activateOrDeactivate()}>
                  <View style={style.deactivate}>
                    <Text style={style.textMessage}>
                      {projectDetails.isActive === false
                        ? 'Activate'
                        : 'Deactivate'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </KeyboardAwareScrollView>
            <View style={style.rightBodyContainer}>
              <View style={style.viewTeamMembers}>
                <Text style={style.textTeamMembers}>Team Members</Text>
              </View>
              {teamMembers.length == 0 ? (
                <TouchableOpacity onPress={() => addTeamMember()}>
                  <View style={style.addTeamView}>
                    <View style={style.addButtonView}>
                      <Text style={style.textPlus}>+</Text>
                    </View>
                    <Text style={style.textAddTeam}> Add team member </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <View style={style.container}>
                  <CalendarStrip
                    calendarHeaderStyle={{
                      color: darkMode
                        ? Colors.primary.white
                        : Colors.primary.darkGray,
                    }}
                    dateNumberStyle={{
                      color: darkMode
                        ? Colors.primary.white
                        : Colors.primary.darkGray,
                    }}
                    dateNameStyle={{
                      color: darkMode
                        ? Colors.primary.white
                        : Colors.primary.darkGray,
                    }}
                    minDate={new Date()}
                    startingDate={new Date()}
                    style={style.calendarView}
                    calendarColor={{
                      color: darkMode
                        ? Colors.primary.darkBg
                        : Colors.primary.background,
                    }}
                  />
                  <FlatList
                    data={teamMembers}
                    renderItem={renderTeamMembers}
                    keyExtractor={(item, id) => id.toString()}
                  />
                </View>
              )}
            </View>
          </View>
          {showAssignView ? (
            <View style={styleA.assignViewContainer}>
              <View style={styleA.leftBodyContainerAssign}>
                <View style={styleA.searchSection}>
                  <View style={styleA.searchView}>
                    <Image style={styleA.searchIcon} source={Search} />
                    <TextInput
                      style={styleA.input}
                      placeholder="name,email,id"
                      onChangeText={(searchString) => searchString}
                      underlineColorAndroid="transparent"
                      value={query}
                    />
                  </View>
                  <Image style={styleA.filterIcon} source={Filter} />
                </View>
                <FlatList
                  data={searchedData}
                  renderItem={renderTeamAssign}
                  keyExtractor={(item, id) => id.toString()}
                />
              </View>
              <View style={styleA.rightBodyContainerAssign}>
                <View style={style.viewTeamMembers}>
                  <Text style={style.textTeamMembers}>Team Members</Text>
                </View>
                <View style={style.container}>
                  <FlatList
                    numColumns={4}
                    data={teamMembers}
                    renderItem={renderAssignedMemberView}
                    keyExtractor={(item, id) => id.toString()}
                    style={styleA.listSelectedMembers}
                  />
                </View>
              </View>
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

// 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
