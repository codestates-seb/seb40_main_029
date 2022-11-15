import styled from 'styled-components';
import Nav from './Nav';
import { useState } from 'react';
import Bookmark from './Bookmark';
import User from '../atoms/User';

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
const BookmarkWrapper = styled.div`
  margin-top: 8px;
  margin-left: 8px;
  display: flex;
`;
const GnbLayout = styled.div`
  position: absolute;
  right: 0;
`;

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <HeaderWrapper>
      <div>
        <HeaderTitle>
          오늘은
          <br />
          어떤가요?
        </HeaderTitle>
        <BookmarkWrapper>
          <Bookmark />
        </BookmarkWrapper>
      </div>
      <GnbLayout>
        <User onClick={onClick} />
        {isOpen ? <Nav /> : null}
      </GnbLayout>
    </HeaderWrapper>
  );
}

export default Header;
