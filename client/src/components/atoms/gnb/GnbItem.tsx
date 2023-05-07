import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DarkIcon, Label, NavItem } from './style';

interface GnbItemProps {
  label: string;
  icon: IconProp;
  onClick: React.MouseEventHandler<HTMLElement>;
}

const GnbItem = (props: GnbItemProps) => {
  return (
    <NavItem onClick={props.onClick}>
      <DarkIcon>
        <FontAwesomeIcon icon={props.icon} size="lg" />
      </DarkIcon>
      <Label>{props.label}</Label>
    </NavItem>
  );
};

export default GnbItem;
