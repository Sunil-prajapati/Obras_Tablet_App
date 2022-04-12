import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Colors from '../../constants/Colors';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Fonts from '../../constants/Fonts';
import TabViewUsers from '../../components/TabViewUsers';
import {scaleWidth, scaleHeight} from '../../utils/scaling';
import CustomMenu from '../../components/CustomMenu';
import DocumentPicker from 'react-native-document-picker';
import * as XLSX from 'xlsx';
import {readFile, DocumentDirectoryPath} from 'react-native-fs';
import {createUser} from '../../utils/user';
import {AuthContext} from '../../context/AuthContext';
import {sendEmail} from '../users/SendEmail';
import ShortingFilter from '../../components/Filter';
import {UserContext} from '../../context/UserContext';
import {DisplayContext} from '../../context/DisplayContext';
import sendMailgunEmail from '../users/MailgunEmail';

const input = (res) => res;

export default Users = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const MenuBurger = require('../../assets/icons/MenuBurger.png');
  const Filter = require('../../assets/icons/filter.png');
  const PlusImg = require('../../assets/icons/plus.png');
  const authContext = useContext(AuthContext);
  const {currentAuth} = authContext;
  const userContext = useContext(UserContext);
  const {
    users,
    getProfession,
    setShowListUsers,
    showListUsers,
    query,
    setQuery,
  } = userContext;
  const [searchedData, setSearchedData] = useState([]);
  const displayContext = useContext(DisplayContext);
  const {darkMode} = displayContext;
  const style = styles(insets, darkMode);

  async function openDocumentFile() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.xlsx],
      });
      const workbook = readFile(res.uri, 'ascii')
        .then(res)
        .then((response) => {
          const wb = XLSX.read(input(response), {type: 'binary'});
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws, {header: 1});
          var collection = data.slice();
          var keys = collection.shift();
          collection = collection.map(function (e) {
            var obj = {};
            keys.forEach(function (key, i) {
              obj[key] = e[i];
            });
            return obj;
          });
          const promises = collection.map(async (userList) => {
            userList['adminId'] = currentAuth.uid;
            const GetEmail = userList.email;
            await sendMailgunEmail(
              GetEmail,
              'Here it is your email for the Obras App',
              `You are invited as ${GetEmail}`,
              {cc: 'carbonCopy@domain.com;'},
            )
              .then(() => {
                createUser(userList);
              })
              .catch((err) => alert(err));
          });
          return Promise.all(promises);
        });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  }

  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const closeModel = () => {
    setModalVisible(false);
  };
  const selectItem = (id) => {
    if (id === 0) {
      navigation.navigate('CreateUser', {oneProjectDetail: null});
    } else {
      openDocumentFile();
    }
    setModalVisible(false);
  };
  const showCustomMenu = () => {
    setModalVisible(true);
  };

  const menuOptions = [
    {
      title: 'Create new user',
    },
    {
      title: 'Import users',
    },
  ];

  const modalHandler = () => {
    setFilterVisible(false);
  };

  const showFilter = () => {
    setFilterVisible(true);
  };

  let blankArray = [];
  function NotAssignedFilter() {
    users.map((singleUsers) => {
      if (singleUsers.isAssigned === false) {
        blankArray.push(singleUsers);
      }
    });
  }
  const handleSearch = (text) => {
    if (text) {
      const newData = users.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setSearchedData(newData);
      setQuery(text);
    } else {
      setSearchedData(users);
      setQuery(text);
    }
  };

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
    setFilterVisible(false);
  };

  const ChangeListOfUsers = (title) => {
    UsersAccToTitle(title);
    setSearchedData(UsersAccToTitleArray);
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

  const resetFilter = () => {
    setSearchedData(users);
    setModalVisible(false);
    setShowListUsers(0);
    UsersAccToTitleArray = [];
  };
  return (
    <>
      <ShortingFilter
        setVisible={isFilterVisible}
        callBack={modalHandler}
        usersType={(value) => usersListType(value)}
        saveButton={(value) => saveFilter(value)}
        selectTitle={(title) => ChangeListOfUsers(title)}
        ResetFilter={resetFilter}
      />
      <SafeAreaView style={style.container}>
        <View>
          <CustomMenu
            setVisible={isModalVisible}
            menuOptions={menuOptions}
            callBack={selectItem}
            close={closeModel}
          />
          <View style={style.headerContainer}>
            <TouchableOpacity
              style={style.menuBurger}
              onPress={() => toggleDrawer()}>
              <Image source={MenuBurger} />
            </TouchableOpacity>
            <View style={style.headerRow}>
              <Text style={style.textUsers}>Users</Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={style.filterIcon}
                  onPress={() => showFilter()}>
                  <Image style={style.icons} source={Filter} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={style.plusIcon}
                  onPress={() => showCustomMenu()}>
                  <Image style={style.icons} source={PlusImg} />
                </TouchableOpacity>
              </View>
            </View>
            <TextInput
              style={style.searchBox}
              placeholder={'Search users'}
              onChangeText={(searchString) => handleSearch(searchString)}
              underlineColorAndroid="transparent"
              value={query}
              autoCapitalize="none"
              placeholderTextColor={Colors.primary.gray}></TextInput>
          </View>
          <TabViewUsers
            searchedData={searchedData.length === 0 ? users : searchedData}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = (insets, darkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? Colors.primary.darkBg : Colors.primary.white,
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
    textUsers: {
      fontSize: scaleWidth * 28,
      lineHeight: scaleHeight * 32,
      color: Colors.primary.white,
      fontFamily: Fonts.primary.bold,
    },
    filterIcon: {
      marginRight: scaleWidth * 17,
    },
    plusIcon: {
      marginRight: scaleWidth * 15,
    },
    icons: {
      width: scaleWidth * 35,
      height: scaleWidth * 35,
    },
    searchBox: {
      height: scaleHeight * 37,
      marginTop: scaleHeight * 10,
      marginRight: scaleWidth * 15,
      borderRadius: 20,
      padding: 2,
      paddingLeft: scaleWidth * 16,
      margin: 0,
      borderWidth: 0,
      color: darkMode
        ? Colors.primary.darkModeInputBgheadingTextColor
        : Colors.primary.lightGray,
      backgroundColor: 'white',
      fontSize: scaleWidth * 15,
      fontFamily: Fonts.primary.regular,
      backgroundColor: darkMode
        ? Colors.primary.darkModeInputBg
        : Colors.primary.white,
    },
  });
