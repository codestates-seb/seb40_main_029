import * as Style from './Style';

const FriendItem = ({ member, setRespondentDisplayName }) => {
  const onClick = async () => {
    await setRespondentDisplayName(member.displayName);
  };
  return (
    <Style.Item htmlFor={member?.memberId}>
      <input
        type="radio"
        id={member?.memberId}
        value={member?.displayName}
        name="followFriend"
        onClick={onClick}
      />
      <span>{member?.displayName}</span>
    </Style.Item>
  );
};

export default FriendItem;
