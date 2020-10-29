import firebase from "../firebase";
import cuid from "cuid";
export const uploadSnap = (file) => async (dispatch, getState) => {
  const state = getState();
  const userUid = firebase.auth().currentUser.uid;
  const firestore = firebase.firestore();
  const imageName = cuid();

  const path = `${userUid}/snaps`;
  const options = {
    name: imageName,
  };
  try {
    // upload the file to firebase storage
    let uploadedFile = await firebase.uploadFile(path, file, null, options);
    // get url of image
    let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
    console.log("add snap to user");

    return { url: downloadURL };
  } catch (error) {
    console.log(error);
    return error;
  }
};
