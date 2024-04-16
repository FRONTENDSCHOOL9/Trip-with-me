import { Submit } from '@components/style/StyledButton';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// API 설명
// 1. gender -> API의 address
// 2. age(나이) -> API의 birthday
// 2. theme(여행테마) -> API의 extra.address
function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(null);
  const [themeData, setThemeData] = useState(null);
  const [checkCount, setCheckCount] = useState(0);
  const [checkError, setCheckError] = useState(null);
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const MAX_CHECKED = 3;
  const [themeSelectedArr, setThemeSelectedArr] = useState([]);

  const selectValid = count => {
    if (count >= MAX_CHECKED) {
      alert('3개만 선택 가능합니다.');
      setCheckError('3개까지만 선택 가능합니다.');
      return false;
    } else {
      setCheckError(null);
    }
  };

  const setThemeArr = () => {
    let items = document.querySelectorAll(
      'button[type=button][is_active=true]',
    );
    let themeSelectedItems = Array.from(items).map(item => {
      return {
        id: item.getAttribute('id'),
        name: item.textContent,
      };
    });
    setThemeSelectedArr(themeSelectedItems);
  };

  const handleClick = e => {
    let count = document.querySelectorAll(
      'button[type=button][is_active=true]',
    ).length;
    if (e.target.getAttribute('is_active') === 'true') {
      e.target.setAttribute('is_active', 'false');
      e.target.className =
        'hover:border-main-color p-0.5 mx-1 mb-2 border-2 border-gray-300 rounded-md';
      count--;
    } else {
      if (selectValid(count) === false) {
        count--;
        return;
      }
      e.target.setAttribute('is_active', 'true');
      e.target.className =
        'hover:border-main-color p-0.5 mx-1 mb-2 border-2 border-main-color rounded-md';
      count++;
    }

    setThemeArr();
    setCheckCount(count);
  };

  const setTheme = data => {
    const themeList = data?.map(item => (
      <button
        className="hover:border-main-color p-0.5 mx-1 mb-2 border-2 border-gray-300 rounded-md"
        key={item.id}
        id={item.id}
        type="button"
        onClick={handleClick}
      >
        #{item.name}
      </button>
    ));
    setThemeData(themeList);
  };

  useEffect(() => {
    getTheme();
  }, []);

  const getTheme = async () => {
    try {
      const { data } = await axios.get(import.meta.env.VITE_TRAVEL_THEMES_API);
      setTheme(data);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async formData => {
    formData.type = 'seller';
    formData.extra.address = themeSelectedArr;
    formData.extra.birthday = parseInt(formData.extra.birthday);
    try {
      const res = await axios.post('/users', formData);

      alert(
        res?.data?.item?.name +
          '님 회원가입이 완료 되었습니다.\n로그인 후에 이용하세요.',
      );
      navigate('/users/login');
    } catch (err) {
      console.log(err.message);
    }
  };

  const onChange = () => {
    const password = document.querySelector('#password').value;
    const passwordConfirm = document.querySelector('#passwordConfirm').value;

    passValid(password, passwordConfirm);
  };

  function passValid(password, passwordConfirm) {
    if (passwordConfirm && password === passwordConfirm) {
      setValid('비밀번호가 일치합니다.');
      setError(null);
    } else if (passwordConfirm && password !== passwordConfirm) {
      setError('입력하신 비밀번호와 다릅니다.');
      setValid(null);
    }
  }

  async function handleEmailCheck() {
    const email = document.querySelector('#email');
    try {
      await axios.get(
        import.meta.env.VITE_API_SERVER + `/users/email?email=${email.value}`,
      );
      alert('사용 가능한 이메일입니다.');
    } catch (err) {
      alert('사용중인 이메일입니다. 다른 이메일로 시도해주세요.');
    }
  }

  //성별값은 API의 address에 저장
  return (
    <div className="justify-center flex flex-col h-lvh bg-main-bg-color">
      <div className="p-10 m-auto max-w-[440px]">
        <div className="mb-10">
          <div className="flex flex-col w-fit mx-auto">
            <img
              className="-mb-1.5 ml-auto w-8 h-6"
              src="/src/assets/icons/icon-logo.svg"
              alt="메인 비행기 로고"
            />
            <h1 className="font-['SokchoBadaDotum'] font-bold text-xl text-center text-main-color">
              Trip with me
            </h1>
          </div>
          <h2 className="font-['SokchoBadaDotum'] text-md text-center  text-main-color">
            회원가입
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} onChange={onChange}>
          <label className="text-sm font-semibold" htmlFor="email">
            아이디
          </label>
          <div className="flex">
            <input
              className="h-10 w-4/5"
              type="email"
              id="email"
              placeholder="이메일 형식으로 입력해주세요."
              {...register('email', {
                required: '이메일을 입력하세요.',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '이메일 형식이 아닙니다.',
                },
              })}
            />
            <button
              className="font-bold text-white text-sm w-1/5 bg-main-color rounded"
              type="button"
              onClick={handleEmailCheck}
            >
              중복 확인
            </button>
          </div>
          {errors.email && <p>{errors.email.message}</p>}
          <label className="text-sm font-semibold" htmlFor="password">
            비밀번호
          </label>
          <div>
            <input
              className="h-10 w-full"
              type="password"
              id="password"
              placeholder="최소 8자리 이상 입력해주세요."
              {...register('password', {
                required: '비밀번호를 입력하세요.',
                minLength: {
                  value: 8,
                  message: '비밀번호 8자리 이상 입력해주세요.',
                },
              })}
            />
          </div>
          {errors.password && <p>{errors.password.message}</p>}

          <label className="text-sm font-semibold" htmlFor="passwordConfirm">
            비밀번호 재확인
          </label>
          <div>
            <input
              className="h-10 w-full"
              type="password"
              id="passwordConfirm"
            />
          </div>
          {error && <p>{error}</p>}
          {valid && <p>{valid}</p>}

          <label className="text-sm font-semibold" htmlFor="name">
            닉네임
          </label>
          <div>
            <input
              className="h-10 w-full"
              type="text"
              id="name"
              {...register('name', { required: '닉네임을 입력하세요.' })}
            />
          </div>
          {errors.name && <p>{errors.name.message}</p>}
          <br />
          <div className="flex gap-20">
            <div>
              <label className="text-sm font-semibold" htmlFor="age">
                나이
              </label>
              <div>
                <select
                  className="w-20"
                  htmlFor="age"
                  name="age"
                  {...register('extra.birthday')}
                >
                  <option id="age" defaultValue="10">
                    10대
                  </option>
                  <option id="age" value="20">
                    20대
                  </option>
                  <option id="age" value="30">
                    30대
                  </option>
                  <option id="age" value="40">
                    40대
                  </option>
                  <option id="age" value="50">
                    50대
                  </option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold">성별</label>

              <div>
                <label className="mr-1" htmlFor="female">
                  여성
                </label>

                <input
                  className="mr-5"
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  {...register('address', { required: '성별을 선택하세요.' })}
                />

                <label className="mr-1" htmlFor="male">
                  남성
                </label>

                <input
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  {...register('address', { required: '성별을 선택하세요.' })}
                />
              </div>
              {errors.address && <p>{errors.address.message}</p>}
            </div>
          </div>
          <br />
          <hr className="my-5 border-none bg-white h-2 color-white" />
          <div>
            <h3 className="text-lg font-bold text-center mb-3">
              관심사를 골라주세요 ({checkCount} / 3)
            </h3>
            <span>{checkError && checkError}</span>
            <ul>
              <li>{themeData}</li>
            </ul>
          </div>

          <Submit>회원 가입</Submit>
        </form>
      </div>
    </div>
  );
}

export default Signup;
