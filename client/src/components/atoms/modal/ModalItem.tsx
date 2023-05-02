import { useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/modalSlice';
import * as Style from './ModalStyle';
import Header from './Header';
import { modalList } from '../../../router/Modals';

interface ModalType {
  modalType: string;
  children: React.ReactNode;
}
const ModalItem: React.FC<ModalType> = ({ modalType, children }) => {
  const type = modalList.find(modal => {
    return modal.type === modalType;
  });
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  return (
    <Style.Basic>
      <Header
        closeModal={handleCloseModal}
        title={type?.label}
        tooltip={type?.tooltip}
        icon={type?.iconProp}
      />
      <Style.Content>{children}</Style.Content>
    </Style.Basic>
  );
};

export default ModalItem;
