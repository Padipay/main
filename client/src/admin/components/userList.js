import React from "react";
import { List, 
    Datagrid, 
    TextField,
    DateField } from 'react-admin';

function UserList(props) {
    return ( 
        <>
        <List {...props}>
            <Datagrid>
                <TextField source='FirstName'/>
                <TextField source='LastName'/>
                <TextField source='Email'/>
                <DateField source='SignUpDate'/>
            </Datagrid>
        </List>
        </>
     );
}

export default UserList;