import {toast} from 'react-toastify';

export const useNotification = () => {
    const notify = (message: string) => {
        toast(message, { position: 'top-right', autoClose: 3000});
    }
    return {notify}
}