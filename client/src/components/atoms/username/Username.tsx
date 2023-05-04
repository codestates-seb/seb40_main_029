import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import * as Style from './UsernameStyle';

interface UsernameProps {
  onClick: React.MouseEventHandler;
  children?: string;
  color?: string;
}

const Username = ({ onClick, children, color }: UsernameProps) => {
  return (
    <Style.Username onClick={onClick} color={color}>
      <FontAwesomeIcon icon={faCertificate} />
      {children}
    </Style.Username>
  );
};

export default Username;
