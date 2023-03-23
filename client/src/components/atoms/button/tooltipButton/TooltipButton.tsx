import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import * as Style from './TooltipButtonStyle';

interface TooltipProps {
  info: string;
  place: 'top' | 'right' | 'bottom' | 'left';
}
const TooltipButton = ({ info, place }: TooltipProps) => {
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
