import firestore from '@react-native-firebase/firestore';

export const createProfession = (data, onSuccess) => {
  data.createdAt = new Date();
  firestore()
    .collection('professions')
    .doc()
    .set(data)
    .then(() => {
      onSuccess('Profession created successfully');
    })
    .catch((e) => {
      console.log('api professions  error', e);
    });
};

export const createUser = (data, onSuccess) => {
  data.createdAt = new Date();
  firestore()
    .collection('users')
    .doc()
    .set(data)
    .then(() => {
      onSuccess('User Created Successfully');
    })
    .catch((e) => {
      console.log('api CreateUser error', e);
    });
};

export const updateUser = (data, onSuccess) => {
  data.updatedAt = new Date();
  firestore()
    .collection('users')
    .doc(data.userId)
    .update(data)
    .then(() => {
      onSuccess('update user Projects  Successfully');
    })
    .catch((e) => {
      console.log('update user Projects  error', e);
    });
};

export const deleteUser = (userId, onSuccess) => {
  firestore()
    .collection('users')
    .doc(userId)
    .delete()
    .then(() => {
      onSuccess('delete user Projects  Successfully');
    })
    .catch((e) => {
      console.log('delete user Projects  error', e);
    });
};
