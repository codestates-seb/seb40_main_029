import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import * as Style from './TooltipButtonStyle';
import { TooltipProps } from 'react-tooltip';

interface TooltipButtonProps extends TooltipProps {
  info: string; //사용법 안내문
}
const TooltipButton = ({ info, place }: TooltipButtonProps) => {
  return (
    <>
      <Style.Info
        data-tip={info}
        onMouseOver={() => {
          ReactTooltip.rebuild();
        }}
      >
        <FontAwesomeIcon icon={faCircleQuestion} size="sm" />
      </Style.Info>
      <ReactTooltip event="click" eventOff="mouseout" place={place} />
    </>
  );
};

export default TooltipButton;
