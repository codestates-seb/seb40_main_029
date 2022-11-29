import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from '../atoms/Input';
import useInput from '../../utils/useInput';
import {
  isLoggedInSelector,
  displayNameSelector,
  emailSelector,
} from '../../redux/hooks';
import { setIsLoggedIn, setDisplayName } from '../../redux/slice';
import { SignupApi } from '../../api/SignupApi';

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

const Button = styled.button`
  margin-left: 10px;
  padding: 5px 15px;
  height: 28px;
  border-radius: 30px;
  font-size: 14px;
  background-color: inherit;
  box-shadow: 2px 2px 5px rgba(22, 27, 29, 0.25), -2px -2px 5px #faf8ff;
  border: none;

  &:hover {
    box-shadow: inset 2px 2px 5px rgba(22, 27, 29, 0.25),
      inset -2px -2px 5px #faf8ff;
  }
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailValue = useSelector(emailSelector);
  const [displayNameValue, displayNameBind] = useInput('');
  const [response, setResponse] = useState();
  const [warning, setWarning] = useState('');
  console.log(displayNameValue);
  console.log(emailValue);

  // useEffect(() => {
  //   if (response.displayName) {
  //     console.log('1번');
  //     setDisplayName(dispatch(response.displayName)), navigate('/');
  //   } else {
  //     console.log('2번');
  //     setWarning(response.data);
  //   }
  // }, [response]);

  function handleSignup(emailValue, displayNameValue) {
    (async () => {
      const res = await SignupApi(emailValue, displayNameValue);
      console.log(res);
      // setResponse(await SignupApi(emailValue, displayNameValue));
    })();
    console.log('응답');
    // console.log(response);
  }

  return (
    <Container>
      <InputContainer>
        <InputHeader>닉네임을 입력해주세요</InputHeader>
        <Input value={displayNameBind} border="shadow" />
        <Button
          size="long"
          fontSize="little"
          onClick={() => handleSignup(emailValue, displayNameValue)}
        >
          시작하기
        </Button>
        <Warning>{warning}</Warning>
      </InputContainer>
      <ButtonContainer>
        <Button size="long" fontSize="large">
          로고
        </Button>
      </ButtonContainer>
    </Container>
  );
}
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
