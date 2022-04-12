import React, {useState, useContext, useEffect} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {UserContext} from '../../context/UserContext';
import profileDemo from '../../assets/images/profile/user.png';
import {styleUser} from './StyleUser';
import {updateUser} from '../../utils/user';
import {ProjectContext} from '../../context/ProjectContext';
import {updateProject} from '../../utils/project';
import {useNavigation} from '@react-navigation/core';
import moment from 'moment';
import {DisplayContext} from '../../context/DisplayContext';
import {scaleWidth} from '../../utils/scaling';

export default InActive = (props) => {
  const insets = useSafeAreaInsets();
  const [selectedMember, setSelectedMember] = useState([]);
  const Message = require('../../assets/icons/message.png');
  const userContext = useContext(UserContext);
  const {users, getUser, setCount, sortedList} = userContext;
  const projectContext = useContext(ProjectContext);
  const {projectData} = projectContext;
  const navigation = useNavigation();
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  const style = styleUser(insets, darkMode);

  const onItemClick = (item) => {
    setSelectedMember(item);
  };

  useEffect(() => {
    users.map((singleUser) => {
      if (singleUser.isActive === false) {
        setSelectedMember(singleUser);
      }
    });
    return () => {
      console.log('Inactive');
    };
  }, []);

  const modifyCertificateDate = moment(selectedMember.certificateDate).format(
    'MMMM D YYYY',
  );

  const onSuccess = (msg) => {
    console.log(msg);
    getUser();
  };

  const changeUserStatus = () => {
    if (selectedMember.isActive === false) {
      selectedMember.isActive = true;
      updateUser(selectedMember, onSuccess);
      projectData.map((singleProjectData) => {
        singleProjectData.assignedEmployees.map((particularUser) => {
          if (particularUser.employeeId === selectedMember.employeeId) {
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
  };

  const renderTeamMembers = ({item}) => {
    return item.isActive === false ? (
      <TouchableOpacity onPress={() => onItemClick(item)} key={item.name}>
        <View style={style.chatPersonContainer}>
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
      {selectedMember.isActive === false ? (
        <>
          <View style={style.leftContainer}>
            <FlatList
              data={sortedList}
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
              <View style={[style.columnView, {marginLeft: scaleWidth * 196}]}>
                <Text style={style.occupation}>Project Title</Text>
                <Text style={style.textValue}>
                  {selectedMember.projectTitle}
                </Text>
              </View>
            </View>

            <View style={style.rowView}>
              <View style={style.columnView}>
                <Text style={style.occupation}>Name</Text>
                <Text style={style.textValue}>{selectedMember.name}</Text>
              </View>
              <View style={style.columnView}>
                <Text style={style.occupation}>Last Name</Text>
                <Text style={style.textValue}>{selectedMember.lastName}</Text>
              </View>
            </View>
            <View style={style.rowView}>
              <View style={style.columnView}>
                <Text style={style.occupation}>Title</Text>
                <Text style={style.textValue}>
                  {selectedMember.selectedProfession}
                </Text>
              </View>
              <View style={style.columnView}>
                <Text style={style.occupation}>Phone</Text>
                <Text style={style.textValue}>{selectedMember.phone}</Text>
              </View>
            </View>
            <View style={style.rowView}>
              F
              <View style={style.columnView}>
                <Text style={style.occupation}>Email</Text>
                <Text style={style.textValue}>{selectedMember.email}</Text>
              </View>
              <View style={style.columnView}>
                <Text style={style.occupation}>CertificateDate</Text>
                <Text style={style.textValue}>{modifyCertificateDate}</Text>
              </View>
            </View>
            <View style={style.rowView}>
              <View style={style.columnView}>
                <Text style={style.occupation}>Certification</Text>
                <View style={style.rowView}>
                  <Text style={style.textValue}>
                    {selectedMember.Certification}
                  </Text>
                </View>
              </View>
              <View style={style.columnView}>
                <Text style={style.occupation}>Project permissions</Text>
                <Text style={style.textValue}>
                  {selectedMember.projectPermission === 0
                    ? 'Show All Projects'
                    : 'Show only Assigned Projects'}
                </Text>
              </View>
            </View>
            <View style={style.rowView1}>
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
                <TouchableOpacity onPress={() => changeUserStatus()}>
                  <View style={style.buttonView}>
                    <Text style={style.textMessage}>Activate</Text>
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
