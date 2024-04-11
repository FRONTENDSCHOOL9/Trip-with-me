import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const axios = useCustomAxios();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async formData => {
    console.log(formData);
    try {
      const res = await axios.post('users/login', formData);
      console.log(res?.data);
      alert(`${res?.data?.item?.name}님 안녕하세요.`);
      navigate('/');
    } catch (err) {
      if (err?.response?.status === 403) {
        alert('아이디, 비밀번호를 다시 확인해주세요.');
      }
      console.log(err.message);
    }
  };

  return (
    <div className="relative mx-auto min-h-screen max-w-[375px] border border-gray-200 flex flex-col items-center justify-center">
      <h1>Trip with me</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">아이디</label>
        <input
          id="email"
          {...register('email')}
          placeholder="email을 입력하세요"
          type="text"
        />
        <br />
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          {...register('password', {
            required: '비밀번호를 입력하세요.',
            minLength: {
              value: 8,
              message: '비밀번호 8자리 이상 입력해주세요.',
            },
          })}
          placeholder="password를 입력하세요"
          type="password"
        />
        {errors.password && <p>{errors.password.message}</p>}
        <br />
        <button type="submit">로그인</button>
        <div>
          <button type="button" id="kakao"></button>
          <button type="button" id="google"></button>
          <button type="button" id="naver"></button>
        </div>
        <p>
          <Link to="/">로그인 없이 둘러보기</Link>
        </p>
        <p>
          <Link to="/users/signup">회원가입하기</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
