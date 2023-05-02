import { useSelector } from 'react-redux';
import { memberIdSelector } from '../../../../redux/hooks';
import { deleteMail, readMail } from '../../../../api/MailDataApi';
import ContentBox from '../../../atoms/contentBox/ContentBox';
import { RightBottomLayout } from '../../../atoms/layout/Layouts';
import * as Style from './Style';
import { Mail } from '../Mail';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

interface LetterPropsType {
  letter: Mail; //편지 객체
  setCurrentMail: React.Dispatch<React.SetStateAction<number>>;
  currentMail: number; //pk
}

const LetterItem = ({
  letter,
  setCurrentMail,
  currentMail,
}: LetterPropsType) => {
  const { mailId, senderDisplayName, createdAt, body, verifyMail } = letter;
  const memberId = useSelector(memberIdSelector);

  const getRelativeTime = (date: string) => {
    return dayjs(date).fromNow();
  };

  let date = getRelativeTime(createdAt);
  let detailDate = dayjs(createdAt).format('YYYY년 MM월 DD일');

  interface LetterArg {
    memberId: number;
    mailId: number;
  }
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: async ({ memberId, mailId }: LetterArg) => {
      const data = await readMail(memberId, mailId);
      return data;
    },
    onSuccess: updatedLetter => {
      queryClient.invalidateQueries(['letter'], updatedLetter);
    },
  });
  const handleOpenLetter = () => {
    if (currentMail !== mailId) {
      setCurrentMail(mailId);
      updateMutation.mutate({ memberId, mailId });
    } else if (currentMail === mailId) {
      setCurrentMail(0);
    }
  };

  const deleteMutation = useMutation({
    mutationFn: ({ memberId, mailId }: LetterArg) => {
      return deleteMail(memberId, mailId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['letter']);
    },
  });
  const handleMailDelete = () => {
    deleteMutation.mutate({ memberId, mailId });
  };

  return (
    <>
      <ContentBox onClick={handleOpenLetter}>
        <Style.LetterHeader>
          <div>
            <span>{senderDisplayName}</span>
            <Style.Alarm>{verifyMail ? '읽음' : '안읽음'} </Style.Alarm>
          </div>
          <Style.DetailDate>{date}</Style.DetailDate>
        </Style.LetterHeader>
        {currentMail === mailId ? (
          <>
            <Style.DetailDate>{detailDate}</Style.DetailDate>
            <Style.LetterBody>{body}</Style.LetterBody>
            <RightBottomLayout>
              <Style.DeleteBtn onClick={handleMailDelete}>삭제</Style.DeleteBtn>
            </RightBottomLayout>
          </>
        ) : null}
      </ContentBox>
    </>
  );
};

export default LetterItem;
