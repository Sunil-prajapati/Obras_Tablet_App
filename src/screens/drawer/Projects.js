import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import Colors from '../../constants/Colors';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Fonts from '../../constants/Fonts';
import TabViewComponent from '../../components/TabViewComponent';
import CustomModal from '../../components/CustomModal';
import {scaleWidth, scaleHeight} from '../../utils/scaling';
import CreateProject from '../projects/CreateProject';
import Tooltip from 'react-native-walkthrough-tooltip';
import ProjectAssignConfirm from '../../components/ProjectAssignConfirm';
import Settings from '../../components/Settings';
import SchedulePublish from '../../components/SchedulePublish';
import CustomMenu from '../../components/CustomMenu';
import ProjectActiveInactiveConfirm from '../../components/ProjectActiveInactiveConfirm';
import AssignProject from '../projects/AssignProject';
import {Calendar} from 'react-native-calendars';
import {updateProject, createProject} from '../../utils/project';
import {ProjectContext} from '../../context/ProjectContext';
import {UserContext} from '../../context/UserContext';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import {showNotification} from '../../utils/localIosnotification';
import {showNotificationAndroid} from '../../utils/localAndroidNotification';
import {DisplayContext} from '../../context/DisplayContext';

const activeMoreOptions = [
  {
    title: 'Deactivate project',
  },
  {
    title: 'Duplicate project',
  },
];

const inactiveMoreOptions = [
  {
    title: 'Activate project',
  },
  {
    title: 'Duplicate project',
  },
];

var message = 'Are you sure you want to activate?';
var projectName = 'Project Construction 1';

export default Projects = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState('Day');
  const [isModalVisible, setModalVisible] = useState(false);
  const [toolTipVisible, setToolTipVisible] = useState(false);
  const [isGrid, setIsGrid] = useState(true);
  const [activeMore, setActiveMore] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(true);
  const [moreOptions, setMoreOptions] = useState(activeMoreOptions);
  const [showActiveConfirmDialog, setActiveConfirmDialog] = useState(false);
  const [toolTipCalendarVisible, setToolTipCalendarVisible] = useState(false);
  const [dataToDeactivate, setDataToDeactivate] = useState({});
  const [projectAssignModalVisible, setProjectAssignModalVisible] =
    useState(false);
  const projectContext = useContext(ProjectContext);
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  const userContext = useContext(UserContext);
  const {getUser} = userContext;
  const style = styles(insets, darkMode);
  const {
    getProjects,
    displayDay,
    setDisplayDay,
    currentSelectedWeekFirst,
    setCurrentSelectedWeekFirst,
    setCurrentSelectedWeekended,
    currentSelectedWeekLast,
    setForInitialDayOfWeek,
    setSelectedMonth,
    selectedMonth,
    setCountMonthDays,
    setSelectedMonthNumeric,
    projectData,
    setTeamMemberUpdated,
    teamMemberUpdated,
    setSearchedData,
    idAddUser,
    setAddUser,
  } = projectContext;
  const [markedDates, setMarkedDates] = useState({
    markedDates: {},
  });
  const [query, setQuery] = useState('');
  const MenuBurger = require('../../assets/icons/MenuBurger.png');
  const PlusImg = require('../../assets/icons/plus.png');
  const AddUser = require('../../assets/icons/add_user.png');
  const SettingImg = require('../../assets/icons/settings.png');
  const DownArrow = require('../../assets/icons/down_arrow.png');
  const currentWeek = currentSelectedWeekFirst.concat(currentSelectedWeekLast);

  async function gettingProjects(){
    try {
      await getProjects();
      await getUser();
      (await projectData?.length) < 1 ? setModalVisible(!isModalVisible) : null;
    } catch (error) {
      console.log('In projects Screen' + error);
    }
  }

  useEffect(() => {
    gettingProjects()
  }, []);

  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const modalHandler = () => {
    setModalVisible(false);
    navigation.navigate('CreateProject');
  };
  const skipHandle = () => {
    setModalVisible(false);
  };

  const handleSelected = (value) => {
    setSelected(value);
  };

  const createProjectClicked = () => {
    navigation.navigate('CreateProject');
  };

  const closeModel = () => {
    setActiveMore(false);
  };
  const duplicateSuccess = () => {
    console.log('Project Duplicated Successfully ');
    getProjects();
  };
  const selectItem = (id) => {
    setActiveMore(false);
    if (moreOptions[0].title.includes('Deactivate')) {
      //Action for active project
      id == 0 ? openActiveConfirmDialog(id) : null;
      if (id == 1) {
        delete dataToDeactivate.id;
        delete dataToDeactivate.createdAt;
        delete dataToDeactivate.updatedAt;
        dataToDeactivate.PublishedDate = [];
        dataToDeactivate.assignedEmployees = [];
        dataToDeactivate.userRestDetails = [];
        createProject(dataToDeactivate, duplicateSuccess);
      }
    } else {
      //Action for inactive project
      id == 0 ? openActiveConfirmDialog() : null;
      if (id == 1) {
        delete dataToDeactivate.id;
        delete dataToDeactivate.createdAt;
        delete dataToDeactivate.updatedAt;
        dataToDeactivate.PublishedDate = [];
        dataToDeactivate.assignedEmployees = [];
        dataToDeactivate.userRestDetails = [];
        createProject(dataToDeactivate, duplicateSuccess);
      }
    }
  };
  const showCustomMenu = () => {
    setActiveMore(true);
  };

  const onSuccess = (msg) => {
    getProjects();
    console.log(msg);
  };

  const confirm = () => {
    setActiveConfirmDialog(false);
    if (dataToDeactivate.isActive === true) {
      let details = {
        isActive: false,
      };

      updateProject(details, dataToDeactivate.id, onSuccess);
    } else {
      let details = {
        isActive: true,
      };
      updateProject(details, dataToDeactivate.id, onSuccess);
    }
  };

  const cancel = () => {
    setActiveConfirmDialog(false);
  };

  const openActiveConfirmDialog = () => {
    setActiveConfirmDialog(true);
  };

  const addUser = async (value) => {
    setAddUser(value);
  };

  const callBack = (data) => {
    switch (data.type) {
      case 'createProject':
        navigation.navigate('CreateProject');
        setShowCreateProject(true);
        break;
      case 'activeMore':
        projectName = data.body.city;
        message = 'Are you sure you want to Deactivate?';
        setMoreOptions(activeMoreOptions);
        showCustomMenu();
        setDataToDeactivate(data.body); // shows warning for this line in console

        break;
      case 'inactiveMore':
        projectName = data.body.city;
        message = 'Are you sure you want to activate?';
        setMoreOptions(inactiveMoreOptions);
        showCustomMenu();
        setDataToDeactivate(data.body); // shows warning for this line in console
        break;
      default:
    }
  };

  function DayWeekMonthCard({title, onPress, value}) {
    return (
      <TouchableOpacity
        style={[
          style.calenderButton,
          {
            backgroundColor:
              value === title ? Colors.primary.white : 'transparent',
          },
        ]}
        onPress={() => onPress(title)}>
        <Text
          style={[
            style.calenderButtonText,
            {
              color:
                value === title
                  ? Colors.primary.calenderButtonTextColor
                  : Colors.primary.white,
            },
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  const tooltipItemClicked = (value) => {
    setIsGrid(value);
    setToolTipVisible(false);
  };

  const onDaySelected = (day) => {
    let selectedDay = {};
    setDisplayDay(
      moment(new Date(day.timestamp)).utcOffset(8).format('MMMM D, YYYY'),
    );
    getProjects();
    setToolTipCalendarVisible(false);
    setSelectedMonth(moment(new Date()).format('MMMM YYYY'));
    selectedDay[day.dateString] = {
      selected: true,
      selectedColor: Colors.primary.green,
    };
    setMarkedDates({
      markedDates: selectedDay,
    });
  };

  const todaySelected = (day) => {
    setDisplayDay(day);
    getProjects();
  };

  const onMonthSelected = (month) => {
    setSelectedMonth(moment(new Date(month.timestamp)).format('MMMM YYYY'));
    setCountMonthDays(moment(new Date(month.timestamp)).daysInMonth());
    setSelectedMonthNumeric(moment(new Date(month.timestamp)).format('MM'));
    getProjects();
  };
  const onWeekChange = (start, end) => {
    setForInitialDayOfWeek(start);
    setCurrentSelectedWeekended(moment(end).weekday(0).format('MMMM D'));
    setCurrentSelectedWeekFirst(moment(start).weekday(1).format('MMMM D - '));
  };

  const publishNow = () => {
    setProjectAssignModalVisible(true);
  };

  const onPublishedSuccess = () => {
    console.log('published success');
    if (Platform == 'ios') {
      showNotification('Publish', 'Project Published Successfully');
    } else {
      showNotificationAndroid('Publish', 'Project Published Successfully');
    }
  };

  const projectAssignModalHandler = () => {
    setProjectAssignModalVisible(false);
    setTeamMemberUpdated([]);
    projectData.map((allProjects) => {
      let indexCheck = allProjects.assignedEmployees.find((o) =>
        o.date.includes(displayDay),
      );
      if (indexCheck !== undefined) {
        if (allProjects.PublishedDate != displayDay) {
          const tomorrow = moment(displayDay)
            .add(1, 'days')
            .format('MMMM D, YYYY');
          allProjects.PublishedDate.push(displayDay, tomorrow);
          allProjects.assignedEmployees.map((project) => {
            if (!project.date.includes(tomorrow)) {
              project.date.push(tomorrow);
            }
          });
          updateProject(allProjects, allProjects.id, onPublishedSuccess);
        }
      } else {
        if (allProjects.assignedEmployees.length < 1) {
          allProjects.PublishedDate.length = 0;
          updateProject(allProjects, allProjects.id, onPublishedSuccess);
        }
      }
    });
  };

  const projectAssignSkipHandle = () => {
    setProjectAssignModalVisible(false);
  };

  const handleSearch = (text) => {
    if (text) {
      const newData = projectData.filter(function (item) {
        const itemData = item.projectTitle
          ? item.projectTitle.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setSearchedData(newData);
      setQuery(text);
    } else {
      setSearchedData(projectData);
      setQuery(text);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.container}>
        <CustomModal
          nextStepText={'Go'}
          setVisible={isModalVisible}
          callBack={modalHandler}
          skip={skipHandle}
          line={'Get started by creating your first project'}
          buttonText={'Skip'}
        />
        <CustomMenu
          setVisible={activeMore}
          menuOptions={moreOptions}
          callBack={selectItem}
          close={closeModel}
        />
        <ProjectActiveInactiveConfirm
          setVisible={showActiveConfirmDialog}
          message={message}
          projectName={projectName}
          confirm={confirm}
          cancel={cancel}
        />
        <ProjectAssignConfirm
          setVisible={projectAssignModalVisible}
          confirm={projectAssignModalHandler}
          cancel={projectAssignSkipHandle}
          numberOfMemberUpdated={teamMemberUpdated.length}
        />
        {/* <Settings setVisible={isModalVisible} callBack={modalHandler} /> */}
        {/* <SchedulePublish setVisible={isModalVisible} callBack={modalHandler} /> */}

        <View style={style.headerContainer}>
          <TouchableOpacity
            style={style.menuBurger}
            onPress={() => toggleDrawer()}>
            <Image source={MenuBurger} />
          </TouchableOpacity>
          <View style={style.headerRow}>
            <Text style={style.projects}>Projects</Text>
            <Tooltip
              isVisible={toolTipVisible}
              content={
                <View style={style.tooltipView}>
                  <TouchableOpacity onPress={() => tooltipItemClicked(false)}>
                    <Text style={style.tooltipText}>Condensed view</Text>
                  </TouchableOpacity>
                  <View style={style.tooltipDivider}></View>
                  <TouchableOpacity onPress={() => tooltipItemClicked(true)}>
                    <Text style={style.tooltipText}>Grid view</Text>
                  </TouchableOpacity>
                </View>
              }
              placement="bottom"
              onClose={() => setToolTipVisible(false)}>
              <TouchableOpacity onPress={() => setToolTipVisible(true)}>
                <Text style={style.projects}> ...</Text>
              </TouchableOpacity>
            </Tooltip>
            <TouchableOpacity
              style={[style.publishBox, style.todayBox]}
              onPress={() =>
                todaySelected(moment(new Date()).format('MMMM D, YYYY'))
              }>
              <Text style={style.todayText}>Today</Text>
            </TouchableOpacity>
            <Tooltip
              isVisible={toolTipCalendarVisible}
              contentStyle={{backgroundColor: Colors.primary.inputBackground}}
              content={
                selected == 'Day' ? (
                  <Calendar
                    markedDates={markedDates.markedDates}
                    onDayPress={(day) => onDaySelected(day)}
                    enableSwipeMonths={true}
                    style={style.tooltipCalendarView}
                    // Specify theme properties to override specific styles for calendar parts. Default = {}
                    theme={{
                      backgroundColor: Colors.primary.inputBackground,
                      calendarBackground: Colors.primary.inputBackground,
                      textDayFontSize: scaleWidth * 13,
                      textMonthFontSize: scaleWidth * 16,
                      textDayHeaderFontSize: scaleWidth * 14,
                      textDayFontFamily: Fonts.primary.regular,
                      textMonthFontFamily: Fonts.primary.semiBold,
                      textDayHeaderFontFamily: Fonts.primary.semiBold,
                      arrowColor: Colors.primary.headingTextColor,
                      monthTextColor: Colors.primary.messageColor,
                      dayTextColor: Colors.primary.messageColor,
                      selectedDayTextColor: Colors.primary.messageColor,
                      textSectionTitleColor: Colors.primary.messageColor,
                      textDisabledColor: Colors.primary.lightGray,
                    }}
                  />
                ) : selected == 'Month' ? (
                  <Calendar
                    onDayPress={(day) => console.log(day)}
                    enableSwipeMonths={true}
                    style={style.tooltipCalendarView}
                    // Specify theme properties to override specific styles for calendar parts. Default = {}
                    theme={{
                      backgroundColor: Colors.primary.inputBackground,
                      calendarBackground: Colors.primary.inputBackground,
                      textDayFontSize: scaleWidth * 13,
                      textMonthFontSize: scaleWidth * 16,
                      textDayHeaderFontSize: scaleWidth * 14,
                      textDayFontFamily: Fonts.primary.regular,
                      textMonthFontFamily: Fonts.primary.semiBold,
                      textDayHeaderFontFamily: Fonts.primary.semiBold,
                      arrowColor: Colors.primary.headingTextColor,
                      monthTextColor: Colors.primary.messageColor,
                      dayTextColor: Colors.primary.messageColor,
                      selectedDayTextColor: Colors.primary.messageColor,
                      textSectionTitleColor: Colors.primary.messageColor,
                      textDisabledColor: Colors.primary.lightGray,
                    }}
                    onMonthChange={(month) => onMonthSelected(month)}
                    hideExtraDays={true}
                  />
                ) : (
                  <CalendarStrip
                    // minDate={new Date()}
                    startingDate={new Date()}
                    onWeekChanged={(start, end) => onWeekChange(start, end)}
                    style={style.weekCalendarView}
                    calendarColor={Colors.primary.inputBackground}
                  />
                )
              }
              placement="bottom"
              onClose={() => setToolTipCalendarVisible(false)}>
              <TouchableOpacity onPress={() => setToolTipCalendarVisible(true)}>
                <View
                  style={[
                    style.headerRow,
                    {marginRight: selected == 'Week' ? scaleWidth * -50 : -20},
                  ]}>
                  <Text style={style.timeText}>
                    {selected == 'Day'
                      ? displayDay
                      : selected == 'Month'
                      ? selectedMonth
                      : currentWeek}
                  </Text>
                  <Image style={style.imageDownArrow} source={DownArrow} />
                </View>
              </TouchableOpacity>
            </Tooltip>

            {idAddUser ? null : (
              <View style={style.calenderContainer}>
                <DayWeekMonthCard
                  title={'Day'}
                  onPress={handleSelected}
                  value={selected}
                />
                <DayWeekMonthCard
                  title={'Week'}
                  onPress={handleSelected}
                  value={selected}
                />
                <DayWeekMonthCard
                  title={'Month'}
                  onPress={handleSelected}
                  value={selected}
                />
              </View>
            )}

            {idAddUser ? null : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={style.settingsIcon}
                  onPress={() => null}>
                  <Image style={style.icons} source={SettingImg} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={style.addUserIcon}
                  onPress={() => addUser(true)}>
                  <Image style={style.icons} source={AddUser} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={style.plusIcon}
                  onPress={() => createProjectClicked()}>
                  <Image style={style.icons} source={PlusImg} />
                </TouchableOpacity>
              </View>
            )}
            {idAddUser ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={style.publishBox}
                  onPress={() => {
                    addUser(false), setTeamMemberUpdated([]);
                  }}>
                  <Text style={style.todayText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.publishBox} onPress={() => null}>
                  <Text style={style.todayText}>Publish Later</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={style.publishBox}
                  onPress={() => publishNow()}>
                  <Text style={style.todayText}>Publish Now</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <TextInput
            placeholderTextColor={
              darkMode
                ? Colors.primary.darkHeadingBackground
                : Colors.primary.headingTextColor
            }
            style={style.searchBox}
            placeholder={'Search projects'}
            onChangeText={(searchString) => handleSearch(searchString)}
            value={query}></TextInput>
        </View>
        {idAddUser ? (
          <AssignProject isGrid={isGrid} />
        ) : (
          <TabViewComponent
            isGrid={isGrid}
            selected={selected}
            showCreateProject={showCreateProject}
            callBack={callBack}
          />
        )}
      </View>
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
      height: scaleHeight * 150,
      flexDirection: 'column',
      paddingLeft: scaleWidth * 20,
      backgroundColor: darkMode ? Colors.primary.darkBg : Colors.primary.blue,
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
    projects: {
      fontSize: scaleWidth * 28,
      lineHeight: scaleHeight * 32,
      color: Colors.primary.white,
      fontFamily: Fonts.primary.bold,
    },
    todayBox: {
      marginLeft: scaleWidth * 85,
      marginRight: scaleWidth * 20,
    },
    todayText: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 18,
      color: Colors.primary.white,
      fontFamily: Fonts.primary.regular,
    },
    timeText: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 18,
      color: Colors.primary.white,
      fontFamily: Fonts.primary.regular,
    },
    calenderContainer: {
      width: scaleWidth * 300,
      height: scaleHeight * 28,
      backgroundColor: darkMode
        ? Colors.primary.darkHeadingBackground
        : Colors.primary.darkerBlue,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 2,
      borderRadius: 5,
    },
    calenderButton: {
      height: scaleWidth * 22,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: scaleWidth * 25,
    },
    calenderButtonText: {
      color: Colors.primary.blue,
      fontSize: scaleWidth * 14,
      fontFamily: Fonts.primary.regular,
    },
    settingsIcon: {
      marginLeft: scaleWidth * 26,
      marginRight: scaleWidth * 70,
    },
    plusIcon: {
      marginRight: scaleWidth * 15,
    },
    addUserIcon: {
      marginRight: scaleWidth * 15,
    },
    icons: {
      width: scaleWidth * 35,
      height: scaleWidth * 35,
    },
    searchBox: {
      height: scaleHeight * 37,
      marginTop: Platform == 'ios' ? scaleHeight * 10 : scaleHeight * 5,
      marginRight: scaleWidth * 15,
      borderRadius: 20,
      padding: 2,
      paddingLeft: scaleWidth * 16,
      margin: 0,
      borderWidth: 0,
      color: darkMode
        ? Colors.primary.darkModeInputBgheadingTextColor
        : Colors.primary.headingTextColor,
      backgroundColor: 'white',
      fontSize: scaleWidth * 15,
      fontFamily: Fonts.primary.regular,
      backgroundColor: darkMode
        ? Colors.primary.darkModeInputBg
        : Colors.primary.white,
    },
    tooltipView: {
      width: scaleWidth * 267,
      height: scaleHeight * 90,
      borderRadius: 12,
      paddingTop: scaleHeight * 12,
      backgroundColor: Colors.primary.white,
    },
    tooltipText: {
      fontSize: scaleWidth * 17,
      lineHeight: scaleWidth * 20,
      color: Colors.primary.darkBlack,
      fontFamily: Fonts.primary.regular,
    },
    tooltipDivider: {
      width: scaleWidth * 252,
      height: 0.5,
      marginVertical: scaleHeight * 12,
      backgroundColor: Colors.primary.line,
    },
    publishBox: {
      height: scaleHeight * 35,
      borderWidth: 1.5,
      borderRadius: 4,
      borderColor: Colors.primary.white,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: scaleWidth * 15,
      marginRight: scaleWidth * 16,
    },
    imageDownArrow: {
      width: scaleWidth * 11,
      height: scaleHeight * 6,
      marginLeft: scaleWidth * 9,
      marginRight: scaleWidth * 60,
    },
    tooltipCalendarView: {
      width: scaleWidth * 600,
      height: scaleHeight * 550,
      backgroundColor: Colors.primary.inputBackground,
    },
    weekCalendarView: {
      width: scaleWidth * 400,
      height: scaleHeight * 150,
    },
  });
