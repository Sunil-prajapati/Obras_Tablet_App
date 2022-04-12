import firestore from '@react-native-firebase/firestore';

export const createProject = (data, onSuccess) => {
  data.createdAt = new Date();
  firestore()
    .collection('projects')
    .doc()
    .set(data)
    .then(() => {
      onSuccess('Project Created Successfully');
      console.log('api createProject successful');
    })
    .catch((e) => {
      console.log('api createProject error', e);
    });
};

export const updateProject = (data, id, onSuccess) => {
  data.updatedAt = new Date();
  firestore()
    .collection('projects')
    .doc(id)
    .update(data)
    .then(() => {
      onSuccess('success in updating project');
    })
    .catch((e) => {
      console.log('api update project error', e);
    });
};
