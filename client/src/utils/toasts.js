import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastNotification = (message, action=null) => {
    toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        action
        });
}