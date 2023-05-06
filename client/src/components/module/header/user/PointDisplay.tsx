import { faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Style from '../HeaderStyle';

const PointDisplay = ({ point }) => {
  return (
    <>
      <Style.Point>
        <FontAwesomeIcon icon={faSackDollar} />
        {point}
      </Style.Point>
    </>
  );
};

export default PointDisplay;
