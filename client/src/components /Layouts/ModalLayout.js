import { useSelector } from "react-redux";
import PaymentDetails from "./paymentDetails";

function ModalLayout({children}) {
    const { payment } = useSelector(state => state.transfer_details)
    return ( 
        <>
            {children}
            <PaymentDetails open={payment}/> 
        </>
     );
}

export default ModalLayout;