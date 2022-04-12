import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Colors from '../constants/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Active from '../components/Active';
import Inactive from '../components/Inactive';
import Fonts from '../constants/Fonts';
import {scaleWidth, scaleHeight, width} from '../utils/scaling';
import ActiveWeek from './ActiveWeek';
import InactiveWeek from './InactiveWeek';
import ActiveMonth from './ActiveMonth';
import InActiveMonth from './InActiveMonth';
import MasonryList from '@react-native-seoul/masonry-list';
import {ProjectContext} from '../context/ProjectContext';
import moment from 'moment';
import {DisplayContext} from '../context/DisplayContext';

export default TabViewComponent = ({
  isGrid,
  selected,
  showCreateProject,
  callBack,
}) => {
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const projectContext = useContext(ProjectContext);
  const {
    projectData,
    forInitialDayOfWeek,
    getProjects,
    countMonthDays,
    setSearchedData,
    searchedData,
    fetchProjects,
    fetchMoreProject,
  } = projectContext;
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  const style = styles(insets, selected, darkMode);
  const [postPerLoad] = useState(6);
  const [startAfter, setStartAfter] = useState({});
  const [lastPost, setLastPost] = useState(false);

  useEffect(() => {
    getPost();
  }, []);

  async function getPost() {
    const postData = await fetchProjects(postPerLoad);
    setSearchedData([...postData.posts]);
    setStartAfter(postData.lastVisibal);
  }

  async function getMorePosts() {
    try {
      if (lastPost) {
        const postData = await fetchMoreProject(startAfter, postPerLoad);
        setSearchedData([...postData.posts]);
        setStartAfter(postData.lastVisibal);
        postData.posts?.length == 0 ? setLastPost(true) : setLastPost(false);
      }
    } catch (error) {
      console.log('pagination in tabViewComponent', error);
    }
  }
  let list = countMonthDays === undefined ? 30 : countMonthDays;
  let monthlyProjectData = [];
  for (let index = 1; index <= list; index++) {
    monthlyProjectData?.push({date: index});
  }

  let details = [];
  projectData?.map((item) => {
    const projectStartDateDay = moment(new Date(item.projectStartDate)).format(
      'D',
    );
    const projectStartDateMonth = moment(
      new Date(item.projectStartDate),
    ).format('MM');

    let singleProject = {
      projectStartDateForSchedule: item.PublishedDate,
      date: projectStartDateDay,
      month: projectStartDateMonth,
      projectTitle: item.projectTitle,
      address: item.address,
      city: item.city,
      createdAt: item.createdAt,
      dailyEndTime: item.dailyEndTime,
      dailyStartTime: item.dailyStartTime,
      fullName: item.fullName,
      isActive: item.isActive,
      notes: item.notes,
      phone: item.phone,
      projectEndDate: item.projectEndDate,
      projectEndTime: item.projectEndTime,
      projectStartDate: item.projectStartDate,
      projectStartTime: item.projectStartTime,
      secondVehicle: item.secondVehicle,
      secondaryFullName: item.secondaryFullName,
      secondaryPhone: item.secondaryPhone,
      state: item.state,
      vehicle: item.vehicle,
      zipCode: item.zipCode,
      id: item.id,
    };
    details.push(singleProject);
  });

  let diff = monthlyProjectData?.map((item) => {
    let arr = details.filter((x) => item.date == x.date);
    return arr;
  });

  let newArr = diff?.map((data, index) => {
    if (data?.length === 0) {
      data = {};
    }
    return data;
  });

  const weekDayFun = (weekDayNumber) => {
    return moment(forInitialDayOfWeek)
      .weekday(weekDayNumber)
      .format('MMMM D, YYYY');
  };

  const week = [
    {
      dayName: 'Mon',
      dayNum: weekDayFun(1),
    },
    {
      dayName: 'Tues',
      dayNum: weekDayFun(2),
    },
    {
      dayName: 'Wed',
      dayNum: weekDayFun(3),
    },
    {
      dayName: 'Thur',
      dayNum: weekDayFun(4),
    },
    {
      dayName: 'Fri',
      dayNum: weekDayFun(5),
    },
    {
      dayName: 'Sat',
      dayNum: weekDayFun(6),
    },
    {
      dayName: 'Sun',
      dayNum: weekDayFun(7),
    },
  ];

  const refreshPage = () => {
    getProjects();
  };

  const [routes] = useState([
    {key: 'active', title: 'ACTIVE'},
    {key: 'inActive', title: 'INACTIVE'},
  ]);

  const ActiveProjects = () => renderProjectView('Active');
  const InactiveProjects = () => renderProjectView('Inactive');

  const renderActiveInactive = (item, viewType, weekDay) => {
    switch (selected) {
      case 'Week':
        return viewType == 'Active' ? (
          item?.isActive ? (
            <ActiveWeek
              item={item}
              callBack={callBack}
              newProject={showCreateProject}
              isGrid={isGrid}
              week={weekDay}
            />
          ) : null
        ) : item?.isActive === false ? (
          <InactiveWeek
            item={item}
            isGrid={isGrid}
            callBack={callBack}
            week={weekDay}
          />
        ) : null;
      default:
        return viewType == 'Active' ? (
          item?.isActive ? (
            <Active
              item={item}
              key={Math.floor(Math.random() * 10) + 1}
              callBack={callBack}
              newProject={showCreateProject}
              isGrid={isGrid}
            />
          ) : null
        ) : item?.isActive === false ? (
          <Inactive item={item} isGrid={isGrid} callBack={callBack} />
        ) : null;
    }
  };

  const renderActiveInactiveForMonth = ({item, index}, viewType) => {
    return viewType == 'Active' ? (
      <ActiveMonth
        item={item}
        callBack={callBack}
        newProject={showCreateProject}
        isGrid={isGrid}
        index={index + 1}
      />
    ) : (
      <InActiveMonth
        item={item}
        callBack={callBack}
        newProject={showCreateProject}
        isGrid={isGrid}
        index={index + 1}
      />
    );
  };

  const renderListFooter = () => {
    return <View style={style.listFooter} />;
  };

  const renderProjectView = (viewType, index) => {
    return (
      <View key={index} style={style.mainContainer}>
        <View style={style.weekContainer}>
          {selected == 'Week'
            ? week.map((name, index) => {
                return (
                  <View style={{width: scaleWidth * 155}}>
                    <View key={index} style={style.weekBox}>
                      <Text style={style.textDay}>
                        {name.dayName + ' ' + moment(name.dayNum).format('D')}
                      </Text>
                    </View>
                    <MasonryList
                      data={searchedData}
                      numColumns={
                        {
                          Day: isGrid ? 3 : 6,
                          Week: 1,
                          Month: 7,
                        }[selected]
                      }
                      onRefresh={() => refreshPage()}
                      renderItem={({item}) =>
                        renderActiveInactive(item, viewType, name.dayNum)
                      }
                      keyExtractor={(item, id) => item.id.toString()}
                      style={style.projectsList}
                      ListFooterComponent={renderListFooter()}
                    />
                  </View>
                );
              })
            : null}
        </View>
        {selected == 'Day' ? (
          <FlatList
            // searchedData
            data={searchedData}
            numColumns={
              {
                Day: isGrid ? 3 : 6,
                Week: 1,
                Month: 7,
              }[selected]
            }
            onEndReached={() => getMorePosts()}
            onEndReachedThreshold={0.5}
            scrollEventThrottle={1}
            renderItem={({item}) => renderActiveInactive(item, viewType)}
            keyExtractor={(item, index) => index.toString()}
            style={style.projectsList}
            // ListFooterComponent={renderListFooter()}
            ListFooterComponent={
              lastPost ? (
                <ActivityIndicator
                  size="small"
                  color={darkMode ? '#fff' : '#000'}
                />
              ) : (
                <Text></Text>
              )
            }
          />
        ) : null}

        {selected == 'Month' ? (
          <FlatList
            data={newArr}
            numColumns={
              {
                Day: isGrid ? 3 : 6,
                Week: 1,
                Month: 7,
              }[selected]
            }
            renderItem={(item, index) =>
              renderActiveInactiveForMonth(item, viewType, index)
            }
            keyExtractor={(item) => item.id}
            style={style.projectsList}
            ListFooterComponent={renderListFooter()}
          />
        ) : null}
      </View>
    );
  };

  const renderScene = SceneMap({
    active: ActiveProjects,
    inActive: InactiveProjects,
  });
  const renderTabBar = (props) => {
    return (
      <TabBar
        activeColor={darkMode ? Colors.primary.white : Colors.primary.heading}
        inactiveColor={
          darkMode ? Colors.primary.darkInActive : Colors.primary.secondGray
        }
        style={style.tabBarStyle}
        labelStyle={style.label}
        {...props}
        indicatorStyle={style.indicator}
      />
    );
  };

  return (
    <View style={style.container}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: '100%'}}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};
const styles = (insets, selected, darkMode) =>
  StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: Colors.primary.inputBackground,
    },
    mainContainer: {
      flex: 1,
      backgroundColor: darkMode
        ? Colors.primary.darkBg
        : Colors.primary.inputBackground,
    },
    tabBarStyle: {
      height: scaleHeight * 44,
      backgroundColor: darkMode
        ? Colors.primary.darkHeadingBackground
        : Colors.primary.white,
    },
    label: {
      height: '100%',
      color: Colors.primary.heading,
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 18,
      letterSpacing: 0.5,
      fontFamily: Fonts.primary.bold,
    },
    indicator: {
      backgroundColor: Colors.primary.blue,
      height: 2,
    },
    weekContainer: {
      width: width,
      flexDirection: 'row',
    },
    weekBox: {
      width: scaleWidth * 155,
      height: scaleHeight * 42,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.primary.secondGray,
      borderRightWidth: 1,
      borderRightColor: Colors.primary.border,
    },
    textDay: {
      fontSize: scaleWidth * 17,
      lineHeight: scaleWidth * 20,
      color: Colors.primary.calenderButtonTextColor,
      fontFamily: Fonts.primary.regular,
      textAlign: 'center',
    },
    projectsList: {
      height: '100%',
      paddingVertical: selected == 'Day' ? scaleHeight * 15 : 0,
      marginBottom: scaleHeight * 150,
    },
    listFooter: {
      height: scaleHeight * 20,
    },
  });
