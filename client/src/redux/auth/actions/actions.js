import * as types from '../actions/actionTypes';
import firebase from '../../../firebase/firebase';
import { sendVerificationEmail } from '../../../utils/sendEmail';

export const signUp = (email, password, fname, lname, navigate) => dispatch => {
    dispatch(loading())
    firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                sendVerificationEmail(email, fname)
                // response.user.getIdToken().then(function(idToken) { 
                //     sessionStorage.setItem('Auth-Token', idToken)
                //  });
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set({
                        Email: email,
                        FirstName: fname,
                        LastName: lname,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    })
                    .then(() => {
                        console.log("Document saved successfully")
                        dispatch(verifyAuth())
                        dispatch(authUser({}))
                        navigate('/verify')
                        dispatch(loading())
                    }).catch((err) => {
                        dispatch(loading())
                        dispatch(authError(err)) 
                    })
            }).catch((error) => {
            dispatch(loading())
            dispatch(authError('This email is already in use by another account'))
        }); 
}



export const login = (email, password, navigate) => dispatch => {
    dispatch(loading())
    dispatch(verifyAuth())
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((response) => {
        if (response.user.emailVerified === true) {
            const uid = response.user.uid
            response.user.getIdToken().then(function(idToken) { 
                sessionStorage.setItem('Auth-Token', idToken)
            });
            const usersRef = firebase.firestore().collection('users')
            usersRef
            .doc(uid)
            .get()
            .then(firestoreDocument => {
                if(!firestoreDocument.exists) {
                    dispatch(loading())
                    navigate('/login', {replace: true})
                }
                const user = firestoreDocument.data()
                dispatch(loggedIn())
                dispatch(authUser(user))
                dispatch(verifyAuth())
                dispatch(loading())
                navigate('/dashboard')
            }).catch((err) => {
                dispatch(loading())
                dispatch(verifyAuth())
                dispatch(authError(err.message))
            })
        }else{
            dispatch(loading())
            dispatch(verifyError('Please verify your email address'))
        }
    }).catch((error) => {
        dispatch(loading())
        dispatch(verifyAuth())
        dispatch(authError('Email address or password is wrong'))
    })
}

export const getUser = () => dispatch => {
    dispatch(loading())
    const temp = []
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            firebase.firestore().collection('users')
            .doc(user.uid)
            .get()
            .then((doc) => {
                dispatch(authUser(doc.data()))
                // dispatch(loading())
            })
            firebase.firestore().collection('users').doc(user.uid)
                .get().then((doc) => {
                    if (doc.exists) {
                        firebase.firestore().collection('users').doc(user.uid).collection('transactions')
                            .get().then((query) => {
                                if (query.size > 0) {
                                    // console.log(query.size)
                                    firebase.firestore().collection('users').doc(user.uid)
                                    .collection('transactions')
                                    .orderBy("date", "desc") 
                                    .onSnapshot((querySnapshot) => {
                                        querySnapshot.forEach((doc) => {
                                            temp.push({data:doc.data(), id:doc.id})
                                            dispatch(transactions(temp))
                                        })
                                    })
                                }
                                dispatch(loading())
                            })
                    }
                })
        }
    })

}

export const editProfile = (fname, lname, toast) => dispatch => {
    dispatch(loading())
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            firebase.firestore().collection('users')
            .doc(user.uid)
            .update({
                FirstName: fname,
                LastName: lname
            })
            .then(() => {
                toast.success("Your profile has been updated!", {
                    position: toast.POSITION.TOP_RIGHT,
                    });
                    dispatch(loading())
            })
            .catch((err) => {
                toast.error("There was a problem updating your profile", {
                    position: toast.POSITION.TOP_RIGHT,
                    });
                    dispatch(loading())
            })
        }
    })
}

export const transactions = (data) => dispatch => {
    dispatch({
        type:types.TRANSACTIONS,
        payload: data
    })
}

export const signOut = (navigate) => dispatch => {
    firebase
    .auth()
    .signOut()
    .then(() => {
        navigate('/login')
        sessionStorage.clear()
        dispatch(loggedout())
    })
    .catch((err) => {
        console.log(err.message)
    })
}

export const authUser = (data) => dispatch => {
    dispatch({
        type: types.AUTH_USER,
        payload:data
    });
};

export const loading = () => dispatch => {
    dispatch({
        type: types.LOADING
    });
};

export const loggedIn = () => dispatch => {
    dispatch({
        type: types.LOGGED_IN
    });
};

export const loggedout = () => dispatch => {
    dispatch({
        type: types.LOGGED_OUT
    });
};

export const authError = (error) => dispatch => {
    dispatch({
        type: types.ERROR_MESSAGE,
        payload: error
    });
};

export const verifyAuth = () => dispatch => {
    dispatch({
        type: types.VERIFY_AUTH
    });
};

export const verifyError = (error) => dispatch => {
    dispatch({
        type: types.VERIFY_ERROR,
        payload: error
    });
};