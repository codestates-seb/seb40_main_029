import styled from 'styled-components';
import Button from '../common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMinus } from '@fortawesome/free-solid-svg-icons';

const LightIcon = styled.span`
  svg {
    vertical-align: 0 !important; /* fontawsome icon 가운데정렬 */
  }
  path {
    color: #cbcccd;
  }
`;

const BookMark = () => {
  return (
    <>
      <Button size="long">북마크</Button>
      <Button size="circle">
        <LightIcon>
          <FontAwesomeIcon icon={faStar} />
        </LightIcon>
      </Button>
      <Button size="circle">
        <LightIcon>
          <FontAwesomeIcon icon={faMinus} size="lg" />
        </LightIcon>
      </Button>
    </>
  );
};

export default BookMark;
