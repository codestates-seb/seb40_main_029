import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emailSelector } from '../../../../redux/hooks';
import { setMemberId, setDisplayName } from '../../../../redux/slice';
import { useNavigate } from 'react-router-dom';
import { SignupApi } from '../../../../api/SignupApi';
import useInput from '../../../../utils/useInput';
import { getCookie } from '../../../../utils/cookie';
import Input from '../../../atoms/input/Input';
import { ReactComponent as Logo } from '../../../../assets/logo.svg';
import * as Style from './Style';

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

    // if (accessToken) {
    //   axios.defaults.headers.common['Authorization'] = accessToken;
    // }

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
    <Style.Container>
      <Style.InputContainer>
        <Style.InputHeader>닉네임을 입력해주세요</Style.InputHeader>
        <Input value={displayNameBind} oninput={handleInputLength(10)} />
        <Style.Button
          size="long"
          fontSize="little"
          onClick={() => {
            handleSignup(emailValue, displayNameValue);
          }}
          disabled={btnDisabled}
        >
          시작하기
        </Style.Button>
        <Style.Warning>{warning}</Style.Warning>
      </Style.InputContainer>
      <Style.LogoContainer>
        <Logo width="170" height="170" />
      </Style.LogoContainer>
    </Style.Container>
  );
}
