import { useGoogleLogin } from '@react-oauth/google';

export default function LoginBtn() {
  const googleSocialLogin = useGoogleLogin({
    onSuccess: codeResponse => console.log(codeResponse),
    flow: 'auth-code',
  });

  return (
    <div
      role={button}
      className="social_login_box google"
      onClick={() => {}}
      onKeyPress={() => googleSocialLogin()}
    >
      <div className="social_login_image_box">
        <img src={googleIcon} alt="google_login" />
      </div>
      <div className="social_login_text_box">구글로 시작하기</div>
      <div className="social_login_blank_box"> </div>
    </div>
  );
}
