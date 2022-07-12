import React from "react";
import { List, 
    Datagrid, 
    TextField, 
    DateField, 
    EditButton, 
    BooleanField,
    DeleteButton,
    ShowButton } from 'react-admin';
import TransactionFilter from "./transactionFilter";
function TransactionList(props) {
    return ( 
        <>
        <List {...props} filters={<TransactionFilter />}>
            <Datagrid>
                <TextField source='id'/>
                <TextField source='receive'/>
                <TextField source='send'/>
                <TextField source='token'/>
                <TextField source='account_name'/>
                <TextField source='account_number'/>
                <TextField source='bankName'/>
                <BooleanField source='status'/>
                <DateField source='date'/>
                <EditButton />
            </Datagrid>
        </List>
        </>
     );
}

export default TransactionList;