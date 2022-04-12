import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Dialog, {DialogContent, SlideAnimation} from 'react-native-popup-dialog';
import {scaleWidth, scaleHeight} from '../utils/scaling';
import Fonts from '../constants/Fonts';
import EditInput from './EditInput';
import profileDemo from '../assets/images/profile/user.png';
import {ProjectContext} from '../context/ProjectContext';
import {UserContext} from '../context/UserContext';
import {updateUser} from '../utils/user';
import {type, permission} from '../constants/UsersData';
import DropDown from './DropDown';
import ProjectActiveInactiveConfirm from './ProjectActiveInactiveConfirm';
import {updateProject} from '../utils/project';
import * as _ from 'lodash';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {DisplayContext} from '../context/DisplayContext';

export default TeamMemberProfile = ({
  setVisible,
  callBack,
  teamMemberDetails,
  projectMemberDetails,
}) => {
  var message = `Are you sure you want to ${
    teamMemberDetails.isActive === false ? 'Activate' : 'Deactivate'
  }`;
  const insets = useSafeAreaInsets();
  const Message = require('../assets/icons/message.png');
  const [project, setProject] = useState(null);
  const [name, setName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [Occupation, setOccupation] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [certification, setCertification] = useState(null);
  const [projectPermission, setProjectPermission] = useState(null);
  const [editable, setEditable] = useState(false);
  const [dropDownEditable, setDropDownEditable] = useState(true);
  const [status, setStatus] = useState(null);
  const [showActiveConfirmDialog, setActiveConfirmDialog] = useState(false);
  const projectContext = useContext(ProjectContext);
  const userContext = useContext(UserContext);
  const {getUser} = userContext;
  const [userType, setUserType] = useState(null);
  const {projectData} = projectContext;
  const [certificateDate, setCertificateDate] = useState(false);
  const [certificationDate, setCertificationDate] = useState(null);
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  const style = styles(insets, darkMode);

  let projectNameObj = {};
  projectData?.map((item) => {
    if (item.id == teamMemberDetails.projectId) {
      projectNameObj['ProjectName'] = item.city;
    }
  });

  let userTypeArray = [];
  type.map((item) => {
    userTypeArray.push(item.text);
  });

  let permissionArray = [];
  permission.map((item) => {
    permissionArray.push(item.name);
  });

  useEffect(() => {
    setName(teamMemberDetails.name);
    setLastName(teamMemberDetails.lastName);
    setOccupation(teamMemberDetails.selectedProfession);
    setEmail(teamMemberDetails.email);
    setProjectPermission(teamMemberDetails.projectPermission);
    setProject(teamMemberDetails.employeeId);
    setUserType(teamMemberDetails.userType);
    setStatus(
      Object.keys(projectMemberDetails).length === 0
        ? true
        : projectMemberDetails.userRestDetails.isActive,
    );
    setCertification(teamMemberDetails.certification);
    setCertificationDate(
      moment(teamMemberDetails.certificationDate).format('MMMM D, YYYY'),
    );
    return () => {
      console.log('team member profile clean up');
    };
  }, [teamMemberDetails]);

  const edit = () => {
    setEditable(true);
    setDropDownEditable(false);
  };

  const onSuccess = (msg) => {
    console.log(msg);
    setEditable(false);
    setDropDownEditable(true);
    getUser();
  };

  let userDetails = {
    createdAt: teamMemberDetails.createdAt,
    email,
    employeeId: project,
    lastName,
    name,
    professionColor: teamMemberDetails.professionColor,
    projectId: teamMemberDetails.projectId,
    projectPermission: projectPermission,
    selectedProfession: teamMemberDetails.selectedProfession,
    userId: teamMemberDetails.userId,
    userType: userType,
    isActive: status,
    Certification: certification,
    certificateDate: certificationDate,
  };

  const save = () => {
    updateUser(userDetails, onSuccess);
    projectData.map((singleProjectData) => {
      singleProjectData?.assignedEmployees?.map((particularUser) => {
        if (particularUser.employeeId === projectMemberDetails.employeeId) {
          particularUser.userRestDetails = userDetails;
          updateProject(singleProjectData, singleProjectData.id, onSuccess);
        } else {
          console.log('not matched ');
        }
      });
    });
  };

  const selectedUserType = (item) => {
    setUserType(item == 'Admin' ? 0 : item == 'Moderator' ? 1 : 2);
  };

  const changeUserStatus = () => {
    setActiveConfirmDialog(true);
  };

  function userCertificate(date) {
    const formatDate = moment(date).format('MMMM D, YYYY');
    setCertificationDate(formatDate);
    setCertificateDate(false);
  }

  function userCancel() {
    setCertificateDate(false);
  }

  const confirm = () => {
    if (status === true) {
      userDetails.isActive = false;
      updateUser(userDetails, onSuccess);
      projectData.map((singleProjectData) => {
        singleProjectData.assignedEmployees.map((particularUser) => {
          if (
            particularUser.date === projectMemberDetails.date &&
            particularUser.employeeId === projectMemberDetails.employeeId
          ) {
            if (particularUser.userRestDetails.isActive === true) {
              particularUser.userRestDetails.isActive = false;
            } else {
              particularUser.userRestDetails.isActive = true;
            }
            updateProject(singleProjectData, singleProjectData.id, onSuccess);
          } else {
            console.log('not matched ');
          }
        });
      });
    }
    // else{
    //     userDetails.isActive = true
    //     updateUser(userDetails,onSuccess)
    //     projectData.map((singleProjectData) => {
    //         singleProjectData.assignedEmployees.map((particularUser) => {
    //             if(particularUser.date == projectMemberDetails.date  && particularUser.employeeId == projectMemberDetails.employeeId){
    //                 if(particularUser.userRestDetails.isActive === true){
    //                     particularUser.userRestDetails.isActive = false
    //                 }else{
    //                     particularUser.userRestDetails.isActive = true
    //                 }
    //                 updateProject(singleProjectData,singleProjectData.id,onSuccess)
    //             }
    //             else{
    //                 console.log("not matched")
    //             }
    //         })
    //     })
    // }
    setActiveConfirmDialog(false);
  };

  const cancel = () => {
    setActiveConfirmDialog(false);
  };

  return (
    <View>
      <ProjectActiveInactiveConfirm
        setVisible={showActiveConfirmDialog}
        message={message}
        projectName={teamMemberDetails.name}
        confirm={confirm}
        cancel={cancel}
      />
      <Dialog
        visible={setVisible}
        onHardwareBackPress={() => callBack()}
        onTouchOutside={() => callBack()}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }>
        <DialogContent style={style.dialogContent}>
          <View style={style.container}>
            <View style={style.headerContainer}>
              <TouchableOpacity onPress={() => callBack()}>
                <Text style={style.textHeader}>Close</Text>
              </TouchableOpacity>
              <Text style={style.textHeader}>
                {userType == 0
                  ? 'Admin'
                  : userType == 1
                  ? 'Moderator'
                  : 'Team Member'}
              </Text>
              {editable === false ? (
                <TouchableOpacity onPress={() => edit()}>
                  <Text style={style.textHeader}>{'Edit'}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => save()}>
                  <Text style={style.textHeader}>Save</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={style.bodyContainer}>
              <View style={style.rowView}>
                <Image
                  style={[
                    style.avatarDetailImage,
                    {
                      borderColor:
                        teamMemberDetails.professionColor !== ''
                          ? teamMemberDetails.professionColor
                          : '#fff',
                    },
                  ]}
                  source={profileDemo}
                />
                <Text style={style.name}>
                  {teamMemberDetails.name} {teamMemberDetails.lastName}
                </Text>
                {project !== null ? (
                  <View style={[style.columnView2]}>
                    <EditInput
                      placeHolder={'Employee Id'}
                      inputHeading={'Employee Id'}
                      value={project}
                      onChange={(project) => {
                        setProject(project);
                      }}
                      inpStyle={{width: scaleWidth * 255}}
                      isEditable={editable}
                    />
                  </View>
                ) : null}
              </View>
              <View style={style.rowView}>
                <View style={style.columnView}>
                  <EditInput
                    placeHolder={'First Name'}
                    inputHeading={'First Name'}
                    value={name}
                    onChange={(name) => {
                      setName(name);
                    }}
                    inpStyle={{width: scaleWidth * 255}}
                    isEditable={editable}
                  />
                </View>
                <View style={style.columnView}>
                  <EditInput
                    placeHolder={'Last Name'}
                    inputHeading={'Last Name'}
                    value={lastName}
                    onChange={(name) => {
                      setLastName(name);
                    }}
                    inpStyle={{width: scaleWidth * 255}}
                    isEditable={editable}
                  />
                </View>
              </View>
              <View style={style.rowView}>
                <View style={style.columnView}>
                  <EditInput
                    placeHolder={'Occupation'}
                    inputHeading={'Title'}
                    value={Occupation}
                    onChange={(Occupation) => {
                      setOccupation(Occupation);
                    }}
                    inpStyle={{width: scaleWidth * 255}}
                    isEditable={editable}
                  />
                </View>
                <View style={style.columnView}>
                  <EditInput
                    placeHolder={'000-000-100'}
                    inputHeading={'Phone'}
                    value={phone}
                    onChange={(phone) => {
                      setPhone(phone);
                    }}
                    inpStyle={{width: scaleWidth * 255}}
                    isEditable={editable}
                  />
                </View>
              </View>
              <View style={style.rowView}>
                <View style={style.columnView}>
                  <DropDown
                    darkMode={darkMode}
                    heading={'Project permissions'}
                    dropDownData={permissionArray}
                    placeHolder={
                      projectPermission == 0
                        ? 'Show all projects'
                        : 'Only show assigned projects'
                    }
                    selectedCall={(item) => setProjectPermission(item)}
                    isEditable={dropDownEditable}
                    customStyle={{width: scaleWidth * 250}}
                  />
                </View>
                <View style={style.columnView}>
                  <DropDown
                    darkMode={darkMode}
                    heading={'User Type'}
                    dropDownData={userTypeArray}
                    placeHolder={
                      userType == 0
                        ? 'Admin'
                        : userType == 1
                        ? 'Moderator'
                        : 'Team Member'
                    }
                    selectedCall={selectedUserType}
                    isEditable={dropDownEditable}
                    customStyle={{width: scaleWidth * 255}}
                  />
                </View>
              </View>
              <View style={style.rowView}>
                <View style={style.columnView}>
                  <EditInput
                    placeHolder={'my@noemail.com'}
                    inputHeading={'Email'}
                    value={email}
                    onChange={(email) => {
                      setEmail(email);
                    }}
                    inpStyle={{width: scaleWidth * 255}}
                    isEditable={editable}
                  />
                </View>
                <View style={style.columnView}>
                  <View style={style.rowView}>
                    <EditInput
                      placeHolder={'Certificate'}
                      inputHeading={'Certification'}
                      value={certification}
                      onChange={(certification) => {
                        setCertification(certification);
                      }}
                      inpStyle={{width: scaleWidth * 130}}
                      isEditable={editable}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setCertificateDate(editable ? true : false)
                      }>
                      <Text style={style.textDate}>{certificationDate}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                      isVisible={certificateDate}
                      mode="date"
                      onConfirm={userCertificate}
                      onCancel={userCancel}
                    />
                  </View>
                </View>
              </View>

              <View style={style.ButtonColumnView}>
                <View style={style.rowView}>
                  <TouchableOpacity onPress={() => null}>
                    <View style={[style.buttonView]}>
                      <Image style={style.messageIcon} source={Message} />
                      <Text style={style.buttonText}>Message</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={style.rowView}>
                  <TouchableOpacity onPress={() => changeUserStatus()}>
                    <View style={style.buttonView}>
                      <Text style={style.buttonText}>
                        {status === false ? 'Activate' : 'Deactivate'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </DialogContent>
      </Dialog>
    </View>
  );
};

const styles = (insets, darkMode) =>
  StyleSheet.create({
    dialogContent: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    container: {
      width: scaleWidth * 687,
      height: scaleHeight * 610,
      backgroundColor: Colors.primary.white,
    },
    headerContainer: {
      width: '100%',
      height: scaleHeight * 44,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: scaleWidth * 20,
      backgroundColor: darkMode
        ? Colors.primary.darkHeadingBackground
        : Colors.primary.blue,
    },
    textHeader: {
      fontSize: scaleWidth * 17,
      lineHeight: scaleWidth * 20,
      color: Colors.primary.white,
      fontFamily: Fonts.primary.regular,
    },
    bodyContainer: {
      width: '100%',
      height: '100%',
      paddingLeft: scaleWidth * 55,
      paddingTop: scaleHeight * 40,
      backgroundColor: darkMode ? Colors.primary.darkBg : Colors.primary.white,
    },
    chatPersonContainer: {
      height: scaleHeight * 75,
      backgroundColor: Colors.primary.white,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: scaleWidth * 15,
      borderColor: Colors.primary.secondGray,
      borderTopWidth: 0.5,
    },
    nameContainer: {
      flexDirection: 'column',
      paddingLeft: scaleWidth * 8,
    },
    belowNameContainer: {
      width: scaleWidth * 300,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    name: {
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      fontFamily: Fonts.primary.semiBold,
      color: Colors.primary.heading,
      width: scaleWidth * 120,
    },
    occupation: {
      fontSize: scaleWidth * 13,
      lineHeight: scaleWidth * 15,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      fontFamily: Fonts.primary.semiBold,
      color: Colors.primary.gray,
    },
    rowView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    columnView: {
      marginTop: scaleHeight * 26,
      marginRight: scaleWidth * 20,
    },
    ButtonColumnView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingRight: scaleWidth * 100,
    },
    columnView2: {
      marginTop: 0,
      marginLeft: scaleWidth * 70,
    },
    avatarDetailImage: {
      width: scaleWidth * 72,
      height: scaleWidth * 72,
      borderRadius: (scaleWidth * 72) / 2,
      borderWidth: 2,
      marginRight: scaleWidth * 10,
    },
    textValue: {
      width: scaleWidth * 281,
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      marginTop: scaleHeight * 10,
      paddingBottom: scaleHeight * 10,
      fontFamily: Fonts.primary.regular,
      color: Colors.primary.heading,
      borderBottomWidth: 0.5,
      borderBottomColor: Colors.primary.secondGray,
    },
    textValue2: {
      borderBottomWidth: 0,
    },
    rowCertification: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    textDate: {
      width: scaleWidth * 251,
      fontSize: scaleWidth * 15,
      lineHeight: scaleWidth * 22,
      fontFamily: Fonts.primary.regular,
      color: Colors.primary.heading,
      position: 'absolute',
      textAlign: 'left',
    },
    buttonView: {
      width: scaleWidth * 102,
      height: scaleHeight * 37,
      marginTop: scaleHeight * 35,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1.5,
      borderRadius: 4,
      borderColor: Colors.primary.blue,
    },
    buttonText: {
      color: darkMode ? Colors.primary.white : Colors.primary.darkGray,
    },
    messageIcon: {
      width: scaleWidth * 18,
      height: scaleHeight * 18,
      marginRight: scaleWidth * 5,
    },
    textMessage: {
      fontSize: scaleWidth * 14,
      lineHeight: scaleWidth * 21,
      color: Colors.primary.blue,
      fontFamily: Fonts.primary.regular,
    },
  });
