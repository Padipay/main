import firebase from '../firebase/firebase';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp } from 'firebase-admin/app';

export const verificationLink = (useremail,actionCodeSettings) => {
    getAuth()
        .generateEmailVerificationLink(useremail, actionCodeSettings)
        .then((link) => {
            console.log(link)
        })
        .catch((error) => {
            console.log(error.message)
        })
}