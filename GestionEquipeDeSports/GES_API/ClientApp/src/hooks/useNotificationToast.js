import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function useNotificationToast() {
    const setNotification = (message, type = "") => {
        if (type === "info") toast.info(message);
        else if (type === "success") toast.success(message);
        else if (type === "warning") toast.warning(message);
        else if (type === "error") toast.error(message);
        else toast(message);
    };

    return {
        setNotification,
        ToastContainer
    };
}
