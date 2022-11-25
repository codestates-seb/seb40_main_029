import styled from 'styled-components';
import Input from '../atoms/Input';
import useInput from '../../utils/useInput';
import Button from '../atoms/Button';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const InputContainer = styled.div`
  margin-right: 100px;
`;

const InputHeader = styled.h3`
  margin-left: 5px;
`;

const Warning = styled.h5`
  margin-left: 5px;
  font-weight: 200;
  color: red;
`;

const ButtonContainer = styled.div`
  margin-left: 100px;
`;

export default function DisplayName() {
  const [displayName, displayNameBind] = useInput('');

  return (
    <>
      <Container>
        <InputContainer>
          <InputHeader>닉네임을 입력해주세요</InputHeader>
          <Input name="DisplayName" value={displayName} border="shadow" />
          <Warning>이미 사용중인 닉네임이에요</Warning>
        </InputContainer>
        <ButtonContainer>
          <Button size="long" fontSize="large">
            로고
          </Button>
        </ButtonContainer>
      </Container>
    </>
  );
}
