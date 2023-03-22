import { useEffect, useState } from 'react';
import { addFriend, getAllMembers } from '../../../../api/FriendDataApi';
import useInput from '../../../../utils/useInput';
import { displayNameSelector } from '../../../../redux/hooks';
import { useSelector } from 'react-redux';
import { CenterLayout, RightBottomLayout } from '../../../atoms/layout/Layouts';
import Button from '../../../atoms/button/commonButton/Button';
import ContentBox from '../../../atoms/contentBox/ContentBox';
import Input from '../../../atoms/input/Input';
import TooltipButton from '../../../atoms/button/tooltipButton/TooltipButton';
import FriendItem from '../item/FriendItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Style from './Style';
import { Friend } from '../FriendType';

interface AddFriendType {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  friends: Friend[];
}

const AddFriend = ({ setIsOpen, friends, setfriendRefresh }: AddFriendType) => {
  const [userList, setUserList] = useState([]);
  const [keyword, bindKeyword] = useInput('');
  const [respondentDisplayName, setRespondentDisplayName] = useState('');
  const requesterDisplayName = useSelector(displayNameSelector);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllMembers();
      setUserList(data);
    };
    fetchData();
  }, []);
  const CloseModal = () => {
    setIsOpen(false);
  };

  const filteredMember = userList?.filter(member => {
    const friendsNameArr = friends.map(friend => {
      return friend.respondentDisplayName;
    });
    return (
      member.displayName !== null &&
      member.displayName !== requesterDisplayName && //본인아이디 배제
      !friendsNameArr.includes(member.displayName) && //이미 추가된 친구 배제
      member.displayName.includes(keyword) //키워드
    );
  });

  const handleAddFriend = () => {
    addFriend({ requesterDisplayName, respondentDisplayName });
    setfriendRefresh(refresh => refresh * -1);
    toast('친구를 추가했어요!');
  };

  return (
    <Style.PopUp>
      <CenterLayout>
        <ContentBox>
          <Style.Title>
            <div>
              친구찾기
              <TooltipButton
                info="친구 무드카드로 친구의 기분을 색으로 볼 수 있어요!"
                place="top"
              />
            </div>
            <FontAwesomeIcon icon={faXmark} onClick={CloseModal} />
          </Style.Title>
          <Style.FilterBox>
            <label htmlFor="nickname">닉네임</label>
            <Style.InputBox>
              <Input
                id="nickname"
                border="shadow"
                color="#f6f6f6"
                placeholder="친구를 팔로잉해보세요!"
                value={bindKeyword}
              />
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Style.InputBox>
          </Style.FilterBox>
          <Style.FriendListBox>
            {filteredMember
              ? filteredMember.map((member, i) => {
                  return (
                    <FriendItem
                      key={i}
                      member={member}
                      setRespondentDisplayName={setRespondentDisplayName}
                    />
                  );
                })
              : null}
          </Style.FriendListBox>
          <RightBottomLayout>
            <Button
              size="long"
              onClick={handleAddFriend}
              disabled={!respondentDisplayName}
            >
              친구추가
            </Button>
          </RightBottomLayout>
        </ContentBox>
      </CenterLayout>
    </Style.PopUp>
  );
};

export default AddFriend;
