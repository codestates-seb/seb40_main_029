import * as Style from './MiniCardStyle';

const MiniCard = ({ color, contents, mood, onClick, icon }) => {
  return (
    <Style.Card>
      <Style.MoodPic color={color}></Style.MoodPic>
      <Style.Contents>{contents}</Style.Contents>
      <Style.Mood color={color}>{mood}</Style.Mood>
    </Style.Card>
  );
};

export default MiniCard;
