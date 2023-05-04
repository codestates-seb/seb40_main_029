import { faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Style from '../HeaderStyle';
import { useQuery } from '@tanstack/react-query';
import { getPoint } from '../../../../api/GetPointApi';
import { useSelector } from 'react-redux';
import { memberIdSelector } from '../../../../redux/hooks';

const PointDisplay = () => {
  const memberId = useSelector(memberIdSelector);

  const point = useQuery({
    queryKey: ['point', memberId],
    queryFn: async () => {
      const data = await getPoint(memberId);
      return data;
    },
  });

  return (
    <>
      <Style.Point>
        <FontAwesomeIcon icon={faSackDollar} />
        {point.data}
      </Style.Point>
    </>
  );
};

export default PointDisplay;
