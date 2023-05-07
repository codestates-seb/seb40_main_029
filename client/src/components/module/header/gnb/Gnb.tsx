import { useDispatch } from 'react-redux';
import { modalList } from '../../../../router/Modals';
import GnbItem from '../../../atoms/gnb/GnbItem';
import { openModal } from '../../../../redux/modalSlice';
import { Bubble } from './style';
import LogoutItem from '../../../atoms/gnb/LogoutItem';

interface GnbDispatchType {
  type: string;
}

const Gnb = () => {
  const dispatch = useDispatch();
  const handleModal = (modal: GnbDispatchType) => {
    dispatch(
      openModal({
        modalType: modal.type,
        isOpen: true,
      })
    );
  };

  return (
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
      <LogoutItem />
    </Bubble>
  );
};

export default Gnb;
