import styled from 'styled-components';
import Input from '../atoms/Input';
import { MailModal } from './Modal';
import useInput from '../../utils/useInput';
import Button from '../atoms/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { RightBottomLayout } from '../atoms/Layouts';
import ShadowBox from '../atoms/ShadowBox';

const InputLayout = styled.form`
  display: flex;
  flex-direction: column;
  padding: 16px 0;
`;

const Textarea = styled.textarea`
  border: none;
  height: 200px;
  padding: 8px 0;
`;

const LetterCreate = () => {
  const [friend, setFriend, bindFriend] = useInput('');
  const [letterBody, setLetterBody, bindLetterBody] = useInput('');
  const [letter, setLetter] = useInput({});

  const handleSendLetter = e => {
    e.preventDefault();
    setLetter({ userName: `${friend}`, body: `${letterBody}` });
  };
  return (
    <>
      <MailModal>
        <ShadowBox>
          <InputLayout onSubmit={handleSendLetter}>
            {/* 추후에 친구리스트에따라 input -> selector로 바꿔주어야 할 듯? */}
            <div>
              <label htmlFor="friend">To. </label>
              <Input name="friend" border="transparent" />
            </div>
            <label htmlFor="body">내용 : </label>
            <Textarea border="transparent" size="long" name="body" />
          </InputLayout>
          <RightBottomLayout>
            <Button size="circle">
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </RightBottomLayout>
        </ShadowBox>
      </MailModal>
    </>
  );
};

export default LetterCreate;
