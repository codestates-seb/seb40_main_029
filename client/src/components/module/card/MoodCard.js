import { useEffect, useState } from 'react';
import { CenterLayout } from '../../atoms/layout/Layouts';
import * as Style from './Style';

const MoodCard = ({ fade, setFade, color, id, reason }) => {
  const [viewDetails, setViewDetails] = useState(false);
  const handleViewDetails = () => {
    const selection = window.getSelection();
    if (selection.type != 'Range') {
      setViewDetails(!viewDetails);
    }
  };

  return (
    <CenterLayout>
      <Style.CardContainer fade={fade}>
        <Style.Mood color={color} onClick={() => setFade(false)} />
        <Style.Info>
          <Style.Type>{id}</Style.Type>
          <Style.Hexcode>{color}</Style.Hexcode>
          <Style.Contents
            onClick={() => handleViewDetails()}
            viewDetails={viewDetails}
          >
            {reason}
          </Style.Contents>
        </Style.Info>
      </Style.CardContainer>
    </CenterLayout>
  );
};

export default MoodCard;
