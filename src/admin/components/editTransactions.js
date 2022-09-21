import React from "react";
import { Edit, 
    TextInput, 
    BooleanField, 
    SimpleForm} from 'react-admin';
function EditTransaction() {
    return (  
        <>
            <Edit title='Update Transaction'>
                <SimpleForm>
                    <TextInput disabled source='id'/>
                    {/* <TextInput disabled source='receive'/>
                    <TextInput disabled source='send'/>
                    <TextInput disabled source='token'/>
                    <TextInput disabled source='account_name'/>
                    <TextInput disabled source='account_number'/>
                    <TextInput disabled source='bank_name'/> */}
                    <TextInput source='status'/>
                    {/* <DateField disabled source='date'/> */}
                </SimpleForm>
            </Edit>
        </>
    );
}

export default EditTransaction;