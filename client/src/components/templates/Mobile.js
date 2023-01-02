import styled from 'styled-components';
import { CenterLayout } from '../atoms/Layouts';
import Overlay from '../atoms/Overlay';
import ShadowBox from '../atoms/ShadowBox';
import { ReactComponent as Logo } from '../../assets/logo.svg';

const MobilePopUp = styled.div`
  div {
    z-index: 6;
  }
`;
const PopUp = styled.div`
  position: absolute;
  width: 100%;
  z-index: 7;
  top: 0;
  left: 0;
  text-align: center;
`;
const LogoBox = styled.div`
  width: 30%;
  margin: 0 auto;
  padding-bottom: 16px;
`;

const Mobile = () => {
  return (
    <MobilePopUp className="mobilePopup">
      <Overlay />
      <PopUp>
        <ShadowBox>
          <LogoBox>
            <Logo />
          </LogoBox>
          <h3>
            550px 이하 브라우저에서는
            <br /> 서비스를 이용할 수 없어요.
          </h3>
        </ShadowBox>
      </PopUp>
    </MobilePopUp>
  );
};

export default Mobile;
