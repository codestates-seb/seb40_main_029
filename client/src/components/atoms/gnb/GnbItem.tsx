import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DarkIcon, Label, NavItem } from './style';
import usePopUp from '../../../utils/usePopUp';
import React from 'react';

interface GnbItemProps {
  label: string;
  icon: IconProp;
  onClick: React.MouseEventHandler<HTMLElement>;
}

const GnbItem = (props: GnbItemProps) => {
  const { label, icon, onClick } = props;

  return (
    <>
      <NavItem onClick={onClick}>
        <DarkIcon>
          <FontAwesomeIcon icon={icon} size="lg" />
        </DarkIcon>
        <Label>{label}</Label>
      </NavItem>
    </>
  );
};

export default GnbItem;
