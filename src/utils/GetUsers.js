import firebase from "../firebase/firebase";

const getUsers = () => Promise.resolve(firebase.firestore().collection("users").get());

export default getUsers;
