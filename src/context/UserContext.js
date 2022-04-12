import React, {useState, createContext, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from './AuthContext';
export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [allProfessions, setAllProfessions] = useState();
  const [users, setUsers] = useState([]);
  const [showListUsers, setShowListUsers] = useState(0);
  const [query, setQuery] = useState('');
  const [count, setCount] = useState(true);
  const authContext = useContext(AuthContext);
  const {currentAuth} = authContext;

  const sortedList = users.sort((a, b) => {
    let fa = a.lastName.toLowerCase(),
      fb = b.lastName.toLowerCase();
    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });

  const getProfession = () => {
    let allProfessions = [];
    const profession = firestore()
      .collection('professions')
      .where('adminId', '==', currentAuth.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          let singleProfession = {
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          };
          allProfessions.push(singleProfession);
        });
        setAllProfessions(allProfessions);
      });
    return () => profession();
  };

  const getUser = () => {
    let users = [];

    const user = firestore()
      .collection('users')
      .where('adminId', '==', currentAuth.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          let singleUser = {
            userId: documentSnapshot.id,
            ...documentSnapshot.data(),
          };
          users.push(singleUser);
        });
        setUsers(users);
      });
    return () => user();
  };
  return (
    <UserContext.Provider
      value={{
        getProfession,
        getUser,
        allProfessions,
        users,
        setShowListUsers,
        showListUsers,
        setQuery,
        query,
        count,
        setCount,
        sortedList,
      }}>
      {children}
    </UserContext.Provider>
  );
};
