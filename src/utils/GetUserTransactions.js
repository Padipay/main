import firebase from "../firebase/firebase";

const getUserTransactions = (id) =>
  Promise.resolve(
    firebase
      .firestore()
      .collection("users")
      .doc(id)
      .collection("transactions")
      .orderBy("date", "desc")
      .get()
  );

export default getUserTransactions;
