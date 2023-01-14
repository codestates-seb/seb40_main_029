import Overlay from '../../../atoms/overlay/Overlay';
import ContentBox from '../../../atoms/contentBox/ContentBox';
import { ReactComponent as Logo } from '../../../../assets/logo.svg';
import * as Style from './Style';

const Mobile = () => {
  return (
    <Style.MobilePopUp className="mobilePopup">
      <Overlay />
      <Style.PopUp>
        <ContentBox>
          <Style.LogoBox>
            <Logo />
          </Style.LogoBox>
          <h3>
            550px 이하 브라우저에서는
            <br /> 서비스를 이용할 수 없어요.
          </h3>
        </ContentBox>
      </Style.PopUp>
    </Style.MobilePopUp>
  );
};

export default Mobile;
