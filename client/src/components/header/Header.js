import styled from "styled-components";
import Button from "../common/Button";

function Header() {
  return (
    <>
      <h2>오늘은 어떤가요?</h2>
        <Button size="long" disabled>
          북마크
        </Button>
        <Button size="circle">+</Button>
    </>
  );
}


export default Header;
