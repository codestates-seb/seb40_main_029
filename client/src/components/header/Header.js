import styled from "styled-components";
import './header.css';
import Button from "../common/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faMinus,
  faCertificate
} from '@fortawesome/free-solid-svg-icons';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
`;
const HeaderTitle = styled.h1`
  line-height: 1.2;
  font-size: 48px;
  margin: 0;
  margin-left: 16px;
`;
const User = styled.span`
margin: 0 16px;
  svg {
    margin-right: 8px;
  }
`;

function Header() {
  return (
    <HeaderWrapper>
      <div>
        <HeaderTitle>오늘은
          <br/>어떤가요?
        </HeaderTitle>
          <Button size="long" disabled>
            북마크
          </Button>
          <Button size="circle">
            <FontAwesomeIcon icon={faStar} />
          </Button>
          <Button size="circle">
            <FontAwesomeIcon icon={faMinus} size="lg" />
          </Button>
      </div>
      <div>
        <User>
          <FontAwesomeIcon icon={faCertificate} />
          USERNAME
        </User>
      </div>
    </HeaderWrapper>
  );
}


export default Header;
