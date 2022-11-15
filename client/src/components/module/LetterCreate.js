import styled from 'styled-components';
import Input from '../atoms/Input';
import { MailModal } from './modal/Modal';
import useInput from '../../utils/useInput';
import Button from '../atoms/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ButtonLayout } from './Letters';
import ShadowBox from '../atoms/ShadowBox';

const InputLayout = styled.form`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;
const Label = styled.label`
  margin: 8px;
`;

const LetterCreate = () => {
  const [setFriend, bindFriend] = useInput();
  const [setLetterBody, bindLetterBody] = useInput();
  const [letter, setLetter] = useInput();

  const handleSendLetter = () => {};
  return (
    <>
      <MailModal>
        <ShadowBox>
          <InputLayout onSubmit={handleSendLetter}>
            {/* 추후에 친구리스트에따라 input -> selector로 바꿔주어야 할 듯? */}
            <div>
              <Label htmlFor="friend">To.</Label>
              <Input name="friend" border="transparent" />
            </div>
            <label htmlFor="body">내용</label>
            <Input border="transparent" size="long" name="body" />
          </InputLayout>
          <ButtonLayout>
            <Button size="circle">
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </ButtonLayout>
        </ShadowBox>
      </MailModal>
    </>
  );
};

export default LetterCreate;
