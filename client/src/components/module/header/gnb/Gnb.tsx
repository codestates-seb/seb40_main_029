import { useDispatch } from 'react-redux';
import { modalList } from '../../../../router/Modals';
import GnbItem from '../../../atoms/gnb/GnbItem';
import { openModal } from '../../../../redux/modalSlice';
import { Bubble } from './style';
import LogoutItem from '../../../atoms/gnb/LogoutItem';
import { getCookie } from '../../../../utils/cookie';
import Overlay from '../../../atoms/overlay/Overlay';
import usePopUp from '../../../../utils/usePopUp';

interface GnbDispatchType {
  type: string;
  withAuth: boolean;
}

const Gnb = () => {
  const accessToken = getCookie('accessToken');

  const dispatch = useDispatch();
  const { authPopup, handlePopup } = usePopUp();
  const handleModal = (modal: GnbDispatchType) => {
    modal.withAuth && !accessToken
      ? handlePopup(modal.withAuth)
      : dispatch(
          openModal({
            modalType: modal.type,
            isOpen: true,
          })
        );
  };

  //withAuth & !accessToken일때 popup
  return (
    <>
      {authPopup && <Overlay />}
      <Bubble>
        {modalList.map(modal => {
          return (
            <GnbItem
              key={modal.type}
              label={modal.label}
              icon={modal.iconProp}
              onClick={() => handleModal(modal)}
            />
          );
        })}
        {accessToken ? <LogoutItem /> : null}
      </Bubble>
    </>
  );
};

export default Gnb;
