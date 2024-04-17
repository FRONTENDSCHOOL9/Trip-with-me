import { Submit } from '@components/style/StyledButton';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import useMemberState from '@zustand/memberState.mjs';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const { setUser } = useMemberState();
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
      setUser({
        _id: res?.data?.item?._id,
        name: res?.data?.item?.name,
        profile: res?.data?.item?.profileImage,
        theme: res?.data?.item?.extra?.address,
        age: res?.data?.item?.extra?.birthday,
        gender: res?.data?.item?.address,
        token: res?.data?.item?.token,
        introduce: res?.data?.item?.extra?.introduce,
      });
      navigate('/product/list');
    } catch (err) {
      if (err?.response?.status === 403) {
        alert('아이디, 비밀번호를 다시 확인해주세요.');
      }
      console.log(err.message);
    }
  };

  return (
    <div className="justify-center flex flex-col h-lvh bg-mainbg-color">
      <div className="p-10 m-auto max-w-[440px] w-fit">
        <div className="py-10 flex flex-col mb-10 max-w-fit mx-auto">
          <img
            className="ml-auto w-14 h-8 -mb-4"
            src="/src/assets/icons/icon-logo.svg"
            alt=""
          />
          <h1 className="font-['SokchoBadaDotum'] font-bold text-[40px] text-center text-main-color">
            Trip with me
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            defaultValue="testApp@test.com"
            className="px-2 mb-2 w-full h-10 rounded-md shadow-[1px_3px_0_0_rgba(0,0,0,0.1)] "
            id="email"
            {...register('email')}
            placeholder="ID"
            type="text"
          />
          {errors.email && <p>{errors.email.message}</p>}
          <br />
          {/* <label htmlFor="password">비밀번호</label> */}
          <input
            defaultValue="11111111"
            className="px-2 mb-2 w-full h-10 rounded-md shadow-[1px_3px_0_0_rgba(0,0,0,0.1)]"
            id="password"
            {...register('password', {
              required: '비밀번호를 입력하세요.',
              minLength: {
                value: 8,
                message: '비밀번호 8자리 이상 입력해주세요.',
              },
            })}
            placeholder="PW"
            type="password"
          />
          {errors.password && <p>{errors.password.message}</p>}
          <br />
          <Submit>로그인</Submit>
          <div className="my-5 flex items-center justify-center">
            <img
              className="w-10 h-10"
              src="/src/assets/icons/icon-kakao.svg"
              alt="카카오 아이콘"
            />
            <img
              className="w-10 h-10 mx-3"
              src="/src/assets/icons/icon-google.svg"
              alt="구글 아이콘"
            />
            <img
              className="w-10 h-10"
              src="/src/assets/icons/icon-naver.svg"
              alt="네이버 아이콘"
            />
          </div>
          <p className="mb-3 text-center text-xs text-main-color">
            <Link to="/product/list">로그인 없이 둘러보기</Link>
          </p>
          <p className="mb-3 text-center text-xs">
            <Link to="/users/signup">회원가입하기</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
