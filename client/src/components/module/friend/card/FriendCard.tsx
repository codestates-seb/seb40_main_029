import { deleteFriend } from '../../../../api/FriendDataApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import MiniCard from '../../../atoms/minicard/MiniCard';
import * as Style from './Style';
import { FriendCardType } from '../FriendType';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const FriendCard = ({ friend, friendsColor }: FriendCardType) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (friendId: number) => {
      return deleteFriend(friendId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['friend']);
    },
  });

  const handleDeleteFriend = () => {
    const friendId = friend.respondentId;
    mutation.mutate(friendId);
  };

  return (
    <Style.FriendCardWrap>
      <MiniCard
        color={friendsColor?.colorCode}
        contents={friend.respondentDisplayName}
        mood={friend.respondentMoodPaletteDetails?.mood}
        onClick={handleDeleteFriend}
        icon={faDeleteLeft}
      ></MiniCard>
      <Style.EditBtn onClick={handleDeleteFriend}>
        <FontAwesomeIcon icon={faDeleteLeft} />
      </Style.EditBtn>
    </Style.FriendCardWrap>
  );
};

export default FriendCard;
