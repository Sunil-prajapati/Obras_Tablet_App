import React, {useState, useContext, useEffect} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {UserContext} from '../../context/UserContext';
import profileDemo from '../../assets/images/profile/user.png';
import {styleUser} from './StyleUser';
import {useNavigation} from '@react-navigation/core';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {DisplayContext} from '../../context/DisplayContext';
import {updateUser, deleteUser} from '../../utils/user';
import {updateProject} from '../../utils/project';
import {ProjectContext} from '../../context/ProjectContext';
import {scaleWidth} from '../../utils/scaling';
import DropDown from '../../components/DropDown';
import {permission} from '../../constants/UsersData';

export default Admins = (props) => {
  const insets = useSafeAreaInsets();
  const [selectedMember, setSelectedMember] = useState([]);
  const Message = require('../../assets/icons/message.png');
  const userContext = useContext(UserContext);
  const {users, getUser, query, setCount, sortedList} = userContext;
  const navigation = useNavigation();
  const [projectTitle, setProjectTitle] = useState(null);
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  const style = styleUser(insets, darkMode);
  const [dropDownEditable, setDropDownEditable] = useState(true);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [name, setName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [email, setEmail] = useState(null);
  const [certificateDate, setCertificateDate] = useState(false);
  const [certification, setCertification] = useState(null);
  const [projectPermission, setProjectPermission] = useState(null);
  const projectContext = useContext(ProjectContext);
  const {projectData} = projectContext;
  const [certificationDate, setCertificationDate] = useState(null);
  const [selectedItem, setSelecteditem] = useState(null);

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

  const onItemClick = (singleUser) => {
    setSelecteditem(singleUser.userId);
    setSelectedMember(singleUser);
    setSelectedMember(singleUser);
    setName(singleUser.name);
    setLastName(singleUser.lastName);
    setPhone(singleUser.Phone);
    setSelectedProfession(singleUser.selectedProfession);
    setEmail(singleUser.email);
    setCertificationDate(
      moment(singleUser.certificationDate).format('MMMM D, YYYY'),
    );
    setCertification(singleUser.Certification);
    setProjectPermission(singleUser.projectPermission);
    setProjectTitle(singleUser?.projectTitle);
  };

  const edit = () => {
    setInputDisabled(true);
    setDropDownEditable(false);
  };

  function userCertificate(date) {
    const cDate = moment(date).format('MMMM D, YYYY');
    setCertificationDate(cDate);
    setCertificateDate(false);
  }

  function userCancel() {
    setCertificateDate(false);
  }

  const onSuccess = (msg) => {
    console.log(msg);
    setInputDisabled(false);
    setDropDownEditable(true);
    getUser();
  };

  function deleteSuccess(msg) {
    console.log(msg);
    getUser();
  }

  const Delete = (employeeId) => {
    deleteUser(employeeId, deleteSuccess);
  };

  const save = () => {
    updateUser(teamMemberDetails, onSuccess);
    projectData.map((singleProjectData) => {
      singleProjectData.assignedEmployees.map((particularUser) => {
        if (particularUser.employeeId === selectedMember.employeeId) {
          particularUser.userRestDetails = teamMemberDetails;
          updateProject(singleProjectData, singleProjectData.id, onSuccess);
        } else {
          console.log('not matched');
        }
      });
    });
  };

  let permissionArray = [];
  permission.map((item) => {
    permissionArray.push(item.name);
  });
  useEffect(() => {
    users.map((singleUser) => {
      if (singleUser.userType === 0 && singleUser.isActive === true) {
        setSelectedMember(singleUser);
        setSelectedMember(singleUser);
        setName(singleUser.name);
        setLastName(singleUser.lastName);
        setPhone(singleUser.Phone);
        setSelectedProfession(singleUser.selectedProfession);
        setEmail(singleUser.email);
        setEmail(singleUser.email);
        setCertificationDate(
          moment(singleUser.certificateDate).format('MMMM D, YYYY'),
        );
        setCertification(singleUser.Certification);
        setProjectPermission(singleUser.projectPermission);
        setProjectTitle(singleUser?.projectTitle);
      }
    });
    return () => {
      console.log('Admin');
    };
  }, []);

  const renderTeamMembers = ({item}) => {
    return item.userType === 0 && item.isActive === true ? (
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
              <Image
                style={[
                  style.avatarDetailImage,
                  {borderColor: selectedMember.professionColor},
                ]}
                source={profileDemo}
              />
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
              <View style={style.columnView}></View>
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
                    dropDownData={permissionArray}
                    darkMode={darkMode}
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
                  placeHolder={'certificate Date'}
                  inputHeading={'certificate Date'}
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
