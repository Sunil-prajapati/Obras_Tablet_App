import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const signUpWithEmail = async (
  email,
  password,
  setCurrentAuth,
  setEmailError,
  setPasswordError,
  onSuccess,
) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      setCurrentAuth(user.user);
      onSuccess(user.user);
    })
    .catch((err) => {
      let error = err.message;
      console.log('authApi signUpWithEmail failed error', error);

      let message = null;
      if (error.includes('email')) {
        if (error.includes('invalid-email')) {
          message = 'Invalid email address';
        }
        if (error.includes('email-already-in-use')) {
          message = 'Email already exists';
        }
        setEmailError(message);
      }

      if (error.includes('password')) {
        message = 'Password must be at least 6 characters';
        setPasswordError(message);
      }
    });
};

export const loginWithEmail = async (
  email,
  password,
  setEmailError,
  setPasswordError,
  onSuccess,
) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      onSuccess(user.user);
    })
    .catch((err) => {
      let error = err.message;
      console.log('authApi loginWithEmail failed error', error);

      let message = null;
      if (!error.includes('password')) {
        if (error.includes('user-not-found')) {
          message = 'User not found';
        }
        if (error.includes('user-disabled')) {
          message = 'User account has been disabled';
        }
        if (error.includes('invalid-email')) {
          message = 'Invalid email address';
        }
        setEmailError(message);
      }

      if (error.includes('password')) {
        message = 'Incorrect password';
        setPasswordError(message);
      }
    });
};

export const logout = () => {
  auth()
    .signOut()
    .then(() => {
      console.log('logged out!');
    });
};

export const forgotPassword = (email, onSuccess, setEmailError) => {
  auth()
    .sendPasswordResetEmail(email)
    .then(function () {
      // Email sent.
      onSuccess('email sent');
    })
    .catch(function (e) {
      // An error happened.
      if (
        e.message ==
        '[auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted.'
      ) {
        setEmailError('Invalid Email Address', 'User email not found');
      }
      if (
        e.message ==
        '[auth/invalid-email] The email address is badly formatted.'
      ) {
        setEmailError(
          'Invalid Email Address',
          'The email address is badly formatted.',
        );
      }
    });
};

//reAuthenticate user
export const reAuthenticateUser = (currentPassword) => {
  var user = firebase.auth().currentUser;
  var credentials = firebase.auth.EmailAuthProvider.credential(
    user.email,
    currentPassword,
  );
  return user.reauthenticateWithCredential(credentials);
};

//update user's email in firebase auth
export const updateUserEmail = (
  currentPassword,
  newEmail,
  setError,
  onSuccess,
) => {
  reAuthenticateUser(currentPassword)
    .then(() => {
      var user = firebase.auth().currentUser;
      user
        .updateEmail(newEmail)
        .then((response) => {
          console.log('Email updated!');
          setError(null);
          onSuccess(response);
        })
        .catch((error) => {
          setError(error);
        });
    })
    .catch((error) => {
      setError(error);
    });
};

//update user's password in firebase auth
export const updateUserPassword = (
  currentPassword,
  newPassword,
  setError,
  onSuccessPassword,
) => {
  reAuthenticateUser(currentPassword)
    .then(() => {
      var user = firebase.auth().currentUser;
      user
        .updatePassword(newPassword)
        .then(() => {
          console.log('Password updated!');
          setError(null);
          onSuccessPassword();
        })
        .catch((error) => {
          setError(error);
        });
    })
    .catch((error) => {
      setError(error);
    });
};

export const createUser = (data, onSuccess) => {
  const uid = auth().currentUser.uid;
  data.createdAt = new Date();
  firestore()
    .collection('admins')
    .doc(uid)
    .set(data)
    .then(() => {
      console.log('api createUser successful');
      onSuccess('Created successful');
    })
    .catch((e) => {
      console.log('api createUser error', e);
    });
};

export const updateUser = (data, onSuccess) => {
  const uid = auth().currentUser.uid;
  data.updatedAt = new Date();
  firestore()
    .collection('admins')
    .doc(uid)
    .update(data)
    .then(() => {
      onSuccess('Update User Successfully ');
      console.log('api updateUser successful');
    })
    .catch((e) => {
      console.log('api updateUser error', e);
    });
};

export const getUser = async (userId, setCurrentUser) => {
  firestore()
    .collection('admins')
    .doc(userId)
    .get()
    .then((documentSnapshot) => {
      //check if user active here
      if (documentSnapshot.exists) {
        console.log('authApi getUser exists', documentSnapshot.data());
        let user = {
          id: userId,
          ...documentSnapshot.data(),
        };
        setCurrentUser(user);
      } else {
        console.log('authApi getUser doesnt exist');
        setCurrentUser(null);
      }
    });
};
