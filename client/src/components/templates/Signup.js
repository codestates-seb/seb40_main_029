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

export default function Signup() {
  const [displayName, displayNameBind] = useInput('');

  return (
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
  );
}
// const [checkNickname, setCheckNickname] = useState(false)
// const [nicknameMsg, setNicknameMsg] = useState("")

// const checkDisplayName = async (e) => {
//   e.preventDefault();

//   try {
//     const res = await axios.post("user/register/nickname", {nickname});

//     const { result } = res.data;

//     if (!result) {
//         setNicknameMsg("이미 등록된 닉네임입니다. 다시 입력해주세요.");
//         setCheckNickname(false);
//    } else {
//       setNicknameMsg("사용 가능한 닉네임입니다.😊");
//       setCheckNickname(true);
//     }

//   } catch (err) {
//     console.log(err);
//   }
// }

// 앞에 정리한 유효성 검사를 한번에 묶어주고
// const isAllValid = isEmailValid && isPwdValid && isConfirmPwd && isNicknameValid && isAccepted && checkMail && checkNickname;

// // return 부분에서 disabled 값으로 제어해주었다.
// <ResisterStyled.FootBtnBox>
// <ResisterStyled.FootButton onClick={onSubmit} type="submit" disabled={!isAllValid}>
// 	가입하기
// </ResisterStyled.FootButton>
// </ResisterStyled.FootBtnBox>
