import React from "react";
import { Admin, Resource } from 'react-admin';
import {
    FirebaseAuthProvider,
    FirebaseDataProvider,
  } from 'react-admin-firebase';
import TransactionList from "../components /transactions/transactionList";
import EditTransaction from "../components /transactions/editTransactions";
import ConversionList from "../components /ConversionRates/conversionList";
import EditConversion from "../components /ConversionRates/editConversion";

const config = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_projectId,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
};

const options = {
    watch: ['transactions']
}

const dataProvider = FirebaseDataProvider(config, options);
const authProvider = FirebaseAuthProvider(config, options);

function AdminDashboard() {
    return ( 
        <>
        <Admin dataProvider={dataProvider} authProvider={authProvider} basename="/admin">
            <Resource name="transactions" list={TransactionList} edit={EditTransaction}/>
            <Resource name="rates" list={ConversionList} edit={EditConversion}/>
        </Admin>
        </>
     );
}

export default AdminDashboard;