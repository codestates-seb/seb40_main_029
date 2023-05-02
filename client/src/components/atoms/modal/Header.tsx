import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Style from './HeaderStyle';
import TooltipButton from '../button/tooltipButton/TooltipButton';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Tooltip } from '../../../types/ModalTypes';

interface ModalHeader {
  children?: React.ReactNode;
  title: string;
  tooltip: Tooltip;
  icon: IconProp;
  closeModal: React.MouseEventHandler<HTMLDivElement>;
}

const Header = (props: ModalHeader) => {
  const { title, tooltip, icon, closeModal } = props;

  return (
    <>
      <Style.Header>
        <Style.Title>
          {title}
          <FontAwesomeIcon icon={icon} />
          <TooltipButton info={tooltip?.info} place={tooltip?.place} />
        </Style.Title>
        <Style.Button onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </Style.Button>
      </Style.Header>
    </>
  );
};

export default Header;
