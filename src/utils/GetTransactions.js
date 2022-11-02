import firebase from "../firebase/firebase";

const getTransactions = () =>
  Promise.resolve(firebase.firestore().collection("transactions").orderBy("date", "desc").get());

export default getTransactions;
