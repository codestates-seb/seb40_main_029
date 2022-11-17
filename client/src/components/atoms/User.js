import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';

const Username = styled.span`
  margin-right: 30px; /* nav가 오픈되었을때 여부와 상관없이 위치고정 */
  font-size: 14px;
  svg {
    margin-right: 8px;
  }
`;

const User = ({ onClick, children }) => {
  return (
    <Username onClick={onClick}>
      <FontAwesomeIcon icon={faCertificate} />
      {children}
    </Username>
  );
};

export default User;
