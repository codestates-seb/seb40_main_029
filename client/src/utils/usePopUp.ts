import { useState } from 'react';
import { toast } from 'react-toastify';
import { getCookie } from './cookie';

const usePopUp = () => {
  const [authPopup, setPopup] = useState(false);
  const accessToken = getCookie('accessToken');

  const handlePopup = (withAuth: boolean) => {
    if (withAuth && !accessToken) {
      setPopup(true);
      toast('먼저 로그인해주세요', {
        className: 'toast-login',
        onClose: () => setPopup(false),
      });
    }
  };

  return { authPopup, handlePopup };
};

export default usePopUp;
