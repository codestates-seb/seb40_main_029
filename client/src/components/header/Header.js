import styled from "styled-components";
import './header.css';
import Button from "../common/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faMinus
} from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <>
      <h1>오늘은
        <br/>어떤가요?</h1>
        <Button size="long" disabled>
          북마크
        </Button>
        <Button className="iconBtn" size="circle">
          <FontAwesomeIcon icon={faStar} />
        </Button>
        <Button className="iconBtn" size="circle">
          <FontAwesomeIcon icon={faMinus} size="lg" />
        </Button>
    </>
  );
}


export default Header;
