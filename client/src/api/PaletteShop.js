import axios from 'axios';
import { useSelector } from 'react-redux';

export const PaletteList = async () => {
  const path = '/palette';

  return await axios.get(
    'ec2-15-165-76-0.ap-northeast-2.compute.amazonaws.com:8080' + path
  );
};

export const BuyPalette = async () => {
  const path = '/members/{member-id}/{palette-code}';
};
