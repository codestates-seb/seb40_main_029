import * as Style from './Style';
import { UserType } from '../../../../types/UserType';

interface FriendItemType {
  member: UserType;
  setRespondentDisplayName: React.Dispatch<React.SetStateAction<string>>;
}
const FriendItem = ({ member, setRespondentDisplayName }: FriendItemType) => {
  const onClick = () => {
    setRespondentDisplayName(member.displayName);
  };
  return (
    <Style.Item htmlFor={member?.displayName}>
      <input
        type="radio"
        id={member?.displayName}
        value={member?.displayName}
        name="followFriend"
        onClick={onClick}
      />
      <span>{member?.displayName}</span>
    </Style.Item>
  );
};

export default FriendItem;
