import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { displayNameSelector } from '../../redux/hooks';

const Username = styled.span`
  margin-right: 16px; /* nav가 오픈되었을때 여부와 상관없이 위치고정 */
  font-size: 14px;
  svg {
    margin-right: 8px;
    path {
      color: ${({ color }) => (color ? `#${color}` : 'inherit')};
    }
  }
`;

const User = ({ onClick, children, color }) => {
  const displayName = useSelector(displayNameSelector);
  return (
    <Username onClick={onClick} color={color}>
      <FontAwesomeIcon icon={faCertificate} />
      {displayName ? displayName : children}
    </Username>
  );
};

export default User;
