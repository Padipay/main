import React from "react";
import { Filter, TextInput } from 'react-admin';
import QuickFilter from "./quickFilter";


function TransactionFilter(props) {
    return ( 
        <Filter {...props}>
            <TextInput label="Search" source="status" alwaysOn />
            <QuickFilter source="status" label="status" defaultValue={true} />
        </Filter>
     );
}

export default TransactionFilter;