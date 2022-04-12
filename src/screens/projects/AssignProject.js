import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DraxProvider, DraxView, DraxList} from 'react-native-drax';
import {useNavigation} from '@react-navigation/core';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import {ProjectContext} from '../../context/ProjectContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {UserContext} from '../../context/UserContext';
import profileDemo from '../../assets/images/profile/user.png';
import {scaleWidth, scaleHeight, height} from '../../utils/scaling';
const RightArrow = require('../../assets/icons/Disclosure_Indicators.png');
import MasonryList from '@react-native-seoul/masonry-list';
import {updateProject} from '../../utils/project';
import LeftArrow from '../../assets/icons/left_Arrow.png';
import Filter from '../../components/Filter';
import * as _ from 'lodash';
import {updateUser} from '../../utils/user';
import {DisplayContext} from '../../context/DisplayContext';

const gestureRootViewStyle = {flex: 1};

export default AssignProject = ({isGrid}) => {
  const insets = useSafeAreaInsets();
  const [showLeftView, setShowLeftView] = useState(true);
  const navigation = useNavigation();
  const Search = require('../../assets/icons/search.png');
  const FilterImg = require('../../assets/icons/filter.png');
  const CrossBlack = require('../../assets/icons/cross_black.png');
  const projectContext = useContext(ProjectContext);
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  const style = styles(insets, isGrid, showLeftView, darkMode);
  const {
    projectData,
    displayDay,
    getProjects,
    setTeamMemberUpdated,
    teamMemberUpdated,
  } = projectContext;
  const userContext = useContext(UserContext);
  const {users, getProfession, setShowListUsers, showListUsers} = userContext;
  const [searchedData, setSearchedData] = useState([]);
  const [query, setQuery] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const handleFilterClick = (value) => {
    setShowLeftView(value);
  };

  const onSuccess = (msg) => {
    console.log(msg);
    getProjects();
  };
  const onUserSuccess = () => {
    console.log('user assigned/Removed success');
  };

  const onNotAssignedUserSuccess = () => {
    NotAssignedFilter();
    // setSearchedData(blankArray);
  };

  const removeUserFromProject = (date, employeeId, id) => {
    try {
      let filterObj = {date, employeeId};
      projectData.map((item) => {
        _.remove(item.assignedEmployees, filterObj);
      });

      projectData.map((projectDetails) => {
        if (projectDetails.id === id) {
          updateProject(projectDetails, id, onSuccess);
        }
      });

      users.map((singleUserDetails) => {
        if (singleUserDetails.employeeId === employeeId) {
          singleUserDetails.isAssigned = false;
          updateUser(singleUserDetails, onNotAssignedUserSuccess);
        }
      });
    } catch (error) {
      console.log(`remove user from project${error}`);
    }
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
  const modalHandler = () => {
    setModalVisible(false);
  };

  const showFilter = () => {
    setModalVisible(true);
  };

  let blankArray = [];
  function NotAssignedFilter() {
    users.map((singleUsers) => {
      if (singleUsers.isAssigned === false) {
        blankArray.push(singleUsers);
      }
    });
  }

  let UsersAccToTitleArray = [];
  function UsersAccToTitle(title) {
    users.map((singleUsers) => {
      if (singleUsers.selectedProfession === title) {
        UsersAccToTitleArray.push(singleUsers);
      }
    });
  }

  const usersListType = (id) => {
    if (id === 2) {
      NotAssignedFilter();
      setSearchedData(blankArray);
    } else {
      setSearchedData(users);
    }
  };

  const saveFilter = (id) => {
    setShowListUsers(id);
    setModalVisible(false);
  };

  const ChangeListOfUsers = (title) => {
    UsersAccToTitle(title);
    setSearchedData(UsersAccToTitleArray);
  };

  const resetFilter = () => {
    setSearchedData(users);
    setModalVisible(false);
    setShowListUsers(0);
    UsersAccToTitleArray = [];
  };

  useEffect(() => {
    if (showListUsers === 2) {
      NotAssignedFilter();
      setSearchedData(blankArray);
    } else if (showListUsers === 0) {
      setSearchedData(users);
    }
    getProfession();
    return () => {
      console.log('Assign Projects');
    };
  }, [showListUsers]);

  const DragUIComponent = ({item, index}) => {
    return (
      <DraxView
        style={[styles.centeredContent, styles.draggableBox]}
        draggingStyle={styles.dragging}
        dragReleasedStyle={styles.dragging}
        hoverDraggingStyle={styles.hoverDragging}
        dragPayload={index}
        longPressDelay={150}
        key={index}>
        {item !== undefined && item.isActive === true ? (
          <View style={style.userRowContainer}>
            <TouchableOpacity onPress={() => null}>
              <Image
                style={[
                  style.avatarImage,
                  {
                    borderColor:
                      item?.professionColor !== ''
                        ? item?.professionColor
                        : '#fff',
                  },
                ]}
                source={profileDemo}
              />
            </TouchableOpacity>
            <View style={style.nameContainer}>
              <Text style={style.name}>{item?.name}</Text>
              <Text style={style.occupation}>{item?.selectedProfession}</Text>
            </View>
          </View>
        ) : null}
      </DraxView>
    );
  };

  const renderMembersCard = ({item, index}) => {
    return (
      <DraxView
        receivingStyle={styles.receiving}
        key={index}
        renderContent={({viewState}) => {
          const receivingDrag = viewState && viewState.receivingDrag;
          const payload = receivingDrag && receivingDrag.payload;
          return (
            <View style={style.cardView}>
              <Text style={[style.name, style.projectName]}>
                {item.projectTitle}
              </Text>
              <View style={style.divider} />
              <View style={style.teamMembersView}>
                {item.assignedEmployees?.map((data, index) => {
                  return (
                    <>
                      {data.date.includes(displayDay) &&
                      data.userRestDetails.isActive === true ? (
                        <View key={index} style={style.profileWithCrossView}>
                          <ImageBackground
                            style={[style.profileImage]}
                            source={profileDemo}
                            imageStyle={[
                              style.imageBackground,
                              {
                                borderColor:
                                  data.userRestDetails.professionColor !== ''
                                    ? data.userRestDetails.professionColor
                                    : '#fff',
                              },
                            ]}>
                            <TouchableOpacity
                              style={style.crossTouchable}
                              onPress={() =>
                                removeUserFromProject(
                                  data.date,
                                  data.employeeId,
                                  item.id,
                                )
                              }>
                              <Image
                                style={style.crossIcon}
                                source={CrossBlack}
                              />
                            </TouchableOpacity>
                          </ImageBackground>
                        </View>
                      ) : null}
                    </>
                  );
                })}
              </View>
            </View>
          );
        }}
        key={index}
        onReceiveDragDrop={(event) => {
          let employeeIdAndSelectedDay = {};
          let assignedUserAccount = {};
          let selected_item = users[event.dragged.payload];

          if (item?.assignedEmployees?.length < 1) {
            try {
              assignedUserAccount['draggedId'] = event.dragged.id;
              assignedUserAccount['receiverId'] = event.receiver.id;
              employeeIdAndSelectedDay['date'] = [displayDay];
              employeeIdAndSelectedDay['employeeId'] = selected_item.employeeId;
              employeeIdAndSelectedDay['userRestDetails'] = selected_item;
              employeeIdAndSelectedDay['projectId'] = item.id;
              item.assignedEmployees?.push(employeeIdAndSelectedDay);
              updateProject(item, item.id, onSuccess);
              selected_item.isAssigned = true;
              !('projectTitle' in selected_item) &&
                (selected_item.projectTitle = {});
              selected_item.projectTitle = item.projectTitle;

              updateUser(selected_item, onUserSuccess);
            } catch (error) {
              console.log(error);
            }
          } else {
            let indexCheck = item.assignedEmployees?.find(
              (o) =>
                o.date.includes(displayDay) &&
                o.employeeId === selected_item.employeeId,
            );
            if (indexCheck === undefined) {
              try {
                // if (!item.assignedEmployees) {
                //   item.assignedEmployees = [];
                // }
                assignedUserAccount['draggedId'] = event.dragged.id;
                assignedUserAccount['receiverId'] = event.receiver.id;
                employeeIdAndSelectedDay['date'] = [displayDay];
                employeeIdAndSelectedDay['employeeId'] =
                  selected_item.employeeId;
                employeeIdAndSelectedDay['userRestDetails'] = selected_item;
                employeeIdAndSelectedDay['projectId'] = item.id;
                item.assignedEmployees.push(employeeIdAndSelectedDay);
                let isDateExist = item.PublishedDate?.find(
                  (alreadyPublishedDate) =>
                    alreadyPublishedDate.includes(displayDay) 
                );
                if(isDateExist === undefined ){
                  updateProject(item, item.id, onSuccess)
                  selected_item.isAssigned = true;
                  !('projectTitle' in selected_item) &&
                    (selected_item.projectTitle = {});
                  selected_item.projectTitle = item.projectTitle;
                  updateUser(selected_item, onUserSuccess);
                }else{
                  alert("no need")
                }
              } catch (error) {
                console.log(error);
              }
            } else {
              console.log('no need to assign user to this project');
            }
          }
          teamMemberUpdated.push(assignedUserAccount);
          setTeamMemberUpdated(teamMemberUpdated);
        }}></DraxView>
    );
  };
  const renderListFooter = () => {
    return <View style={style.listFooter} />;
  };

  return (
    <>
      <Filter
        setVisible={isModalVisible}
        callBack={modalHandler}
        usersType={(value) => usersListType(value)}
        saveButton={(value) => saveFilter(value)}
        selectTitle={(title) => ChangeListOfUsers(title)}
        ResetFilter={resetFilter}
      />
      <GestureHandlerRootView style={gestureRootViewStyle}>
        <DraxProvider>
          <View style={styles.container}>
            <View style={style.bodyContainer}>
              {showLeftView ? (
                <View style={style.leftBodyContainerAssign}>
                  <View style={style.searchSection}>
                    <View style={style.searchView}>
                      <Image style={style.searchIcon} source={Search} />
                      <TextInput
                        style={style.input}
                        placeholderTextColor={
                          darkMode
                            ? Colors.primary.profilePicCircle
                            : Colors.primary.gray
                        }
                        placeholder="name,email,id"
                        onChangeText={(searchString) =>
                          handleSearch(searchString)
                        }
                        underlineColorAndroid="transparent"
                        value={query}
                        autoCapitalize="none"
                      />
                    </View>
                    <TouchableOpacity onPress={() => showFilter()}>
                      <Image style={style.filterIcon} source={FilterImg} />
                    </TouchableOpacity>
                  </View>
                  <DraxList
                    data={searchedData}
                    renderItemContent={DragUIComponent}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={true}
                    style={{paddingBottom: scaleHeight * 50}}
                  />
                  <TouchableOpacity
                    style={style.leftArrowContainer}
                    onPress={() => handleFilterClick(false)}>
                    <Image style={style.leftArrow} source={LeftArrow} />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={style.leftBarContainer}>
                  <View style={style.rightArrowContainer}>
                    <TouchableOpacity onPress={() => handleFilterClick(true)}>
                      <Image style={style.rightArrow} source={RightArrow} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              <View style={style.rightBodyContainerAssign}>
                <MasonryList
                  numColumns={showLeftView ? (isGrid ? 3 : 4) : isGrid ? 4 : 6}
                  data={projectData}
                  renderItem={renderMembersCard}
                  keyExtractor={(item, id) => id.toString()}
                  style={style.listSelectedMembers}
                  ListFooterComponent={renderListFooter()}
                />
              </View>
            </View>
          </View>
        </DraxProvider>
      </GestureHandlerRootView>
    </>
  );
};

export const styles = (insets, isGrid, showLeftView, darkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    bodyContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: Colors.primary.inputBackground,
    },
    leftBodyContainerAssign: {
      width: scaleWidth * 266,
      height: height,
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.white,
      borderRightWidth: 1,
      borderRightColor: Colors.primary.secondGray,
    },
    rightBodyContainerAssign: {
      flex: 1,
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.inputBackground,
      height: height,
    },
    searchSection: {
      width: scaleWidth * 266,
      height: scaleHeight * 69,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.secondGray,
    },
    searchView: {
      width: scaleWidth * 207,
      height: scaleHeight * 37,
      borderRadius: 18,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: darkMode
        ? Colors.primary.darkModeInputBg
        : Colors.primary.white,
    },
    searchIcon: {
      width: scaleWidth * 16,
      height: scaleHeight * 16,
      marginHorizontal: scaleWidth * 8,
    },
    filterIcon: {
      marginLeft: scaleWidth * 8,
    },
    input: {
      flex: 1,
      padding: 1,
      margin: 0,
      borderWidth: 0,
      fontSize: scaleWidth * 16,
      lineHeight: scaleHeight * 22,
      fontFamily: Fonts.primary.regular,
      color: Colors.primary.lightGray,
      borderTopRightRadius: 18,
      borderBottomRightRadius: 18,
    },
    profileWithCrossView: {
      marginTop: scaleHeight * 10,
      flexDirection: 'row',
      marginRight: !isGrid && !showLeftView ? scaleWidth * 14 : scaleWidth * 18,
    },
    profileImage: {
      width: scaleWidth * 58,
      height: scaleWidth * 58,
      resizeMode: 'cover',
    },
    crossIcon: {
      width: scaleWidth * 20,
      height: scaleHeight * 20,
    },
    crossTouchable: {
      width: scaleWidth * 20,
      height: scaleHeight * 20,
      alignSelf: 'flex-end',
    },
    userRowContainer: {
      height: scaleHeight * 75,
      backgroundColor: darkMode ? Colors.primary.darkbg : Colors.primary.white,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: scaleWidth * 15,
      borderBottomColor: Colors.primary.secondGray,
      borderBottomWidth: 0.5,
    },
    avatarImage: {
      width: scaleWidth * 44,
      height: scaleWidth * 44,
      borderRadius: (scaleWidth * 44) / 2,
      borderWidth: 2,
    },
    nameContainer: {
      width: scaleWidth * 200,
      flexDirection: 'column',
    },
    name: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      fontFamily: Fonts.primary.semiBold,
      color: darkMode ? Colors.primary.white : Colors.primary.heading,
    },
    occupation: {
      fontSize: scaleWidth * 13,
      lineHeight: scaleWidth * 15,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      fontFamily: Fonts.primary.semiBold,
      color: Colors.primary.gray,
    },
    cardView: {
      width: isGrid
        ? scaleWidth * 249
        : showLeftView
        ? scaleWidth * 182
        : scaleWidth * 160,
      borderRadius: 12,
      borderWidth: 1.2,
      marginRight: !isGrid && !showLeftView ? scaleWidth * 16 : scaleWidth * 18,
      marginBottom: scaleHeight * 16,
      borderColor: darkMode
        ? Colors.primary.gray
        : Colors.primary.profilePicCircle,
      backgroundColor: darkMode
        ? Colors.primary.darkModalBackground
        : Colors.primary.white,
    },
    teamMembersView: {
      width: isGrid
        ? scaleWidth * 249
        : showLeftView
        ? scaleWidth * 182
        : scaleWidth * 160,
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingTop: scaleHeight * 4,
      paddingBottom: scaleHeight * 12,
      paddingLeft: !isGrid && !showLeftView ? scaleWidth * 12 : scaleWidth * 18,
    },
    divider: {
      width: isGrid
        ? scaleWidth * 249
        : showLeftView
        ? scaleWidth * 182
        : scaleWidth * 160,
      height: 1.2,
      marginTop: scaleHeight * 7,
      backgroundColor: Colors.primary.profilePicCircle,
    },
    projectName: {
      marginTop: scaleHeight * 15,
      marginLeft: scaleWidth * 10,
    },
    rightArrow: {
      width: scaleWidth * 12,
      height: scaleHeight * 20,
      marginTop: scaleHeight * 200,
    },
    leftArrow: {
      width: scaleWidth * 12,
      height: scaleHeight * 20,
    },
    leftBarContainer: {
      width: scaleWidth * 27,
      height: height,
      backgroundColor: darkMode
        ? Colors.primary.darkModeInputBg
        : Colors.primary.secondGray,
    },
    rightArrowContainer: {
      flex: 1,
      alignItems: 'center',
      marginTop: scaleHeight * 67,
      backgroundColor: darkMode
        ? Colors.primary.darkModeInputBg
        : Colors.primary.white,
    },
    imageBackground: {
      borderRadius: (scaleWidth * 58) / 2,
      borderWidth: 3,
    },
    listSelectedMembers: {
      padding: scaleWidth * 16,
    },
    listFooter: {
      height: scaleHeight * 20,
    },
    dragging: {
      opacity: 0.2,
    },
    hoverDragging: {
      borderColor: 'magenta',
      borderWidth: 2,
    },
    leftArrowContainer: {
      position: 'absolute',
      alignSelf: 'flex-end',
      marginTop: height * 0.33,
      width: scaleWidth * 30,
      height: scaleHeight * 35,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: darkMode
        ? Colors.primary.darkModeInputBg
        : Colors.primary.white,
      borderRadius: (scaleWidth * 35) / 2,
    },
  });
