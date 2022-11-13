import styled from "styled-components";
import Button from "../common/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope
} from '@fortawesome/free-regular-svg-icons';
import './nav.css';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Button size="circle">
            <FontAwesomeIcon icon={faEnvelope} />
          </Button>
          편지함
        </li>
        <li>오늘할일</li>
        <li>색상테마</li>
        <li>친구</li>
        <li>기록</li>
        <li>로그아웃</li>
      </ul>
    </nav>
  )
}

export default Nav;
