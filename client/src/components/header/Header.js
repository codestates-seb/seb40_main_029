import styled from "styled-components";
import './header.css';
import Button from "../common/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faMinus
} from '@fortawesome/free-solid-svg-icons';

const HeaderTitle = styled.h1`
  line-height: 1.2;
  font-size: 48px;
  margin-bottom: 8px;
  margin-left: 16px;
`;

function Header() {
  return (
    <>
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
    </>
  );
}


export default Header;
