import { useEffect, useRef, useState } from 'react';
import TooltipButton from '../../atoms/button/tooltipButton/TooltipButton';
import Bookmark from './bookmark/Bookmark';
import Nav from './gnb/Nav';
import * as Style from './HeaderStyle';
import User from './user/User';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen(!isOpen);
  };
  const ref = useRef<HTMLDivElement>();
  const clickOut = (e: MouseEvent) => {
    if (isOpen && ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', clickOut);
    return () => {
      document.removeEventListener('mousedown', clickOut);
    };
  }, [isOpen]);

  return (
    <>
      <Style.HeaderWrapper>
        <div>
          <Style.HeaderTitle>
            오늘은
            <br />
            어떤가요?
          </Style.HeaderTitle>
          <Style.BookmarkWrapper>
            <Bookmark />
            <TooltipButton
              info="별을 클릭해 북마크를 만들고, 손을 클릭해 북마크 리스트를 열고 닫을 수 있어요!"
              place="right"
            />
          </Style.BookmarkWrapper>
        </div>
        <Style.GnbLayout ref={ref}>
          <User onClick={onClick} />
          {isOpen ? <Nav /> : null}
        </Style.GnbLayout>
      </Style.HeaderWrapper>
    </>
  );
}

export default Header;
