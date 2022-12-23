import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';

const Info = styled.div`
  display: flex;
  justify-content: center;
  background-color: transparent;
  padding: 8px 8px 0;
  opacity: 0.3;
  font-size: 15px;
  padding: 8px;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

export const TooltipBtn = ({ info, place }) => {
  return (
    <>
      <Info
        data-tip={info}
        onMouseOver={() => {
          ReactTooltip.rebuild();
        }}
      >
        <FontAwesomeIcon icon={faCircleQuestion} size="sm" />
      </Info>
      <ReactTooltip event="click" eventOff="mouseout" place={place} />
    </>
  );
};
