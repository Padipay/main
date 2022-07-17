import React from "react";
import { Filter, TextInput, SearchInput} from 'react-admin';
import QuickFilter from "./quickFilter";


function TransactionFilter(props) {
    return ( 
        <Filter {...props}>
            <SearchInput source="id" alwaysOn/>
            <TextInput label="Search" source="status" />
            <QuickFilter source="status" label="status" defaultValue={true} />
        </Filter>
     );
}

export default TransactionFilter;
