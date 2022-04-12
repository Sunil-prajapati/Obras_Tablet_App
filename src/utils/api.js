import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const uploadProfilePicture = (image,setError,onSuccess) => {
  const uid = auth().currentUser.uid
  const storage = firebase.storage();
  let profilePic = storage.ref().child('profilePictures/'+uid+'.jpg');

  var metadata = {
    cacheControl: 'max-age=31536000'
  }

  profilePic.putFile(image, metadata).then(snapshot => {
    // setLoading(false)
    onSuccess(snapshot.state)
  }).catch(error => {
    console.log('utils uploadProfilePicture error ', error)
    setError(error)
  })
}

export const getProfilePicture = async (uid, setProfilePic) => {
  const storage = firebase.storage();
  const profilePic = storage.ref().child('profilePictures/'+uid+'.jpg');
  profilePic.getDownloadURL().then(url => {
    setProfilePic(url)
  }).catch(err => {
    console.log('api getProfilePicture Error: ', err)
    setProfilePic(null)
  })
}

export const uploadMessageImages = (image,name,userId,setError,onSuccess) => {
  const uid = auth().currentUser.uid
  const storage = firebase.storage()
  let messagesImages = storage.ref().child('messageImages/'+name+'.jpg')
  var metadata = {
    cacheControl: 'max-age=31536000'
  }
  messagesImages.putFile(image, metadata).then(snapshot => {
    onSuccess(snapshot.metadata.name)
  }).catch(error => {
    console.log('utils messagesImages error ', error)
    setError(error)
  })
}


export const getMessagePicture = async (imageName,userId,fetchSuccess) => {
  const uid = auth().currentUser.uid
  const storage = firebase.storage();
  const messagesImages = storage.ref().child(imageName);
  messagesImages.getDownloadURL().then(url => {
    fetchSuccess(url)
  }).catch(err => {
    console.log('api messagesImages Error: ', err)
    fetchSuccess(null)
  })
}