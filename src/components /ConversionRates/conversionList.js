import React from "react";
import { List, 
    Datagrid, 
    TextField, 
    DateField, 
    EditButton, 
    DeleteButton,
    ShowButton } from 'react-admin';

function ConversionList(props) {
    return ( 
        <>
        <List {...props}>
            <Datagrid>
                <TextField source='Token'/>
                <TextField source='currentRate'/>
                <DateField source='Date'/>
                <EditButton />
            </Datagrid>
        </List>
        </>
     );
}

export default ConversionList;