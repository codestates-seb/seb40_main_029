import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import * as Style from './MiniCardStyle';

interface CardType {
  color: string;
  contents: React.ReactNode;
  mood: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: IconDefinition;
}

const MiniCard = ({ color, contents, mood, onClick, icon }: CardType) => {
  return (
    <Style.Card>
      <Style.MoodPic color={color}></Style.MoodPic>
      <Style.Contents>{contents}</Style.Contents>
      <Style.Mood color={color}>{mood}</Style.Mood>
    </Style.Card>
  );
};

export default MiniCard;
