import React, {useState, useContext, useEffect} from 'react';
import {View, Text, FlatList, Image, Alert} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {UserContext} from '../../context/UserContext';
import profileDemo from '../../assets/images/profile/user.png';
import {useNavigation} from '@react-navigation/core';
import {styleUser} from './StyleUser';
import moment from 'moment';
import {DisplayContext} from '../../context/DisplayContext';
import {scaleWidth} from '../../utils/scaling';
import EditInput from '../../components/EditInput';
import {updateUser, deleteUser} from '../../utils/user';
import {ProjectContext} from '../../context/ProjectContext';
import {updateProject} from '../../utils/project';
import DropDown from '../../components/DropDown';
import {permission} from '../../constants/UsersData';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default TeamMembers = (props) => {
  const insets = useSafeAreaInsets();
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  const style = styleUser(insets, darkMode);
  const Message = require('../../assets/icons/message.png');
  const userContext = useContext(UserContext);
  const {users, getUser, query, setCount, sortedList} = userContext;
  const [inputDisabled, setInputDisabled] = useState(false);
  const [selectedMember, setSelectedMember] = useState([]);
  const navigation = useNavigation();
  const [name, setName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [dropDownEditable, setDropDownEditable] = useState(true);
  const [phone, setPhone] = useState(null);
  const [projectTitle, setProjectTitle] = useState(null);
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [email, setEmail] = useState(null);
  const [certificateDate, setCertificateDate] = useState(false);
  const [certificationDate, setCertificationDate] = useState(null);
  const [certification, setCertification] = useState(null);
  const projectContext = useContext(ProjectContext);
  const [projectPermission, setProjectPermission] = useState(null);
  const {projectData} = projectContext;
  const [selectedItem, setSelecteditem] = useState(null);

  const onItemClick = (singleUser) => {
    setSelecteditem(singleUser.userId);
    setSelectedMember(singleUser);
    setName(singleUser.name);
    setLastName(singleUser.lastName);
    setPhone(singleUser.Phone);
    setSelectedProfession(singleUser.selectedProfession);
    setEmail(singleUser.email);
    setCertificationDate(
      moment(singleUser.certificateDate).format('MMMM D, YYYY'),
    );
    setCertification(singleUser.Certification);
    setProjectPermission(singleUser.projectPermission);
    setProjectTitle(singleUser.projectTitle);
  };

  const edit = () => {
    setInputDisabled(true);
    setDropDownEditable(false);
  };

  const onSuccess = (msg) => {
    console.log(msg);
    setInputDisabled(false);
    setDropDownEditable(true);
    getUser();
  };

  const teamMemberDetails = {
    name,
    employeeId: selectedMember.employeeId,
    lastName,
    projectTitle,
    phone,
    professionColor: selectedMember.professionColor,
    projectPermission: projectPermission,
    selectedProfession: selectedMember.selectedProfession,
    userId: selectedMember.userId,
    userType: selectedMember.userType,
    isActive: selectedMember.isActive,
    email,
    certificateDate: moment(certificationDate).format(),
    certification,
  };

  const save = () => {
    updateUser(teamMemberDetails, onSuccess);
    projectData.map((singleProjectData) => {
      singleProjectData.assignedEmployees.map((particularUser) => {
        if (particularUser.employeeId === selectedMember.employeeId) {
          particularUser.userRestDetails = teamMemberDetails;
          updateProject(singleProjectData, singleProjectData.id, onSuccess);
        } else {
          console.log('not matched ');
        }
      });
    });
  };

  let permissionArray = [];
  permission.map((item) => {
    permissionArray.push(item.name);
  });

  function userCertificate(date) {
    const cDate = moment(date).format('MMMM D, YYYY');
    setCertificationDate(cDate);
    setCertificateDate(false);
  }

  function userCancel() {
    setCertificateDate(false);
  }

  function deleteSuccess(msg) {
    console.log(msg);
    getUser();
  }

  let anyExist = [];
  const Delete = (employeeId) => {
    projectData.map((projects, index) => {
      projects.assignedEmployees.map((item) => {
        if (item.userRestDetails.userId == employeeId) {
          anyExist.push(true);
        } else {
          anyExist.push(false);
        }
      });
    });
    const deleteOrNot = anyExist.some((elements) => elements === true);

    if (!deleteOrNot) {
      Alert.alert('Are you sure you want to delete user', '', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteUser(employeeId, deleteSuccess)},
      ]);
    } else {
      alert('worker is assigned to a project');
    }
  };

  useEffect(() => {
    users.map((singleUser) => {
      if (singleUser.userType === 2 && singleUser.isActive === true) {
        setSelectedMember(singleUser);
        setName(singleUser.name);
        setLastName(singleUser.lastName);
        setPhone(singleUser.Phone);
        setSelectedProfession(singleUser.selectedProfession);
        setEmail(singleUser.email);
        setCertificationDate(
          moment(singleUser.certificateDate).format('MMMM D, YYYY'),
        );
        setCertification(singleUser.Certification);
        setProjectPermission(singleUser.projectPermission);
        setProjectTitle(singleUser.projectTitle);
      }
    });
    return () => {
      console.log('team member');
    };
  }, []);

  const renderTeamMembers = ({item}) => {
    return item.userType === 2 && item.isActive === true ? (
      <TouchableOpacity onPress={() => onItemClick(item)} key={item.name}>
        <View
          style={
            item.userId === selectedItem
              ? style.activeChatPersonContainer
              : style.chatPersonContainer
          }>
          <Image
            style={[style.avatarImage, {borderColor: item.professionColor}]}
            source={profileDemo}
          />
          <View style={style.nameContainer}>
            <Text style={style.name}>{`${item.name} ${item.lastName}`}</Text>
            <View style={style.belowNameContainer}>
              <Text style={style.occupation}>{item.selectedProfession}</Text>
              <Text style={style.occupation}>{item.city}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ) : null;
  };
  return (
    <View style={style.container}>
      {selectedMember.length !== 0 ? (
        <>
          <View style={style.leftContainer}>
            <FlatList
              extraData={selectedItem}
              data={query == '' ? sortedList : props.searchedData}
              renderItem={renderTeamMembers}
              keyExtractor={(item, id) => id.toString()}
            />
          </View>
          <View style={style.rightContainer}>
            <View style={style.rowView}>
              <View style={style.columnView}>
                <Image
                  style={[
                    style.avatarDetailImage,
                    {borderColor: selectedMember.professionColor},
                  ]}
                  source={profileDemo}
                />
              </View>
              <View style={[style.columnView, {marginLeft: scaleWidth * 172}]}>
                <EditInput
                  placeHolder={'Projct title'}
                  inputHeading={'Projct title'}
                  style={style.textValue}
                  value={projectTitle}
                  onChange={(text) => setProjectTitle(text)}
                  isEditable={inputDisabled}
                  inpStyle={{width: scaleWidth * 255}}
                />
              </View>
            </View>

            <View style={style.rowView}>
              <View style={style.columnView}>
                <EditInput
                  placeHolder={'Name'}
                  inputHeading={'First Name'}
                  style={style.textValue}
                  value={name}
                  onChange={(text) => setName(text)}
                  isEditable={inputDisabled}
                  inpStyle={{width: scaleWidth * 255}}
                />
              </View>
              <View style={style.columnView}>
                <EditInput
                  placeHolder={'Last Name'}
                  inputHeading={'Last Name'}
                  style={style.textValue}
                  value={lastName}
                  onChange={(text) => setLastName(text)}
                  isEditable={inputDisabled}
                  inpStyle={{width: scaleWidth * 255}}
                />
              </View>
            </View>
            <View style={style.rowView}>
              <View style={style.columnView}>
                <EditInput
                  placeHolder={'Title'}
                  inputHeading={'Title'}
                  style={style.textValue}
                  value={selectedProfession}
                  onChange={(text) => setSelectedProfession(text)}
                  isEditable={inputDisabled}
                  inpStyle={{width: scaleWidth * 255}}
                />
              </View>
              <View style={style.columnView}>
                <EditInput
                  placeHolder={'Phone'}
                  inputHeading={'Phone'}
                  style={style.textValue}
                  value={phone}
                  onChange={(text) => setPhone(text)}
                  isEditable={inputDisabled}
                  inpStyle={{width: scaleWidth * 255}}
                />
              </View>
            </View>
            <View style={style.rowView}>
              <View style={style.columnView}>
                <EditInput
                  placeHolder={'Email'}
                  inputHeading={'Email'}
                  style={style.textValue}
                  value={email}
                  onChange={(text) => setEmail(text)}
                  isEditable={inputDisabled}
                  inpStyle={{width: scaleWidth * 255}}
                />
              </View>
              <View style={style.rowView}>
                <View style={style.columnView}>
                  <DropDown
                    heading={'Project permissions'}
                    darkMode={darkMode}
                    dropDownData={permissionArray}
                    placeHolder={
                      projectPermission == 0
                        ? 'Show all projects'
                        : 'Only show assigned projects'
                    }
                    selectedCall={(item) =>
                      setProjectPermission(item === 'Show all projects' ? 0 : 1)
                    }
                    isEditable={dropDownEditable}
                    customStyle={{width: scaleWidth * 250}}
                  />
                </View>
              </View>
            </View>
            <View style={style.rowView}>
              <View style={style.columnView}>
                <EditInput
                  placeHolder={'Certification'}
                  inputHeading={'Certification'}
                  style={style.textValue}
                  value={certification}
                  onChange={(text) => setCertification(text)}
                  isEditable={inputDisabled}
                  inpStyle={{width: scaleWidth * 255}}
                />
              </View>
              <View style={style.columnView}>
                <TouchableOpacity
                  onPress={() =>
                    setCertificateDate(inputDisabled ? true : false)
                  }>
                  <Text style={style.textValue}>{certificationDate}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={certificateDate}
                  mode="date"
                  onConfirm={userCertificate}
                  onCancel={userCancel}
                />
              </View>
            </View>
            <View style={style.rowView}>
              <View style={style.columnView}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(
                      {name: 'Messages', params: {query: selectedMember}},
                      setCount(true),
                    )
                  }>
                  <View style={style.buttonView}>
                    <Image style={style.messageIcon} source={Message} />
                    <Text style={style.textMessage}>Message</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={style.columnView}>
                {inputDisabled === false ? (
                  <TouchableOpacity onPress={() => edit()}>
                    <View style={style.buttonView}>
                      <Text style={style.textMessage}>Edit</Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => save()}>
                    <View style={style.buttonView}>
                      <Text style={style.textMessage}>Save</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={style.columnView}>
                <TouchableOpacity onPress={() => Delete(selectedMember.userId)}>
                  <View style={style.deleteButtonView}>
                    <Text style={style.DeleteTextMessage}>Delete</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      ) : null}
    </View>
  );
};
