import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { displayNameSelector } from '../../../redux/hooks';
import * as Style from './UsernameStyle';

interface UsernameProps {
  onClick: React.MouseEventHandler;
  children?: string;
  color?: string;
}

const Username = ({ onClick, children, color }: UsernameProps) => {
  const displayName = useSelector(displayNameSelector);
  return (
    <Style.Username onClick={onClick} color={color}>
      <FontAwesomeIcon icon={faCertificate} />
      {displayName ? displayName : children}
    </Style.Username>
  );
};

export default Username;
