import React from "react";
import { Edit, 
    TextInput, 
    DateField, 
    SimpleForm} from 'react-admin';

function EditConversion() {
    return ( 
        <>
        <Edit title='Edit Rates'>
            <SimpleForm>
                <TextInput disabled source='Token'/>
                <TextInput source='currentRate'/>
                <TextInput source='Date'/>
            </SimpleForm>
        </Edit>
        </>
     );
}

export default EditConversion;