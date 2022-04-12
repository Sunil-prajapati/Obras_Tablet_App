import React, {useState, createContext, useEffect, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import {AuthContext} from './AuthContext';

export const ProjectContext = createContext();

export const ProjectProvider = ({children}) => {
  const [initializing, setInitializing] = useState(true);
  const [projectData, setProjectData] = useState([]);
  const authContext = useContext(AuthContext);
  const {currentAuth} = authContext;
  const [displayDay, setDisplayDay] = useState(
    moment(new Date()).format('MMMM D, YYYY'),
  );
  const [currentSelectedWeekFirst, setCurrentSelectedWeekFirst] = useState(
    moment().weekday(1).format('MMMM D - '),
  );
  const [currentSelectedWeekLast, setCurrentSelectedWeekended] = useState(
    moment().weekday(7).format('MMMM D'),
  );
  const [forInitialDayOfWeek, setForInitialDayOfWeek] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(
    moment(new Date()).format('MMMM YYYY'),
  );
  const [countMonthDays, setCountMonthDays] = useState(
    moment(new Date()).daysInMonth(),
  );
  const [selectedMonthNumeric, setSelectedMonthNumeric] = useState(
    moment(new Date()).format('MM'),
  );
  const [teamMemberUpdated, setTeamMemberUpdated] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [idAddUser, setAddUser] = useState(false);
  useEffect(() => {
    // setAddUser(true);
    if (initializing) setInitializing(false);
  }, []);

  const fetchProjects = async (postPerLoad) => {
    const posts = [];
    const querySnapshot = await firestore()
      .collection('projects')
      .where('adminId', '==', currentAuth.uid)
      .limit(postPerLoad)
      .get();
    const lastVisibal = querySnapshot.docs[querySnapshot.docs.length - 1];
    querySnapshot.forEach((doc) => {
      let postData = doc.data();
      postData.postId == doc.id;
      posts.push(postData);
    });

    return {posts, lastVisibal};
  };

  const fetchMoreProject = async (startAfter, postPerLoad) => {
    const posts = [];
    const querySnapshot = await firestore()
      .collection('projects')
      .where('adminId', '==', currentAuth.uid)
      .startAfter(startAfter)
      .limit(postPerLoad)
      .get();
    const lastVisibal = querySnapshot.docs[querySnapshot.docs.length - 1];
    querySnapshot.forEach((doc) => {
      let postData = doc.data();
      postData.postId == doc.id;
      posts.push(postData);
    });
    return {posts, lastVisibal};
  };

  const getProjects = () => {
    let projectData = [];
    const projects = firestore()
      .collection('projects')
      .where('adminId', '==', currentAuth.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          let singleProject = {
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          };
          projectData.push(singleProject);
        });
        setProjectData(projectData);

        setSearchedData(projectData);
      });
    return () => projects();
  };

  if (initializing) return null;

  return (
    <ProjectContext.Provider
      value={{
        setProjectData,
        projectData,
        fetchProjects,
        fetchMoreProject,
        getProjects,
        setDisplayDay,
        displayDay,
        setCurrentSelectedWeekFirst,
        currentSelectedWeekFirst,
        setCurrentSelectedWeekended,
        currentSelectedWeekLast,
        setForInitialDayOfWeek,
        forInitialDayOfWeek,
        setSelectedMonth,
        selectedMonth,
        setCountMonthDays,
        countMonthDays,
        setSelectedMonthNumeric,
        selectedMonthNumeric,
        setTeamMemberUpdated,
        teamMemberUpdated,
        setSearchedData,
        searchedData,
        idAddUser,
        setAddUser,
      }}>
      {children}
    </ProjectContext.Provider>
  );
};
