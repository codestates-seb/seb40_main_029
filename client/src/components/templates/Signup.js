import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getCookie } from '../../utils/cookie';
import Input from '../atoms/Input';
import useInput from '../../utils/useInput';
import { emailSelector } from '../../redux/hooks';
import { setMemberId, setDisplayName } from '../../redux/slice';
import { SignupApi } from '../../api/SignupApi';
import { ReactComponent as Logo } from '../../assets/logo.svg';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const InputContainer = styled.div`
  margin-right: 10%;
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

  &:hover,
  &:active {
    &:not([disabled]) {
      box-shadow: inset 2px 2px 5px rgba(22, 27, 29, 0.25),
        inset -2px -2px 5px #faf8ff;
    }
  }

  &[disabled] {
    cursor: default;
    opacity: 0.5;
    background: #dc3545 #025ce2;
  }
`;

const Warning = styled.h5`
  margin-left: 5px;
  font-weight: 200;
  color: red;
`;

const LogoContainer = styled.div`
  margin: 10px;
`;

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailValue = useSelector(emailSelector);
  const [displayNameValue, displayNameBind, displayNameReset, displayNameInit] =
    useInput('');
  const [warning, setWarning] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);
  const accessToken = getCookie('accessToken');

  useEffect(() => {
    const specialCheck = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    const blank = /[\s]/g;
    const len = displayNameValue.length;

    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = accessToken;
    }

    if (specialCheck.test(displayNameValue)) {
      setWarning('특수문자를 사용할 수 없어요 :(');
      setBtnDisabled(true);
    } else if (blank.test(displayNameValue)) {
      setWarning('공백을 포함할 수 없어요 :(');
      setBtnDisabled(true);
    } else if (len >= 10) {
      setWarning('10자를 넘길 수 없어요 :(');
      setBtnDisabled(true);
    } else {
      setWarning();
      setBtnDisabled(false);
    }
  }, [displayNameValue]);

  function handleInputLength(max) {
    if (displayNameValue.length > max) {
      displayNameInit(displayNameValue.substr(0, max));
    }
  }

  function handleSignup(emailValue, displayNameValue) {
    (async () => {
      const res = await SignupApi(emailValue, displayNameValue);
      if (res.status == 201) {
        dispatch(setMemberId(res.data.memberId));
        dispatch(setDisplayName(res.data.displayName));
        navigate('/');
      } else if (res.response.status == 409) {
        setWarning('이미 사용중인 닉네임이에요');
      }
    })();
  }

  return (
    <Container>
      <InputContainer>
        <InputHeader>닉네임을 입력해주세요</InputHeader>
        <Input
          value={displayNameBind}
          border="shadow"
          oninput={handleInputLength(10)}
        />
        <Button
          size="long"
          fontSize="little"
          onClick={() => {
            handleSignup(emailValue, displayNameValue);
          }}
          disabled={btnDisabled}
        >
          시작하기
        </Button>
        <Warning>{warning}</Warning>
      </InputContainer>
      <LogoContainer>
        <Logo width="170" height="170" />
      </LogoContainer>
    </Container>
  );
}
