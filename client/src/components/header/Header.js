import styled from "styled-components";
import './header.css';
import Button from "../common/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faMinus,
  faCertificate
} from '@fortawesome/free-solid-svg-icons';
import Nav from "../nav/nav";
import { useState } from "react";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
`;
const HeaderTitle = styled.h1`
  line-height: 1.2;
  letter-spacing: 2px;
  font-size: 48px;
  margin: 0;
  margin-left: 16px;
`;
const User = styled.span`
margin: 0 30px; /* nav가 오픈되었을때 여부와 상관없이 위치고정 */
  svg {
    margin-right: 8px;
  }
`;
const BookmarkWrapper = styled.div`
  margin-top: 8px;
  margin-left: 8px;
`;

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen(!isOpen);
  }
  return (
    <HeaderWrapper>
      <div>
        <HeaderTitle>오늘은
          <br/>어떤가요?
        </HeaderTitle>
        <BookmarkWrapper>
          <Button size="long">
            북마크
          </Button>
          <Button size="circle">
            <FontAwesomeIcon icon={faStar} />
          </Button>
          <Button size="circle">
            <FontAwesomeIcon icon={faMinus} size="lg" />
          </Button>
        </BookmarkWrapper>
      </div>
      <div>
        <User onClick={onClick}>
          <FontAwesomeIcon icon={faCertificate} />
          USERNAME
        </User>
        {
          isOpen ? <Nav /> : null
        }
      </div>
    </HeaderWrapper>
  );
}


export default Header;
